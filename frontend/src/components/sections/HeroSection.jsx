import { motion } from 'framer-motion';
import { ArrowRight, Zap, Target, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section className="relative bg-transparent pt-32 pb-20 lg:pt-48 lg:pb-32 min-h-[90vh] flex items-center overflow-hidden">
            {/* Soft background accents */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-muted/20 -z-10 skew-x-[-12deg] translate-x-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-brand-blue/5 -z-10 rounded-full blur-[120px]"></div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10 text-left">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Content */}
                    <div className="w-full lg:w-3/5 flex flex-col items-start ">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-3 mb-8 group cursor-default"
                        >
                            <div className="h-px w-8 bg-brand-blue group-hover:w-12 transition-all duration-500"></div>
                            <span className="text-xs uppercase tracking-[0.4em] font-black text-brand-blue/60">Trusted JEE Counselling Platform</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-7xl lg:text-[95px] font-black leading-[0.95] mb-10 text-brand-dark tracking-tighter"
                        >
                            JEE Counselling <br />
                            <span className="italic font-medium serif-font text-brand-blue">Made Simple</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-slate-500/80 mb-14 max-w-lg leading-relaxed font-bold italic"
                        >
                            Get clear guidance on colleges, branches, and choice filling — based on your rank.<br /><br />
                            No confusion. No guesswork. Just smart decisions.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap items-center gap-6 w-full sm:w-auto"
                        >
                            <Link
                                to="/rank-predictor"
                                className="px-10 py-6 bg-brand-blue text-white font-black text-[12px] uppercase tracking-[0.3em] shadow-2xl shadow-blue-900/10 hover:bg-brand-dark transition-all transform hover:-translate-y-1 rounded-2xl flex items-center gap-4 group"
                            >
                                Check My College Options
                                <Target size={18} className="group-hover:rotate-45 transition-transform" />
                            </Link>
                            <Link
                                to="/advisor"
                                className="px-10 py-6 border-2 border-brand-muted text-brand-blue font-black text-[12px] uppercase tracking-[0.3em] bg-white/50 backdrop-blur-sm hover:bg-brand-muted transition-all flex items-center gap-4 rounded-2xl group"
                            >
                                Speak to a Counselling Advisor
                                <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-20 flex flex-wrap gap-12 opacity-40"
                        >
                            <div className="flex items-center gap-3">
                                <Sparkles size={16} className="text-brand-blue" />
                                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">2,000+ Success Stories</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <ShieldCheck size={16} className="text-brand-blue" />
                                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">IIT/NIT Mentor Verified</span>
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
                        <div className="relative z-10 p-5 bg-white shadow-[0_40px_100px_rgba(0,34,68,0.08)] border border-white rounded-[40px] overflow-hidden group">
                            <img
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470&auto=format&fit=crop"
                                alt="Counselling Intelligence"
                                className="w-full grayscale border-brand-muted/20 border group-hover:grayscale-0 transition-all duration-1000 rounded-[32px]"
                            />
                            <div className="absolute inset-0 bg-brand-blue/5 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>

                        {/* Floating Badges */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-8 -left-8 bg-brand-dark p-8 text-white shadow-2xl z-20 rounded-[32px] space-y-3"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-xl">🎓</span>
                                <span className="text-[13px] font-black uppercase tracking-widest text-white/90">40k+ Students Guided</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xl">📊</span>
                                <span className="text-[13px] font-black uppercase tracking-widest text-white/90">Data Based Predictions</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xl">📞</span>
                                <span className="text-[13px] font-black uppercase tracking-widest text-white/90">Personal Chat & Call Support</span>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;
