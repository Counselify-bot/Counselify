import { ArrowLeft, Youtube, Play, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Videos = () => {
    const videos = [
        { title: "JoSAA Choice Filling Tutorial", duration: "18:45", views: "12K+", desc: "Step-by-step walkthrough of the official JoSAA portal." },
        { title: "CSAB Special Round Explained", duration: "12:20", views: "8K+", desc: "How to save your seat in the last minute special rounds." },
        { title: "IIT vs NIT: The Real Comparison", duration: "25:00", views: "25K+", desc: "Placement data and campus life comparison by alumni." }
    ];

    return (
        <div className="pt-24 pb-32 bg-slate-50 min-h-screen text-left">
            <div className="container mx-auto px-6 max-w-5xl">
                <Link to="/resources" className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-[#0462C3] transition-colors mb-12">
                    <ArrowLeft size={16} /> Back to Resources
                </Link>

                <div className="mb-16">
                    <span className="text-[11px] font-black uppercase tracking-[0.4em] text-red-500">Video Guides</span>
                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 mt-4 serif-font italic tracking-tighter">YouTube Resources</h1>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {videos.map((vid, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-[40px] shadow-xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-red-500 transition-all">
                            <div className="flex items-center gap-8">
                                <div className="relative w-40 h-24 bg-slate-900 rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
                                    <Play className="text-white relative z-10" fill="white" size={32} />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-transparent"></div>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-slate-800">{vid.title}</h3>
                                    <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        <span>{vid.duration}</span>
                                        <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                                        <span>{vid.views} Views</span>
                                    </div>
                                    <p className="text-slate-500 font-bold italic text-sm">{vid.desc}</p>
                                </div>
                            </div>
                            <button className="px-8 py-5 bg-red-600 text-white rounded-[24px] font-black text-[11px] uppercase tracking-widest shadow-xl hover:bg-red-700 transition-all flex items-center gap-3 active:scale-95">
                                Watch Now <Youtube size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Videos;
