import { motion } from 'framer-motion';
import { ArrowRight, Zap, Target, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section className="relative bg-background pt-32 pb-20 lg:pt-44 lg:pb-32 min-h-[90vh] flex items-center overflow-hidden mesh-gradient-hero">
            {/* Soft background accents */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-fixed/20 -z-10 skew-x-[-12deg] translate-x-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-primary-container/5 -z-10 rounded-full blur-[120px]"></div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10 text-left">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Content */}
                    <div className="w-full lg:w-3/5 flex flex-col items-start ">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-3 mb-8 group cursor-default"
                        >
                            <div className="h-0.5 w-8 bg-gradient-brand group-hover:w-12 transition-all duration-500"></div>
                            <span className="text-xs uppercase tracking-[0.3em] font-bold text-primary-container/70">Trusted JEE Counselling Platform</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-6xl lg:text-[80px] font-extrabold leading-[0.95] mb-10 text-on-surface tracking-tight"
                        >
                            JEE Counselling <br />
                            <span className="italic font-medium serif-font text-gradient-brand">Made Simple</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-base md:text-lg text-on-surface-variant mb-14 max-w-lg leading-relaxed font-medium"
                        >
                            Get clear guidance on colleges, branches, and choice filling — based on your rank.<br /><br />
                            No confusion. No guesswork. Just smart decisions.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center sm:items-start gap-7 w-full sm:w-auto relative"
                        >
                            {/* Premium AI Predictor Button */}
                            <div className="flex flex-col items-center sm:items-start w-full sm:w-auto relative group">
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-6 bg-[#E6F0FF] text-[#0462C3] border border-blue-100 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest z-10 shadow-[0_2px_8px_rgba(4,98,195,0.15)] flex items-center gap-1.5 transition-all duration-300 group-hover:-translate-y-0.5">
                                    <Sparkles size={11} className="text-[#0462C3]" strokeWidth={2.5} />
                                    FREE AI TOOL
                                </div>
                                <Link
                                    to="/college-predictor"
                                    className="w-full sm:w-auto px-10 py-[22px] bg-gradient-to-r from-[#0462C3] to-blue-600 text-white font-extrabold text-[12px] uppercase tracking-[0.2em] shadow-[0_8px_24px_rgba(4,98,195,0.35)] transition-all duration-300 hover:scale-[1.03] hover:from-[#0351a0] hover:to-blue-700 hover:shadow-[0_12px_32px_rgba(4,98,195,0.45)] rounded-full flex items-center justify-center sm:justify-start gap-4 relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-out"></div>
                                    Predict My College With AI
                                    <Zap size={18} className="transition-transform group-hover:scale-110 group-hover:rotate-12" />
                                </Link>
                                <p className="mt-3.5 text-[11px] font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-2 px-1">
                                    <ShieldCheck size={14} className="text-[#0462C3] opacity-80" />
                                    Instant results based on real data
                                </p>
                            </div>

                            {/* Secondary Outline Button */}
                            <Link
                                to="/advisor"
                                className="w-full sm:w-auto mt-2 sm:mt-[21px] px-8 py-5 border border-slate-200/80 text-slate-500 font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800 transition-all duration-300 flex items-center justify-center sm:justify-start gap-3 rounded-full group"
                            >
                                Speak to an Advisor
                                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-20 flex flex-wrap gap-12 opacity-40"
                        >
                            <div className="flex items-center gap-3">
                                <Sparkles size={16} className="text-primary-container" />
                                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-on-surface-variant">2,000+ Success Stories</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <ShieldCheck size={16} className="text-primary-container" />
                                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-on-surface-variant">IIT/NIT Mentor Verified</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ delay: 0.4, type: "spring" }}
                        className="w-full lg:w-2/5 relative mt-12 lg:mt-0"
                    >
                        <div className="relative rounded-[48px] overflow-hidden border-8 border-white shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-700 group">
                            <img
                                src="/hero-counselify.jpg"
                                alt="Counselling Intelligence"
                                className="w-full h-[400px] object-cover"
                            />
                            <div className="absolute inset-0 bg-[#0462C3]/10 mix-blend-multiply transition-opacity hover:opacity-0 duration-700"></div>
                        </div>

                        {/* Floating Badges */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-6 -left-6 bg-primary p-6 text-on-primary editorial-shadow z-20 rounded-xl space-y-2.5"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-xl">🎓</span>
                                <span className="text-[12px] font-bold uppercase tracking-wider text-on-primary/90">40k+ Students Guided</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xl">📊</span>
                                <span className="text-[12px] font-bold uppercase tracking-wider text-on-primary/90">Data Based Predictions</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xl">📞</span>
                                <span className="text-[12px] font-bold uppercase tracking-wider text-on-primary/90">Personal Chat & Call Support</span>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;
