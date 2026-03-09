import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    email: { type: String, required: true },
    planName: { type: String, required: true },
    amount: { type: Number, required: true },
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: { type: String, required: true },
    status: { type: String, enum: ['success', 'failed'], default: 'success' },
    // Enrollment form fields
    studentName: String,
    whatsapp: String,
    category: String,
    rank: String,
    examType: { type: String, enum: ['JEE Mains', 'JEE Advanced'] },
    state: String,
    gender: String,
    createdAt: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
