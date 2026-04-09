import { Calculator, Zap, Trophy, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorksSection = () => {
    const steps = [
        {
            icon: <Calculator size={32} />,
            subtitle: "Data-backed rank evaluation",
            title: "Rank & Profile Analysis",
            desc: "We carefully analyse your JEE rank, category, state quota, gender quota, and preferences.\n\nOur system compares your profile with previous year JoSAA and CSAB cutoff trends to understand realistic admission chances.\n\nWe do not give random suggestions — only practical and achievable options."
        },
        {
            icon: <Zap size={32} />,
            subtitle: "Cutoff trend based prediction",
            title: "Smart College Prediction",
            desc: "Using previous year data and trend patterns, we generate a list of safe, moderate, and dream college options.\n\nYou will get:\n• Safe colleges (high probability)\n• Moderate options (balanced risk)\n• Dream options (high reward)\n\nThis helps you fill choices in the correct order without risking your seat."
        },
        {
            icon: <Trophy size={32} />,
            subtitle: "Strategic choice filling guidance",
            title: "Choice Filling & Final Support",
            desc: "We guide you in proper choice filling order for JoSAA and CSAB rounds.\n\nOur team helps you:\n• Avoid common mistakes\n• Understand Freeze, Float, Slide options\n• Plan backup strategy\n• Stay prepared till final allotment\n\nWe stay with you until your seat is secured."
        }
    ];

    return (
        <section id="how-it-works" className="py-32 bg-background relative">
            <div className="section-container">
                <div className="text-center mb-24 space-y-6">
                    <span className="text-xs font-bold uppercase tracking-[0.4em] text-primary-container/70">The Methodology</span>
                    <h2 className="text-5xl md:text-8xl font-bold text-on-surface leading-[0.9] tracking-tighter">
                        How Our <span className="serif-font italic font-medium text-primary-container">Counselling Process Works</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 relative">
                    {/* Decorative lines (Desktop Only) */}
                    <div className="hidden lg:block absolute top-[2.5rem] left-[15%] right-[15%] h-px bg-primary-fixed -z-10"></div>

                    {stepDetails(steps[0], "1")}
                    {stepDetails(steps[1], "2")}
                    {stepDetails(steps[2], "3")}
                </div>

                <div className="mt-28 flex justify-center relative group">
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

const stepDetails = (step, number) => (
    <div className="flex flex-col items-center text-center group cursor-default">
        <div className="relative mb-12">
            <div className="w-24 h-24 bg-white editorial-shadow rounded-2xl flex items-center justify-center p-3 text-primary-container group-hover:bg-[#0462C3] group-hover:text-white transition-all transform group-hover:-rotate-6 border border-transparent relative z-10">
                {step.icon}
            </div>
            <div className="absolute -top-3 -right-3 w-10 h-10 bg-primary text-white rounded-2xl flex items-center justify-center font-bold italic serif-font text-lg z-20 shadow-xl group-hover:scale-110 transition-transform">
                {number}
            </div>
        </div>
        <div className="mb-2 space-y-1">
            <span className="text-[10px] font-bold text-primary-container uppercase tracking-widest bg-primary-container/10 px-3 py-1 rounded-full">{step.subtitle}</span>
            <h4 className="text-2xl font-bold text-on-surface tracking-tighter mt-2">{step.title}</h4>
        </div>
        <p className="text-[13px] font-medium text-on-surface-variant leading-relaxed max-w-[280px] whitespace-pre-line text-left">
            {step.desc}
        </p>
    </div>
);

export default HowItWorksSection;
