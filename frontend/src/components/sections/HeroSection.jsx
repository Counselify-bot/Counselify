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
                            className="flex flex-wrap items-center gap-6 w-full sm:w-auto"
                        >
                            <Link
                                to="/rank-predictor"
                                className="px-10 py-5 bg-gradient-brand text-on-primary font-bold text-[12px] uppercase tracking-[0.2em] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl flex items-center gap-4 group"
                            >
                                Check My College Options
                                <Target size={18} className="group-hover:rotate-45 transition-transform" />
                            </Link>
                            <Link
                                to="/advisor"
                                className="px-10 py-5 border-2 border-outline-variant/30 text-primary font-bold text-[12px] uppercase tracking-[0.2em] bg-white hover:bg-primary-fixed/20 transition-all flex items-center gap-4 rounded-xl group"
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
                        <div className="glass-panel p-4 rounded-2xl overflow-hidden group editorial-shadow border border-outline-variant/20 relative z-10">
                            <img
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470&auto=format&fit=crop"
                                alt="Counselling Intelligence"
                                className="w-full grayscale group-hover:grayscale-0 transition-all duration-1000 rounded-xl"
                            />
                            <div className="absolute inset-0 bg-primary-container/5 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
