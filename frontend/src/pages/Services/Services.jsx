import { CheckCircle2, Star, Zap, Trophy, MessageSquare, ShieldCheck, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Services = () => {
    const navigate = useNavigate();
    // Load Razorpay script dynamically
    useEffect(() => {
        const loadScript = src => {
            return new Promise(resolve => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = () => resolve(true);
                script.onerror = () => resolve(false);
                document.body.appendChild(script);
            });
        };
        loadScript("https://checkout.razorpay.com/v1/checkout.js");
    }, []);

    const [processingIdx, setProcessingIdx] = useState(null);

    const handlePayment = async (plan, idx) => {
        if (plan.price === "₹0") {
            navigate('/signup');
            return;
        }

        setProcessingIdx(idx);
        const amountDisplay = plan.price.replace(/[^0-9]/g, '');
        const amount = parseInt(amountDisplay);

        try {
            // 1. Create Order
            const orderRes = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/create-order`, {
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
                key: "rzp_test_SORRPlkvsroJrW",
                amount: orderData.order.amount,
                currency: "INR",
                name: "Counselify Info",
                description: `Payment for ${plan.name}`,
                order_id: orderData.order.id,
                handler: async function (response) {
                    // 3. Verify Payment
                    try {
                        const verifyRes = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/verify`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            })
                        });
                        const verifyData = await verifyRes.json();

                        if (verifyData.success) {
                            console.log("Payment Successful! Welcome to Counselify.");
                        } else {
                            console.error("Payment verification failed.");
                        }
                    } catch (err) {
                        console.error("Error during payment verification.");
                    } finally {
                        setProcessingIdx(null);
                    }
                },
                prefill: {
                    name: "",
                    email: "",
                    contact: ""
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
            name: "Free Plan",
            price: "₹0",
            desc: "Best for students who just want prediction.",
            features: [
                { text: "AI Rank Predictor (IIT/NIT/IIIT/GFTI/State/Private)", inc: true },
                { text: "Safe / Moderate / Dream category", inc: true },
                { text: "Basic college list", inc: true },
                { text: "General counselling guide", inc: true },
                { text: "No personalized strategy", inc: false },
                { text: "No support", inc: false }
            ],
            cta: "Get Started Free",
            icon: <Zap size={28} className="text-slate-400" />
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
            icon: <ShieldCheck size={28} className="text-[#0462C3]" />
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
            icon: <Star size={28} className="text-[#0462C3]" />
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
            icon: <Trophy className="text-[#0462C3]" size={36} />
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
            icon: <MessageSquare size={28} className="text-brand-dark" />
        }
    ];

    return (
        <div className="pt-48 pb-40 bg-transparent min-h-screen">
            <div className="section-container">
                {/* Header */}
                <div className="text-center mb-32 space-y-6 max-w-4xl mx-auto">
                    <div className="inline-flex items-center justify-center gap-3 mb-4 group cursor-default">
                        <div className="h-px w-12 bg-[#0462C3]"></div>
                        <span className="text-xs uppercase tracking-[0.4em] font-black text-[#0462C3] bg-[#0462C3]/10 px-4 py-2 rounded-full">Clear & Simple Pricing</span>
                        <div className="h-px w-12 bg-[#0462C3]"></div>
                    </div>
                    <h1 className="text-5xl md:text-[80px] font-black leading-[1] text-brand-dark tracking-tighter">
                        Choose Your <br />
                        <span className="serif-font italic font-medium text-[#0462C3]">Counselling Plan</span>
                    </h1>
                    <p className="text-base md:text-lg font-bold text-slate-500 italic leading-relaxed max-w-2xl mx-auto pt-6">
                        No confusion. No hidden fees. Transparent guidance to help you secure the best college based on your rank.
                    </p>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                    {plans.map((plan, idx) => (
                        <div key={idx} className={`relative flex flex-col bg-white p-10 md:p-12 rounded-[48px] border ${plan.popular ? 'border-[#0462C3] shadow-[0_20px_60px_-15px_rgba(4,98,195,0.3)] ring-4 ring-[#0462C3]/10 scale-[1.02] md:scale-105 z-10' : 'border-brand-muted shadow-soft hover:shadow-xl'} transition-all duration-300`}>
                            {plan.popular && (
                                <div className="absolute top-0 right-10 bg-[#0462C3] text-white px-6 py-2 rounded-b-[16px] text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                                    ⭐ Most Popular
                                </div>
                            )}

                            <div className="flex items-center gap-6 mb-8">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center p-3 shadow-inner border ${plan.popular ? 'bg-[#0462C3]/10 border-[#0462C3]/20' : 'bg-brand-muted/30 border-brand-muted'} `}>
                                    {plan.icon}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-brand-dark tracking-tighter">{plan.name}</h3>
                                    <p className="text-4xl font-black text-[#0462C3] serif-font tracking-tighter mt-1">{plan.price}</p>
                                </div>
                            </div>

                            <p className="text-[13px] font-bold text-slate-500 italic mb-8 min-h-[40px]">{plan.desc}</p>

                            <ul className="space-y-4 mb-12 flex-grow">
                                {plan.features.map((feature, fidx) => (
                                    <li key={fidx} className="flex items-start gap-3">
                                        <div className={`mt-0.5 shrink-0 ${feature.inc ? 'text-[#0462C3]' : 'text-red-400'}`}>
                                            {feature.inc ? <CheckCircle2 size={16} /> : <X size={16} />}
                                        </div>
                                        <span className={`text-[13px] font-bold leading-relaxed ${feature.inc ? 'text-slate-700' : 'text-slate-400 line-through'}`}>
                                            {feature.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handlePayment(plan, idx)}
                                disabled={processingIdx === idx}
                                className={`w-full py-5 rounded-[32px] font-black text-[11px] uppercase tracking-[0.25em] transition-all shadow-md mt-auto ${plan.popular
                                    ? 'bg-[#0462C3] text-white hover:bg-[#005536] shadow-blue-900/20'
                                    : 'bg-slate-100 text-brand-dark hover:bg-slate-200 border border-slate-200'
                                    } ${processingIdx === idx ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                {processingIdx === idx ? 'Processing...' : plan.cta}
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Services;
