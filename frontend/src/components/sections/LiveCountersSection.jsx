import { useEffect, useRef, useState } from 'react';
import { Users, Cpu } from 'lucide-react';

// Lightweight eased counter hook — no external dependencies
const useCounter = (target, duration = 1800, started = false) => {
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

const CounterCard = ({ icon: Icon, target, suffix, label, sublabel, started, color }) => {
    const count = useCounter(target, 1800, started);

    return (
        <div style={{
            flex: '1 1 280px',
            background: '#ffffff',
            border: '1px solid rgba(4, 98, 195, 0.08)',
            borderRadius: '24px',
            padding: '2.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: '0 4px 24px -4px rgba(4, 98, 195, 0.08), 0 1px 4px rgba(0,0,0,0.04)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'default',
        }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 32px -4px rgba(4, 98, 195, 0.13), 0 2px 8px rgba(0,0,0,0.06)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 24px -4px rgba(4, 98, 195, 0.08), 0 1px 4px rgba(0,0,0,0.04)';
            }}
        >
            {/* Icon */}
            <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'rgba(4, 98, 195, 0.07)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                color: '#0462C3',
            }}>
                <Icon size={22} strokeWidth={2} />
            </div>

            {/* Animated number */}
            <div style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                lineHeight: 1,
                letterSpacing: '-0.03em',
                color: '#0462C3',
                marginBottom: '0.6rem',
            }}>
                {count.toLocaleString('en-IN')}{suffix}
            </div>

            {/* Label */}
            <div style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: '1rem',
                color: '#1e293b',
                marginBottom: '0.4rem',
                letterSpacing: '-0.01em',
            }}>
                {label}
            </div>

            {/* Sub-label */}
            <div style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 500,
                fontSize: '0.8125rem',
                color: '#64748b',
                lineHeight: 1.5,
                maxWidth: '200px',
            }}>
                {sublabel}
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
            { threshold: 0.3 }
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
        },
        {
            icon: Cpu,
            target: 12000,
            suffix: '+',
            label: 'Predictions Done',
            sublabel: 'AI-powered college predictions delivered',
        },
    ];

    return (
        <section
            ref={sectionRef}
            style={{
                padding: '4rem 0 3.5rem',
                background: '#f8fafc',
                borderBottom: '1px solid rgba(4, 98, 195, 0.07)',
            }}
        >
            <div className="section-container">
                {/* Micro heading */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '2.5rem',
                }}>
                    <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: '10px',
                        fontWeight: 800,
                        letterSpacing: '0.25em',
                        textTransform: 'uppercase',
                        color: '#0462C3',
                    }}>
                        <span style={{
                            display: 'inline-block',
                            width: '24px',
                            height: '2px',
                            background: '#0462C3',
                            borderRadius: '2px',
                        }} />
                        Trusted by Students
                        <span style={{
                            display: 'inline-block',
                            width: '24px',
                            height: '2px',
                            background: '#0462C3',
                            borderRadius: '2px',
                        }} />
                    </span>
                </div>

                {/* Counter cards */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1.5rem',
                    justifyContent: 'center',
                    maxWidth: '760px',
                    margin: '0 auto',
                }}>
                    {counters.map((c, i) => (
                        <CounterCard key={i} {...c} started={started} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LiveCountersSection;
