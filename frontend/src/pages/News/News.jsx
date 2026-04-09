import React, { useState } from 'react';
import { Calendar, Tag, CheckCircle2, Star, Clock, AlertCircle } from 'lucide-react';

const News = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    
    // Sample News Data Provided by User
    const updates = [
        {
            id: 1,
            title: "JEE Main Session 2 Exam",
            date: "April 2 – April 9, 2026",
            tag: "Exam",
            tagColor: "blue",
            desc: "JEE Main Session 2 will be conducted during this period."
        },
        {
            id: 2,
            title: "JEE Main Session 2 Result",
            date: "April 19, 2026",
            tag: "Result",
            tagColor: "green",
            desc: "Official result announcement."
        },
        {
            id: 3,
            title: "JEE Advanced Registration",
            date: "April 23 – May 4, 2026",
            tag: "Registration",
            tagColor: "orange",
            desc: "Registration window for JEE Advanced."
        },
        {
            id: 4,
            title: "JEE Advanced Admit Card",
            date: "May 11 – May 17, 2026",
            tag: "Admit Card",
            tagColor: "orange",
            desc: "Admit cards will be available in this range."
        },
        {
            id: 5,
            title: "JEE Advanced Exam",
            date: "May 17, 2026",
            tag: "Exam",
            tagColor: "blue",
            desc: "JEE Advanced exam will be conducted."
        },
        {
            id: 6,
            title: "JEE Advanced Answer Key & Result",
            date: "Provisional: May (TBD) | Final: June 1, 2026",
            tag: "Result",
            tagColor: "green",
            desc: "Official results and key disclosures."
        },
        {
            id: 7,
            title: "JoSAA Counselling Registration",
            date: "June 2, 2026",
            tag: "Counselling",
            tagColor: "purple",
            desc: "Registration begins for JoSAA."
        },
        {
            id: 8,
            title: "BITSAT 2026 Sessions",
            date: "Session 1: Apr 15 – 17 | Session 2: May 24 – 26",
            tag: "Exam",
            tagColor: "blue",
            desc: "Dates for both BITSAT sessions."
        },
        {
            id: 9,
            title: "BITSAT Session 2 Registration",
            date: "April 20 – May 2, 2026",
            tag: "Registration",
            tagColor: "orange",
            desc: "Online registration for the second session."
        },
        {
            id: 10,
            title: "JAC Delhi Counselling",
            date: "Expected Late May 2026",
            tag: "Counselling",
            tagColor: "purple",
            desc: "Usually starts in the 3rd or 4th week of May."
        }
    ];

    const getTagStyles = (color) => {
        const styles = {
            blue: "bg-blue-50 text-blue-600 border-blue-200",
            green: "bg-emerald-50 text-emerald-600 border-emerald-200",
            orange: "bg-orange-50 text-orange-600 border-orange-200",
            purple: "bg-purple-50 text-purple-600 border-purple-200"
        };
        return styles[color] || "bg-slate-50 text-slate-600 border-slate-200";
    };

    const getBorderAccent = (color) => {
        const styles = {
            blue: "border-l-blue-500",
            green: "border-l-emerald-500",
            orange: "border-l-orange-500",
            purple: "border-l-purple-500"
        };
        return styles[color] || "border-l-slate-300";
    };

    const filters = ['All', 'Exam', 'Result', 'Registration', 'Counselling'];
    
    const filteredUpdates = updates.filter(update => activeFilter === 'All' || update.tag === activeFilter);

    return (
        <section className="bg-[#f8fafd] min-h-screen pt-32 pb-20">
            <div className="max-w-3xl mx-auto px-6">
                
                {/* Header */}
                <div className="mb-12 text-center md:text-left">
                    <div className="inline-flex items-center justify-center gap-3 mb-6 group cursor-default">
                        <div className="h-px w-8 bg-blue-500/50"></div>
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#0462C3] bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 flex items-center gap-2 shadow-sm">
                            <span className="w-1.5 h-1.5 bg-[#0462C3] rounded-full animate-ping absolute"></span>
                            <span className="w-1.5 h-1.5 bg-[#0462C3] rounded-full relative"></span>
                            LIVE TRACKER
                        </span>
                        <div className="h-px w-8 bg-blue-500/50"></div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-5">Latest Updates & Deadlines</h1>
                    <p className="text-[14px] font-medium text-slate-500 max-w-xl leading-relaxed mx-auto md:mx-0">Stay completely updated with all upcoming JEE, JoSAA, BITSAT, and critical counselling events ensuring ZERO missed deadlines.</p>
                </div>

                {/* Sticky Filter */}
                <div className="sticky top-[80px] z-30 bg-[#f8fafd]/95 backdrop-blur-md py-4 mb-8 -mx-4 px-4 overflow-x-auto flex gap-2 hide-scrollbar border-b border-slate-200/50">
                    {filters.map(filter => (
                        <button 
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-[11px] font-extrabold uppercase tracking-[0.15em] transition-all duration-300 shadow-sm border ${
                                activeFilter === filter 
                                ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105' 
                                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-800'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* News Cards Feed */}
                <div className="flex flex-col gap-6">
                    {filteredUpdates.map((update, index) => (
                        <div key={update.id} className={`group relative bg-white rounded-[16px] p-6 pb-6 shadow-[0_8px_20px_rgba(0,0,0,0.03)] border border-slate-100 border-l-[6px] ${getBorderAccent(update.tagColor)} transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1`}>
                            
                            {/* Top row */}
                            <div className="flex justify-between items-start mb-4">
                                <span className={`inline-flex items-center px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-[0.15em] border ${getTagStyles(update.tagColor)}`}>
                                    {update.tag}
                                </span>
                                
                                <button className="text-slate-300 hover:text-yellow-400 hover:scale-110 transition-all cursor-pointer" title="Mark as Important">
                                    <Star size={18} fill="currentColor" strokeWidth={1} />
                                </button>
                            </div>

                            {/* Content */}
                            <h2 className="text-[18px] md:text-[20px] font-extrabold text-slate-800 mb-2 leading-snug group-hover:text-[#0462C3] transition-colors">{update.title}</h2>
                            <p className="text-[13px] font-medium text-slate-500 leading-relax mb-6">{update.desc}</p>
                            
                            {/* Bottom row */}
                            <div className="flex items-center gap-2 text-slate-400 bg-[#f8fafd] px-4 py-3 rounded-lg border border-slate-100">
                                <Clock size={14} className="text-slate-400" />
                                <span className="text-[12px] font-bold text-slate-600 tracking-wide">{update.date}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredUpdates.length === 0 && (
                    <div className="text-center py-20">
                        <AlertCircle size={40} className="mx-auto text-slate-300 mb-4" />
                        <h3 className="text-lg font-bold text-slate-600">No updates found</h3>
                        <p className="text-sm text-slate-400 mt-1">Try selecting a different category filter</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default News;
