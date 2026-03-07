import React from 'react';
import { TrendingUp, AlertCircle } from 'lucide-react';

const ExpectedCutoffSection = () => {
    const cutoffData = [
        { category: 'Unreserved (UR)', cutoff: '93.3045', color: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20' },
        { category: 'Gen-EWS', cutoff: '81.4387', color: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20' },
        { category: 'OBC-NCL', cutoff: '80.7456', color: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20' },
        { category: 'SC', cutoff: '61.3526', color: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20' },
        { category: 'ST', cutoff: '48.2456', color: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20' },
        { category: 'UR-PwD', cutoff: '0.0082', color: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20' }
    ];

    return (
        <section className="py-20 bg-transparent relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-muted to-transparent"></div>

            <div className="section-container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <div className="text-left space-y-8">
                        <div className="inline-flex items-center gap-3 cursor-default">
                            <div className="h-[2px] w-6 bg-brand-blue rounded-full"></div>
                            <span className="text-[10px] uppercase tracking-[0.25em] font-black text-brand-blue">JEE ADVANCED ELIGIBILITY</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black serif-font text-brand-dark leading-[1] tracking-tighter">
                            Expected 2026 <br />
                            <span className="italic font-normal text-brand-blue">Cutoff Percentiles</span>
                        </h2>
                        <p className="text-[17px] text-slate-500 font-bold leading-relaxed italic max-w-md">
                            NTA releases the minimum percentile needed to be eligible for the JEE Advanced exam. The cutoff is released category-wise alongside the final result.
                        </p>

                        <div className="mt-8 flex items-start gap-4 bg-amber-50/50 border border-amber-100/50 rounded-2xl p-5 max-w-md">
                            <AlertCircle size={20} className="text-amber-500 shrink-0 mt-0.5" />
                            <p className="text-[11px] font-black text-amber-700/80 uppercase tracking-[0.15em] leading-relaxed text-left">
                                These are projected algorithmic estimates based on historical trends. Official cutoffs will be released by NTA alongside session results.
                            </p>
                        </div>
                    </div>

                    {/* Right: Table */}
                    <div className="bg-[#f2f7fc]/95 backdrop-blur-2xl border border-white/50 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden shadow-blue-900/10 w-full max-w-xl mx-auto lg:mx-0 lg:ml-auto text-left">
                        {/* Decorative Blob */}
                        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-brand-blue/5 rounded-full blur-[60px] pointer-events-none"></div>

                        <div className="overflow-x-auto relative z-10 w-full no-scrollbar">
                            <table className="w-full text-left border-collapse min-w-[400px]">
                                <thead>
                                    <tr>
                                        <th className="pb-5 pt-2 px-6 text-[10px] font-black tracking-[0.2em] uppercase text-slate-400 border-b border-brand-muted/80">Category</th>
                                        <th className="pb-5 pt-2 px-6 text-[10px] font-black tracking-[0.2em] uppercase text-slate-400 border-b border-brand-muted/80 text-right">Expected Cutoff</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cutoffData.map((item, index) => (
                                        <tr key={index} className="group transition-colors hover:bg-white/50">
                                            <td className="py-5 px-6 border-b border-brand-muted/40 last:border-0">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-3 h-3 rounded-full ${item.color.split(' ')[0]} border border-black/5`}></div>
                                                    <span className="font-black text-brand-dark text-[14px]">{item.category}</span>
                                                </div>
                                            </td>
                                            <td className="py-5 px-6 border-b border-brand-muted/40 last:border-0 text-right">
                                                <div className={`inline-flex px-4 py-2 rounded-[14px] text-[14px] font-black border ${item.color} shadow-sm transition-transform group-hover:-translate-y-0.5 duration-300`}>
                                                    {item.cutoff} <span className="text-[9px] font-bold ml-1.5 opacity-60 self-center tracking-widest uppercase">%ile</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExpectedCutoffSection;
