import React from 'react';
import { TrendingUp, AlertCircle } from 'lucide-react';

const ExpectedCutoffSection = () => {
    const cutoffData = [
        { category: 'Unreserved (UR)', cutoff: '93.3045', color: 'bg-primary-container/10 text-primary-container border-primary-container/20' },
        { category: 'Gen-EWS', cutoff: '81.4387', color: 'bg-primary-container/10 text-primary-container border-primary-container/20' },
        { category: 'OBC-NCL', cutoff: '80.7456', color: 'bg-primary-container/10 text-primary-container border-primary-container/20' },
        { category: 'SC', cutoff: '61.3526', color: 'bg-primary-container/10 text-primary-container border-primary-container/20' },
        { category: 'ST', cutoff: '48.2456', color: 'bg-primary-container/10 text-primary-container border-primary-container/20' },
        { category: 'UR-PwD', cutoff: '0.0082', color: 'bg-primary-container/10 text-primary-container border-primary-container/20' }
    ];

    return (
        <section className="py-20 bg-surface-container-low relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-fixed to-transparent"></div>

            <div className="section-container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <div className="text-left space-y-8">
                        <div className="inline-flex items-center gap-3 cursor-default">
                            <div className="h-[2px] w-6 bg-primary-container rounded-full"></div>
                            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-primary-container">JEE ADVANCED ELIGIBILITY</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold serif-font text-on-surface leading-[1] tracking-tighter">
                            Expected 2026 <br />
                            <span className="italic font-normal text-primary-container">Cutoff Percentiles</span>
                        </h2>
                        <p className="text-[17px] text-on-surface-variant font-bold leading-relaxed italic max-w-md">
                            NTA releases the minimum percentile needed to be eligible for the JEE Advanced exam. The cutoff is released category-wise alongside the final result.
                        </p>

                        <div className="mt-8 flex items-start gap-4 bg-amber-50/50 border border-amber-100/50 rounded-2xl p-5 max-w-md">
                            <AlertCircle size={20} className="text-amber-500 shrink-0 mt-0.5" />
                            <p className="text-[11px] font-bold text-amber-700/80 uppercase tracking-[0.15em] leading-relaxed text-left">
                                These are projected algorithmic estimates based on historical trends. Official cutoffs will be released by NTA alongside session results.
                            </p>
                        </div>
                    </div>

                    {/* Right: Table */}
                    <div className="glass-panel border border-white/50 rounded-2xl p-8 md:p-12 editorial-shadow relative overflow-hidden w-full max-w-xl mx-auto lg:mx-0 lg:ml-auto text-left">
                        {/* Decorative Blob */}
                        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-primary-container/5 rounded-full blur-[60px] pointer-events-none"></div>

                        <div className="overflow-x-hidden md:overflow-x-auto relative z-10 w-full no-scrollbar">
                            {/* --- MOBILE ONLY LIST (flex, no clip) --- */}
                            <div className="flex md:hidden flex-col w-full">
                                <div className="flex justify-between items-center pb-3 pt-2 px-1 border-b border-primary-fixed/80 mb-2">
                                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-outline">Category</span>
                                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-outline text-right">Expected Cutoff</span>
                                </div>
                                {cutoffData.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center gap-3 w-full py-4 px-1 border-b border-primary-fixed/40 last:border-0 hover:bg-white/50 transition-colors">
                                        <div className="flex-1 min-w-0 flex items-center gap-3">
                                            <div className={`w-3 h-3 rounded-full ${item.color.split(' ')[0]} border border-black/5 shrink-0`}></div>
                                            <span className="font-bold text-on-surface text-[14px] truncate">{item.category}</span>
                                        </div>
                                        <div className="shrink-0 ml-2">
                                            <div className={`inline-flex px-3 py-1.5 rounded-[12px] text-[13px] font-bold border ${item.color} shadow-sm`}>
                                                {item.cutoff} <span className="text-[8px] font-bold ml-1 opacity-60 self-center tracking-widest uppercase">%ile</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* --- DESKTOP ONLY TABLE (original) --- */}
                            <table className="hidden md:table w-full text-left border-collapse min-w-[400px]">
                                <thead>
                                    <tr>
                                        <th className="pb-5 pt-2 px-6 text-[10px] font-bold tracking-[0.2em] uppercase text-outline border-b border-primary-fixed/80">Category</th>
                                        <th className="pb-5 pt-2 px-6 text-[10px] font-bold tracking-[0.2em] uppercase text-outline border-b border-primary-fixed/80 text-right">Expected Cutoff</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cutoffData.map((item, index) => (
                                        <tr key={index} className="group transition-colors hover:bg-white/50">
                                            <td className="py-5 px-6 border-b border-primary-fixed/40 last:border-0">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-3 h-3 rounded-full ${item.color.split(' ')[0]} border border-black/5`}></div>
                                                    <span className="font-bold text-on-surface text-[14px]">{item.category}</span>
                                                </div>
                                            </td>
                                            <td className="py-5 px-6 border-b border-primary-fixed/40 last:border-0 text-right">
                                                <div className={`inline-flex px-4 py-2 rounded-[14px] text-[14px] font-bold border ${item.color} shadow-sm transition-transform group-hover:-translate-y-0.5 duration-300`}>
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
