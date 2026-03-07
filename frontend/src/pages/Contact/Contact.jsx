import { Mail, Phone, MapPin, Send, MessageSquare, ArrowRight, ShieldCheck, User, Star, Map } from 'lucide-react';

const Contact = () => {
    const contactInfo = [
        { icon: <Mail />, title: "Digital Correspondence", value: "hello@counselify.in", desc: "Response latency: < 4hrs" },
        { icon: <Phone />, title: "Expert Connectivity", value: "+91 6367352182", desc: "Encrypted Direct Channel" },
        { icon: <Star />, title: "Operational Hours", value: "10:00 - 18:00 (IST)", desc: "Monday – Saturday" }
    ];

    return (
        <div className="pt-48 pb-40 bg-bg-light min-h-screen relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-blue/[0.03] -z-10 skew-x-[-12deg] translate-x-32 blur-[120px]"></div>

            <div className="section-container relative z-10">
                {/* Header */}
                <div className="text-left mb-32 space-y-12 max-w-4xl">
                    <div className="inline-flex items-center gap-3 group cursor-default">
                        <div className="h-px w-12 bg-brand-blue"></div>
                        <span className="text-xs uppercase tracking-[0.4em] font-black text-brand-blue/60">Communication Protocol</span>
                    </div>
                    <h1 className="text-6xl md:text-[100px] font-black leading-[0.85] text-brand-dark tracking-tighter">
                        Establish <br />
                        <span className="serif-font italic font-medium text-brand-blue">Strategic</span> Contact
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-stretch">

                    {/* Left: Contact Form */}
                    <div className="bg-white p-14 md:p-20 rounded-[64px] border border-brand-muted shadow-soft relative group animate-in fade-in duration-1000">
                        <div className="absolute top-0 left-0 w-1.5 h-0 bg-brand-blue group-hover:h-full transition-all duration-1000"></div>

                        <h3 className="text-3xl font-black text-brand-dark mb-14 tracking-tighter flex items-center gap-6">
                            Channel Inquiry <div className="h-0.5 w-16 bg-brand-blue/20"></div>
                        </h3>

                        <form className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Candidate Alias</label>
                                    <input type="text" className="w-full px-10 py-6 bg-bg-light rounded-[32px] border border-brand-muted outline-none focus:border-brand-blue transition-all font-black text-xs" placeholder="Full Legal Name" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Direct WhatsApp</label>
                                    <input type="tel" className="w-full px-10 py-6 bg-bg-light rounded-[32px] border border-brand-muted outline-none focus:border-brand-blue transition-all font-black text-xs" placeholder="+91 00000 00000" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 italic">CRL Synthesis (Rank)</label>
                                    <input type="number" className="w-full px-10 py-6 bg-bg-light rounded-[32px] border border-brand-muted outline-none focus:border-brand-blue transition-all font-black text-xs" placeholder="AIR Rank" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Category Matrix</label>
                                    <select className="w-full px-10 py-6 bg-bg-light rounded-[32px] border border-brand-muted outline-none focus:border-brand-blue transition-all font-black text-xs appearance-none">
                                        <option>Unreserved (OPEN)</option>
                                        <option>OBC-NCL Performance</option>
                                        <option>SC/ST Selection</option>
                                        <option>EWS Strategic</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Inquiry Depth</label>
                                <textarea className="w-full px-10 py-6 bg-bg-light rounded-[32px] border border-brand-muted outline-none focus:border-brand-blue transition-all font-black text-xs min-h-[120px] resize-none" placeholder="Provide strategic context..."></textarea>
                            </div>

                            <button className="w-full btn-primary !rounded-[32px] flex items-center justify-center gap-6 group/btn mt-10">
                                Transmit Protocol <Send size={18} className="group-hover/btn:translate-x-3 transition-transform" />
                            </button>
                        </form>
                    </div>

                    {/* Right: Channels & Info */}
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-8">
                            {contactInfo.map((info, idx) => (
                                <div key={idx} className="bg-white p-12 rounded-[56px] border border-brand-muted shadow-soft flex items-center gap-12 group hover:-translate-y-3 transition-all duration-700">
                                    <div className="w-16 h-16 bg-brand-muted/30 rounded-2xl flex items-center justify-center p-3 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all transform group-hover:-rotate-6">
                                        {info.icon}
                                    </div>
                                    <div className="text-left">
                                        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 italic">{info.title}</h4>
                                        <p className="text-2xl font-black text-brand-dark serif-font italic tracking-tighter mb-2">{info.value}</p>
                                        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-blue opacity-70">{info.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-brand-dark p-16 rounded-[64px] shadow-2xl relative group overflow-hidden mt-auto">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-blue/[0.1] rounded-full blur-[80px] -mr-24 -mt-24 group-hover:bg-brand-blue/[0.2] transition-all duration-1000"></div>

                            <h4 className="text-3xl font-black text-white italic serif-font mb-8 tracking-tighter">Instant Global Connectivity</h4>
                            <p className="text-xs font-black uppercase tracking-[0.3em] text-brand-accent/60 mb-12 opacity-80 leading-loose">
                                Secure prioritized advisory through <br />our official business channel.
                            </p>

                            <button className="px-12 py-5 bg-[#25D366] text-white rounded-[24px] font-black text-xs uppercase tracking-[0.3em] hover:bg-[#128C7E] transition-all flex items-center gap-6 shadow-xl shadow-green-900/40">
                                <MessageSquare size={20} /> Deploy WhatsApp
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
