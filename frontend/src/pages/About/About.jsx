import { Trophy, Users, GraduationCap, MapPin, CheckCircle2 } from 'lucide-react';

const About = () => {
    const achievements = [
        { icon: <Users size={24} />, value: "2000+", label: "Synthesized Profiles" },
        { icon: <CheckCircle2 size={24} />, value: "98%", label: "Analytical Precision" },
        { icon: <GraduationCap size={24} />, value: "50+", label: "Tier-1 Strategic Mentors" }
    ];

    const mentors = [
        { name: "Rahul", role: "Principal Strategist", institute: "IIT Delhi Alumni", batch: "2023", branch: "Mechanical Engineering", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1374&auto=format&fit=crop" },
        { name: "Ankit Sharma", role: "Senior Advisor", institute: "IIT BHU", batch: "2022", branch: "Computer Science", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop" },
        { name: "Simran Kaur", role: "Counselling Architect", institute: "NIT Trichy", batch: "2024", branch: "Electrical Engineering", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop" }
    ];

    return (
        <div className="pt-48 pb-40 bg-transparent min-h-screen">
            <div className="section-container">
                {/* Header */}
                <div className="text-left mb-32 space-y-12 max-w-4xl">
                    <div className="inline-flex items-center gap-3 mb-4 group cursor-default">
                        <div className="h-px w-12 bg-brand-blue"></div>
                        <span className="text-xs uppercase tracking-[0.4em] font-black text-brand-blue/60">The Advisory Protocol</span>
                    </div>
                    <h1 className="text-6xl md:text-[100px] font-black leading-[0.85] text-brand-dark tracking-tighter">
                        Mission & <br />
                        <span className="serif-font italic font-medium text-brand-blue">Strategic</span> Intent
                    </h1>
                </div>

                {/* Founder Story */}
                <div className="bg-white p-14 md:p-24 rounded-[64px] border border-brand-muted shadow-soft mb-40 flex flex-col md:flex-row items-center gap-20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-blue/[0.03] -z-10 skew-x-[-12deg] translate-x-32 blur-3xl group-hover:bg-brand-blue/[0.06] transition-all duration-1000"></div>

                    <div className="w-full md:w-1/3 relative z-10 group-hover:-translate-y-4 transition-all duration-700 shadow-2xl rounded-[40px] overflow-hidden grayscale hover:grayscale-0 duration-1000 border border-brand-muted/30">
                        <img src={mentors[0].image} alt="Founder" className="w-full aspect-[4/5] object-cover" />
                    </div>

                    <div className="w-full md:w-2/3 space-y-10 relative z-10">
                        <h2 className="text-[12px] font-black tracking-[0.4em] uppercase text-brand-blue/60">Core Narrative</h2>
                        <div className="space-y-8 text-xl md:text-2xl font-bold text-slate-500 italic leading-relaxed tracking-tight">
                            <p>"The engineering admission matrix is historically opaque. My experience at IIT Delhi revealed that even high-performance candidates often lack the strategic oversight to optimize their institutional placement."</p>
                            <p>"Counselify was engineered to replace intuition with analytical certainty. We provide the tactical depth required for elite global engineering pathways."</p>
                        </div>
                        <div className="pt-10 border-t border-brand-muted/50 flex flex-wrap items-center gap-8">
                            <div className="flex flex-col">
                                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Founder Executive</span>
                                <span className="text-lg font-black text-brand-dark tracking-tighter">Rahul</span>
                            </div>
                            <div className="w-px h-8 bg-brand-muted"></div>
                            <div className="flex flex-col">
                                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Creditionals</span>
                                <span className="text-lg font-black text-brand-blue serif-font italic tracking-tighter">IIT Delhi Engineering Graduate</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mentors Grid */}
                <div className="mb-40">
                    <div className="text-left mb-24 space-y-6 max-w-2xl">
                        <h3 className="text-5xl md:text-7xl font-black text-brand-dark tracking-tighter leading-none">Strategic <span className="serif-font italic font-medium text-brand-blue">Council</span></h3>
                        <p className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Faculty sourced exclusively from India's pre-eminent technical research institutions.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {mentors.map((mentor, idx) => (
                            <div key={idx} className="bg-white p-12 rounded-[56px] border border-brand-muted shadow-soft group hover:-translate-y-4 transition-all duration-700 text-left flex flex-col">
                                <div className="w-full aspect-square rounded-[40px] overflow-hidden mb-10 shadow-xl grayscale group-hover:grayscale-0 transition-all duration-700 border border-brand-muted/20">
                                    <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="space-y-4">
                                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-blue/60">{mentor.role}</span>
                                    <h4 className="text-3xl font-black text-brand-dark tracking-tighter">{mentor.name}</h4>
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 italic serif-font">{mentor.institute}</p>
                                </div>
                                <div className="mt-10 pt-8 border-t border-brand-muted/30 flex justify-between items-center text-[11px] font-black tracking-widest text-slate-300 uppercase">
                                    <span>{mentor.branch.split(' ')[0]}</span>
                                    <span>Class of {mentor.batch}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Achievements Synthesis */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center bg-brand-dark p-20 rounded-[80px] shadow-2xl shadow-blue-900/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>
                    {achievements.map((ach, idx) => (
                        <div key={idx} className="space-y-6 relative z-10">
                            <div className="w-16 h-16 bg-brand-blue/10 text-brand-blue rounded-[24px] flex items-center justify-center mx-auto mb-8 border border-brand-blue/20">
                                {ach.icon}
                            </div>
                            <h4 className="text-6xl md:text-7xl font-black text-white italic serif-font tracking-tighter leading-none">{ach.value}</h4>
                            <p className="text-xs font-black uppercase tracking-[0.4em] text-brand-accent/60 leading-loose">{ach.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
