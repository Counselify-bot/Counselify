import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, ChevronDown, GraduationCap, Building2, Cpu, Globe, Clock, ArrowRight, Sparkles } from 'lucide-react';
import logo from '../assets/logo.svg';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showGftiModal, setShowGftiModal] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.classList.add('mobile-menu-active');
        } else {
            document.body.classList.remove('mobile-menu-active');
        }
        return () => document.body.classList.remove('mobile-menu-active');
    }, [isMobileMenuOpen]);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };



    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'College Predictor', path: '/college-predictor', isPredictor: true },
        { name: 'Percentile to Rank', path: '/percentile-to-rank' },
        { 
            name: 'Colleges', 
            path: '#', 
            submenu: [
                { name: 'IIT', path: '/colleges/iit', icon: GraduationCap, subtitle: 'Premier Institutes' },
                { name: 'NIT', path: '/colleges/nit', icon: Building2, subtitle: 'Top Government Colleges' },
                { name: 'IIIT', path: '/colleges/iiit', icon: Cpu, subtitle: 'Tech-focused Institutes' },
                { name: 'GFTI', path: '#', icon: Globe, subtitle: 'Government Funded Colleges', isUpcoming: true },
            ] 
        },
        { name: 'Services', path: '/services' },
        { name: 'Resources', path: '/resources' },
        { name: 'News', path: '/news', isLive: true }
    ];

    return (
        <nav className="fixed w-full z-50 transition-all duration-500 bg-white border-b border-outline-variant/20 shadow-soft">
            <div className="section-container flex justify-between items-center h-20">
                {/* Logo */}
                <div className="flex items-center gap-6">
                    <Link to="/" className="flex items-center group relative z-10">
                        <img
                            src={logo}
                            alt="Counselify Logo"
                            className="h-20 w-auto object-contain"
                        />
                    </Link>
                </div>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center ml-auto mr-12 space-x-6 text-[14px] font-semibold text-on-surface">
                    {navLinks.map((link) => (
                        link.submenu ? (
                            <div key={link.name} className="relative group py-4">
                                <button className="flex items-center gap-1 transition-all hover:text-primary-container cursor-default">
                                    {link.name}
                                    <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                                </button>
                                <div className="absolute top-full -left-8 mt-0 w-[300px] bg-white border border-outline-variant/10 shadow-[0_12px_40px_rgba(0,0,0,0.06)] rounded-2xl p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100">
                                    {link.submenu.map((sub) => {
                                        const Icon = sub.icon;
                                        return (
                                        <Link
                                            key={sub.name}
                                            to={sub.path}
                                            onClick={(e) => {
                                                if (sub.isUpcoming) {
                                                    e.preventDefault();
                                                    setShowGftiModal(true);
                                                }
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="group/item flex items-center justify-between p-3 rounded-xl hover:bg-[#F3F8FF] transition-all duration-300 relative overflow-hidden"
                                        >
                                            {/* Left side: Icon + Text */}
                                            <div className="flex items-start gap-3">
                                                <div className="mt-1 p-2 bg-[#F3F8FF] text-[#0462C3] rounded-[10px] group-hover/item:bg-white group-hover/item:shadow-sm transition-all duration-300">
                                                    <Icon size={18} strokeWidth={2} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[14px] font-bold text-slate-800 group-hover/item:text-[#0462C3] transition-colors">{sub.name}</span>
                                                    <span className="text-[11px] font-medium text-slate-500 mt-0.5">{sub.subtitle}</span>
                                                </div>
                                            </div>
                                            
                                            {/* Right side: Arrow */}
                                            <ArrowRight size={14} className="text-[#0462C3] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300" />
                                        </Link>
                                    )})}
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`relative group flex items-center transition-all hover:text-primary-container ${location.pathname === link.path ? 'text-primary-container' : ''}`}
                            >
                                <span className={`${link.isPredictor ? 'font-extrabold text-[#0462C3] group-hover:text-blue-800 tracking-tight' : ''}`}>{link.name}</span>
                                {link.isPredictor && (
                                    <span className="ml-2 px-2 py-[2px] text-[10px] font-black bg-[#E6F0FF] text-[#0462C3] rounded-full uppercase tracking-widest border border-blue-100 group-hover:bg-blue-100 transition-colors">
                                        Free AI Tool
                                    </span>
                                )}
                                {link.isLive && (
                                    <span className="ml-2 px-2 py-[1px] text-[9px] font-black bg-[#E6F0FF] text-[#0462C3] rounded-full uppercase tracking-widest shadow-[0_2px_8px_rgba(4,98,195,0.15)] flex items-center gap-1.5 transition-transform hover:scale-105 border border-blue-100 group-hover:bg-blue-100">
                                        <span className="relative flex h-1.5 w-1.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0462C3] opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0462C3]"></span>
                                        </span>
                                        LIVE
                                    </span>
                                )}
                            </Link>
                        )
                    ))}
                </div>

                {/* Desktop Auth & CTAs */}
                <div className="hidden lg:flex items-center gap-4">


                    {user ? (
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-on-surface bg-surface-container-low px-4 py-2.5 rounded-full">
                                Hi, {user.name?.split(' ')[0]}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="p-3 bg-error-container text-error hover:bg-error/10 rounded-full transition-all"
                                title="Logout"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="px-6 py-2.5 bg-gradient-brand text-on-primary text-sm font-bold uppercase tracking-wider rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden p-2 z-50 cursor-pointer text-[#006B44]"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <X size={28} />
                    ) : (
                        <Menu size={28} className="text-on-surface" />
                    )}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 w-full h-[100dvh] bg-[#F8FAFC] z-[100] flex flex-col animate-in fade-in slide-in-from-top duration-300 overflow-y-auto pb-10">
                    
                    {/* Header Section */}
                    <div className="flex justify-between items-center px-6 py-6 border-b border-blue-900/5 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative z-10">
                        <div className="flex items-center gap-3">
                            <img src={logo} alt="Counselify Logo" className="h-8 w-auto object-contain" />
                            <div className="flex flex-col">
                                <span className="font-extrabold text-slate-800 text-lg leading-none">Counselify</span>
                                <span className="text-[9px] uppercase tracking-widest text-[#0462C3] font-bold mt-1">Counselling Simplified</span>
                            </div>
                        </div>
                        <button 
                            className="p-2.5 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <X size={20} strokeWidth={2.5} />
                        </button>
                    </div>

                    {/* Content Scroll Area */}
                    <div className="px-6 py-8 flex flex-col gap-10">
                        {/* Highlights (AI Predictor CTA) */}
                        <div className="group cursor-pointer">
                            <Link to="/college-predictor" onClick={() => setIsMobileMenuOpen(false)} className="w-full bg-white border border-blue-100 shadow-[0_8px_20px_rgba(4,98,195,0.08)] rounded-[20px] p-5 flex items-center justify-between transition-transform active:scale-[0.98]">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-50 text-[#0462C3] rounded-2xl flex items-center justify-center">
                                        <Sparkles size={20} />
                                    </div>
                                    <div className="flex flex-col items-start gap-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#0462C3] bg-blue-50 px-2 py-0.5 rounded-full">Free AI Tool</span>
                                        <span className="font-extrabold text-slate-800 text-lg">Predict My College</span>
                                    </div>
                                </div>
                                <ArrowRight size={18} className="text-[#0462C3]" />
                            </Link>
                        </div>

                        {/* SECTION 1: MAIN */}
                        <div className="flex flex-col gap-4">
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-2">Main Menu</span>
                            <div className="flex flex-col gap-1 bg-white rounded-[24px] p-2 shadow-[0_4px_12px_rgba(0,0,0,0.02)] border border-slate-100">
                                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-4 font-bold text-slate-700 active:bg-slate-50 transition-colors rounded-xl mx-1 text-base">Home</Link>
                                <div className="h-px w-full bg-slate-50"></div>
                                <Link to="/percentile-to-rank" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-4 font-bold text-slate-700 active:bg-slate-50 transition-colors rounded-xl mx-1 text-base">Percentile to Rank</Link>
                            </div>
                        </div>

                        {/* SECTION 2: COLLEGES */}
                        <div className="flex flex-col gap-4">
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-2">Colleges</span>
                            <div className="grid grid-cols-1 gap-3">
                                {navLinks.find(l => l.name === 'Colleges')?.submenu?.map(sub => {
                                    const Icon = sub.icon;
                                    return (
                                        <Link 
                                            key={sub.name} 
                                            to={sub.path} 
                                            onClick={(e) => {
                                                if (sub.isUpcoming) { e.preventDefault(); setShowGftiModal(true); }
                                                else { setIsMobileMenuOpen(false); }
                                            }}
                                            className="bg-white border border-slate-100 rounded-[24px] p-4 flex items-center gap-4 transition-transform active:scale-[0.98] shadow-[0_4px_12px_rgba(0,0,0,0.02)]"
                                        >
                                            <div className="p-3 bg-slate-50 text-[#0462C3] rounded-[16px]">
                                                <Icon size={20} />
                                            </div>
                                            <div className="flex flex-col flex-1">
                                                <span className="font-bold text-slate-800 text-[15px]">{sub.name}</span>
                                                <span className="text-[11px] font-medium text-slate-500 mt-0.5">{sub.subtitle}</span>
                                            </div>
                                            <ChevronDown size={16} className="-rotate-90 text-slate-300" />
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        {/* SECTION 3: SERVICES */}
                        <div className="flex flex-col gap-4">
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-2">Services & Resources</span>
                            <div className="flex flex-col gap-1 bg-white rounded-[24px] p-2 shadow-[0_4px_12px_rgba(0,0,0,0.02)] border border-slate-100">
                                <Link to="/services" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-4 font-bold text-slate-700 active:bg-slate-50 transition-colors rounded-xl mx-1 text-base">Services</Link>
                                <div className="h-px w-full bg-slate-50"></div>
                                <Link to="/resources" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-4 font-bold text-slate-700 active:bg-slate-50 transition-colors rounded-xl mx-1 text-base">Resources</Link>
                                <div className="h-px w-full bg-slate-50"></div>
                                <Link to="/news" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-4 font-bold text-slate-700 active:bg-slate-50 transition-colors rounded-xl mx-1 text-base flex justify-between items-center">
                                    News
                                    <span className="px-2 py-[2px] bg-blue-50 text-[#0462C3] rounded-full text-[9px] uppercase tracking-widest font-black border border-blue-100 shadow-[0_0_8px_rgba(4,98,195,0.15)] flex gap-1.5 items-center">
                                        <span className="relative flex h-1.5 w-1.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0462C3] opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0462C3]"></span>
                                        </span>
                                        LIVE
                                    </span>
                                </Link>
                            </div>
                        </div>

                        {/* AUTH SECTION */}
                        <div className="mt-8 mb-8">
                            {user ? (
                                <button
                                    onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                                    className="w-full py-5 rounded-[20px] bg-red-50 text-red-600 font-extrabold text-[12px] uppercase tracking-[0.2em] transition-transform active:scale-[0.98]"
                                >
                                    Logout ({user.name?.split(' ')[0]})
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    className="w-full py-5 rounded-[20px] bg-gradient-brand text-white text-center font-extrabold text-[12px] uppercase tracking-[0.2em] shadow-[0_8px_24px_rgba(4,98,195,0.3)] transition-transform active:scale-[0.98] block"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Login to Portal
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Premium GFTI Coming Soon Modal */}
            {showGftiModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setShowGftiModal(false)}></div>
                    <div className="relative bg-white rounded-[24px] shadow-[0_24px_48px_rgba(0,0,0,0.15)] w-full max-w-[400px] p-8 text-center animate-in fade-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 bg-blue-50 text-[#0462C3] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                            <Clock size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-extrabold text-slate-800 mb-2">GFTIs Coming Soon</h3>
                        <p className="text-[14px] text-slate-500 mb-8 leading-relaxed px-2">
                            We are currently compiling verified placement and fee data for all Government Funded Technical Institutes.
                        </p>
                        <div className="flex flex-col gap-3">
                            <button onClick={() => setShowGftiModal(false)} className="w-full bg-[#0462C3] text-white font-bold py-3.5 rounded-xl hover:bg-[#034a94] transition-all hover:shadow-[0_4px_12px_rgba(4,98,195,0.3)]">
                                Got It
                            </button>
                            <Link to="/colleges/iit" onClick={() => setShowGftiModal(false)} className="w-full bg-slate-50 text-slate-600 font-bold py-3.5 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200/60">
                                Explore IITs
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
