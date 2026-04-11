import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const StickyCTA = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

    // Hidden on college-predictor pages
    const hiddenPaths = ['/college-predictor'];
    const isHidden = hiddenPaths.some(p => location.pathname.startsWith(p));

    useEffect(() => {
        // Delay entrance for smooth load feel
        const timer = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(timer);
    }, []);

    if (isHidden) return null;

    return (
        <button
            onClick={() => navigate('/college-predictor')}
            aria-label="Predict My College"
            className="sticky-cta-btn"
            style={{
                /* ── Core positioning ──────────────────────────── */
                position: 'fixed',
                zIndex: 9990,

                /* ── Visual ───────────────────────────────────── */
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                whiteSpace: 'nowrap',
                color: '#fff',
                background: 'linear-gradient(135deg, #0462C3 0%, #0050a0 100%)',
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',

                /* ── Animation ────────────────────────────────── */
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',

                /* ── Desktop defaults ─────────────────────────── */
                bottom: '2.25rem',
                right: '6.5rem',  /* offset left of chatbot (60px icon + 2.25rem gap + spacing) */
                padding: '12px 24px',
                borderRadius: '60px',
                fontSize: '12px',
                boxShadow: '0 8px 28px -4px rgba(4, 98, 195, 0.4), 0 2px 8px rgba(0,0,0,0.08)',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 12px 36px -4px rgba(4, 98, 195, 0.5), 0 4px 12px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 28px -4px rgba(4, 98, 195, 0.4), 0 2px 8px rgba(0,0,0,0.08)';
            }}
            onMouseDown={e => {
                e.currentTarget.style.transform = 'scale(0.97)';
            }}
            onMouseUp={e => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
            }}
        >
            <Sparkles size={15} strokeWidth={2.5} />
            Predict My College
        </button>
    );
};

export default StickyCTA;
