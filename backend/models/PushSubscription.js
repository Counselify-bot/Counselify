import mongoose from 'mongoose';

const pushSubscriptionSchema = new mongoose.Schema({
    endpoint: { type: String, required: true, unique: true },
    keys: {
        p256dh: { type: String, required: true },
        auth: { type: String, required: true }
    },
    starredItems: [{ type: String }],  // news item IDs
    // Per-item reminder preferences: { "1": ["24h-before-start", "start-day"], "3": ["start-day", "24h-before-end"] }
    reminderPrefs: { type: Map, of: [String], default: {} },
    videoAlerts: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

pushSubscriptionSchema.index({ endpoint: 1 });

const PushSubscription = mongoose.model('PushSubscription', pushSubscriptionSchema);
export default PushSubscription;
