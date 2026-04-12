import { CheckCircle2, Star, Zap, Trophy, MessageSquare, ShieldCheck, Minus, ChevronDown, Crown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Loads the Razorpay script only once, on first payment attempt
let razorpayScriptLoaded = false;
const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
        if (razorpayScriptLoaded || window.Razorpay) {
            razorpayScriptLoaded = true;
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
            razorpayScriptLoaded = true;
            resolve();
        };
        script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
        document.head.appendChild(script);
    });
};

const INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman & Nicobar", "Chandigarh", "Delhi", "J&K", "Ladakh",
    "Lakshadweep", "Puducherry"
];

const CATEGORIES = ["General", "OBC-NCL", "SC", "ST", "EWS", "PwD"];

const Services = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [processingIdx, setProcessingIdx] = useState(null);
    const [purchasedPlans, setPurchasedPlans] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [selectedIdx, setSelectedIdx] = useState(null);

    // Form fields
    const [formData, setFormData] = useState({
        studentName: '',
        whatsapp: '',
        category: '',
        rank: '',
        examType: 'JEE Mains',
        state: '',
        gender: ''
    });

    const API_URL = import.meta.env.VITE_API_URL;

    // Fetch user's existing transactions on mount
    useEffect(() => {
        if (user?.email) {
            fetch(`${API_URL}/api/payment/transactions/${user.email}`, {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setPurchasedPlans(data.transactions.map(t => t.planName));
                    }
                })
                .catch(err => console.error('Failed to check purchases:', err));
        }
    }, [user]);

    const handlePlanClick = (plan, idx) => {
        // If user already purchased this plan, redirect to transaction page
        if (purchasedPlans.includes(plan.name)) {
            navigate('/transaction');
            return;
        }

        // Show enrollment form
        setSelectedPlan(plan);
        setSelectedIdx(idx);
        setShowModal(true);
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isFormValid = () => {
        return formData.studentName.trim() &&
            formData.whatsapp.trim() &&
            formData.category &&
            formData.rank.trim() &&
            formData.state &&
            formData.gender;
    };

    const handleProceedToPayment = async () => {
        if (!isFormValid()) {
            alert("Please fill in all fields before proceeding.");
            return;
        }

        // Defensive check for the API key
        if (!import.meta.env.VITE_RAZORPAY_KEY_ID) {
            console.error("CRITICAL: VITE_RAZORPAY_KEY_ID is missing from environment variables!");
            alert("Payment system is currently under maintenance. Please try again later.");
            return;
        }

        const plan = selectedPlan;
        const idx = selectedIdx;
        setProcessingIdx(idx);

        try {
            await loadRazorpayScript();
        } catch (err) {
            console.error("Failed to load payment gateway:", err);
            alert("Could not load payment system. Please check your internet connection and try again.");
            setProcessingIdx(null);
            return;
        }

        const amountDisplay = plan.price.replace(/[^0-9]/g, '');
        const amount = parseInt(amountDisplay);

        try {
            // 1. Create Order
            const orderRes = await fetch(`${API_URL}/api/payment/create-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount })
            });
            const orderData = await orderRes.json();

            if (!orderData.success) {
                console.error("Failed to create order please try again.");
                setProcessingIdx(null);
                return;
            }

            // 2. Open Razorpay Checkout Modal
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: orderData.order.amount,
                currency: "INR",
                name: "Counselify Info",
                description: `Payment for ${plan.name}`,
                order_id: orderData.order.id,
                handler: async function (response) {
                    // 3. Verify Payment & Save Transaction
                    try {
                        const verifyRes = await fetch(`${API_URL}/api/payment/verify`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                planName: plan.name,
                                amount,
                                email: user?.email || '',
                                ...formData
                            })
                        });
                        const verifyData = await verifyRes.json();

                        if (verifyData.success) {
                            setShowModal(false);
                            navigate('/transaction', {
                                state: { transaction: verifyData.transaction }
                            });
                        } else {
                            console.error("Payment verification failed.");
                            alert("Payment verification failed. Please contact support.");
                        }
                    } catch (err) {
                        console.error("Error during payment verification.");
                        alert("Something went wrong during verification. Please contact support.");
                    } finally {
                        setProcessingIdx(null);
                    }
                },
                prefill: {
                    name: formData.studentName,
                    email: user?.email || '',
                    contact: formData.whatsapp
                },
                theme: {
                    color: "#0462C3"
                },
                modal: {
                    ondismiss: function () {
                        setProcessingIdx(null);
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                console.error(response.error.description);
                setProcessingIdx(null);
            });
            rzp.open();

        } catch (error) {
            console.error(error);
            console.error("Something went wrong!");
            setProcessingIdx(null);
        }
    };

    const plans = [
        {
            name: "Basic Plan",
            price: "₹1",
            desc: "Best for students who just want prediction.",
            features: [
                { text: "AI Rank Predictor (IIT/NIT/IIIT/GFTI/State/Private)", inc: true },
                { text: "Safe / Moderate / Dream category", inc: true },
                { text: "Basic college list", inc: true },
                { text: "General counselling guide", inc: true },
                { text: "No personalized strategy", inc: false },
                { text: "No support", inc: false }
            ],
            cta: "Get Started for ₹1",
            icon: <Zap size={28} />
        },
        {
            name: "JoSAA Smart Plan",
            price: "₹999",
            desc: "For students participating in JoSAA only.",
            features: [
                { text: "Personalized Choice Filling Order", inc: true },
                { text: "Freeze / Float / Slide guidance", inc: true },
                { text: "Round-wise strategy", inc: true },
                { text: "Document checklist", inc: true },
                { text: "WhatsApp Chat Support till JoSAA ends", inc: true }
            ],
            cta: "Enroll in JoSAA Plan",
            icon: <ShieldCheck size={28} />
        },
        {
            name: "CSAB Smart Plan",
            price: "₹799",
            desc: "For students focusing only on CSAB.",
            features: [
                { text: "CSAB strategy planning", inc: true },
                { text: "Seat upgrade probability", inc: true },
                { text: "Backup college mapping", inc: true },
                { text: "WhatsApp Chat Support till CSAB ends", inc: true }
            ],
            cta: "Enroll in CSAB Plan",
            icon: <Star size={28} />
        },
        {
            name: "Complete Counselling Plan",
            price: "₹1,499",
            desc: "JoSAA + CSAB Combined. This is the value plan.",
            features: [
                { text: "Everything in JoSAA Plan", inc: true },
                { text: "Everything in CSAB Plan", inc: true },
                { text: "Integrated strategy (JoSAA → CSAB transition)", inc: true },
                { text: "Priority Chat Support", inc: true },
                { text: "1 Scheduled Call Support", inc: true }
            ],
            cta: "Get Most Popular Plan",
            popular: true,
            icon: <Trophy size={36} />
        },
        {
            name: "Premium Guidance",
            price: "₹1,999",
            desc: "For serious students who want full support.",
            features: [
                { text: "JoSAA + CSAB Full Support", inc: true },
                { text: "Unlimited Chat Support", inc: true },
                { text: "Multiple Call Sessions", inc: true },
                { text: "Live Choice Filling Help", inc: true },
                { text: "State Counselling Strategy", inc: true },
                { text: "Private College Comparison", inc: true },
                { text: "Parent Support Call", inc: true },
                { text: "Round-by-round active monitoring", inc: true }
            ],
            cta: "Get Premium Support",
            icon: <Crown size={28} />
        },
        {
            name: "JAC Delhi Counselling Plan",
            price: "₹799",
            desc: "Completely separate from above plans. For DTU / NSUT / IIIT Delhi / IGDTUW aspirants.",
            features: [
                { text: "Personalized Choice Filling Order", inc: true },
                { text: "Delhi Quota vs Outside Delhi Strategy", inc: true },
                { text: "Branch vs College Guidance", inc: true },
                { text: "Spot Round Strategy", inc: true },
                { text: "Document Checklist", inc: true },
                { text: "Unlimited Chat Support", inc: true },
                { text: "1 One-Time Call Support", inc: true },
                { text: "Not included in JoSAA / CSAB plans", inc: false },
                { text: "Separate purchase required", inc: false }
            ],
            cta: "Enroll in JAC Plan",
            icon: <MessageSquare size={28} />
        }
    ];

    return (
        <div className="pt-48 pb-40 mesh-gradient-hero min-h-screen">
            <div className="section-container">
                {/* Header */}
                <div className="text-center mb-32 space-y-6 max-w-4xl mx-auto">
                    <div className="inline-flex items-center justify-center gap-3 mb-4 group cursor-default">
                        <div className="h-px w-12 bg-blue-500/50"></div>
                        <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] font-bold text-[#0462C3] bg-blue-50 px-4 py-2 rounded-full border border-blue-100">Clear & Flexible Pricing</span>
                        <div className="h-px w-12 bg-blue-500/50"></div>
                    </div>
                    <h1 className="text-5xl md:text-[80px] font-bold leading-[1] text-on-surface tracking-tighter">
                        Choose Your <br />
                        <span className="serif-font italic font-medium text-[#0462C3]">Counselling Plan</span>
                    </h1>
                    <p className="text-base md:text-lg font-bold text-on-surface-variant italic leading-relaxed max-w-2xl mx-auto pt-6">
                        No confusion. No hidden fees. Transparent guidance to help you secure the best college based on your rank.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center relative z-10">
                    {plans.map((plan, idx) => (
                        <div key={idx} className={`relative flex flex-col bg-white p-8 md:p-10 rounded-[20px] transition-all duration-300 ease-out hover:-translate-y-[6px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] cursor-default group ${plan.popular ? 'border-none shadow-[0_0_0_2px_#0462C3,0_20px_60px_-15px_rgba(4,98,195,0.4)] scale-100 lg:scale-[1.03] z-20' : 'border border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] z-10'}`}>
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#0462C3] to-[#0474e8] text-white px-5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] shadow-[0_4px_12px_rgba(4,98,195,0.4)] flex items-center gap-1">
                                    🔥 MOST POPULAR
                                </div>
                            )}

                            <div className="flex items-center gap-5 mb-8 mt-2">
                                <div className={`w-14 h-14 rounded-[14px] flex items-center justify-center p-3 shadow-sm ${plan.popular ? 'bg-blue-50 text-[#0462C3] border border-blue-100' : 'bg-slate-50 text-slate-500 group-hover:bg-[#0462C3] group-hover:text-white transition-colors duration-300'} `}>
                                    {plan.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className={`text-xl font-extrabold tracking-tight ${plan.popular ? 'text-slate-900' : 'text-slate-800'}`}>{plan.name}</h3>
                                    <p className="text-[32px] md:text-[36px] font-black tracking-tighter mt-1 bg-gradient-to-r from-[#0462C3] to-blue-500 bg-clip-text text-transparent">{plan.price}</p>
                                    {plan.popular && (
                                        <p className="text-[10px] font-bold text-blue-600 tracking-wide mt-1 uppercase">Best value for serious aspirants</p>
                                    )}
                                </div>
                            </div>

                            <p className="text-[14px] font-medium text-slate-500 leading-relaxed mb-8 min-h-[42px] border-b border-black/5 pb-8">{plan.desc}</p>

                            <ul className="space-y-4 mb-10 flex-grow">
                                {plan.features.map((feature, fidx) => (
                                    <li key={fidx} className={`flex items-start gap-3 transition-opacity ${feature.inc ? 'opacity-100' : 'opacity-40 grayscale'}`}>
                                        <div className={`mt-[2px] shrink-0 ${feature.inc ? 'text-[#0462C3]' : 'text-slate-400'}`}>
                                            {feature.inc ? <CheckCircle2 size={18} strokeWidth={2.5} /> : <Minus size={18} strokeWidth={2} />}
                                        </div>
                                        <span className={`text-[13px] leading-relaxed ${feature.inc ? 'font-bold text-slate-700' : 'font-medium text-slate-500'}`}>
                                            {feature.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handlePlanClick(plan, idx)}
                                disabled={processingIdx === idx}
                                className={`w-full py-4 rounded-full font-extrabold text-[12px] uppercase tracking-[0.2em] transition-all duration-300 mt-auto hover:scale-[1.02] ${
                                    purchasedPlans.includes(plan.name)
                                        ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-[0_4px_14px_rgba(16,185,129,0.3)]'
                                        : plan.popular
                                            ? 'bg-gradient-to-r from-[#0462C3] to-blue-600 text-white hover:from-[#0351a0] hover:to-blue-700 shadow-[0_8px_20px_rgba(4,98,195,0.35)]'
                                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80 shadow-sm hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]'
                                } ${processingIdx === idx ? 'opacity-50 cursor-not-allowed scale-100 hover:scale-100' : ''}`}>
                                {processingIdx === idx
                                    ? 'Processing...'
                                    : purchasedPlans.includes(plan.name)
                                        ? '✓ View Transaction'
                                        : plan.cta}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Trust & Urgency Anchors */}
                <div className="mt-20 flex flex-col items-center justify-center gap-6">
                    {/* Urgency Pill */}
                    <div className="inline-flex items-center gap-2.5 bg-orange-50 border border-orange-100 text-orange-700 px-6 py-2.5 rounded-full text-[11px] font-extrabold uppercase tracking-widest shadow-sm">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
                        </span>
                        Limited seats for guided plans. Counselling season is live.
                    </div>
                    {/* Trust Pillar */}
                    <div className="flex items-center gap-2 text-slate-500 font-medium text-[13px]">
                        <ShieldCheck size={16} className="text-[#0462C3]" />
                        <span>Trusted by 1000+ JEE Aspirants — Focused strictly on JoSAA & CSAB data trends.</span>
                    </div>
                </div>

                {/* Advisory Guidance Strip (Relocated from Home) */}
                <div id="guidance" className="mt-24 mb-6 relative overflow-hidden bg-white border border-outline/10 rounded-3xl p-8 lg:p-12 text-left max-w-5xl mx-auto shadow-sm">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-fixed/5 -z-10 skew-x-[-12deg] translate-x-12 blur-2xl"></div>
                    <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center flex-wrap md:flex-nowrap">
                        <div className="w-full md:w-1/2 space-y-4">
                            <div className="inline-flex items-center gap-3">
                                <div className="w-1.5 h-4 bg-primary-container rounded-full"></div>
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-outline">Navigating Admission Risk</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-on-surface leading-tight">
                                One choice can diverge your <br />
                                <span className="serif-font italic font-medium text-primary-container">engineering career.</span>
                            </h3>
                            <p className="text-sm font-medium text-surface-container-high leading-relaxed max-w-md">
                                Official counsel minimizes mistakes with documents and freeze/float decisions. Our personalized strategies ensure robust choice filling and risk mitigation until final seat confirmation.
                            </p>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-sm flex items-start gap-4 transition-transform hover:-translate-y-1 duration-300">
                                <ShieldCheck size={28} className="text-[#0462C3] shrink-0 mt-1" />
                                <div>
                                    <h4 className="text-sm font-bold text-on-surface mb-2 uppercase tracking-widest">Complete Guidance</h4>
                                    <p className="text-[13px] font-medium text-surface-container-high leading-relaxed">
                                        We support you from rank analysis to final admission. Stop guessing probabilities and rely on algorithmic data and human oversight.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* No Refund Policy */}
                <div className="mt-24 text-center max-w-2xl mx-auto border-t border-slate-200 pt-16">
                    <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-600 px-6 py-2.5 rounded-full text-[11px] font-extrabold uppercase tracking-[0.15em]">
                        <ShieldCheck size={14} className="opacity-80" />
                        Strict No Refund Policy
                    </div>
                    <p className="text-sm text-on-surface-variant font-medium mt-4 leading-relaxed">
                        All payments made for Counselify services are <span className="font-bold text-on-surface-variant">final and non-refundable</span>.
                        By purchasing any plan, you acknowledge and agree that no refunds will be issued under any circumstances,
                        including but not limited to dissatisfaction with the service, change of mind, or unused sessions.
                        Please review your plan carefully before making a purchase.
                    </p>
                </div>

            </div>

            {/* ── Enrollment Form Modal ── */}
            {showModal && selectedPlan && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    onClick={(e) => { if (e.target === e.currentTarget) { setShowModal(false); setProcessingIdx(null); } }}>
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

                    {/* Modal */}
                    <div className="relative bg-white rounded-[32px] w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl p-8 md:p-10 animate-fadeIn">
                        {/* Close button */}
                        <button
                            onClick={() => { setShowModal(false); setProcessingIdx(null); }}
                            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-surface-container-low hover:bg-slate-200 flex items-center justify-center transition-colors"
                        >
                            <X size={18} className="text-on-surface-variant" />
                        </button>

                        {/* Modal header */}
                        <div className="mb-8">
                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#0462C3] bg-[#0462C3]/10 px-3 py-1.5 rounded-full">
                                Enrollment Form
                            </span>
                            <h2 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight mt-4">
                                {selectedPlan.name}
                            </h2>
                            <p className="text-sm text-on-surface-variant font-bold mt-1">
                                {selectedPlan.price} • Fill your details to proceed
                            </p>
                        </div>

                        {/* Form */}
                        <div className="space-y-5">
                            {/* Name */}
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-widest text-outline mb-2">
                                    Full Name <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="studentName"
                                    value={formData.studentName}
                                    onChange={handleFormChange}
                                    placeholder="Enter your full name"
                                    className="w-full px-5 py-4 rounded-2xl border border-outline-variant/30 bg-surface-container-low text-sm font-bold text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-2 focus:ring-[#0462C3]/30 focus:border-[#0462C3] transition-all"
                                />
                            </div>

                            {/* WhatsApp Number */}
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-widest text-outline mb-2">
                                    WhatsApp Number <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="whatsapp"
                                    value={formData.whatsapp}
                                    onChange={handleFormChange}
                                    placeholder="e.g. 9876543210"
                                    maxLength={10}
                                    className="w-full px-5 py-4 rounded-2xl border border-outline-variant/30 bg-surface-container-low text-sm font-bold text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-2 focus:ring-[#0462C3]/30 focus:border-[#0462C3] transition-all"
                                />
                            </div>

                            {/* Exam Type Toggle */}
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-widest text-outline mb-2">
                                    Exam Type <span className="text-red-400">*</span>
                                </label>
                                <div className="flex gap-3">
                                    {['JEE Mains', 'JEE Advanced'].map((exam) => (
                                        <button
                                            key={exam}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, examType: exam })}
                                            className={`flex-1 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all ${
                                                formData.examType === exam
                                                    ? 'bg-[#0462C3] text-white shadow-md'
                                                    : 'bg-surface-container-low text-on-surface-variant border border-outline-variant/30 hover:bg-surface-container-low'
                                            }`}
                                        >
                                            {exam}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Rank */}
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-widest text-outline mb-2">
                                    Rank ({formData.examType}) <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="rank"
                                    value={formData.rank}
                                    onChange={handleFormChange}
                                    placeholder="Enter your rank"
                                    className="w-full px-5 py-4 rounded-2xl border border-outline-variant/30 bg-surface-container-low text-sm font-bold text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-2 focus:ring-[#0462C3]/30 focus:border-[#0462C3] transition-all"
                                />
                            </div>

                            {/* Category & Gender - side by side */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-widest text-outline mb-2">
                                        Category <span className="text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleFormChange}
                                            className="w-full px-5 py-4 rounded-2xl border border-outline-variant/30 bg-surface-container-low text-sm font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0462C3]/30 focus:border-[#0462C3] transition-all appearance-none"
                                        >
                                            <option value="">Select</option>
                                            {CATEGORIES.map(c => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-widest text-outline mb-2">
                                        Gender <span className="text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleFormChange}
                                            className="w-full px-5 py-4 rounded-2xl border border-outline-variant/30 bg-surface-container-low text-sm font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0462C3]/30 focus:border-[#0462C3] transition-all appearance-none"
                                        >
                                            <option value="">Select</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            {/* State */}
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-widest text-outline mb-2">
                                    Home State <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        name="state"
                                        value={formData.state}
                                        onChange={handleFormChange}
                                        className="w-full px-5 py-4 rounded-2xl border border-outline-variant/30 bg-surface-container-low text-sm font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0462C3]/30 focus:border-[#0462C3] transition-all appearance-none"
                                    >
                                        <option value="">Select your state</option>
                                        {INDIAN_STATES.map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Proceed to Payment Button */}
                        <button
                            onClick={handleProceedToPayment}
                            disabled={!isFormValid() || processingIdx !== null}
                            className={`w-full mt-8 py-5 rounded-[32px] font-bold text-[11px] uppercase tracking-[0.25em] transition-all shadow-lg ${
                                isFormValid() && processingIdx === null
                                    ? 'bg-[#0462C3] text-white hover:bg-primary cursor-pointer'
                                    : 'bg-slate-200 text-outline cursor-not-allowed'
                            }`}
                        >
                            {processingIdx !== null ? 'Processing...' : `Proceed to Payment — ${selectedPlan.price}`}
                        </button>

                        <p className="text-[11px] text-outline text-center mt-4 font-medium">
                            Your details will be used for personalized counselling. Payments are secure & encrypted.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Services;
