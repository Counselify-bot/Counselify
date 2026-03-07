import { ArrowLeft, BookOpen, Download, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Ebooks = () => {
    const books = [
        { title: "JoSAA Master Guide 2025", pages: "45 Pages", size: "12MB", desc: "Detailed choice filling strategy and round-wise analysis." },
        { title: "State Counselling Handbook", pages: "32 Pages", size: "8MB", desc: "Covers UPTAC, REAP, MHT-CET, and WBJEE." },
        { title: "Document Verification Kit", pages: "15 Pages", size: "4MB", desc: "Checklist of every document needed for NITs/IITs." }
    ];

    return (
        <div className="pt-24 pb-32 bg-slate-50 min-h-screen text-left">
            <div className="container mx-auto px-6 max-w-5xl">
                <Link to="/resources" className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-[#0462C3] transition-colors mb-12">
                    <ArrowLeft size={16} /> Back to Resources
                </Link>

                <div className="mb-16">
                    <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#0462C3]">Free Library</span>
                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 mt-4 serif-font italic tracking-tighter">Premium eBooks</h1>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {books.map((book, idx) => (
                        <div key={idx} className="bg-white p-10 rounded-[40px] shadow-xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-[#0462C3] transition-all">
                            <div className="flex items-center gap-8">
                                <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-[#0462C3] group-hover:bg-[#0462C3] group-hover:text-white transition-all">
                                    <BookOpen size={32} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-slate-800">{book.title}</h3>
                                    <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        <span>{book.pages}</span>
                                        <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                                        <span>{book.size}</span>
                                    </div>
                                    <p className="text-slate-500 font-bold italic text-sm">{book.desc}</p>
                                </div>
                            </div>
                            <button className="px-10 py-5 bg-[#0462C3] text-white rounded-[24px] font-black text-[11px] uppercase tracking-widest shadow-xl hover:bg-[#0351a1] transition-all flex items-center gap-3 active:scale-95">
                                Download PDF <Download size={18} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-16 p-10 bg-blue-50 rounded-[40px] border border-blue-100 flex items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <ShieldCheck className="text-[#0462C3]" size={40} />
                        <div>
                            <h4 className="font-black text-slate-800 uppercase tracking-widest text-sm">Verified Content</h4>
                            <p className="text-xs text-slate-500 font-bold italic">All guides are updated for the 2025-26 Academic Session.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ebooks;
