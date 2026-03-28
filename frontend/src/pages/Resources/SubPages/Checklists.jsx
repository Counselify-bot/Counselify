import { ArrowLeft, FileBox, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checklists = () => {
    const lists = [
        { title: "Physical Reporting Checklist", items: 12, desc: "Documents to carry to the reporting center/campus." },
        { title: "Choice Filling Worksheet", items: 50, desc: "Excel template to plan your branch priority list." },
        { title: "Income & Category Certificate", items: 8, desc: "Specific formats for EWS/OBC/SC/ST candidates." }
    ];

    return (
        <div className="pt-24 pb-32 bg-surface-container-low min-h-screen text-left">
            <div className="container mx-auto px-6 max-w-5xl">
                <Link to="/resources" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-outline hover:text-[#0462C3] transition-colors mb-12">
                    <ArrowLeft size={16} /> Back to Resources
                </Link>

                <div className="mb-16">
                    <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-orange-500">Preparation kit</span>
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mt-4 serif-font italic tracking-tighter">Essential Checklists</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {lists.map((list, idx) => (
                        <div key={idx} className="bg-white p-10 rounded-[48px] shadow-xl border border-outline-variant/20 group hover:border-orange-500 transition-all flex flex-col justify-between">
                            <div>
                                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-8">
                                    <FileBox size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-on-surface mb-4">{list.title}</h3>
                                <p className="text-on-surface-variant font-bold italic text-sm mb-6">{list.desc}</p>
                            </div>
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-[10px] font-bold text-outline uppercase tracking-widest">{list.items} Required Items</span>
                                <button className="p-4 bg-orange-500 text-white rounded-2xl hover:bg-orange-600 transition-all active:scale-90">
                                    <CheckCircle2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Checklists;
