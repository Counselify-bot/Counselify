import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, ChevronDown } from 'lucide-react';
import logo from '../assets/logo.svg';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };



    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'College Predictor', path: '/rank-predictor' },
        { name: 'Percentile to Rank', path: '/percentile-to-rank' },
        { 
            name: 'Colleges', 
            path: '#', 
            submenu: [
                { name: 'IIT', path: '/colleges/iit' },
                { name: 'NIT', path: '/colleges/nit' },
                { name: 'IIIT', path: '/colleges/iiit' },
                { name: 'GFTI', path: '/colleges/gfti' },
            ] 
        },
        { name: 'Services', path: '/services' },
        { name: 'Resources', path: '/resources' },
        { name: 'About', path: '/about' }
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
                                <div className="absolute top-full left-0 mt-0 w-48 bg-white border border-outline-variant/20 shadow-xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100">
                                    {link.submenu.map((sub) => (
                                        <Link
                                            key={sub.name}
                                            to={sub.path}
                                            className="block px-6 py-2.5 text-on-surface-variant hover:bg-primary-fixed/30 hover:text-primary transition-colors text-sm font-medium"
                                        >
                                            {sub.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`transition-all hover:text-primary-container ${location.pathname === link.path ? 'text-primary-container' : ''}`}
                            >
                                {link.name}
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
                <div className="lg:hidden absolute top-0 left-0 w-full bg-white h-screen flex flex-col pt-24 px-8 z-40 animate-in fade-in slide-in-from-top duration-300">
                    <div className="flex flex-col space-y-8 text-lg font-semibold">
                        {navLinks.map((link) => (
                            <div key={link.name} className="flex flex-col space-y-4">
                                {link.submenu ? (
                                    <>
                                        <span className="text-on-surface-variant text-xs font-bold uppercase tracking-widest">{link.name}</span>
                                        <div className="grid grid-cols-2 gap-4">
                                            {link.submenu.map((sub) => (
                                                <Link
                                                    key={sub.name}
                                                    to={sub.path}
                                                    className="text-on-surface text-base py-1"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        to={link.path}
                                        className="text-on-surface"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col w-full space-y-4 mt-12 pt-10 border-t border-outline-variant/20">


                        {user ? (
                            <button
                                onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                                className="w-full py-4 rounded-xl bg-error-container text-error text-center font-bold text-sm uppercase tracking-widest"
                            >
                                Logout ({user.name?.split(' ')[0]})
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="w-full py-4 rounded-xl bg-gradient-brand text-on-primary text-center font-bold text-sm uppercase tracking-widest"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
