import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Award, GraduationCap, Building2, Cpu, Globe, Clock } from 'lucide-react';
import collegeData from '../../data/college_profiles.json';

const campusPalette = ['/colleges/campus1.png', '/colleges/campus2.png', '/colleges/campus3.png', '/colleges/campus4.png'];
const colorPalette = ['#0b5fff', '#0a4da8', '#125cab', '#0f766e', '#3b82f6', '#1d4ed8'];

const extractNirf = (profile) => {
    const national = profile?.rankings?.national || [];
    const nirfEngineering =
        national.find((item) => /nirf/i.test(item?.body) && /engineering/i.test(item?.category)) ||
        national.find((item) => /nirf/i.test(item?.body));

    if (!nirfEngineering?.latest) return 'NA';
    const match = String(nirfEngineering.latest).match(/\d+/);
    return match ? match[0] : 'NA';
};

const iiitColleges = Object.keys(collegeData)
    .filter((key) => key.startsWith('iiit_'))
    .sort((a, b) => {
        const aName = collegeData[a]?.institute?.also_known_as?.[0] || collegeData[a]?.institute?.name || a;
        const bName = collegeData[b]?.institute?.also_known_as?.[0] || collegeData[b]?.institute?.name || b;
        return aName.localeCompare(bName);
    })
    .map((key, idx) => {
        const profile = collegeData[key];
        const institute = profile?.institute || {};
        return {
            key,
            slug: key.replace(/_/g, '-'),
            name: institute.also_known_as?.[0] || institute.also_known_as_short || institute.name || key.toUpperCase(),
            location: institute.location || 'Location not available',
            established: institute.established || 'NA',
            nirf: extractNirf(profile),
            campus: campusPalette[idx % campusPalette.length],
            color: colorPalette[idx % colorPalette.length]
        };
    });

const IIITColleges = () => {
    const [showGftiModal, setShowGftiModal] = useState(false);

    return (
        <div className="pt-36 pb-32 mesh-gradient-hero min-h-screen">
            {/* GFTI Coming Soon Modal */}
            {showGftiModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowGftiModal(false)}></div>
                    <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 md:p-10 text-center animate-in fade-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 bg-blue-50 text-[#0462C3] rounded-full flex items-center justify-center mx-auto mb-6">
                            <Clock size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-3">GFTI Data Coming Soon</h3>
                        <p className="text-slate-500 mb-8 leading-relaxed">
                            We are currently compiling verified data for Government Funded Technical Institutes. This section will be available very soon.
                        </p>
                        <div className="flex flex-col gap-3">
                            <button onClick={() => setShowGftiModal(false)} className="w-full bg-[#0462C3] text-white font-bold py-3.5 rounded-xl hover:bg-[#034a94] transition-colors shadow-lg shadow-blue-500/20">
                                Got It
                            </button>
                            <button onClick={() => setShowGftiModal(false)} className="w-full bg-slate-50 text-slate-600 font-bold py-3.5 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200">
                                Explore IITs Instead
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="section-container">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary-container transition-colors mb-8"
                >
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>

                <div className="text-center mb-20 space-y-6 max-w-4xl mx-auto">
                    <div className="inline-flex items-center justify-center gap-3 mb-4 group cursor-default">
                        <div className="h-px w-12 bg-[#0462C3]"></div>
                        <span className="text-xs uppercase tracking-[0.4em] font-bold text-[#0462C3] bg-[#0462C3]/10 px-4 py-2 rounded-full">
                            Indian Institutes of Information Technology
                        </span>
                        <div className="h-px w-12 bg-[#0462C3]"></div>
                    </div>
                    <h1 className="text-5xl md:text-[72px] font-bold leading-[1] text-on-surface tracking-tighter">
                        All <span className="serif-font italic font-medium text-[#0462C3]">{iiitColleges.length} IIITs</span> in India
                    </h1>
                    <p className="text-base md:text-lg font-bold text-on-surface-variant italic leading-relaxed max-w-2xl mx-auto pt-4">
                        Explore all IIITs with detailed admission, fees, placements, courses, and rankings from official profile data.
                    </p>
                    <div className="flex items-center justify-center gap-6 pt-4">
                        <div className="flex items-center gap-2 text-sm text-on-surface-variant font-bold">
                            <Award size={16} className="text-primary-container" />
                            <span>{iiitColleges.length} Institutes</span>
                        </div>
                        <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                        <div className="flex items-center gap-2 text-sm text-on-surface-variant font-bold">
                            <MapPin size={16} className="text-primary-container" />
                            <span>Across India</span>
                        </div>
                        <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                        <div className="flex items-center gap-2 text-sm text-on-surface-variant font-bold">
                            <Calendar size={16} className="text-primary-container" />
                            <span>Modern Tech Institutes</span>
                        </div>
                    </div>
                </div>

                {/* Category Switcher Segmented Control */}
                <div className="flex justify-center mb-16 px-4">
                    <div className="inline-flex items-center gap-2 p-1.5 bg-slate-100/90 backdrop-blur-md rounded-full border border-slate-200/60 shadow-[inset_0_2px_6px_rgba(0,0,0,0.03)] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-w-full">
                        {[
                            { id: 'iit', label: 'IITs', icon: GraduationCap, path: '/colleges/iit' },
                            { id: 'nit', label: 'NITs', icon: Building2, path: '/colleges/nit' },
                            { id: 'iiit', label: 'IIITs', icon: Cpu, path: '/colleges/iiit' },
                            { id: 'gfti', label: 'GFTIs', icon: Globe, path: '#' }
                        ].map((cat) => {
                            const isActive = cat.id === 'iiit'; // IIIT active
                            const Icon = cat.icon;
                            return (
                                <Link
                                    key={cat.id}
                                    to={cat.path}
                                    onClick={(e) => {
                                        if (cat.id === 'gfti') {
                                            e.preventDefault();
                                            setShowGftiModal(true);
                                        }
                                    }}
                                    className={`relative flex items-center gap-2.5 px-6 py-2.5 rounded-full text-[14px] font-extrabold transition-all duration-300 shrink-0 select-none overflow-hidden ${
                                        isActive
                                            ? 'text-white shadow-[0_6px_16px_rgba(4,98,195,0.3)] pointer-events-none hover:-translate-y-0'
                                            : 'text-slate-500 hover:text-[#0462C3] hover:bg-white hover:shadow-sm hover:-translate-y-0.5 active:scale-95'
                                    }`}
                                >
                                    {isActive && (
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#0c4da2] to-cyan-500 z-0"></div>
                                    )}
                                    <div className="relative z-10 flex items-center gap-2">
                                        <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "text-cyan-100/90" : "opacity-70"} />
                                        <span className="tracking-wide">{cat.label}</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {iiitColleges.map((college, idx) => (
                        <Link
                            to={`/colleges/iiit/${college.slug}`}
                            key={`${college.key}-${idx}`}
                            className="group bg-white rounded-[28px] overflow-hidden border border-outline-variant/20 shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer block"
                        >
                            <div className="relative h-52 overflow-hidden">
                                <img
                                    src={college.campus}
                                    alt={`${college.name} Campus`}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                                        NIRF #{college.nirf}
                                    </span>
                                </div>
                            </div>

                            <div className="relative px-6 pb-6 pt-0">
                                <div className="absolute -top-9 left-1/2 -translate-x-1/2">
                                    <div
                                        className="w-[72px] h-[72px] rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold text-[11px] tracking-wider"
                                        style={{ backgroundColor: college.color }}
                                    >
                                        {college.name.replace(/^IIIT\s*/i, '').slice(0, 3).toUpperCase() || 'IIIT'}
                                    </div>
                                </div>

                                <div className="text-center pt-12">
                                    <h3 className="text-lg font-bold text-on-surface tracking-tight leading-snug">
                                        {college.name}
                                    </h3>
                                    <div className="flex items-center justify-center gap-1.5 mt-2 text-sm text-on-surface-variant font-medium">
                                        <MapPin size={13} className="text-outline shrink-0" />
                                        <span>{college.location}</span>
                                    </div>
                                    <div className="flex items-center justify-center gap-1.5 mt-1.5 text-xs text-outline font-bold">
                                        <Calendar size={12} className="shrink-0" />
                                        <span>Est. {college.established}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IIITColleges;
