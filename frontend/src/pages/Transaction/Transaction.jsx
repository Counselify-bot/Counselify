import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';
import { CheckCircle2, ArrowLeft, CreditCard, Calendar, Hash, Package, IndianRupee, Loader2, User, Phone, MapPin, GraduationCap } from 'lucide-react';

const Transaction = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL;

    // If navigated here with a fresh transaction from payment success
    const freshTransaction = location.state?.transaction || null;

    useEffect(() => {
        if (user?.email) {
            fetchTransactions();
        }
    }, [user]);

    const fetchTransactions = async () => {
        try {
            const res = await fetch(`${API_URL}/api/payment/transactions/${user.email}`, {
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success) {
                setTransactions(data.transactions);
            }
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="pt-48 pb-40 bg-transparent min-h-screen">
            <div className="section-container max-w-4xl">
                {/* Header */}
                <div className="mb-16">
                    <button
                        onClick={() => navigate('/services')}
                        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#0462C3] transition-colors mb-8 group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Services
                    </button>

                    <div className="inline-flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-12 bg-[#0462C3]"></div>
                        <span className="text-xs uppercase tracking-[0.4em] font-black text-[#0462C3] bg-[#0462C3]/10 px-4 py-2 rounded-full">
                            Payment History
                        </span>
                        <div className="h-px w-12 bg-[#0462C3]"></div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black leading-[1] text-brand-dark tracking-tighter">
                        Your{' '}
                        <span className="serif-font italic font-medium text-[#0462C3]">Transactions</span>
                    </h1>
                    <p className="text-base font-bold text-slate-500 italic mt-4">
                        All your purchased plans and payment details in one place.
                    </p>
                </div>

                {/* Fresh transaction success banner */}
                {freshTransaction && (
                    <div className="mb-10 bg-emerald-50 border border-emerald-200 rounded-[32px] p-8 flex items-start gap-5 animate-fadeIn">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center shrink-0">
                            <CheckCircle2 size={28} className="text-emerald-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-emerald-800 tracking-tight">Payment Successful!</h3>
                            <p className="text-sm font-bold text-emerald-700 mt-1">
                                Your enrollment in <span className="font-black">{freshTransaction.planName}</span> is confirmed.
                                We'll reach out to you on WhatsApp shortly.
                            </p>
                        </div>
                    </div>
                )}

                {/* Loading */}
                {loading ? (
                    <div className="flex items-center justify-center py-32">
                        <Loader2 size={36} className="animate-spin text-[#0462C3]" />
                    </div>
                ) : transactions.length === 0 ? (
                    /* No transactions */
                    <div className="text-center py-32">
                        <div className="w-20 h-20 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-6">
                            <CreditCard size={32} className="text-slate-400" />
                        </div>
                        <h3 className="text-xl font-black text-slate-700 tracking-tight">No Transactions Yet</h3>
                        <p className="text-sm text-slate-500 font-bold mt-2">
                            You haven't purchased any plans yet.
                        </p>
                        <button
                            onClick={() => navigate('/services')}
                            className="mt-8 btn-primary"
                        >
                            Browse Plans
                        </button>
                    </div>
                ) : (
                    /* Transactions list */
                    <div className="space-y-6">
                        {transactions.map((txn, idx) => (
                            <div
                                key={txn._id || idx}
                                className="bg-white rounded-[32px] border border-brand-muted shadow-soft p-8 md:p-10 hover:shadow-xl transition-all duration-300"
                            >
                                {/* Top row: plan name + status */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-[#0462C3]/10 flex items-center justify-center">
                                            <Package size={22} className="text-[#0462C3]" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-brand-dark tracking-tight">{txn.planName}</h3>
                                            <p className="text-xs font-bold text-slate-400 mt-0.5">{txn.email}</p>
                                        </div>
                                    </div>
                                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] ${
                                        txn.status === 'success'
                                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                            : 'bg-red-50 text-red-700 border border-red-200'
                                    }`}>
                                        <CheckCircle2 size={12} />
                                        {txn.status === 'success' ? 'Paid' : 'Failed'}
                                    </div>
                                </div>

                                {/* Payment details grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                    <div className="bg-slate-50 rounded-2xl p-4">
                                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                                            <IndianRupee size={14} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Amount</span>
                                        </div>
                                        <p className="text-lg font-black text-brand-dark">{formatAmount(txn.amount)}</p>
                                    </div>

                                    <div className="bg-slate-50 rounded-2xl p-4">
                                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                                            <Calendar size={14} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Date</span>
                                        </div>
                                        <p className="text-sm font-black text-brand-dark">{formatDate(txn.createdAt)}</p>
                                    </div>

                                    <div className="bg-slate-50 rounded-2xl p-4 sm:col-span-2">
                                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                                            <Hash size={14} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Payment ID</span>
                                        </div>
                                        <p className="text-xs font-bold text-slate-600 break-all font-mono">{txn.razorpayPaymentId}</p>
                                    </div>
                                </div>

                                {/* Student details (from enrollment form) */}
                                {txn.studentName && (
                                    <div className="border-t border-slate-100 pt-6">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Student Details</p>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                            <div className="bg-blue-50/60 rounded-xl p-3">
                                                <div className="flex items-center gap-1.5 text-slate-400 mb-0.5">
                                                    <User size={12} />
                                                    <span className="text-[9px] font-bold uppercase tracking-widest">Name</span>
                                                </div>
                                                <p className="text-sm font-bold text-brand-dark">{txn.studentName}</p>
                                            </div>
                                            <div className="bg-blue-50/60 rounded-xl p-3">
                                                <div className="flex items-center gap-1.5 text-slate-400 mb-0.5">
                                                    <Phone size={12} />
                                                    <span className="text-[9px] font-bold uppercase tracking-widest">WhatsApp</span>
                                                </div>
                                                <p className="text-sm font-bold text-brand-dark">{txn.whatsapp}</p>
                                            </div>
                                            <div className="bg-blue-50/60 rounded-xl p-3">
                                                <div className="flex items-center gap-1.5 text-slate-400 mb-0.5">
                                                    <GraduationCap size={12} />
                                                    <span className="text-[9px] font-bold uppercase tracking-widest">Exam</span>
                                                </div>
                                                <p className="text-sm font-bold text-brand-dark">{txn.examType}</p>
                                            </div>
                                            <div className="bg-blue-50/60 rounded-xl p-3">
                                                <div className="flex items-center gap-1.5 text-slate-400 mb-0.5">
                                                    <Hash size={12} />
                                                    <span className="text-[9px] font-bold uppercase tracking-widest">Rank</span>
                                                </div>
                                                <p className="text-sm font-bold text-brand-dark">{txn.rank}</p>
                                            </div>
                                            <div className="bg-blue-50/60 rounded-xl p-3">
                                                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Category</span>
                                                <p className="text-sm font-bold text-brand-dark mt-0.5">{txn.category}</p>
                                            </div>
                                            <div className="bg-blue-50/60 rounded-xl p-3">
                                                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Gender</span>
                                                <p className="text-sm font-bold text-brand-dark mt-0.5">{txn.gender}</p>
                                            </div>
                                            <div className="bg-blue-50/60 rounded-xl p-3">
                                                <div className="flex items-center gap-1.5 text-slate-400 mb-0.5">
                                                    <MapPin size={12} />
                                                    <span className="text-[9px] font-bold uppercase tracking-widest">State</span>
                                                </div>
                                                <p className="text-sm font-bold text-brand-dark">{txn.state}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Transaction;
