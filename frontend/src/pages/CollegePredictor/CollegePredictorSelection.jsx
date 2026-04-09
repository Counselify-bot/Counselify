import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Target, Search, Building2, ChevronRight, HelpCircle, Zap, CheckCircle2, BarChart3, Clock, Sparkles } from 'lucide-react';

const CollegePredictorSelection = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const predictors = [
        {
            id: 'jac',
            title: "JAC Delhi Predictor",
            description: "Check admission chances for DTU, NSUT, IGDTUW and IIIT Delhi using your exact rank.",
            icon: <Building2 className="w-8 h-8 text-[#0462C3]" />,
            path: "/college-predictor/jac-delhi",
            buttonText: "Start Prediction",
            badge: null
        },
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
            id: 'csab',
            title: "CSAB Predictor",
            description: "Explore backup and upgraded college options in CSAB special rounds using your rank.",
            icon: <Search className="w-8 h-8 text-[#0462C3]" />,
            path: "/college-predictor/csab",
            buttonText: "Start Prediction",
            badge: null
        }
    ];

    return (
        <div className="pt-24 md:pt-32 pb-32 mesh-gradient-hero min-h-screen relative overflow-hidden">
            {/* Subtle radial glow in background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-blue-400/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* ─── Hero Section ─── */}
                <div className="text-center max-w-4xl mx-auto mb-16 mt-4">
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                        <span className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full bg-blue-50/80 backdrop-blur-sm text-[#0462C3] text-[11px] uppercase tracking-widest font-extrabold border border-blue-100/50 shadow-sm">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Accurate & Updated
                        </span>
                        <span className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full bg-emerald-50/80 backdrop-blur-sm text-emerald-700 text-[11px] uppercase tracking-widest font-extrabold border border-emerald-100/50 shadow-sm">
                            <Sparkles className="w-3.5 h-3.5" /> Based on 2025 Cutoff Data
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]">
                        Find Your Perfect College in <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-[#0462C3] to-[#208ef7] text-transparent bg-clip-text relative inline-block">
                            Seconds
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-200" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                            </svg>
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium max-w-2xl mx-auto">
                        AI-powered predictors for JoSAA, CSAB, and JAC Delhi — designed to give you realistic options based on past official cutoffs.
                    </p>
                </div>

                {/* ─── Prediction Cards ─── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20 max-w-6xl mx-auto relative">
                    {predictors.map((item, index) => (
                        <div key={item.id} className="relative group">
                            {/* Glow under highlighted card */}
                            {item.isHighlighted && (
                                <div className="absolute -inset-1 bg-gradient-to-r from-[#0462C3] to-blue-400 rounded-3xl blur-md opacity-30 group-hover:opacity-60 transition duration-500"></div>
                            )}

                            <Link
                                to={item.path}
                                className={`relative flex flex-col h-full rounded-[24px] p-8 transition-all duration-500 hover:-translate-y-2
                                    ${item.isHighlighted
                                        ? 'bg-white border-2 border-[#0462C3] shadow-[0_20px_40px_-12px_rgba(4,98,195,0.25)]'
                                        : 'bg-white/80 backdrop-blur-xl border border-white border-b-slate-200 border-r-slate-200 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_-12px_rgba(4,98,195,0.15)] hover:border-[#0462C3]/30'
                                    }`}
                            >
                                {/* Badge */}
                                {item.badge && (
                                    <div className="absolute -top-3.5 inset-x-0 flex justify-center">
                                        <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] uppercase tracking-widest font-extrabold px-4 py-1.5 rounded-full shadow-lg border border-orange-400 border-t-orange-300">
                                            {item.badge}
                                        </span>
                                    </div>
                                )}

                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110
                                    ${item.isHighlighted
                                        ? 'bg-gradient-to-br from-[#0462C3] to-blue-500 border border-blue-400'
                                        : 'bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200'
                                    }`}
                                >
                                    {item.icon}
                                </div>

                                <h3 className={`text-2xl font-extrabold mb-3 leading-tight ${item.isHighlighted ? 'text-[#0462C3]' : 'text-slate-900 group-hover:text-[#0462C3]'} transition-colors`}>
                                    {item.title}
                                </h3>

                                <p className="text-slate-500 text-sm leading-relaxed font-medium mb-10 flex-grow">
                                    {item.description}
                                </p>

                                <div className="mt-auto">
                                    <button className={`w-full py-4 px-6 font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm uppercase tracking-wider
                                        ${item.isHighlighted
                                            ? 'bg-gradient-to-r from-[#0462C3] to-blue-600 text-white shadow-md hover:shadow-xl hover:shadow-blue-500/20'
                                            : 'bg-slate-50 text-slate-700 border border-slate-200 group-hover:bg-[#0462C3] group-hover:text-white group-hover:border-[#0462C3]'
                                        }`}
                                    >
                                        {item.buttonText}
                                        <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${item.isHighlighted ? 'group-hover:translate-x-2' : 'group-hover:translate-x-1.5'}`} />
                                    </button>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* ─── Trust & Value Section ─── */}
                <div className="max-w-6xl mx-auto mb-20 bg-white/60 backdrop-blur-md rounded-[32px] p-8 md:p-12 border border-white border-b-slate-200 shadow-sm">
                    <h4 className="text-center text-sm font-extrabold text-slate-400 uppercase tracking-widest mb-10">Why Use Counselify Predictors?</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 bg-yellow lg:grid-cols-4 gap-8">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#0462C3] mb-4">
                                <Target className="w-6 h-6" />
                            </div>
                            <h5 className="font-bold text-slate-900 mb-1">Accurate Predictions</h5>
                            <p className="text-xs text-slate-500 font-medium">Built purely on strict matching against official 2025 cutoff data.</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h5 className="font-bold text-slate-900 mb-1">Instant Results</h5>
                            <p className="text-xs text-slate-500 font-medium">Lightning-fast filtering engine delivers complete results in milliseconds.</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-4">
                                <BarChart3 className="w-6 h-6" />
                            </div>
                            <h5 className="font-bold text-slate-900 mb-1">Smart Sorting</h5>
                            <p className="text-xs text-slate-500 font-medium">Categorizes options intelligently into Dream, Safe, and Low Chance.</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 mb-4">
                                <Clock className="w-6 h-6" />
                            </div>
                            <h5 className="font-bold text-slate-900 mb-1">Beginner Friendly</h5>
                            <p className="text-xs text-slate-500 font-medium">No complex jargon. Perfect for students doing their first choice filling.</p>
                        </div>
                    </div>
                </div>

                {/* ─── Support CTA ─── */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-[#0462C3] to-[#034a94] rounded-[32px] p-10 md:p-14 text-center text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
                        <div className="relative z-10 w-full h-full flex flex-col items-center">
                            <div className="p-3 bg-white/10 rounded-2xl mb-6 backdrop-blur-sm border border-white/20">
                                <HelpCircle className="w-8 h-8 text-blue-100" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-extrabold mb-4">Need Help Choosing the Right Path?</h3>
                            <p className="text-blue-100 text-base md:text-lg mb-8 max-w-xl mx-auto font-medium">
                                Confused about JoSAA vs CSAB? Our team can help you understand which counselling process matches your goals.
                            </p>
                            <Link
                                to="/advisor"
                                className="inline-flex items-center gap-2 bg-white text-[#0462C3] py-4 px-8 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-blue-50 hover:scale-105 hover:shadow-xl transition-all duration-300"
                            >
                                Talk to a Counselling Advisor
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CollegePredictorSelection;
