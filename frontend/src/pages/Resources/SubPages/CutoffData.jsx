import { ArrowLeft, FileCheck, Search, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const CutoffData = () => {
    const data = [
        { year: "2025", round: "Final", title: "JAC Delhi Counselling", desc: "Official opening and closing ranks for participating institutes.", link: "https://drive.google.com/drive/folders/1DwsA1Ut4waV8WnSLxT-hQ6sXzWIuCstF?usp=sharing" },
        { year: "2025", round: "Round 6", title: "JoSAA NIT/IIIT Cutoff", desc: "Official opening and closing ranks for all branches." },
        { year: "2025", round: "Special 2", title: "CSAB Vacancy Cutoff", desc: "Ranks at which seats were filled in the final rounds." },
        { year: "2025", round: "Final", title: "UPTAC Archive Data", desc: "Historical data for Uttar Pradesh state colleges." }
    ];

    return (
        <div className="pt-24 pb-32 mesh-gradient-hero min-h-screen text-left">
            <div className="container mx-auto px-6 max-w-5xl">
                <Link to="/resources" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-outline hover:text-[#0462C3] transition-colors mb-12">
                    <ArrowLeft size={16} /> Back to Resources
                </Link>

                <div className="mb-16">
                    <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-primary-container">Historical Trends</span>
                    <h1 className="text-5xl md:text-6xl font-bold text-on-surface mt-4 serif-font italic tracking-tighter">Cutoff Analytics</h1>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {data.map((item, idx) => (
                        <div key={idx} className="bg-white p-10 rounded-[40px] shadow-xl border border-outline-variant/20 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-primary-container/40 transition-all">
                            <div className="flex items-center gap-8">
                                <div className="text-center shrink-0">
                                    <div className="text-3xl font-bold text-primary-container leading-none">{item.year}</div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-outline mt-2">{item.round}</div>
                                </div>
                                <div className="h-12 w-px bg-surface-container-low hidden md:block"></div>
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-bold text-on-surface">{item.title}</h3>
                                    <p className="text-on-surface-variant font-bold italic text-sm">{item.desc}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => item.link && window.open(item.link, '_blank', 'noopener,noreferrer')}
                                className="px-10 py-5 bg-gradient-brand text-white rounded-[24px] font-bold text-[11px] uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 active:scale-95"
                            >
                                View Data <Search size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CutoffData;
