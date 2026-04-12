import { Calculator, Zap, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorksSection = () => {
    // Desktop uses original full desc; mobile uses shortDesc
    const steps = [
        {
            Icon: Calculator,
            subtitle: "Data-backed evaluation",
            title: "Rank & Profile Analysis",
            shortDesc: "We analyse your JEE rank, category, state quota, and preferences against real JoSAA & CSAB cutoff trends.",
            desc: "We carefully analyse your JEE rank, category, state quota, gender quota, and preferences.\n\nOur system compares your profile with previous year JoSAA and CSAB cutoff trends to understand realistic admission chances.\n\nWe do not give random suggestions — only practical and achievable options."
        },
        {
            Icon: Zap,
            subtitle: "Cutoff trend prediction",
            title: "Smart College Prediction",
            shortDesc: "We generate safe, moderate & dream college options using historical data so you fill choices in the right order.",
            desc: "Using previous year data and trend patterns, we generate a list of safe, moderate, and dream college options.\n\nYou will get:\n• Safe colleges (high probability)\n• Moderate options (balanced risk)\n• Dream options (high reward)\n\nThis helps you fill choices in the correct order without risking your seat."
        },
        {
            Icon: Trophy,
            subtitle: "Strategic guidance",
            title: "Choice Filling & Final Support",
            shortDesc: "We guide you through JoSAA & CSAB rounds — Freeze, Float, Slide — and stay with you until your seat is secured.",
            desc: "We guide you in proper choice filling order for JoSAA and CSAB rounds.\n\nOur team helps you:\n• Avoid common mistakes\n• Understand Freeze, Float, Slide options\n• Plan backup strategy\n• Stay prepared till final allotment\n\nWe stay with you until your seat is secured."
        }
    ];

    return (
        <section id="how-it-works" className="py-12 lg:py-32 bg-background relative">
            <div className="section-container">

                {/* Section Header */}
                <div className="text-center mb-20 space-y-4">
                    <span className="text-xs font-bold uppercase tracking-[0.4em] text-primary-container/70">The Methodology</span>
                    <h2 className="text-[52px] leading-[1] sm:text-[64px] md:text-[88px] font-bold text-on-surface md:leading-[0.9] tracking-tighter">
                        How Our <span className="serif-font italic font-medium text-primary-container">Counselling</span> <br className="md:hidden" />
                        <span className="serif-font italic font-medium text-primary-container">Process Works</span>
                    </h2>
                </div>

                {/* Desktop Grid (unchanged) */}
                <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-20 relative">
                    <div className="hidden lg:block absolute top-[2.5rem] left-[15%] right-[15%] h-px bg-primary-fixed -z-10"></div>
                    {steps.map((step, idx) => (
                        <div key={`desktop-${idx}`} className="relative bg-white border border-outline/10 editorial-shadow rounded-3xl p-8 lg:p-10 text-left flex flex-col gap-6 group hover:-translate-y-2 transition-transform duration-300 h-full">
                            <div className="flex justify-between items-start mb-2">
                                <div className="w-16 h-16 bg-primary-fixed/20 text-[#0462C3] rounded-2xl flex items-center justify-center group-hover:bg-[#0462C3] group-hover:text-white transition-colors duration-300">
                                    <step.Icon size={32} />
                                </div>
                                <div className="bg-[#0462C3] text-white text-[13px] font-bold italic serif-font px-5 py-2 rounded-full shadow-sm group-hover:scale-105 transition-transform duration-300">
                                    Step 0{idx + 1}
                                </div>
                            </div>
                            <div className="mt-2 flex-grow flex flex-col">
                                <span className="text-[11px] font-bold text-[#0462C3] uppercase tracking-widest bg-[#0462C3]/10 px-4 py-1.5 rounded-full inline-block self-start mb-5">
                                    {step.subtitle}
                                </span>
                                <h4 className="text-2xl font-bold text-on-surface tracking-tight mb-4 leading-tight group-hover:text-[#0462C3] transition-colors duration-300">
                                    {step.title}
                                </h4>
                                <p className="text-[15px] font-medium text-slate-500 leading-relaxed whitespace-pre-line mt-auto">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile: Premium Numbered Step Cards with Flow Connector */}
                <div className="flex flex-col md:hidden">
                    {steps.map((step, idx) => (
                        <div key={`mobile-${idx}`} className="relative flex flex-row gap-0">

                            {/* Left Column: Number bubble + vertical connector */}
                            <div className="flex flex-col items-center mr-4 shrink-0 pt-1">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-[15px] shrink-0 shadow-[0_4px_16px_rgba(4,98,195,0.3)] z-10"
                                    style={{ background: 'linear-gradient(135deg,#0462C3,#004a98)' }}
                                >
                                    {String(idx + 1).padStart(2, '0')}
                                </div>
                                {idx < steps.length - 1 && (
                                    <div
                                        className="w-px flex-1 my-2"
                                        style={{ background: 'linear-gradient(to bottom, rgba(4,98,195,0.35), transparent)', minHeight: '48px' }}
                                    ></div>
                                )}
                            </div>

                            {/* Right Column: Card */}
                            <div className="flex-1 bg-white border border-slate-100 rounded-[20px] p-5 shadow-[0_4px_20px_rgba(4,98,195,0.06)] mb-5 relative overflow-hidden">
                                {/* Icon — top right */}
                                <div className="absolute top-4 right-4 w-10 h-10 bg-[#eef5fc] rounded-[12px] flex items-center justify-center text-[#0462C3] border border-blue-100/50">
                                    <step.Icon size={18} strokeWidth={2} />
                                </div>

                                {/* Subtitle badge */}
                                <span className="text-[9px] font-black text-[#0462C3] uppercase tracking-[0.2em] bg-blue-50 px-2.5 py-1 rounded-full inline-block mb-3">
                                    {step.subtitle}
                                </span>

                                {/* Title */}
                                <h4 className="text-[17px] font-extrabold text-slate-900 tracking-tight leading-tight mb-2 pr-12">
                                    {step.title}
                                </h4>

                                {/* Short description */}
                                <p className="text-[13px] font-medium text-slate-500 leading-relaxed">
                                    {step.shortDesc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="mt-16 md:mt-28 flex justify-center relative group">
                    <div className="flex flex-col items-center">
                        <Link
                            to="/college-predictor"
                            className="px-10 py-[22px] bg-gradient-to-r from-[#0462C3] to-blue-600 text-white font-extrabold text-[12px] uppercase tracking-[0.2em] shadow-[0_8px_24px_rgba(4,98,195,0.35)] transition-all duration-300 hover:scale-[1.03] hover:from-[#0351a0] hover:to-blue-700 hover:shadow-[0_12px_32px_rgba(4,98,195,0.45)] rounded-full flex items-center justify-center gap-4 cursor-pointer relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-out"></div>
                            Predict My College With AI
                            <Zap size={18} className="transition-transform group-hover:scale-110 group-hover:rotate-12" />
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HowItWorksSection;
