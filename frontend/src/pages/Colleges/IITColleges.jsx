import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Award } from 'lucide-react';
import iitColleges from '../../data/iit_colleges';

const IITColleges = () => {
    return (
        <div className="pt-36 pb-32 bg-transparent min-h-screen">
            <div className="section-container">
                {/* Breadcrumb */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-brand-blue transition-colors mb-8"
                >
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>

                {/* Header */}
                <div className="text-center mb-20 space-y-6 max-w-4xl mx-auto">
                    <div className="inline-flex items-center justify-center gap-3 mb-4 group cursor-default">
                        <div className="h-px w-12 bg-[#0462C3]"></div>
                        <span className="text-xs uppercase tracking-[0.4em] font-black text-[#0462C3] bg-[#0462C3]/10 px-4 py-2 rounded-full">
                            Indian Institutes of Technology
                        </span>
                        <div className="h-px w-12 bg-[#0462C3]"></div>
                    </div>
                    <h1 className="text-5xl md:text-[72px] font-black leading-[1] text-brand-dark tracking-tighter">
                        All <span className="serif-font italic font-medium text-[#0462C3]">23 IITs</span> in India
                    </h1>
                    <p className="text-base md:text-lg font-bold text-slate-500 italic leading-relaxed max-w-2xl mx-auto pt-4">
                        Explore the premier engineering institutions of India. Find details, rankings, and campus insights for every IIT.
                    </p>
                    <div className="flex items-center justify-center gap-6 pt-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600 font-bold">
                            <Award size={16} className="text-brand-blue" />
                            <span>23 Institutes</span>
                        </div>
                        <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 font-bold">
                            <MapPin size={16} className="text-brand-blue" />
                            <span>Across India</span>
                        </div>
                        <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 font-bold">
                            <Calendar size={16} className="text-brand-blue" />
                            <span>Since 1951</span>
                        </div>
                    </div>
                </div>

                {/* College Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {iitColleges.map((college, idx) => (
                        <div
                            key={idx}
                            className="group bg-white rounded-[28px] overflow-hidden border border-slate-100 shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer"
                        >
                            {/* Campus Image */}
                            <div className="relative h-52 overflow-hidden">
                                <img
                                    src={college.campus}
                                    alt={`${college.name} Campus`}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                                {/* NIRF Badge */}
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
                                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-700">
                                        NIRF #{college.nirf}
                                    </span>
                                </div>
                            </div>

                            {/* Logo & Info */}
                            <div className="relative px-6 pb-6 pt-0">
                                {/* Logo Circle - overlapping the image */}
                                <div className="absolute -top-9 left-1/2 -translate-x-1/2">
                                    <div
                                        className="w-[72px] h-[72px] rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-black text-[11px] tracking-wider"
                                        style={{ backgroundColor: college.color }}
                                    >
                                        {college.name
                                            .replace('IIT ', '')
                                            .replace('IIT (', '')
                                            .replace(')', '')
                                            .replace('ISM', 'ISM')
                                            .replace('BHU', 'BHU')
                                            .substring(0, 3)
                                            .toUpperCase()}
                                    </div>
                                </div>

                                {/* College Details */}
                                <div className="text-center pt-12">
                                    <h3 className="text-lg font-black text-brand-dark tracking-tight leading-snug">
                                        {college.name}
                                    </h3>
                                    <div className="flex items-center justify-center gap-1.5 mt-2 text-sm text-slate-500 font-medium">
                                        <MapPin size={13} className="text-slate-400 shrink-0" />
                                        <span>{college.location}</span>
                                    </div>
                                    <div className="flex items-center justify-center gap-1.5 mt-1.5 text-xs text-slate-400 font-bold">
                                        <Calendar size={12} className="shrink-0" />
                                        <span>Est. {college.established}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IITColleges;
