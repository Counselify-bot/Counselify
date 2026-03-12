import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
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
        { name: 'Services', path: '/services' },
        { name: 'Resources', path: '/resources' },
        { name: 'About', path: '/about' }
    ];

    return (
        <nav className={`fixed w-full z-50 border-t-8 border-brand-dark transition-all duration-500 bg-white/5 backdrop-blur-2xl border-b border-white/10 shadow-lg shadow-blue-900/5`}>
            <div className="section-container flex justify-between items-center h-24">
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
                <div className="hidden lg:flex items-center ml-auto mr-12 space-x-5 text-[15px] font-medium text-slate-800">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`transition-all hover:text-brand-blue ${location.pathname === link.path ? 'text-brand-blue' : ''}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Auth & CTAs */}
                <div className="hidden lg:flex items-center gap-4">


                    {user ? (
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-black text-slate-700 bg-slate-100 px-4 py-2.5 rounded-full">
                                Hi, {user.name?.split(' ')[0]}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="p-3 bg-red-50 text-red-500 hover:bg-red-100 rounded-full transition-all"
                                title="Logout"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="px-6 py-3 bg-slate-900 text-white text-sm font-black uppercase tracking-widest rounded-full hover:bg-slate-800 transition-all"
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
                        <Menu size={28} className="text-slate-800" />
                    )}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-0 left-0 w-full bg-white h-screen flex flex-col pt-24 px-8 z-40 animate-in fade-in slide-in-from-top duration-300">
                    <div className="flex flex-col space-y-8 text-lg font-medium">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-slate-800"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-col w-full space-y-4 mt-12 pt-10 border-t border-slate-100">


                        {user ? (
                            <button
                                onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                                className="w-full py-4 rounded-full bg-red-50 text-red-500 text-center font-black text-sm uppercase tracking-widest"
                            >
                                Logout ({user.name?.split(' ')[0]})
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="w-full py-4 rounded-full bg-slate-900 text-white text-center font-black text-sm uppercase tracking-widest"
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
