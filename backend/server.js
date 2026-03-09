import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

// Middleware
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://counselify.vercel.app',
    'https://counselify-55cf2gbse-counselify25-9407s-projects.vercel.app'
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept']
}));
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://counselify25:counselify@cluster0.rpnkaaz.mongodb.net/?appName=Cluster0';

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    try {
        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(mongoURI);
        console.log('✅ Connected to MongoDB Atlas Successfully');
    } catch (err) {
        console.error('❌ MongoDB Connection Failed!');
        console.error('Error Details:', err.message);
        throw err;
    }
};

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }, // In production, hash this!
    phone: String,
    rank: String,
    category: String,
    homeState: String,
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Lead Schema
const leadSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    rank: String,
    category: String,
    homeState: String,
    createdAt: { type: Date, default: Date.now }
});

const Lead = mongoose.model('Lead', leadSchema);

// Helper: Generate JWT and set as HTTP-only cookie
const setAuthCookie = (res, user) => {
    const token = jwt.sign(
        { id: user._id, name: user.name, email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
    );
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    return token;
};

// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Counselify AI Engine is Online' });
});

// Auth: Register
app.post('/api/auth/register', async (req, res) => {
    try {
        await connectDB();
        const { name, email, password, phone } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required', success: false });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists', success: false });

        const newUser = new User({ name, email, password, phone });
        await newUser.save();

        setAuthCookie(res, newUser);

        res.status(201).json({
            message: 'Account created successfully',
            success: true,
            user: { name: newUser.name, email: newUser.email }
        });
    } catch (error) {
        console.error('CRITICAL Registration error:', error);
        res.status(500).json({ 
            message: 'Registration failed due to server error', 
            success: false,
            error: error.message,
            stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined
        });
    }
});

// Auth: Login
app.post('/api/auth/login', async (req, res) => {
    try {
        await connectDB();
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) return res.status(401).json({ message: 'Invalid credentials', success: false });

        setAuthCookie(res, user);

        res.json({
            message: 'Login successful',
            user: { name: user.name, email: user.email },
            success: true
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed', success: false });
    }
});

// Auth: Get current user (reads cookie)
app.get('/api/auth/me', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ success: false, message: 'Not authenticated' });

        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({ success: true, user: { name: decoded.name, email: decoded.email } });
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
});

// Auth: Logout (clears cookie)
app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    res.json({ success: true, message: 'Logged out successfully' });
});

// Lead Capture Endpoint
app.post('/api/leads', async (req, res) => {
    try {
        const { name, phone, email, rank, category, homeState } = req.body;
        const newLead = new Lead({ name, phone, email, rank, category, homeState });
        await newLead.save();
        res.status(201).json({ message: 'Lead captured successfully', success: true });
    } catch (error) {
        console.error('Error capturing lead:', error);
        res.status(500).json({ message: 'Internal Server Error', success: false });
    }
});

// AI Explanation Mock Endpoint
app.post('/api/ai/explain', (req, res) => {
    const { rank, category, homeState } = req.body;
    const explanation = `Based on your ${rank} rank for ${category} in ${homeState}, our AI recommends prioritizing top-tier NIT mechanical and electronics over lower-tier IIIT CSE for better R.O.I.`;
    res.json({ explanation });
});

// Razorpay Payment Integration
app.post('/api/payment/create-order', async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        const options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: "receipt_order_" + Date.now()
        };

        const order = await razorpay.orders.create(options);
        res.json({ success: true, order });
    } catch (error) {
        console.error("Razorpay Order Error:", error);
        res.status(500).json({ success: false, message: "Error parsing payment order" });
    }
});

app.post('/api/payment/verify', (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            res.json({ success: true, message: "Payment successfully verified." });
        } else {
            res.status(400).json({ success: false, message: "Invalid Signature." });
        }
    } catch (error) {
        console.error("Verification Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// For Vercel serverless deployment
export default app;
