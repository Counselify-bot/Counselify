import { Calendar, MessageSquare, ShieldCheck, Stars, Zap, Trophy, ArrowRight, User, Phone, Mail } from 'lucide-react';

const Advisor = () => {
    return (
        <div className="pt-24 pb-32 bg-surface-container-low min-h-screen text-left relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/4 h-full bg-[#0462C3]/[0.05] -z-10 skew-x-[-15deg] translate-x-32"></div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                {/* Header */}
                <div className="text-center mb-24 space-y-6">
                    <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#0462C3]">India's #1 Admission Engine</span>
                    <h1 className="text-6xl md:text-[85px] font-bold leading-tight text-slate-900 tracking-tighter">
                        Speak to <br />
                        <span className="serif-font italic font-medium text-[#0462C3]">Expert</span> Advisor
                    </h1>
                    <div className="h-2 w-40 bg-[#0462C3] mx-auto rounded-full mt-10"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left: Conversion Box */}
                    <div className="space-y-12">
                        <div className="bg-white p-12 md:p-16 rounded-[64px] shadow-2xl border border-outline-variant/20 relative group animate-in fade-in duration-700">
                            <div className="absolute top-0 left-0 w-2 h-0 bg-[#0462C3] group-hover:h-full transition-all duration-700"></div>

                            <div className="flex items-center gap-4 mb-10 text-[11px] font-bold uppercase tracking-[0.4em] text-blue-400">
                                <Stars size={20} className="text-yellow-400 fill-yellow-400" />
                                Book Free 10 Min Strategy Call
                            </div>

                            <h3 className="text-3xl font-bold text-on-surface mb-10">Limited Slot Availability</h3>

                            <form className="space-y-6">
                                <div className="relative group">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-[#0462C3] transition-colors" size={20} />
                                    <input type="text" placeholder="Full Name" className="w-full pl-16 pr-8 py-5 bg-surface-container-low border border-outline-variant/20 rounded-3xl outline-none focus:border-blue-200 transition-all font-bold" required />
                                </div>
                                <div className="relative group">
                                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-[#0462C3] transition-colors" size={20} />
                                    <input type="tel" placeholder="WhatsApp Number" className="w-full pl-16 pr-8 py-5 bg-surface-container-low border border-outline-variant/20 rounded-3xl outline-none focus:border-blue-200 transition-all font-bold" required />
                                </div>
                                <button className="w-full py-7 bg-[#0462C3] text-white rounded-[28px] font-bold text-[13px] uppercase tracking-widest shadow-2xl hover:bg-[#0351a1] transition-all flex items-center justify-center gap-4 mt-8">
                                    Schedule My Call <ArrowRight size={20} />
                                </button>
                            </form>

                            <div className="mt-12 pt-8 border-t border-outline-variant/10 flex items-center justify-center gap-4 text-[10px] font-bold text-outline-variant uppercase tracking-widest">
                                <ShieldCheck size={16} /> Data Encryption Active
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 bg-green-500 p-10 rounded-[48px] shadow-xl text-center flex flex-col items-center group hover:scale-105 transition-all cursor-pointer">
                                <MessageSquare className="text-white mb-6" size={48} />
                                <h4 className="text-xl font-bold text-white italic serif-font">Direct WhatsApp</h4>
                                <p className="text-[9px] font-bold uppercase tracking-widest text-green-100 opacity-70 mt-4 leading-loose">Connect with an expert instantly</p>
                            </div>
                            <div className="flex-1 bg-slate-900 p-10 rounded-[48px] shadow-xl text-center flex flex-col items-center group hover:scale-105 transition-all cursor-pointer">
                                <Zap className="text-yellow-400 mb-6" size={48} />
                                <h4 className="text-xl font-bold text-white italic serif-font">Explore Plans</h4>
                                <p className="text-[9px] font-bold uppercase tracking-widest text-outline opacity-70 mt-4 leading-loose">Pick the right strategy for your rank</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Expert Proof */}
                    <div className="space-y-12 lg:sticky lg:top-32">
                        <div className="p-12 md:p-16 bg-white border border-outline-variant/20 rounded-[64px] shadow-2xl">
                            <h4 className="text-4xl font-bold text-slate-900 serif-font italic mb-10">Why Speak to Us?</h4>
                            <ul className="space-y-10">
                                {proofPoints.map((point, idx) => (
                                    <li key={idx} className="flex gap-8 group">
                                        <div className="w-14 h-14 bg-surface-container-low rounded-2xl flex items-center justify-center p-3 text-[#0462C3] group-hover:bg-[#0462C3] group-hover:text-white transition-all transform group-hover:rotate-12">
                                            {point.icon}
                                        </div>
                                        <div className="text-left">
                                            <h5 className="text-lg font-bold text-on-surface mb-2 uppercase tracking-widest">{point.title}</h5>
                                            <p className="text-[11px] font-bold uppercase tracking-widest text-outline leading-loose opacity-70">{point.text}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

const proofPoints = [
    { icon: <Trophy />, title: "IIT/NIT Alumni Mentors", text: "Guided by those who have been through the elite system personally." },
    { icon: <ShieldCheck />, title: "98.4% Seat Success", text: "We ensure you don't lose a seat due to poor choice-filling orders." },
    { icon: <Stars />, title: "Dynamic Trend Forecasting", text: "Our AI projects rank variations before the rounds even begin." }
];

export default Advisor;
