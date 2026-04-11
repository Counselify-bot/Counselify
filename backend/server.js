import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import webpush from 'web-push';
import User from './models/User.js';
import Transaction from './models/Transaction.js';
import PushSubscription from './models/PushSubscription.js';
import SentNotification from './models/SentNotification.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

// Middleware
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://counselify.vercel.app'
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
        await mongoose.connect(mongoURI, {
            maxPoolSize: 10, // Maintain up to 10 socket connections
            minPoolSize: 2,  // Keep at least 2 connections ready
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('✅ Connected to MongoDB Atlas Successfully');
    } catch (err) {
        console.error('❌ MongoDB Connection Failed!');
        console.error('Error Details:', err.message);
        throw err;
    }
};

// Models are imported from ./models/

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

        // Optimization: Use .lean() for faster read-only queries
        const existingUser = await User.findOne({ email }).lean();
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
        // Optimization: Use .lean() for faster authentication checks
        const user = await User.findOne({ email, password }).lean();
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

// AI Chatbot Endpoint — Ready for OpenAI/Gemini swap
app.post('/api/chat', async (req, res) => {
    try {
        const { message, currentPage, conversationHistory } = req.body;

        if (!message) {
            return res.status(400).json({ reply: 'Please provide a message.', suggestedActions: [] });
        }

        // ── Placeholder: Replace with real LLM call ──
        // Example with OpenAI:
        // const { Configuration, OpenAIApi } = await import('openai');
        // const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
        // const openai = new OpenAIApi(configuration);
        // const completion = await openai.createChatCompletion({
        //     model: 'gpt-3.5-turbo',
        //     messages: [
        //         { role: 'system', content: 'You are Counselify AI Assistant...' },
        //         ...conversationHistory,
        //         { role: 'user', content: message }
        //     ]
        // });
        // return res.json({ reply: completion.data.choices[0].message.content, suggestedActions: [] });

        // Mock response for now
        res.json({
            reply: `Thanks for your question about "${message}". The AI backend is being set up — please use the client-side mock for now!`,
            suggestedActions: [
                { label: 'View Services', route: '/services' },
                { label: 'Check News', route: '/news' }
            ]
        });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ reply: 'Sorry, I encountered an error. Please try again.', suggestedActions: [] });
    }
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

app.post('/api/payment/verify', async (req, res) => {
    try {
        await connectDB();
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            planName,
            amount,
            email,
            studentName,
            whatsapp,
            category,
            rank,
            examType,
            state,
            gender
        } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // Save the transaction
            const transaction = new Transaction({
                email,
                planName,
                amount: amount || 0,
                razorpayOrderId: razorpay_order_id,
                razorpayPaymentId: razorpay_payment_id,
                status: 'success',
                studentName,
                whatsapp,
                category,
                rank,
                examType,
                state,
                gender
            });
            await transaction.save();

            res.json({ success: true, message: "Payment successfully verified.", transaction });
        } else {
            res.status(400).json({ success: false, message: "Invalid Signature." });
        }
    } catch (error) {
        console.error("Verification Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// Get all transactions for a user
app.get('/api/payment/transactions/:email', async (req, res) => {
    try {
        await connectDB();
        const transactions = await Transaction.find({ email: req.params.email })
            .sort({ createdAt: -1 })
            .lean();
        res.json({ success: true, transactions });
    } catch (error) {
        console.error("Fetch transactions error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// ═══════════════════════════════════════════════════════════════════
// YouTube RSS Feed Sync — 24h in-memory cache, zero extra deps
// ═══════════════════════════════════════════════════════════════════
const YT_RSS = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCpp4orqSFPdX_k5l_KaDqtw';
let ytCache = { videos: [], fetchedAt: 0 };
const YT_CACHE_MS = 24 * 60 * 60 * 1000; // 24 hours

const parseYTFeed = (xml) => {
    const entries = xml.split('<entry>').slice(1); // skip feed header
    const seen = new Set();
    return entries.map(entry => {
        const tag = (t) => {
            const m = entry.match(new RegExp(`<${t}[^>]*>([\\s\\S]*?)<\\/${t}>`));
            return m ? m[1].trim() : '';
        };
        const videoId = (entry.match(/<yt:videoId>([^<]+)</) || [])[1] || '';
        if (!videoId || seen.has(videoId)) return null;
        seen.add(videoId);
        return {
            videoId,
            title: tag('title').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&quot;/g, '"'),
            url: `https://www.youtube.com/watch?v=${videoId}`,
            thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
            published: (entry.match(/<published>([^<]+)</) || [])[1] || '',
        };
    }).filter(Boolean);
};

app.get('/api/youtube-videos', async (req, res) => {
    // Add aggressive caching for Vercel Serverless/Edge
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=43200');

    try {
        const now = Date.now();
        // If memory cache exists and isn't older than max age, use it
        if (ytCache.videos && ytCache.videos.length > 0 && (now - ytCache.fetchedAt) < YT_CACHE_MS) {
            return res.json({ success: true, videos: ytCache.videos, cached: true });
        }
        const response = await fetch(YT_RSS);
        if (!response.ok) throw new Error(`RSS fetch failed: ${response.status}`);
        const xml = await response.text();
        const videos = parseYTFeed(xml);
        
        if (videos && videos.length > 0) {
            ytCache = { videos, fetchedAt: now };
            res.json({ success: true, videos: ytCache.videos, cached: false });
        } else {
            // Empty RSS response fallback
            res.json({ success: true, videos: ytCache.videos || [], cached: true, warning: 'empty_feed' });
        }
    } catch (err) {
        console.error('[YouTube API Error]:', err.message);
        // Fallback to cache safely or empty array
        res.json({ success: true, videos: ytCache.videos || [], cached: true, stale: true, error: err.message });
    }
});

// ═══════════════════════════════════════════════════════════════════
// Web Push Notifications — VAPID setup + endpoints
// ═══════════════════════════════════════════════════════════════════
const VAPID_PUBLIC = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY;

if (VAPID_PUBLIC && VAPID_PRIVATE) {
    webpush.setVapidDetails('mailto:counselify25@gmail.com', VAPID_PUBLIC, VAPID_PRIVATE);
    console.log('✅ Web Push VAPID configured');
} else {
    console.warn('⚠️ VAPID keys not found — push notifications disabled');
}

// Return public VAPID key to frontend
app.get('/api/vapid-public-key', (req, res) => {
    res.json({ publicKey: VAPID_PUBLIC || null });
});

// Subscribe / star an item with reminder preferences
app.post('/api/push/subscribe', async (req, res) => {
    try {
        await connectDB();
        const { subscription, newsItemId, reminderTypes, videoAlerts: globalVideo } = req.body;
        if (!subscription?.endpoint || !subscription?.keys) {
            return res.status(400).json({ success: false, message: 'Invalid subscription' });
        }

        let sub = await PushSubscription.findOne({ endpoint: subscription.endpoint });
        if (sub) {
            if (newsItemId && !sub.starredItems.includes(newsItemId)) {
                sub.starredItems.push(newsItemId);
            }
            // Store per-item reminder preferences
            if (newsItemId && reminderTypes?.length) {
                sub.reminderPrefs.set(String(newsItemId), reminderTypes);
            }
            if (globalVideo === true) sub.videoAlerts = true;
            if (newsItemId?.startsWith('yt-')) sub.videoAlerts = true;
            await sub.save();
        } else {
            const prefs = {};
            if (newsItemId && reminderTypes?.length) prefs[String(newsItemId)] = reminderTypes;
            sub = await PushSubscription.create({
                endpoint: subscription.endpoint,
                keys: subscription.keys,
                starredItems: newsItemId ? [newsItemId] : [],
                reminderPrefs: prefs,
                videoAlerts: globalVideo || newsItemId?.startsWith('yt-') || false
            });
        }
        res.json({ success: true, message: 'Subscribed', starredItems: sub.starredItems });
    } catch (err) {
        console.error('Push subscribe error:', err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Unsubscribe / unstar an item
app.post('/api/push/unsubscribe', async (req, res) => {
    try {
        await connectDB();
        const { endpoint, newsItemId } = req.body;
        if (!endpoint) return res.status(400).json({ success: false, message: 'Missing endpoint' });

        const sub = await PushSubscription.findOne({ endpoint });
        if (sub) {
            sub.starredItems = sub.starredItems.filter(id => id !== newsItemId);
            sub.reminderPrefs.delete(String(newsItemId));
            if (newsItemId?.startsWith('yt-')) sub.videoAlerts = false;
            await sub.save();
            res.json({ success: true, message: 'Unsubscribed', starredItems: sub.starredItems });
        } else {
            res.json({ success: true, message: 'Not found' });
        }
    } catch (err) {
        console.error('Push unsubscribe error:', err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// News items with parseable dates for reminder scheduling
const newsItemDates = {
    '1': { title: 'JEE Main Session 2 Exam', start: '2026-04-02', end: '2026-04-09', category: 'Exam' },
    '2': { title: 'JEE Main Session 2 Result', start: '2026-04-19', category: 'Result' },
    '3': { title: 'JEE Advanced Registration', start: '2026-04-23', end: '2026-05-04', category: 'Registration' },
    '4': { title: 'JEE Advanced Admit Card', start: '2026-05-11', end: '2026-05-17', category: 'Admit Card' },
    '5': { title: 'JEE Advanced Exam', start: '2026-05-17', category: 'Exam' },
    '6': { title: 'JEE Advanced Answer Key & Result', start: '2026-06-01', category: 'Result' },
    '7': { title: 'JoSAA Counselling Registration', start: '2026-06-02', category: 'Counselling' },
    '8': { title: 'BITSAT 2026 Sessions', start: '2026-04-15', category: 'Exam' },
    '9': { title: 'BITSAT Session 2 Registration', start: '2026-04-20', end: '2026-05-02', category: 'Registration' },
    '10': { title: 'JAC Delhi Counselling', start: '2026-05-25', category: 'Counselling' }
};

// Send reminders — triggered by cron or manually
app.post('/api/push/send-reminders', async (req, res) => {
    try {
        await connectDB();
        if (!VAPID_PUBLIC || !VAPID_PRIVATE) {
            return res.json({ success: false, message: 'VAPID not configured' });
        }

        const now = new Date();
        const subs = await PushSubscription.find({ starredItems: { $exists: true, $ne: [] } });
        let sent = 0;
        let failed = 0;

        for (const sub of subs) {
            const pushSub = { endpoint: sub.endpoint, keys: sub.keys };

            for (const itemId of sub.starredItems) {
                // Skip video items — handled separately
                if (itemId.startsWith('yt-')) continue;

                const item = newsItemDates[itemId];
                if (!item) continue;

                const reminders = [];
                const startDate = item.start ? new Date(item.start + 'T00:00:00+05:30') : null;
                const endDate = item.end ? new Date(item.end + 'T00:00:00+05:30') : null;

                if (startDate) {
                    // 24h before start
                    const h24 = new Date(startDate.getTime() - 24 * 60 * 60 * 1000);
                    if (now >= h24 && now < startDate) {
                        reminders.push({ type: '24h-before-start', body: `${item.title} starts tomorrow.` });
                    }
                    // Day of start
                    if (now >= startDate && now < new Date(startDate.getTime() + 12 * 60 * 60 * 1000)) {
                        reminders.push({ type: 'start-day', body: `${item.title} starts today!` });
                    }
                }

                if (endDate) {
                    // 24h before deadline
                    const h24end = new Date(endDate.getTime() - 24 * 60 * 60 * 1000);
                    if (now >= h24end && now < endDate) {
                        reminders.push({ type: '24h-before-end', body: `Reminder: ${item.title} deadline is tomorrow.` });
                    }
                    // Last day
                    if (now >= endDate && now < new Date(endDate.getTime() + 12 * 60 * 60 * 1000)) {
                        reminders.push({ type: 'last-day', body: `Last day today: ${item.title}. Don't miss it!` });
                    }
                }

                // Get user's selected reminder types for this item
                const userPrefs = sub.reminderPrefs?.get(String(itemId));

                for (const reminder of reminders) {
                    try {
                        // Only send if user selected this type (or if no prefs = send all for backwards compat)
                        if (userPrefs && userPrefs.length > 0 && !userPrefs.includes(reminder.type)) continue;

                        // Check if already sent
                        const exists = await SentNotification.findOne({
                            endpoint: sub.endpoint, newsItemId: itemId, type: reminder.type
                        });
                        if (exists) continue;

                        await webpush.sendNotification(pushSub, JSON.stringify({
                            title: 'Counselify Reminder',
                            body: reminder.body,
                            url: '/news',
                            icon: '/logo.png'
                        }));

                        await SentNotification.create({
                            endpoint: sub.endpoint, newsItemId: itemId, type: reminder.type
                        });
                        sent++;
                    } catch (pushErr) {
                        failed++;
                        // Remove invalid subscriptions (410 Gone)
                        if (pushErr.statusCode === 410 || pushErr.statusCode === 404) {
                            await PushSubscription.deleteOne({ endpoint: sub.endpoint });
                            break;
                        }
                    }
                }
            }
        }

        res.json({ success: true, sent, failed, checked: subs.length });
    } catch (err) {
        console.error('Send reminders error:', err.message);
        res.status(500).json({ success: false, message: err.message });
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
