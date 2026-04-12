import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const StickyCTA = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(false);

    // Hidden on college-predictor pages
    const hiddenPaths = ['/college-predictor'];
    const isHidden = hiddenPaths.some(p => location.pathname.startsWith(p));

    useEffect(() => {
        // Delay entrance for smooth load feel
        const timer = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(timer);
    }, []);

    // Check bounds and scrolling logic
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        const handleScroll = () => {
            // Hide if we've scrolled down really far (near footer)
            const scrollPos = window.scrollY + window.innerHeight;
            const threshold = document.documentElement.scrollHeight - 180; 
            setIsAtBottom(scrollPos > threshold);
            
            // Collapse if expanded and scrolling
            if (isMobile && isExpanded) {
                setIsExpanded(false);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isMobile, isExpanded]);

    if (isHidden) return null;

    const handleClick = () => {
        if (isMobile && !isExpanded) {
            setIsExpanded(true);
        } else {
            navigate('/college-predictor');
        }
    };

    // Calculate dynamic styles
    const shouldHide = !visible || isAtBottom;

    return (
        <button
            onClick={handleClick}
            aria-label="Predict My College"
            className="sticky-cta-btn"
            style={{
                /* ── Core positioning ──────────────────────────── */
                position: 'fixed',
                bottom: '2.25rem',
                right: '6.5rem',
                zIndex: 9990,

                /* ── Visual ───────────────────────────────────── */
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                whiteSpace: 'nowrap',
                color: '#fff',
                background: 'linear-gradient(135deg, #0462C3 0%, #0050a0 100%)',
                boxShadow: '0 8px 28px -4px rgba(4, 98, 195, 0.4), 0 2px 8px rgba(0,0,0,0.08)',
                
                // Magic transition for expanding/collapsing and entering/exiting
                transition: 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',

                /* ── Animation ────────────────────────────────── */
                opacity: shouldHide ? 0 : 1,
                transform: shouldHide ? 'translateY(20px) scale(0.95)' : 'translateY(0) scale(1)',
                pointerEvents: shouldHide ? 'none' : 'auto',

                /* ── Dynamic Sizing ─────────────────────────── */
                // On mobile, if not expanded, it collapses into a perfect circle width
                // padding left/right is driven by whether there is text
                width: (isMobile && !isExpanded) ? '50px' : 'auto',
                padding: (isMobile && !isExpanded) ? '0' : '12px 24px',
                gap: (isMobile && !isExpanded) ? '0' : '8px',
                
                // Fallbacks so css resets don't override unexpectedly
                borderRadius: '60px',
                fontSize: '12px',
            }}
            onMouseEnter={e => {
                if (isMobile) return;
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 12px 36px -4px rgba(4, 98, 195, 0.5), 0 4px 12px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={e => {
                if (isMobile) return;
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 28px -4px rgba(4, 98, 195, 0.4), 0 2px 8px rgba(0,0,0,0.08)';
            }}
            onMouseDown={e => {
                e.currentTarget.style.transform = 'scale(0.95)';
            }}
            onMouseUp={e => {
                if (isMobile) {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                } else {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                }
            }}
        >
            <Sparkles size={isMobile ? 22 : 15} strokeWidth={2.5} />
            <span style={{ 
                opacity: (isMobile && !isExpanded) ? 0 : 1, 
                maxWidth: (isMobile && !isExpanded) ? 0 : '200px',
                overflow: 'hidden',
                display: 'inline-block',
                transition: 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)'
             }}>
                Predict My College
            </span>
        </button>
    );
};

export default StickyCTA;
