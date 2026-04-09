import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import logo from '../assets/logo.svg';

const Footer = () => {
    return (
        <footer className="bg-on-surface text-surface py-24 pb-12 z-20">
            <div className="section-container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-28">

                    {/* Brand Section */}
                    <div className="space-y-8">
                        <Link to="/" className="flex items-center">
                            <img src={logo} alt="Counselify Logo" className="h-12 w-auto object-contain" />
                        </Link>
                        <p className="text-surface-container-high text-sm font-medium leading-relaxed pr-4">
                            Strategizing the trajectory of India's pre-eminent engineering candidates through algorithmic precision.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-10 text-left">
                        <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-primary-fixed-dim mb-6">Information</h4>
                        <ul className="space-y-4 text-[12px] font-semibold text-surface-container-high">
                            <li><Link to="/" className="hover:text-primary-fixed transition-all">Home</Link></li>
                            <li><Link to="/college-predictor" className="hover:text-primary-fixed transition-all">College Predictor</Link></li>
                            <li><Link to="/services" className="hover:text-primary-fixed transition-all">Services</Link></li>
                            <li><Link to="/resources" className="hover:text-primary-fixed transition-all">Resources</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-10 text-left">
                        <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-primary-fixed-dim mb-6">Contact</h4>
                        <ul className="space-y-5 text-sm font-medium text-surface-container-high">
                            <li className="flex items-start gap-4">
                                <MapPin size={16} className="text-primary-fixed-dim mt-1 shrink-0" />
                                <span className="text-xs font-bold leading-relaxed">Zolo Polaris, Tavarekere, <br />Bengaluru, KA 560029</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Phone size={16} className="text-primary-fixed-dim shrink-0" />
                                <span className="text-xs font-bold">+91-6367352182</span>
                            </li>
                        </ul>
                    </div>

                    {/* CTA Section */}
                    <div className="space-y-10">
                        <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-primary-fixed-dim mb-6">Advisory</h4>
                        <button className="w-full btn-primary !rounded-xl">
                            Request Strategy Session
                        </button>
                        <p className="text-[12px] text-surface-container-high font-medium leading-relaxed text-left">
                            Reserved for candidates seeking ultra-high ROI engineering pathways.
                        </p>
                    </div>

                </div>

                <div className="pt-12 border-t border-outline/20 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[12px] text-surface-container-high font-medium">
                        &copy; 2021 Counselify Group. Established in Excellence.
                    </p>
                    <div className="flex gap-8 text-[12px] text-surface-container-high font-medium">
                        <a href="#" className="hover:text-primary-fixed transition-colors">Privacy</a>
                        <a href="#" className="hover:text-primary-fixed transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
