import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Target, Search, Building2, ChevronRight, HelpCircle, Zap, CheckCircle2, BarChart3, Clock, Sparkles } from 'lucide-react';

const CollegePredictorSelection = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const predictors = [
        {
            id: 'josaa',
            title: "JoSAA Predictor",
            description: "Predict colleges for IITs, NITs, IIITs and GFTIs based on your rank and category.",
            icon: <Target className="w-8 h-8 text-white" />,
            path: "/college-predictor/josaa",
            buttonText: "Start Prediction",
            badge: "🔥 Most Used",
            isHighlighted: true
        },
        {
            id: 'jac',
            title: "JAC Delhi Predictor",
            description: "Check admission chances for DTU, NSUT, IIIT Delhi and IGDTUW with your rank.",
            icon: <Building2 className="w-8 h-8 text-[#0462C3]" />,
            path: "/college-predictor/jac-delhi",
            buttonText: "Start Prediction",
            badge: null,
            isHighlighted: false
        },
        {
            id: 'csab',
            title: "CSAB Predictor",
            description: "Explore backup and upgraded college options in CSAB special rounds using your rank.",
            icon: <Search className="w-8 h-8 text-[#0462C3]" />,
            path: "/college-predictor/csab",
            buttonText: "Start Prediction",
            badge: null,
            isHighlighted: false
        }
    ];

    return (
        <div className="pt-24 md:pt-32 pb-16 lg:pb-32 mesh-gradient-hero min-h-screen relative overflow-hidden">
            {/* Subtle radial glow in background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-blue-400/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* ─── Hero Section ─── */}
                <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-16 mt-4">
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-8 lg:gap-3">
                        <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-blue-50/80 backdrop-blur-sm text-[#0462C3] text-[9px] lg:text-[11px] uppercase tracking-widest font-black border border-blue-100/50">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Accurate
                        </span>
                        <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-emerald-50/80 backdrop-blur-sm text-emerald-700 text-[9px] lg:text-[11px] uppercase tracking-widest font-black border border-emerald-100/50">
                            <Sparkles className="w-3.5 h-3.5" /> 2025 Data
                        </span>
                    </div>

                    <h1 className="text-[38px] md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.05] lg:leading-[1.1] px-2 max-w-[340px] md:max-w-none mx-auto">
                        Find Your Perfect College in <span className="bg-gradient-to-r from-[#0462C3] to-[#208ef7] text-transparent bg-clip-text">Seconds</span>
                    </h1>
                    <p className="text-[15px] md:text-xl text-slate-500 leading-relaxed font-medium max-w-[300px] md:max-w-2xl mx-auto opacity-90">
                        AI-powered predictors designed to give you realistic options based on official past trends.
                    </p>
                </div>

                {/* ─── Prediction Cards ─── */}
                <div className="flex flex-col md:grid md:grid-cols-3 gap-5 lg:gap-8 mb-14 lg:mb-20 max-w-6xl mx-auto relative">
                    {predictors.map((item, index) => (
                        <div key={item.id} className="relative group">
                            {/* Glow under highlighted card */}
                            {item.isHighlighted && (
                                <div className="absolute -inset-1 bg-gradient-to-r from-[#0462C3] to-blue-400 rounded-[28px] blur-md opacity-20 lg:opacity-30 group-hover:opacity-60 transition duration-500"></div>
                            )}

                            <Link
                                to={item.path}
                                className={`relative flex flex-col h-full rounded-[20px] lg:rounded-[24px] p-6 lg:p-8 transition-all duration-500
                                    ${item.isHighlighted
                                        ? 'bg-white border-2 border-[#0462C3] shadow-[0_12px_32px_-12px_rgba(4,98,195,0.2)]'
                                        : 'bg-white/80 backdrop-blur-xl border border-white border-b-slate-200 border-r-slate-200 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.06)]'
                                    }`}
                            >
                                {/* Badge */}
                                {item.badge && (
                                    <div className="absolute -top-3.5 inset-x-0 flex justify-center">
                                        <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[9px] lg:text-[10px] uppercase tracking-[0.15em] font-black px-4 py-1.5 rounded-full shadow-lg border border-orange-400">
                                            {item.badge}
                                        </span>
                                    </div>
                                )}

                                <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl flex items-center justify-center mb-5 lg:mb-6 shadow-sm
                                    ${item.isHighlighted
                                        ? 'bg-gradient-to-br from-[#0462C3] to-blue-500'
                                        : 'bg-slate-50 border border-slate-100'
                                    }`}
                                >
                                    <div className={item.isHighlighted ? 'text-white' : 'text-[#0462C3]'}>
                                        {item.icon}
                                    </div>
                                </div>

                                <h3 className={`text-[22px] lg:text-2xl font-black mb-2 leading-tight ${item.isHighlighted ? 'text-[#0462C3]' : 'text-slate-800'}`}>
                                    {item.title}
                                </h3>

                                <p className="text-slate-500 text-[13.5px] lg:text-sm leading-relaxed font-medium mb-8 lg:mb-10 flex-grow pr-2">
                                    {item.description}
                                </p>

                                <div className="mt-auto">
                                    <div className={`w-full py-4 px-6 font-black rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-[12px] uppercase tracking-widest
                                        ${item.isHighlighted
                                            ? 'bg-gradient-to-r from-[#0462C3] to-blue-600 text-white shadow-[0_8px_20px_rgba(4,98,195,0.25)]'
                                            : 'bg-slate-50 text-slate-600 border border-slate-200'
                                        }`}
                                    >
                                        {item.buttonText}
                                        <ChevronRight className={`w-4 h-4 ${item.isHighlighted ? 'group-hover:translate-x-1.5' : ''} transition-transform`} />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* ─── Trust & Value Section ─── */}
                <div className="max-w-6xl mx-auto mb-14 lg:mb-20 bg-white/40 backdrop-blur-sm rounded-[32px] p-8 lg:p-12 border border-white/50 shadow-sm overflow-hidden">
                    <h4 className="text-center text-[10px] lg:text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-10">Why Use Counselify Predictors?</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0462C3] mb-4">
                                <Target size={20} />
                            </div>
                            <h5 className="font-bold text-slate-900 text-sm mb-1.5">Accurate Predictions</h5>
                            <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[200px]">Built purely on strict matching against official 2025 cutoff data.</p>
                        </div>
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
                                <Zap size={20} />
                            </div>
                            <h5 className="font-bold text-slate-900 text-sm mb-1.5">Instant Results</h5>
                            <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[200px]">Lightning-fast filtering engine delivers results in milliseconds.</p>
                        </div>
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-4">
                                <BarChart3 size={20} />
                            </div>
                            <h5 className="font-bold text-slate-900 text-sm mb-1.5">Smart Sorting</h5>
                            <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[200px]">Categorizes options into Dream, Safe, and Low Chance.</p>
                        </div>
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 mb-4">
                                <Clock size={20} />
                            </div>
                            <h5 className="font-bold text-slate-900 text-sm mb-1.5">Beginner Friendly</h5>
                            <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[200px]">No complex jargon. Perfect for first-time choice filling.</p>
                        </div>
                    </div>
                </div>

                {/* ─── Support CTA ─── */}
                <div className="max-w-4xl mx-auto px-2">
                    <div className="bg-gradient-to-br from-[#0462C3] to-[#034a94] rounded-[28px] lg:rounded-[40px] p-8 lg:p-14 text-center text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
                        <div className="relative z-10 w-full h-full flex flex-col items-center">
                            <div className="p-3 bg-white/10 rounded-2xl mb-6 backdrop-blur-sm border border-white/20">
                                <HelpCircle className="w-7 h-7 text-blue-100" />
                            </div>
                            <h3 className="text-[22px] lg:text-3xl font-black mb-3">Need Help Choosing?</h3>
                            <p className="text-blue-100/80 text-sm lg:text-lg mb-8 max-w-[280px] lg:max-w-xl mx-auto font-medium leading-relaxed">
                                Confused about JoSAA vs CSAB? Our team can help you understand the right path.
                            </p>
                            <Link
                                to="/advisor"
                                className="w-full lg:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#0462C3] py-4 px-10 rounded-2xl font-black text-[12px] uppercase tracking-widest active:scale-95 transition-all shadow-xl"
                            >
                                Speak to an Advisor
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CollegePredictorSelection;
