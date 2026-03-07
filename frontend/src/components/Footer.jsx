import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import logo from '../assets/logo.svg';

const Footer = () => {
    return (
        <footer className="bg-white text-slate-900 border-t border-brand-muted/50 py-32 pb-16 z-20">
            <div className="section-container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-28">

                    {/* Brand Section */}
                    <div className="space-y-8">
                        <Link to="/" className="flex items-center">
                            <img src={logo} alt="Counselify Logo" className="h-12 w-auto object-contain" />
                        </Link>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed italic pr-4">
                            Strategizing the trajectory of India's pre-eminent engineering candidates through algorithmic precision.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-10 text-left">
                        <h4 className="text-xs uppercase tracking-[0.4em] font-black text-brand-blue/60 underline decoration-slate-200 underline-offset-8">Information</h4>
                        <ul className="space-y-5 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                            <li><Link to="/" className="hover:text-brand-blue transition-all">Core Index</Link></li>
                            <li><Link to="/rank-predictor" className="hover:text-brand-blue transition-all">Rank Synthesis</Link></li>
                            <li><Link to="/services" className="hover:text-brand-blue transition-all">Strategic Plans</Link></li>
                            <li><Link to="/resources" className="hover:text-brand-blue transition-all">Open Intelligence</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-10 text-left">
                        <h4 className="text-xs uppercase tracking-[0.4em] font-black text-brand-blue/60 underline decoration-slate-200 underline-offset-8">Direct Channel</h4>
                        <ul className="space-y-6 text-sm font-medium text-slate-500/80">
                            <li className="flex items-start gap-4">
                                <MapPin size={16} className="text-brand-blue/40 mt-1 shrink-0" />
                                <span className="text-xs font-bold leading-relaxed">Zolo Polaris, Tavarekere, <br />Bengaluru, KA 560029</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Phone size={16} className="text-brand-blue/40 shrink-0" />
                                <span className="text-xs font-bold">+91-6367352182</span>
                            </li>
                        </ul>
                    </div>

                    {/* CTA Section */}
                    <div className="space-y-10">
                        <h4 className="text-xs uppercase tracking-[0.4em] font-black text-brand-blue/60 underline decoration-slate-200 underline-offset-8">Advisory</h4>
                        <button className="w-full btn-primary !rounded-xl">
                            Request Strategy Session
                        </button>
                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.15em] leading-loose text-left italic">
                            Reserved for candidates seeking ultra-high ROI engineering pathways.
                        </p>
                    </div>

                </div>

                <div className="pt-16 border-t border-brand-muted/30 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.2em]">
                        &copy; 2021 Counselify Group. Established in Excellence.
                    </p>
                    <div className="flex gap-10 text-[11px] text-slate-400 font-black uppercase tracking-[0.2em]">
                        <a href="#" className="hover:text-brand-blue transition-colors">Digital Privacy</a>
                        <a href="#" className="hover:text-brand-blue transition-colors">Governance</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
