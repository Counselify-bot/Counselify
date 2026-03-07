import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Razorpay from 'razorpay';
import crypto from 'crypto';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://counselify25:counselify@cluster0.rpnkaaz.mongodb.net/?appName=Cluster0';
console.log('Attempting to connect to MongoDB...');
mongoose.connect(mongoURI)
    .then(() => console.log('✅ Connected to MongoDB Atlas Successfully'))
    .catch((err) => {
        console.error('❌ MongoDB Connection Failed!');
        console.error('Error Details:', err.message);
    });

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

// Lead Schema (Optional, can be merged with User)
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

// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Counselify AI Engine is Online' });
});

// Auth Endpoints
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const newUser = new User({ name, email, password, phone });
        await newUser.save();
        res.status(201).json({ message: 'Account created successfully', success: true });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Registration failed', success: false });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password }); // Simplified for demo
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        res.json({ message: 'Login successful', user: { name: user.name, email: user.email }, success: true });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', success: false });
    }
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
    // Simulate AI logic
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
            amount: req.body.amount * 100, // amount in smallest currency unit (paise)
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
            // Save logic to database goes here if needed.
            res.json({ success: true, message: "Payment successfully verified." });
        } else {
            res.status(400).json({ success: false, message: "Invalid Signature." });
        }
    } catch (error) {
        console.error("Verification Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
