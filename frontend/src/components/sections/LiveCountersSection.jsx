import { useEffect, useRef, useState } from 'react';
import { Users, Cpu, Award, Trophy, Clock, Building } from 'lucide-react';

// Lightweight eased counter hook — no external dependencies
const useCounter = (target, duration = 2000, started = false) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!started) return;
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
        };
        requestAnimationFrame(step);
    }, [started, target, duration]);

    return count;
};

const CounterCard = ({ icon: Icon, target, suffix, label, sublabel, started }) => {
    const count = useCounter(target, 2000, started);

    return (
        <div className="flex-1 min-w-[280px] bg-white border border-blue-100/30 rounded-[24px] p-10 flex flex-col items-center text-center shadow-[0_4px_24px_-4px_rgba(4,98,195,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-8px_rgba(4,98,195,0.15)] cursor-default">
            {/* Icon */}
            <div className="w-12 h-12 rounded-[14px] bg-blue-50 flex items-center justify-center mb-5 text-[#0462C3]">
                <Icon size={22} strokeWidth={2} />
            </div>

            {/* Animated number */}
            <div className="font-extrabold text-5xl text-[#0462C3] leading-none tracking-tighter mb-2">
                {count.toLocaleString('en-IN')}{suffix}
            </div>

            {/* Label */}
            <div className="font-bold text-slate-800 mb-1 tracking-tight">
                {label}
            </div>

            {/* Sub-label */}
            <div className="text-[13px] font-medium text-slate-400 leading-relaxed max-w-[200px]">
                {sublabel}
            </div>
        </div>
    );
};

const UnifiedMobileCard = ({ icon: Icon, target, suffix, label, sublabel, started, isAnimated = true }) => {
    // If not animated, we just show the target. But here we mostly use it for 40K and 12K.
    const countValue = isAnimated ? useCounter(target, 2000, started) : target;
    const displayValue = isAnimated ? countValue.toLocaleString('en-IN') + suffix : target + suffix;

    return (
        <div className="relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 rounded-[28px] p-6 group transition-all duration-300">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#0462C3] opacity-0 group-hover:opacity-[0.15] blur-[40px] transition-opacity duration-700 pointer-events-none"></div>
            
            <div className="flex flex-row items-center justify-between relative z-10 gap-4">
                <div className="flex flex-col items-start flex-1 min-w-0">
                    <div className="text-[36px] font-extrabold text-white leading-none tracking-tighter mb-1.5 drop-shadow-[0_2px_10px_rgba(4,98,195,0.3)]">
                        {displayValue}
                    </div>
                    <div className="text-[14px] font-black text-blue-200/90 uppercase tracking-[0.15em] mb-1">
                        {label}
                    </div>
                    <div className="text-[11px] font-medium text-slate-400 leading-tight">
                        {sublabel}
                    </div>
                </div>

                <div className="w-12 h-12 bg-white/10 rounded-[14px] flex items-center justify-center text-blue-400 border border-white/5 shrink-0">
                    <Icon size={22} strokeWidth={2.5} />
                </div>
            </div>

            {/* Watermark Icon */}
            <div className="absolute -right-4 -bottom-4 opacity-[0.04] text-white pointer-events-none">
                <Icon size={120} strokeWidth={1} />
            </div>
        </div>
    );
};

const LiveCountersSection = () => {
    const sectionRef = useRef(null);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started) {
                    setStarted(true);
                }
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, [started]);

    const counters = [
        {
            icon: Users,
            target: 40000,
            suffix: '+',
            label: 'Students Guided',
            sublabel: 'Trusted by aspirants across India',
            isAnimated: true
        },
        {
            icon: Cpu,
            target: 12000,
            suffix: '+',
            label: 'Predictions Done',
            sublabel: 'AI-powered results delivered',
            isAnimated: true
        },
        {
            icon: Trophy,
            target: 98.4,
            suffix: '%',
            label: 'Analytical Accuracy',
            sublabel: 'Based on JoSAA / CSAB trends',
            isAnimated: false
        },
        {
            icon: Clock,
            target: 7,
            suffix: 'yr+',
            label: 'Trust Legacy',
            sublabel: 'Years of expertise & outcomes',
            isAnimated: false
        },
        {
            icon: Building,
            target: 50,
            suffix: '+',
            label: 'Institutional Mentors',
            sublabel: 'IIT / NIT mentor network',
            isAnimated: false
        }
    ];

    return (
        <section
            id="trust-authority"
            ref={sectionRef}
            className="py-12 lg:py-32 relative overflow-hidden transition-colors duration-700 bg-[#f8fafc] lg:bg-[#f8fafc]"
        >
            {/* Mobile Only Background Overrides */}
            <style jsx="true">{`
                @media (max-width: 1024px) {
                    #trust-authority {
                        background: radial-gradient(circle at top right, #001a35, #020817) !important;
                    }
                }
            `}</style>
            
            <div className="section-container relative z-10">
                {/* Mobile Section Header */}
                <div className="lg:hidden text-center mb-12 space-y-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#0462C3] bg-blue-500/10 px-4 py-1.5 rounded-full inline-block">Brand Authority</span>
                    <h2 className="text-[32px] font-black text-white leading-[1.1] tracking-tight">
                        Trusted by <span className="text-[#0462C3]">40,000+</span> <br/>
                        Aspirants Across India
                    </h2>
                    <p className="text-[13px] font-medium text-slate-400 max-w-[280px] mx-auto leading-relaxed">
                        Real results powered by high-accuracy data-driven counselling and expert mentoring.
                    </p>
                </div>

                {/* Desktop Micro Header */}
                <div className="hidden lg:flex flex-col items-center mb-20 text-center">
                    <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#0462C3] mb-4">Authority & Results</span>
                    <h2 className="text-[52px] md:text-[64px] font-extrabold text-slate-900 tracking-tighter leading-none italic serif-font">
                        Real Impact, <span className="text-[#0462C3]">Proven Trust</span>
                    </h2>
                </div>

                {/* Desktop Layout (Grid) */}
                <div className="hidden lg:grid grid-cols-2 gap-10 max-w-[900px] mx-auto">
                    {counters.slice(0, 2).map((c, i) => (
                        <CounterCard key={i} {...c} started={started} />
                    ))}
                </div>

                {/* Mobile Layout (Premium Vertical Stack) */}
                <div className="flex lg:hidden flex-col gap-4 w-full px-2">
                    {counters.map((c, i) => (
                        <UnifiedMobileCard key={i} {...c} started={started} />
                    ))}
                </div>

                {/* Mobile Floating Spacing Fix */}
                <div className="lg:hidden h-16 w-full"></div>
            </div>

            {/* Background Decorative Elements for Mobile */}
            <div className="lg:hidden absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-[10%] left-[-10%] w-[300px] h-[300px] bg-[#0462C3] rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[20%] right-[-10%] w-[250px] h-[250px] bg-blue-900 rounded-full blur-[100px]"></div>
            </div>
        </section>
    );
};

export default LiveCountersSection;
