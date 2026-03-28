import { CheckCircle2, Star, Zap, Trophy, MessageSquare, ShieldCheck, X, ChevronDown, Crown } from 'lucide-react';
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
                        <div className="h-px w-12 bg-[#0462C3]"></div>
                        <span className="text-xs uppercase tracking-[0.4em] font-bold text-[#0462C3] bg-[#0462C3]/10 px-4 py-2 rounded-full">Clear & Simple Pricing</span>
                        <div className="h-px w-12 bg-[#0462C3]"></div>
                    </div>
                    <h1 className="text-5xl md:text-[80px] font-bold leading-[1] text-on-surface tracking-tighter">
                        Choose Your <br />
                        <span className="serif-font italic font-medium text-[#0462C3]">Counselling Plan</span>
                    </h1>
                    <p className="text-base md:text-lg font-bold text-on-surface-variant italic leading-relaxed max-w-2xl mx-auto pt-6">
                        No confusion. No hidden fees. Transparent guidance to help you secure the best college based on your rank.
                    </p>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                    {plans.map((plan, idx) => (
                        <div key={idx} className={`relative flex flex-col bg-white p-10 md:p-12 rounded-2xl ${plan.popular ? 'border-2 border-[#0462C3] shadow-[0_20px_60px_-15px_rgba(4,98,195,0.3)] ring-4 ring-[#0462C3]/10 scale-[1.02] md:scale-105 z-10 editorial-shadow' : 'border border-transparent hover:border-[#0462C3]/30 editorial-shadow hover:-translate-y-2'} transition-all duration-500 group`}>
                            {plan.popular && (
                                <div className="absolute top-0 right-10 bg-[#0462C3] text-white px-6 py-2 rounded-b-[16px] text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg">
                                    ⭐ Most Popular
                                </div>
                            )}

                            <div className="flex items-center gap-6 mb-8">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center p-3 shadow-inner ${plan.popular ? 'bg-[#0462C3]/10 border border-[#0462C3]/20' : 'bg-primary-container/5 group-hover:bg-[#0462C3] group-hover:text-white transition-colors duration-300 border border-transparent'} `}>
                                    {plan.icon}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-on-surface tracking-tighter">{plan.name}</h3>
                                    <p className="text-4xl font-bold text-[#0462C3] serif-font tracking-tighter mt-1">{plan.price}</p>
                                </div>
                            </div>

                            <p className="text-[13px] font-bold text-on-surface-variant italic mb-8 min-h-[40px]">{plan.desc}</p>

                            <ul className="space-y-4 mb-12 flex-grow">
                                {plan.features.map((feature, fidx) => (
                                    <li key={fidx} className="flex items-start gap-3">
                                        <div className={`mt-0.5 shrink-0 ${feature.inc ? 'text-[#0462C3]' : 'text-red-400'}`}>
                                            {feature.inc ? <CheckCircle2 size={16} /> : <X size={16} />}
                                        </div>
                                        <span className={`text-[13px] font-bold leading-relaxed ${feature.inc ? 'text-on-surface-variant' : 'text-outline line-through'}`}>
                                            {feature.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handlePlanClick(plan, idx)}
                                disabled={processingIdx === idx}
                                className={`w-full py-5 rounded-[32px] font-bold text-[11px] uppercase tracking-[0.25em] transition-all shadow-md mt-auto ${
                                    purchasedPlans.includes(plan.name)
                                        ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-900/20'
                                        : plan.popular
                                            ? 'bg-[#0462C3] text-white hover:bg-[#005536] shadow-blue-900/20'
                                            : 'bg-surface-container-low text-on-surface hover:bg-slate-200 border border-outline-variant/30'
                                } ${processingIdx === idx ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                {processingIdx === idx
                                    ? 'Processing...'
                                    : purchasedPlans.includes(plan.name)
                                        ? '✓ View Transaction'
                                        : plan.cta}
                            </button>
                        </div>
                    ))}
                </div>

                {/* No Refund Policy */}
                <div className="mt-20 text-center max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-error-container border border-red-200 text-red-700 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-[0.15em]">
                        <ShieldCheck size={16} />
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
