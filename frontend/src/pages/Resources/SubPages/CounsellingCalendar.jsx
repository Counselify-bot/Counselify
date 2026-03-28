import { ArrowLeft, Calendar, Bell, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const CounsellingCalendar = () => {
    const dates = [
        { date: "June 10, 2025", event: "JoSAA Registration Starts", type: "Official" },
        { date: "June 18, 2025", event: "Round 1 Seat Allocation", type: "Critical" },
        { date: "July 05, 2025", event: "CSAB Special Round 1", type: "Final Chance" }
    ];

    return (
        <div className="pt-24 pb-32 bg-surface-container-low min-h-screen text-left">
            <div className="container mx-auto px-6 max-w-5xl">
                <Link to="/resources" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-outline hover:text-[#0462C3] transition-colors mb-12">
                    <ArrowLeft size={16} /> Back to Resources
                </Link>

                <div className="mb-16">
                    <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-purple-600">Timeline</span>
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mt-4 serif-font italic tracking-tighter">Counselling Calendar</h1>
                </div>

                <div className="bg-white rounded-[48px] shadow-2xl border border-outline-variant/20 overflow-hidden">
                    <div className="p-10 border-b border-outline-variant/10 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-on-surface">Important Dates 2025</h3>
                        <div className="flex items-center gap-2 text-purple-600 animate-pulse">
                            <Bell size={18} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Live Updates</span>
                        </div>
                    </div>
                    <div>
                        {dates.map((item, idx) => (
                            <div key={idx} className="p-10 flex flex-col md:flex-row items-center justify-between border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low transition-all">
                                <div className="flex items-center gap-10">
                                    <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 shrink-0">
                                        <Calendar size={28} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-outline uppercase tracking-widest">{item.date}</p>
                                        <h4 className="text-2xl font-bold text-on-surface">{item.event}</h4>
                                    </div>
                                </div>
                                <span className="mt-4 md:mt-0 px-6 py-2 bg-purple-100 text-purple-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                    {item.type}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CounsellingCalendar;
