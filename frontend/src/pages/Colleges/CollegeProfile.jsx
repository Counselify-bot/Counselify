import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    ArrowLeft, Bell, BookOpen, Briefcase, Building2, Calendar, ChevronRight,
    CircleUserRound, GraduationCap, Landmark, Mail, MapPin, Plane, ShieldCheck,
    Train, Wallet, Star, Trophy, ArrowUpRight, CheckCircle2, TrendingUp, HelpCircle, Clock, Home
} from 'lucide-react';
import collegeData from '../../data/college_profiles.json';
import iitColleges from '../../data/iit_colleges';
import { getCollegeAssetPaths, handleCampusError, handleLogoError } from '../../utils/collegeAssets';

const fieldLabelMap = {
    caution_money_one_time_refundable: 'Caution Money (Refundable)',
    one_time_fees: 'One-time Fees',
    tuition_fee_per_semester: 'Tuition Fee / Sem',
    other_fees_per_semester: 'Other Fees / Sem',
    annual_fees: 'Annual Fees',
    total: 'Total',
    hostel_caution_money_one_time_refundable: 'Hostel Caution Money',
    mess_caution_money_one_time_refundable: 'Mess Caution Money',
    hostel_seat_rent_per_semester: 'Hostel Seat Rent / Sem',
    electricity_and_water_charges_per_semester: 'Electricity & Water / Sem',
    mess_advance_per_semester: 'Mess Advance / Sem'
};

const slugFromCollegeName = (name) => {
    let slug = name.toLowerCase().replace(/\s+/g, '-').replace('(', '').replace(')', '');
    if (name.includes('(BHU)')) slug = 'iit-bhu-varanasi';
    if (name.includes('(ISM)')) slug = 'iit-ism-dhanbad';
    return slug;
};

const iitCardBySlug = iitColleges.reduce((acc, college) => {
    acc[slugFromCollegeName(college.name)] = {
        ...college,
        campus: getCollegeAssetPaths(college.name).image,
        logo: getCollegeAssetPaths(college.name).logo
    };
    return acc;
}, {});

const tier2ColorPalette = ['#0b5fff', '#0a4da8', '#125cab', '#0f766e', '#3b82f6', '#1d4ed8'];
const campusPalette = ['/colleges/campus1.png', '/colleges/campus2.png', '/colleges/campus3.png', '/colleges/campus4.png'];

const buildCardMapByPrefix = (prefix) =>
    Object.keys(collegeData)
        .filter((key) => key.startsWith(`${prefix}_`))
        .sort()
        .reduce((acc, key, idx) => {
            const institute = collegeData[key]?.institute || {};
            const slug = key.replace(/_/g, '-');
            acc[slug] = {
                name: institute.also_known_as?.[0] || institute.also_known_as_short || institute.name || slug.toUpperCase(),
                campus: getCollegeAssetPaths(key).image,
                logo: getCollegeAssetPaths(key).logo,
                color: tier2ColorPalette[idx % tier2ColorPalette.length]
            };
            return acc;
        }, {});

const nitCardBySlug = buildCardMapByPrefix('nit');
const iiitCardBySlug = buildCardMapByPrefix('iiit');

const resolveProfileKey = (slug, instituteType = 'iit') => {
    if (!slug) return '';
    if (instituteType === 'iit') {
        if (slug === 'iit-bhu-varanasi') return 'iit_bhu';
        if (slug === 'iit-ism-dhanbad') return 'iit_ism_dhanbad';
        if (slug === 'iit-guwahati') return 'iit_guwahati';
    }
    return slug.replace(/-/g, '_');
};

const buildProfileMap = (raw, instituteType = 'iit') => {
    const profiles = {};
    Object.keys(raw)
        .filter((key) => key.startsWith(`${instituteType}_`))
        .forEach((key) => {
            profiles[key] = raw[key];
        });

    if (instituteType === 'iit') {
        profiles.iit_guwahati = {
            institute: raw.institute,
            fee_waivers: raw.fee_waivers,
            mode_of_admission: raw.mode_of_admission,
            courses_offered: raw.courses_offered,
            fees: raw.fees,
            placements_2024: raw.placements_2024,
            rankings: raw.rankings
        };
    }
    return profiles;
};

const formatCurrency = (value) => {
    if (value === null || value === undefined) return 'Not Published';
    return `₹${Number(value).toLocaleString('en-IN')}`;
};

const formatLpa = (value) => {
    if (value === null || value === undefined) return 'Not Published';
    return `${value} LPA`;
};

const formatPercent = (value) => {
    if (value === null || value === undefined) return 'N/A';
    return `${value}%`;
};

const labelForField = (key) => {
    if (fieldLabelMap[key]) return fieldLabelMap[key];
    return key.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const feeRows = (feeObj) =>
    Object.entries(feeObj || {}).filter(([key]) => key !== 'total').map(([key, value]) => ({
        key,
        label: labelForField(key),
        value: formatCurrency(value)
    }));

// Nav Tabs component
const TabNav = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'overview', label: 'Overview', icon: <BookOpen size={16} /> },
        { id: 'connectivity', label: 'Connectivity', icon: <MapPin size={16} /> },
        { id: 'rankings', label: 'Rankings', icon: <Trophy size={16} /> },
        { id: 'courses', label: 'Courses', icon: <Building2 size={16} /> },
        { id: 'admission', label: 'Admission', icon: <Landmark size={16} /> },
        { id: 'fees', label: 'Fees', icon: <Wallet size={16} /> },
        { id: 'scholarships', label: 'Scholarships', icon: <ShieldCheck size={16} /> },
        { id: 'placements', label: 'Placements', icon: <Briefcase size={16} /> },
    ];

    const handleScroll = (id) => {
        setActiveTab(id);
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -120; // Offset for sticky header + nav
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div className="sticky top-[73px] z-40 bg-white/90 backdrop-blur-2xl border-b border-slate-200/80 shadow-sm py-4 mb-8">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="inline-flex items-center gap-1 p-1.5 bg-slate-100/80 rounded-full border border-black/5 shadow-inner">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => handleScroll(tab.id)}
                            className={`relative flex items-center gap-2.5 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap shrink-0 group ${
                                activeTab === tab.id
                                    ? 'text-white shadow-[0_4px_12px_rgba(4,98,195,0.3)] scale-[1.02]'
                                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/60'
                            }`}
                        >
                            {activeTab === tab.id && (
                                <div className="absolute inset-0 bg-gradient-to-r from-[#0462C3] to-indigo-600 rounded-full -z-10 transition-all duration-300"></div>
                            )}
                            <span className={`relative z-10 flex items-center transition-colors duration-300 ${activeTab === tab.id ? 'text-white/90' : 'text-slate-400 group-hover:text-slate-600'}`}>
                                {tab.icon}
                            </span>
                            <span className="relative z-10 tracking-wide">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const CollegeProfile = ({ instituteType = 'iit' }) => {
    const { slug } = useParams();
    const [activeTab, setActiveTab] = useState('overview');
    const [showGftiModal, setShowGftiModal] = useState(false);
    
    // Setup observer for active section highlighting
    useEffect(() => {
        window.scrollTo(0, 0);
        
        const observerOptions = {
            root: null,
            rootMargin: '-150px 0px -60% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveTab(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        
        // Setup observer after small delay to let DOM paint
        const timeoutId = setTimeout(() => {
            const sections = document.querySelectorAll('section[id]');
            sections.forEach(section => observer.observe(section));
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            observer.disconnect();
        };
    }, []);

    const profileKey = resolveProfileKey(slug, instituteType);
    const profiles = buildProfileMap(collegeData, instituteType);
    const profile = profiles[profileKey];
    
    const cardMapByType = {
        iit: iitCardBySlug,
        nit: nitCardBySlug,
        iiit: iiitCardBySlug
    };
    const cardMap = cardMapByType[instituteType] || {};
    const card = cardMap[slug] || null;
    const instituteLabel = instituteType.toUpperCase();
    const listPath = `/colleges/${instituteType}`;

    if (!profile || !profile.institute) {
        return (
            <div className="pt-40 pb-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">College Not Found</h1>
                <p className="text-slate-500 mb-8">This {instituteLabel} profile is not available or is currently being updated.</p>
                <Link to={listPath} className="px-6 py-3 bg-[#0462C3] text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-[#034a94] transition-colors">
                    View All {instituteLabel}s
                </Link>
            </div>
        );
    }

    const { institute, fee_waivers, mode_of_admission, courses_offered, fees, placements_2024, rankings } = profile;
    const displayName = institute.also_known_as?.[0] || institute.also_known_as_short || institute.name;

    const instituteFeeRows = feeRows(fees?.institute_fee);
    const hostelFeeRows = feeRows(fees?.hostel_fee);
    const branchRows = placements_2024?.chart_data || [];
    const instituteTotal = formatCurrency(fees?.institute_fee?.total);
    const hostelTotal = formatCurrency(fees?.hostel_fee?.total);

    // Get NIRF Rank
    const nirfRanking = rankings?.national?.find(r => r.body.toLowerCase().includes('nirf') && r.category.toLowerCase().includes('engineering'))?.latest;

    const relatedInstitutes = Object.keys(cardMap)
        .filter(k => k !== slug)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(k => {
            const relProfileKey = resolveProfileKey(k, instituteType);
            const relProfile = profiles[relProfileKey];
            const baseCard = cardMap[k];
            return {
                slug: k,
                ...baseCard,
                location: baseCard.location || relProfile?.institute?.location || 'India',
                established: baseCard.established || relProfile?.institute?.established || 'N/A',
                shortCode: relProfile?.institute?.also_known_as_short || (baseCard.name || baseCard.title || '').replace(/^(IIT|NIT|IIIT)\s*/i, '').trim().slice(0, 3).toUpperCase()
            };
        });

    return (
        <div className="bg-[#f8fafc] min-h-screen text-slate-900 pb-32">
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
                            <Link to="/colleges/iit" onClick={() => setShowGftiModal(false)} className="w-full bg-slate-50 text-slate-600 font-bold py-3.5 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200">
                                Explore IITs Instead
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Premium White Glass Header Strip */}
            <header className="sticky top-0 z-50 h-[73px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-b border-slate-200/60 overflow-hidden">
                <div className="absolute inset-0 bg-white/90 backdrop-blur-2xl"></div>
                {/* Subtle soft bottom-shadow inner reflection */}
                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-slate-200/50 to-transparent"></div>
                
                <div className="h-full w-full px-4 md:px-8 flex items-center justify-between gap-3 md:gap-4 relative z-10">
                    <div className="flex items-center gap-3 md:gap-4 min-w-0 group cursor-pointer" onClick={() => window.location.href = '/'}>
                        {/* Premium Home Navigation Element */}
                        <Link to="/" className="hidden md:flex items-center justify-center gap-1.5 px-4 h-10 rounded-full bg-slate-50/80 hover:bg-[#E6F0FF] border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.03)] text-slate-500 hover:text-[#0462C3] hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-300 shrink-0">
                            <Home size={15} strokeWidth={2.5} className="group-hover:-translate-y-[1px] transition-transform" />
                            <span className="text-[13px] font-extrabold tracking-wide">Home</span>
                        </Link>
                        {/* Mobile Home Icon */}
                        <Link to="/" title="Go to Home" className="flex md:hidden items-center justify-center h-10 w-10 rounded-full bg-slate-50 border border-slate-200 shadow-sm text-slate-500 hover:bg-[#E6F0FF] hover:text-[#0462C3] hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-300 shrink-0">
                            <Home size={18} strokeWidth={2.5} />
                        </Link>
                        
                        {/* Premium BOM Identity Chip */}
                        <div className="relative group/badge shrink-0">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/40 to-cyan-400/40 rounded-full blur-md opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative h-9 w-9 md:h-11 md:w-11 rounded-[12px] flex items-center justify-center text-[10px] md:text-xs font-black shadow-[0_4px_10px_rgba(4,98,195,0.3)] group-hover/badge:-translate-y-[1px] group-hover/badge:shadow-[0_6px_15px_rgba(4,98,195,0.5)] transition-all duration-300 border border-slate-200/50 overflow-hidden bg-white p-[3px]">
                                <img 
                                    src={card?.logo} 
                                    onError={handleLogoError((displayName.replace(/^(IIT|NIT|IIIT)\s*/i, '').trim().slice(0, 3).toUpperCase() || instituteLabel), card?.color)}
                                    alt={`${instituteLabel} Logo`} 
                                    className="w-full h-full object-contain" 
                                />
                            </div>
                        </div>
                        
                        {/* Refined Typography Light Theme */}
                        <div className="min-w-0 mr-4">
                            <p className="text-base md:text-[19px] font-extrabold text-slate-800 truncate tracking-tight group-hover:text-[#0462C3] transition-colors">{displayName}</p>
                        </div>
                    </div>

                    {/* Right Side: Category Switch Navigation Bar */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-0 shrink-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {[
                            { id: 'iit', label: 'IITs', path: '/colleges/iit' },
                            { id: 'nit', label: 'NITs', path: '/colleges/nit' },
                            { id: 'iiit', label: 'IIITs', path: '/colleges/iiit' },
                            { id: 'gfti', label: 'GFTIs', path: '#' }
                        ].map((cat) => {
                            const isActive = instituteType === cat.id;
                            return (
                                <Link
                                    key={cat.id}
                                    to={cat.id === 'gfti' ? '#' : cat.path}
                                    onClick={(e) => {
                                        if (cat.id === 'gfti') {
                                            e.preventDefault();
                                            setShowGftiModal(true);
                                        }
                                    }}
                                    className={`whitespace-nowrap px-4 py-2 flex items-center justify-center rounded-full text-[13px] font-extrabold transition-all duration-300 ${
                                        isActive
                                            ? 'bg-[#0462C3] text-white shadow-[0_4px_12px_rgba(4,98,195,0.3)] pointer-events-none'
                                            : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-[#0462C3] hover:-translate-y-0.5'
                                    }`}
                                >
                                    {cat.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </header>

            {/* Premium Hero Section */}
            <div className="relative w-full h-[450px] md:h-[550px] mt-0 overflow-hidden bg-slate-900">
                <img 
                    src={card?.campus || '/colleges/campus1.png'} 
                    onError={handleCampusError}
                    alt={institute.name}
                    className="absolute inset-0 w-full h-full object-cover scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-slate-900/20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
                <div className="absolute inset-0 bg-[#0462C3] mix-blend-overlay opacity-30 pointer-events-none"></div>
                
                <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="absolute bottom-0 inset-x-0 p-6 md:p-12 xl:px-20 max-w-[1400px] mx-auto w-full z-10 flex flex-col justify-end">
                    
                    <div className="flex flex-wrap gap-3 mb-5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-[11px] font-bold border border-white/20 shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:bg-white/20 transition-all cursor-default">
                            <Landmark size={14} className="text-blue-200" /> Govt. Institute
                        </span>
                        {institute.established && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-[11px] font-bold border border-white/20 shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:bg-white/20 transition-all cursor-default">
                                <Calendar size={14} className="text-blue-200" /> Est. {institute.established}
                            </span>
                        )}
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-[11px] font-bold border border-white/20 shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:bg-white/20 transition-all cursor-default">
                            <MapPin size={14} className="text-blue-200" /> {institute.location || 'Not Published'}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight mb-8 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                        {institute.name}
                    </h1>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mt-auto">
                        {nirfRanking && (
                            <div className="relative group cursor-default">
                                <div className="absolute -inset-1 bg-gradient-to-r from-amber-300 via-yellow-500 to-orange-500 rounded-2xl blur opacity-60 group-hover:opacity-100 animate-pulse transition duration-500"></div>
                                <div className="relative flex items-center gap-2.5 px-5 py-3 bg-slate-900 rounded-2xl border border-white/10 shadow-xl">
                                    <Trophy size={18} className="text-amber-400" />
                                    <span className="text-white font-extrabold tracking-widest text-xs uppercase">NIRF Rank <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 text-lg ml-1">#{nirfRanking}</span></span>
                                </div>
                            </div>
                        )}
                        <Link to={`/college-predictor/${instituteType.toLowerCase()}`} className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#0462C3] to-cyan-600 hover:from-cyan-600 hover:to-[#0462C3] text-white font-black shadow-[0_4px_20px_rgba(4,98,195,0.4)] hover:shadow-[0_8px_30px_rgba(4,98,195,0.6)] hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300 w-full sm:w-auto text-center border border-cyan-400/30">
                            Predict My Chances <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>

            <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="max-w-[1400px] mx-auto px-4 md:px-8 space-y-12">

                {/* 1. OVERVIEW */}
                <section id="overview" className="scroll-mt-32">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-8 w-8 rounded-lg bg-blue-100 text-[#0462C3] flex items-center justify-center shrink-0">
                            <BookOpen size={18} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">Overview</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        <div className="bg-white/70 backdrop-blur-md p-6 rounded-[24px] border border-white shadow-[0_10px_25px_rgba(0,0,0,0.04),0_2px_6px_rgba(0,0,0,0.03)] hover:-translate-y-[2px] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.04)] hover:border-white/80 transition-all duration-300 group">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-50 to-slate-100/50 shadow-inner border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#0462C3] group-hover:shadow-sm transition-all"><CircleUserRound size={18}/></div>
                                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Also Known As</p>
                            </div>
                            <p className="text-xl font-bold text-slate-800">{institute.also_known_as_short || displayName}</p>
                        </div>
                        <div className="bg-white/70 backdrop-blur-md p-6 rounded-[24px] border border-white shadow-[0_10px_25px_rgba(0,0,0,0.04),0_2px_6px_rgba(0,0,0,0.03)] hover:-translate-y-[2px] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.04)] hover:border-white/80 transition-all duration-300 group">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-50 to-slate-100/50 shadow-inner border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#0462C3] group-hover:shadow-sm transition-all"><Landmark size={18}/></div>
                                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Institute Type</p>
                            </div>
                            <p className="text-xl font-bold text-slate-800 uppercase">{institute.type || 'Not Published'}</p>
                        </div>
                        <div className="bg-white/70 backdrop-blur-md p-6 rounded-[24px] border border-white shadow-[0_10px_25px_rgba(0,0,0,0.04),0_2px_6px_rgba(0,0,0,0.03)] hover:-translate-y-[2px] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.04)] hover:border-white/80 transition-all duration-300 group">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-50 to-slate-100/50 shadow-inner border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#0462C3] group-hover:shadow-sm transition-all"><Calendar size={18}/></div>
                                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Established</p>
                            </div>
                            <p className="text-xl font-bold text-slate-800">{institute.established || 'Not Published'}</p>
                        </div>
                        <div className="bg-white/70 backdrop-blur-md p-6 rounded-[24px] border border-white shadow-[0_10px_25px_rgba(0,0,0,0.04),0_2px_6px_rgba(0,0,0,0.03)] hover:-translate-y-[2px] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.04)] hover:border-white/80 transition-all duration-300 group">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-50 to-slate-100/50 shadow-inner border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#0462C3] group-hover:shadow-sm transition-all"><MapPin size={18}/></div>
                                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Location</p>
                            </div>
                            <p className="text-xl font-bold text-slate-800 truncate">{institute.location || 'Not Published'}</p>
                        </div>
                    </div>
                </section>

                {/* 2. LOCATION & CONNECTIVITY */}
                <section id="connectivity" className="scroll-mt-32">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-8 w-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                            <MapPin size={18} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">Location & Connectivity</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                        <div className="md:col-span-1 bg-slate-50 rounded-[32px] border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] p-6 md:p-8 flex flex-col justify-center h-full hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.06)] transition-shadow">
                            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2"><MapPin size={14}/> Full Address</p>
                            <p className="text-slate-800 font-bold text-lg leading-relaxed">{institute.address}</p>
                        </div>
                        
                        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
                            <div className="bg-[#f0f9ff] rounded-[32px] border border-sky-100 p-6 md:p-8 flex flex-col h-full hover:shadow-[0_12px_24px_-8px_rgba(14,165,233,0.15)] transition-shadow">
                                <div className="h-12 w-12 bg-white text-sky-500 rounded-[14px] flex items-center justify-center mb-6 shadow-sm border border-sky-100/50">
                                    <Plane size={24} />
                                </div>
                                <p className="text-[11px] font-bold uppercase tracking-widest text-sky-500 mb-2">Nearest Airport</p>
                                <p className="text-xl font-black text-slate-800 mb-6 leading-tight">{institute.nearest_airport?.name || 'Not Published'}</p>
                                <div className="mt-auto inline-flex items-center gap-1.5 self-start px-3 py-1.5 bg-white rounded-lg text-sky-600 text-xs font-bold shadow-sm border border-sky-100/50">
                                    <MapPin size={12} /> {institute.nearest_airport?.distance_km} km away
                                </div>
                            </div>

                            <div className="bg-[#ecfdf5] rounded-[32px] border border-emerald-100 p-6 md:p-8 flex flex-col h-full hover:shadow-[0_12px_24px_-8px_rgba(16,185,129,0.15)] transition-shadow">
                                <div className="h-12 w-12 bg-white text-emerald-500 rounded-[14px] flex items-center justify-center mb-6 shadow-sm border border-emerald-100/50">
                                    <Train size={24} />
                                </div>
                                <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-500 mb-2">Nearest Railway Station</p>
                                <p className="text-xl font-black text-slate-800 mb-6 leading-tight">{institute.nearest_railway_station?.name || 'Not Published'}</p>
                                <div className="mt-auto inline-flex items-center gap-1.5 self-start px-3 py-1.5 bg-white rounded-lg text-emerald-600 text-xs font-bold shadow-sm border border-emerald-100/50">
                                    <MapPin size={12} /> {institute.nearest_railway_station?.distance_km} km away
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. RANKINGS */}
                <section id="rankings" className="scroll-mt-32">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-8 w-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                            <Trophy size={18} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">Rankings</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                        {/* National */}
                        <div className="bg-white rounded-[24px] border border-slate-200/60 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-4 flex items-center gap-2"><Trophy size={14}/> National Rankings</h3>
                            <div className="space-y-0 divide-y divide-slate-100">
                                {(rankings?.national || []).map((row, idx) => (
                                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between py-3.5 group">
                                        <div className="pr-4 mb-2 sm:mb-0">
                                            <p className="font-bold text-slate-700 text-sm leading-snug group-hover:text-slate-900 transition-colors">{row.category}</p>
                                            <div className="flex gap-2 mt-1.5">
                                                <span className="inline-flex px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest bg-blue-50 text-[#0462C3]">{row.body}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-end gap-5 shrink-0 sm:text-right">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rank</span>
                                                <span className="text-base font-black text-slate-800">{row.latest}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Year</span>
                                                <span className="text-sm font-medium text-slate-500">2025</span>
                                            </div>
                                            {row.previous && (
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Prev</span>
                                                    <span className="text-sm font-medium text-slate-400">{row.previous}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {(!rankings?.national || rankings.national.length === 0) && (
                                    <p className="text-slate-500 italic text-sm py-4">No national ranking data available.</p>
                                )}
                            </div>
                        </div>

                        {/* International */}
                        <div className="bg-white rounded-[24px] border border-slate-200/60 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-4 flex items-center gap-2"><MapPin size={14}/> International Rankings</h3>
                            <div className="space-y-0 divide-y divide-slate-100">
                                {(rankings?.international || []).map((row, idx) => (
                                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between py-3.5 group">
                                        <div className="pr-4 mb-2 sm:mb-0">
                                            <p className="font-bold text-slate-700 text-sm leading-snug group-hover:text-slate-900 transition-colors">{row.category}</p>
                                            <div className="flex gap-2 mt-1.5">
                                                <span className="inline-flex px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600">{row.body}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-end gap-5 shrink-0 sm:text-right">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rank</span>
                                                <span className="text-base font-black text-slate-800">{row.latest}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Year</span>
                                                <span className="text-sm font-medium text-slate-500">2025</span>
                                            </div>
                                            {row.previous && (
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Prev</span>
                                                    <span className="text-sm font-medium text-slate-400">{row.previous}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {(!rankings?.international || rankings.international.length === 0) && (
                                    <p className="text-slate-500 italic text-sm py-4">International ranking data not available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. COURSES & BRANCHES */}
                <section id="courses" className="scroll-mt-32">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-8 w-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                            <Building2 size={18} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">Courses & Branches</h2>
                    </div>

                    <div className="bg-slate-50/50 rounded-[24px] border border-slate-200/60 p-6 md:p-8 shadow-[0_10px_25px_rgba(0,0,0,0.04)]">
                        <div className="flex flex-wrap items-center gap-3 mb-8 pb-6 border-b border-slate-200/70">
                            <div className="flex items-center gap-2.5 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Program</span>
                                <span className="text-sm font-bold text-slate-800">{courses_offered?.program || 'Not Published'}</span>
                            </div>
                            <div className="flex items-center gap-2.5 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Duration</span>
                                <span className="text-sm font-bold text-slate-800">{courses_offered?.duration_years ? `${courses_offered.duration_years} Years` : 'Not Published'}</span>
                            </div>
                            <div className="flex items-center gap-2.5 px-4 py-2 bg-blue-50/50 rounded-full border border-blue-100 shadow-sm">
                                <span className="text-[11px] font-bold uppercase tracking-widest text-blue-400">Total Branches</span>
                                <span className="text-sm font-bold text-[#0462C3]">{(courses_offered?.branches || []).length} Options</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 md:gap-4">
                            {(courses_offered?.branches || []).map((branch, idx) => (
                                <div key={idx} className="group relative flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-black/5 bg-white text-slate-700 font-medium text-sm hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:border-black/10 hover:text-slate-900 hover:font-bold cursor-default transition-all duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.03)] overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/80 to-slate-50/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#0462C3] transition-colors relative z-10 drop-shadow-sm"></div>
                                    <span className="relative z-10 leading-none pb-[1px]">{branch}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. ADMISSION PROCESS */}
                <section id="admission" className="scroll-mt-32">
                    <div className="flex flex-col gap-2 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-rose-100 to-rose-50 text-rose-600 flex items-center justify-center shrink-0 shadow-inner border border-rose-100">
                                <Landmark size={20} />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">Admission Process</h2>
                        </div>
                        <p className="text-slate-500 font-medium pl-[52px]">Step-by-step path to secure admission</p>
                    </div>

                    <div className="bg-[#f8fafc] rounded-[24px] border border-slate-200/60 p-6 md:p-8 shadow-[0_10px_30px_rgba(15,23,42,0.05),0_2px_8px_rgba(15,23,42,0.04)] relative overflow-hidden">
                        {/* Faint top-left spotlight */}
                        <div className="absolute -top-32 -left-32 w-64 h-64 bg-white opacity-60 rounded-full blur-[80px] pointer-events-none"></div>

                        <div className="space-y-3 relative before:absolute before:inset-0 before:ml-[39px] md:before:ml-[47px] before:w-0.5 before:-z-0 before:bg-gradient-to-b before:from-slate-200 before:to-transparent z-10 pt-2">
                            {(mode_of_admission || []).map((step, idx) => (
                                <div key={idx} className="relative flex items-center gap-5 md:gap-6 p-4 rounded-2xl border border-transparent hover:border-slate-200/50 hover:bg-white hover:shadow-[0_8px_20px_rgba(15,23,42,0.04)] hover:-translate-y-[2px] transition-all duration-300 group z-10">
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-[18px] bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-[0_4px_12px_rgba(15,23,42,0.03)] flex items-center justify-center shrink-0 relative overflow-hidden group-hover:border-[#0462C3]/20 group-hover:shadow-[0_4px_15px_rgba(4,98,195,0.15)] transition-all">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <span className="text-[#0462C3] font-black text-xl md:text-2xl relative z-10">{String(idx + 1).padStart(2, '0')}</span>
                                    </div>
                                    <div className="pt-0.5">
                                        <p className="text-base md:text-lg text-slate-700 leading-snug font-bold group-hover:text-slate-900 transition-colors">{step}</p>
                                    </div>
                                </div>
                            ))}
                            {(!mode_of_admission || mode_of_admission.length === 0) && (
                                <p className="text-slate-500 italic px-4">Admission process details are not currently mapped.</p>
                            )}
                        </div>
                    </div>
                </section>

                {/* 6. FEES STRUCTURE */}
                <section id="fees" className="scroll-mt-32">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-8 w-8 rounded-lg bg-[#0462C3]/10 text-[#0462C3] flex items-center justify-center shrink-0">
                            <Wallet size={18} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">Fee Structure</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white rounded-[32px] border border-slate-200/70 shadow-sm overflow-hidden flex flex-col">
                            <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-slate-800">Institute Fees</h3>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Total (Approx)</p>
                                    <p className="text-xl font-black text-[#0462C3]">{instituteTotal}</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="space-y-3">
                                    {instituteFeeRows.map((row) => (
                                        <div key={row.key} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0 last:pb-0">
                                            <span className="text-sm font-semibold text-slate-600">{row.label}</span>
                                            <span className="text-sm font-black text-slate-800">{row.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[32px] border border-slate-200/70 shadow-sm overflow-hidden flex flex-col">
                            <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-slate-800">Hostel & Mess Fees</h3>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Total (Approx)</p>
                                    <p className="text-xl font-black text-[#0462C3]">{hostelTotal}</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="space-y-3">
                                    {hostelFeeRows.map((row) => (
                                        <div key={row.key} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0 last:pb-0">
                                            <span className="text-sm font-semibold text-slate-600">{row.label}</span>
                                            <span className="text-sm font-black text-slate-800">{row.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 7. SCHOLARSHIPS */}
                <section id="scholarships" className="scroll-mt-32">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-8 w-8 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center shrink-0">
                            <ShieldCheck size={18} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">Scholarships & Fee Waivers</h2>
                    </div>

                    <div className="bg-gradient-to-br from-white to-slate-50 rounded-[32px] border border-slate-200/70 shadow-sm p-6 md:p-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {(fee_waivers || []).map((item, idx) => (
                                <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="mt-0.5 shrink-0 h-6 w-6 rounded-full bg-teal-50 flex items-center justify-center text-teal-500">
                                        <CheckCircle2 size={16} />
                                    </div>
                                    <p className="text-slate-700 font-bold leading-relaxed">{item}</p>
                                </div>
                            ))}
                            {(!fee_waivers || fee_waivers.length === 0) && (
                                <p className="text-slate-500 italic p-4">No specific scholarship data mapped.</p>
                            )}
                        </div>
                    </div>
                </section>

                {/* 8. PLACEMENTS */}
                <section id="placements" className="scroll-mt-32">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                                <TrendingUp size={18} />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">Placement Statistics</h2>
                        </div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 text-sm font-bold shadow-sm self-start sm:self-auto">
                            Batch of 2024
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                        {/* Overall Placed */}
                        <div className="bg-blue-50/50 rounded-[24px] border border-blue-100/50 p-6 shadow-[0_8px_20px_rgba(15,23,42,0.03)] hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(15,23,42,0.05)] transition-all duration-300 relative overflow-hidden group">
                            <TrendingUp size={64} strokeWidth={1} className="absolute -right-4 -bottom-4 text-blue-500/10 group-hover:scale-110 group-hover:text-blue-500/15 transition-transform duration-500" />
                            <p className="text-[11px] uppercase tracking-widest font-extrabold text-blue-400 mb-2 relative z-10">Overall Placed</p>
                            <p className="text-3xl md:text-3xl lg:text-4xl font-black text-blue-950 tracking-tight relative z-10">{formatPercent(placements_2024?.overall_btech_placed_percent)}</p>
                        </div>

                        {/* Average CTC */}
                        <div className="bg-indigo-50/50 rounded-[24px] border border-indigo-100/50 p-6 shadow-[0_8px_20px_rgba(15,23,42,0.03)] hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(15,23,42,0.05)] transition-all duration-300 relative overflow-hidden group">
                            <Briefcase size={64} strokeWidth={1} className="absolute -right-4 -bottom-4 text-indigo-500/10 group-hover:scale-110 group-hover:text-indigo-500/15 transition-transform duration-500" />
                            <p className="text-[11px] uppercase tracking-widest font-extrabold text-indigo-400 mb-2 relative z-10">Average CTC</p>
                            <p className="text-3xl md:text-3xl lg:text-4xl font-black text-indigo-950 tracking-tight relative z-10">{formatLpa(placements_2024?.average_ctc_overall_btech_lpa)}</p>
                        </div>

                        {/* Median CTC */}
                        <div className="bg-purple-50/50 rounded-[24px] border border-purple-100/50 p-6 shadow-[0_8px_20px_rgba(15,23,42,0.03)] hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(15,23,42,0.05)] transition-all duration-300 relative overflow-hidden group">
                            <Wallet size={64} strokeWidth={1} className="absolute -right-4 -bottom-4 text-purple-500/10 group-hover:scale-110 group-hover:text-purple-500/15 transition-transform duration-500" />
                            <p className="text-[11px] uppercase tracking-widest font-extrabold text-purple-400 mb-2 relative z-10">Median CTC</p>
                            <p className="text-3xl md:text-3xl lg:text-4xl font-black text-purple-950 tracking-tight relative z-10">{formatLpa(placements_2024?.median_ctc_overall_btech_lpa)}</p>
                        </div>

                        {/* Max CTC */}
                        <div className={`${placements_2024?.max_ctc_overall_btech_lpa ? 'bg-emerald-50/50 border-emerald-100/50 text-emerald-950' : 'bg-slate-50 border-slate-200/50 text-slate-800'} rounded-[24px] border p-6 shadow-[0_8px_20px_rgba(15,23,42,0.03)] hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(15,23,42,0.05)] transition-all duration-300 relative overflow-hidden group`}>
                            <ArrowUpRight size={64} strokeWidth={1} className={`absolute -right-4 -bottom-4 ${placements_2024?.max_ctc_overall_btech_lpa ? 'text-emerald-500/10 group-hover:text-emerald-500/15' : 'text-slate-400/10 group-hover:text-slate-400/15'} group-hover:scale-110 transition-transform duration-500`} />
                            <p className={`text-[11px] uppercase tracking-widest font-extrabold ${placements_2024?.max_ctc_overall_btech_lpa ? 'text-emerald-500' : 'text-slate-400'} mb-2 relative z-10`}>Max CTC</p>
                            <p className="text-3xl md:text-3xl lg:text-4xl font-black tracking-tight relative z-10">{formatLpa(placements_2024?.max_ctc_overall_btech_lpa)}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-[32px] border border-slate-200/70 p-1 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[700px]">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-100">
                                        <th className="px-6 py-4 text-xs uppercase tracking-widest text-slate-400 font-extrabold">Branch</th>
                                        <th className="px-6 py-4 text-xs uppercase tracking-widest text-slate-400 font-extrabold text-right">Registered</th>
                                        <th className="px-6 py-4 text-xs uppercase tracking-widest text-slate-400 font-extrabold text-right">Placed</th>
                                        <th className="px-6 py-4 text-xs uppercase tracking-widest text-slate-400 font-extrabold text-right">Placed %</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {branchRows.map((row, idx) => (
                                        <tr key={`${row.branch_code}-${idx}`} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-extrabold text-slate-800">{row.branch}</p>
                                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{row.branch_code}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-slate-600 text-right">{row.registered}</td>
                                            <td className="px-6 py-4 text-sm font-bold text-slate-600 text-right">{row.placed}</td>
                                            <td className="px-6 py-4 w-[200px] text-right">
                                                {row.placed_percent !== null ? (
                                                    <div className="flex flex-col gap-2 justify-end">
                                                        <span className="text-sm font-black text-[#0462C3]">{row.placed_percent}%</span>
                                                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden flex justify-start">
                                                            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: `${row.placed_percent}%` }}></div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm font-black text-slate-400 block">N/A</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* 9. PREDICTOR CTA */}
                <section className="relative overflow-hidden rounded-[24px] shadow-[0_10px_40px_-10px_rgba(4,98,195,0.3)] mt-12 bg-gradient-to-br from-[#0a192f] via-[#0f2c59] to-[#0462C3] border border-[#0462C3]/20 mx-auto max-w-5xl">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(4,98,195,0.4),transparent_50%)] pointer-events-none"></div>
                    
                    <div className="relative z-10 p-8 md:p-12 max-w-4xl mx-auto text-center text-white flex flex-col items-center">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 mb-6 shadow-xl">
                            <ArrowUpRight size={24} className="text-blue-200" />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-4 leading-tight drop-shadow-md">
                            Check Your Chances at <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-cyan-200">{displayName}</span>
                        </h3>
                        <p className="text-base md:text-lg text-blue-100/80 font-medium mb-8 max-w-2xl text-balance">
                            Use our AI predictor to see if your rank is enough to secure a seat in your favorite branch here, completely based on 2025 cutoff realities.
                        </p>
                        <Link
                            to={`/college-predictor/${instituteType.toLowerCase()}`}
                            className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-wide shadow-[0_4px_20px_rgba(4,98,195,0.4)] hover:shadow-[0_8px_30px_rgba(4,98,195,0.6)] border border-blue-300 transition-all duration-300"
                        >
                            Predict Admission <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                    </div>
                </section>

                {/* 10. EXPLORE OTHER COLLEGES */}
                {relatedInstitutes.length > 0 && (
                    <section className="mt-20 pt-16 border-t border-slate-200/60 max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-4">Discover More {instituteLabel}s</h3>
                            <p className="text-slate-500 font-medium md:text-lg max-w-2xl mx-auto">Compare other top {instituteLabel}s and explore their fees, placements, rankings, and campus details.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {relatedInstitutes.map((college) => (
                                <Link
                                    key={college.slug}
                                    to={`/colleges/${instituteType}/${college.slug}`}
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="group bg-white rounded-[28px] overflow-hidden border border-slate-200/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-xl hover:-translate-y-1 hover:border-slate-300 transition-all duration-500 block"
                                >
                                    {/* Campus Image */}
                                    <div className="relative h-48 md:h-52 overflow-hidden border-b border-slate-100">
                                        <img
                                            src={college.campus || '/colleges/campus1.png'}
                                            alt={`${college.name || college.title} Campus`}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        {/* Subtle Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                                    </div>

                                    {/* Logo & Info */}
                                    <div className="relative px-6 pb-8 pt-0">
                                        {/* Logo Circle - overlapping the image */}
                                        <div className="absolute -top-9 left-1/2 -translate-x-1/2">
                                            <div
                                                className={`w-[72px] h-[72px] rounded-full border-[5px] border-white shadow-md flex items-center justify-center text-white font-bold text-sm tracking-wider group-hover:scale-105 transition-transform duration-300 overflow-hidden ${college.logo ? 'bg-white p-1' : 'bg-gradient-to-br from-[#0c4da2] to-cyan-600'}`}
                                                style={!college.logo && college.color ? { background: college.color } : {}}
                                            >
                                                {college.logo ? (
                                                    <img src={college.logo} alt={`${college.shortCode} Logo`} className="w-full h-full object-contain" />
                                                ) : (
                                                    college.shortCode
                                                )}
                                            </div>
                                        </div>

                                        {/* College Details */}
                                        <div className="text-center pt-12">
                                            <h3 className="text-xl font-extrabold text-slate-800 tracking-tight leading-snug group-hover:text-[#0462C3] transition-colors line-clamp-1">
                                                {college.name || college.title}
                                            </h3>
                                            <div className="flex items-center justify-center gap-1.5 mt-3 text-sm text-slate-500 font-bold">
                                                <MapPin size={14} className="text-slate-400 shrink-0" />
                                                <span className="truncate">{college.location}</span>
                                            </div>
                                            <div className="flex items-center justify-center gap-1.5 mt-2 text-xs text-slate-400 font-black uppercase tracking-wider">
                                                <Calendar size={13} className="shrink-0 text-slate-300" />
                                                <span>Est. {college.established}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default CollegeProfile;
