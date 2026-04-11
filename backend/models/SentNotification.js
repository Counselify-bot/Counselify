import mongoose from 'mongoose';

const sentNotificationSchema = new mongoose.Schema({
    endpoint: { type: String, required: true },
    newsItemId: { type: String, required: true },
    type: { type: String, required: true }, // "24h-before", "2h-before", "day-of", "start", "video-new"
    sentAt: { type: Date, default: Date.now }
});

// Compound index to prevent duplicates
sentNotificationSchema.index({ endpoint: 1, newsItemId: 1, type: 1 }, { unique: true });

const SentNotification = mongoose.model('SentNotification', sentNotificationSchema);
export default SentNotification;
