import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import EducationalTip from '../components/EducationalTip';
import {
    Calculator, Search, Building2,
    GraduationCap, Target, ShieldCheck,
    MapPin, Briefcase, ChevronRight,
    User, ArrowRight,
    AlertTriangle, FileText,
    MessageSquare, Sparkles, Home, Globe
} from 'lucide-react';

import josaaData from '../data/josaa_data.json';

const RankPredictor = () => {
    const [formData, setFormData] = useState({
        rank: '',
        category: 'General',
        examType: 'JEE Main',
        gender: 'Gender-Neutral',
        homeState: 'Uttar Pradesh',
        branch: 'Any'
    });

    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [instituteFilter, setInstituteFilter] = useState('all'); // 'all' | 'NIT' | 'IIIT' | 'GFTI'

    const categories = ['General', 'OBC-NCL', 'SC', 'ST', 'EWS', 'General-PwD'];
    const exams = ['JEE Main', 'JEE Advanced'];
    const states = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
        'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
        'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
        'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
        'Uttarakhand', 'West Bengal'
    ];
    const branches = ['Any', 'Computer Science', 'IT', 'ECE', 'Electrical', 'Mechanical', 'Civil', 'Chemical'];

    /* ─── State name to dataset state mapping ─── */
    const stateMapping = {
        'Andhra Pradesh': 'Andhra Pradesh',
        'Arunachal Pradesh': 'Arunachal Pradesh',
        'Assam': 'Assam',
        'Bihar': 'Bihar',
        'Chhattisgarh': 'Chhattisgarh',
        'Delhi': 'Delhi',
        'Goa': 'Goa',
        'Gujarat': 'Gujarat',
        'Haryana': 'Haryana',
        'Himachal Pradesh': 'Himachal Pradesh',
        'Jharkhand': 'Jharkhand',
        'Karnataka': 'Karnataka',
        'Kerala': 'Kerala',
        'Madhya Pradesh': 'Madhya Pradesh',
        'Maharashtra': 'Maharashtra',
        'Manipur': 'Manipur',
        'Meghalaya': 'Meghalaya',
        'Mizoram': 'Mizoram',
        'Nagaland': 'Nagaland',
        'Odisha': 'Odisha',
        'Punjab': 'Punjab',
        'Rajasthan': 'Rajasthan',
        'Sikkim': 'Sikkim',
        'Tamil Nadu': 'Tamil Nadu',
        'Telangana': 'Telangana',
        'Tripura': 'Tripura',
        'Uttar Pradesh': 'Uttar Pradesh',
        'Uttarakhand': 'Uttarakhand',
        'West Bengal': 'West Bengal'
    };

    /* ─── Branch filter helper ─── */
    const matchesBranch = (itemBranch, selectedBranch) => {
        if (selectedBranch === 'Any') return true;
        const sb = selectedBranch.toLowerCase();
        const b = (itemBranch || '').toLowerCase();
        if (sb === 'it' && !b.includes('information technology')) return false;
        else if (sb === 'ece' && !b.includes('electronics and communication')) return false;
        else if (sb === 'computer science' && !b.includes('computer science')) return false;
        else if (sb !== 'it' && sb !== 'ece' && sb !== 'computer science' && !b.includes(sb)) return false;
        return true;
    };

    const handlePredict = (e) => {
        e.preventDefault();
        setLoading(true);
        setInstituteFilter('all'); // reset filter on new prediction

        setTimeout(() => {
            const userRank = parseInt(formData.rank);
            const relaxedRank = Math.floor(userRank * 0.95); // -5% relaxation
            const isAdvanced = formData.examType === 'JEE Advanced';

            // ─── BASE FILTER: category, gender, branch, exam type ───
            const baseFiltered = josaaData.filter(item => {
                if (item.category !== formData.category) return false;
                if (formData.gender === 'Gender-Neutral' && item.gender === 'Female Only') return false;

                const isIIT = item.institute_type === 'IIT';
                if (isAdvanced && !isIIT) return false;
                if (!isAdvanced && isIIT) return false;

                if (!matchesBranch(item.branch, formData.branch)) return false;
                return true;
            });

            // ─── RANK FILTER: closing_rank >= relaxedRank ───
            const rankFiltered = baseFiltered.filter(item => (item.closing_rank || 0) >= relaxedRank);

            const sortByCloseness = (arr) => [...arr].sort((a, b) => {
                const diffA = Math.abs(a.closing_rank - userRank);
                const diffB = Math.abs(b.closing_rank - userRank);
                return diffA - diffB;
            });

            if (isAdvanced) {
                // ════════════════════════════════════════════
                // JEE ADVANCED — UNCHANGED LOGIC
                // ════════════════════════════════════════════
                const aiEligible = rankFiltered.filter(item => item.home_state === 'AI');
                const sortedAI = sortByCloseness(aiEligible).slice(0, 25);

                setPrediction({
                    rank: userRank,
                    relaxedRank,
                    isAdvanced: true,
                    hsColleges: [],
                    aiColleges: sortedAI,
                    allFiltered: rankFiltered, // for institute type filter
                    totalHsEligible: 0,
                    totalAiEligible: aiEligible.length
                });
            } else {
                // ════════════════════════════════════════════
                // JEE MAIN — FIXED LOGIC
                // ════════════════════════════════════════════
                const userState = stateMapping[formData.homeState] || formData.homeState;

                // HOME STATE: NIT + GFTI only, where college state matches user's home state
                // AND home_state field = 'HS'
                // IIITs are EXCLUDED from Home State
                const hsEligible = rankFiltered.filter(item => {
                    if (item.home_state !== 'HS') return false;
                    if (item.institute_type !== 'NIT' && item.institute_type !== 'GFTI') return false;
                    // Check that the college is actually in the user's home state
                    if (item.state !== userState) return false;
                    return true;
                });

                // ALL INDIA / OTHER STATE: NITs + IIITs + GFTIs with OS quota
                const aiEligible = rankFiltered.filter(item => {
                    if (item.home_state !== 'OS') return false;
                    const t = item.institute_type;
                    if (t !== 'NIT' && t !== 'IIIT' && t !== 'GFTI') return false;
                    return true;
                });

                const sortedHS = sortByCloseness(hsEligible).slice(0, 25);
                const sortedAI = sortByCloseness(aiEligible).slice(0, 25);

                setPrediction({
                    rank: userRank,
                    relaxedRank,
                    isAdvanced: false,
                    hsColleges: sortedHS,
                    aiColleges: sortedAI,
                    allFiltered: rankFiltered, // for institute type filter
                    totalHsEligible: hsEligible.length,
                    totalAiEligible: aiEligible.length
                });
            }

            setLoading(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1500);
    };

    const downloadReport = () => alert("Generating your Personalized Strategy Report (PDF)...");
    const callMentor = () => alert("Connecting you with an IIT/NIT Mentor...");

    /* ─── Visible colleges: support institute type filter ─── */
    const visibleHsColleges = useMemo(() => {
        if (!prediction) return [];
        return prediction.hsColleges;
    }, [prediction]);

    const visibleAiColleges = useMemo(() => {
        if (!prediction) return [];
        return prediction.aiColleges;
    }, [prediction]);

    /* ─── Institute-type filtered list (NIT/IIIT/GFTI buttons) ─── */
    const filteredByInstituteType = useMemo(() => {
        if (!prediction || instituteFilter === 'all') return null;
        const userRank = prediction.rank;
        const filtered = prediction.allFiltered
            .filter(item => item.institute_type === instituteFilter)
            .sort((a, b) => Math.abs(a.closing_rank - userRank) - Math.abs(b.closing_rank - userRank))
            .slice(0, 25);
        return filtered;
    }, [prediction, instituteFilter]);

    const isAdvanced = formData.examType === 'JEE Advanced';

    // Reusable college table component
    const CollegeTable = ({ title, icon: Icon, iconColor, colleges, visibleColleges, totalEligible, quotaTag, emptyMessage }) => (
        <div className="relative">
            <div className="bg-white rounded-2xl editorial-shadow border border-transparent overflow-hidden">
                {/* Table Title */}
                <div className="px-6 py-5 border-b border-outline-variant/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${iconColor}`}>
                            <Icon size={18} />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">{title}</h3>
                            <p className="text-[10px] font-bold text-outline uppercase tracking-widest mt-0.5">
                                {visibleColleges.length} shown · {totalEligible} eligible
                            </p>
                        </div>
                    </div>
                    <span className="px-3 py-1 bg-primary-fixed text-primary-container rounded-full text-[10px] font-bold uppercase tracking-widest">
                        {quotaTag}
                    </span>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-12 gap-2 px-5 py-3 bg-primary-fixed/20 border-b border-outline-variant/20">
                    <div className="col-span-1 text-[9px] font-bold uppercase tracking-widest text-outline">#</div>
                    <div className="col-span-4 text-[9px] font-bold uppercase tracking-widest text-outline">College</div>
                    <div className="col-span-3 text-[9px] font-bold uppercase tracking-widest text-outline">Branch</div>
                    <div className="col-span-2 text-[9px] font-bold uppercase tracking-widest text-outline text-right">Close Rank</div>
                    <div className="col-span-2 text-[9px] font-bold uppercase tracking-widest text-outline text-right">Match</div>
                </div>

                {/* Table Body */}
                {visibleColleges.length > 0 ? visibleColleges.map((college, idx) => {
                    const diff = college.closing_rank - prediction.rank;
                    const isAbove = diff >= 0;
                    const matchLabel = isAbove ? 'Safe' : 'Reach';
                    const matchColor = isAbove
                        ? 'text-green-600 bg-green-50'
                        : 'text-amber-600 bg-amber-50';

                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.03 }}
                            className="grid grid-cols-12 gap-2 px-5 py-4 border-b border-outline-variant/15 hover:bg-primary-fixed/10 transition-all group cursor-pointer items-center"
                        >
                            <div className="col-span-1 text-xs font-bold text-outline-variant serif-font italic">
                                {idx + 1}
                            </div>
                            <div className="col-span-4">
                                <p className="text-xs font-bold text-on-surface leading-tight group-hover:text-primary-container transition-colors line-clamp-2" title={college.college_name}>
                                    {college.college_name}
                                </p>
                                {college.institute_type && (
                                    <span className="text-[8px] font-bold uppercase tracking-widest text-outline-variant mt-0.5 inline-block">
                                        {college.institute_type}
                                    </span>
                                )}
                            </div>
                            <div className="col-span-3">
                                <p className="text-[10px] font-bold text-on-surface-variant line-clamp-2" title={college.branch}>
                                    {college.branch}
                                </p>
                            </div>
                            <div className="col-span-2 text-right">
                                <span className="text-xs font-bold text-on-surface serif-font italic">
                                    {college.closing_rank?.toLocaleString()}
                                </span>
                            </div>
                            <div className="col-span-2 text-right">
                                <span className={`px-2 py-1 rounded-lg text-[9px] font-bold uppercase ${matchColor}`}>
                                    {matchLabel}
                                </span>
                            </div>
                        </motion.div>
                    );
                }) : (
                    <div className="p-12 text-center">
                        <div className="text-outline-variant mb-3">
                            <AlertTriangle size={32} className="mx-auto opacity-50" />
                        </div>
                        <p className="text-outline italic font-bold text-xs leading-relaxed max-w-xs mx-auto">
                            {emptyMessage}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );

    /* ─── Institute Filter — Premium Segmented Control ─── */
    const InstituteFilterBar = () => {
        const filters = [
            { key: 'all', label: 'ALL RESULTS' },
            { key: 'NIT', label: 'NIT' },
            { key: 'IIIT', label: 'IIIT' },
            { key: 'GFTI', label: 'GFTI' },
        ];
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-100/80 backdrop-blur-sm rounded-[20px] p-1.5 inline-flex items-center gap-1 editorial-shadow border border-slate-200/60"
            >
                {filters.map(f => (
                    <button
                        key={f.key}
                        onClick={() => setInstituteFilter(f.key)}
                        className={`relative px-7 py-3 rounded-[16px] text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 ease-out ${
                            instituteFilter === f.key
                                ? 'bg-[#0462C3] text-white shadow-[0_4px_16px_rgba(4,98,195,0.35)] scale-[1.02]'
                                : 'bg-transparent text-slate-500 hover:text-slate-800 hover:bg-white/60 hover:scale-[1.02]'
                        }`}
                    >
                        {f.label}
                    </button>
                ))}
            </motion.div>
        );
    };

    return (
        <div className="pt-24 md:pt-32 pb-32 mesh-gradient-hero min-h-screen">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl text-left">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20 space-y-4"
                >
                    <span className="inline-block px-4 py-1.5 bg-primary-fixed text-primary-container text-xs font-bold uppercase tracking-[0.2em] rounded-full">
                        Precision Analytics Engine
                    </span>
                    <h1 className="text-4xl md:text-7xl font-bold text-on-surface leading-[1.1] mb-5 tracking-tighter">
                        Rank <span className="serif-font italic font-medium text-primary-container">Intelligence</span>
                    </h1>
                    <p className="max-w-xl mx-auto text-on-surface-variant text-sm md:text-base font-bold leading-relaxed italic">
                        Strategic college mapping powered by historical trends and AI optimization.
                    </p>
                </motion.div>

                {!prediction ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-8 glass-panel rounded-2xl editorial-shadow p-10 md:p-16 border border-white relative overflow-hidden text-left"
                        >
                            <div className="absolute top-0 left-0 w-2 h-full bg-primary-container/20"></div>

                            <h2 className="text-2xl font-bold text-on-surface mb-10 flex items-center gap-4">
                                <div className="p-2.5 bg-primary-fixed rounded-xl text-primary-container">
                                    <Calculator size={22} />
                                </div>
                                Personal Profile
                            </h2>

                            <form onSubmit={handlePredict} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                {/* Exam Type */}
                                <div className="md:col-span-2 space-y-6">
                                    <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-outline opacity-80">Select Exam Path</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {exams.map(exam => (
                                            <button
                                                key={exam}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, examType: exam })}
                                                className={`py-3.5 rounded-2xl text-[11px] font-bold transition-all border-2 ${formData.examType === exam
                                                    ? 'bg-primary-container text-white border-primary-container shadow-lg shadow-primary-fixed'
                                                    : 'bg-white text-outline border-outline-variant/10 hover:border-primary-fixed'
                                                    }`}
                                            >
                                                {exam}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Category */}
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold text-outline opacity-80">
                                        <User size={12} className="text-primary-fixed-dim" /> Category
                                    </label>
                                    <select
                                        className="w-full px-7 py-4 bg-primary-fixed/20 border-2 border-transparent rounded-[20px] outline-none focus:border-primary-container/30 focus:bg-white transition-all font-bold text-on-surface-variant text-sm appearance-none"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>
                                {/* CRL Rank */}
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold text-outline opacity-80">
                                        <Target size={12} className="text-primary-fixed-dim" /> Enter your Category Rank
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="e.g. 15000"
                                        className="w-full px-7 py-4 bg-primary-fixed/20 border-2 border-transparent rounded-[20px] outline-none focus:border-primary-container/30 focus:bg-white transition-all text-lg font-bold text-on-surface placeholder:text-outline-variant"
                                        value={formData.rank}
                                        onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                                        required
                                    />
                                </div>


                                {/* Home State */}
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold text-outline opacity-80">
                                        <MapPin size={12} className="text-primary-fixed-dim" /> Home State
                                    </label>
                                    <select
                                        className="w-full px-7 py-4 bg-primary-fixed/20 border-2 border-transparent rounded-[20px] outline-none focus:border-primary-container/30 focus:bg-white transition-all font-bold text-on-surface-variant text-sm appearance-none"
                                        value={formData.homeState}
                                        onChange={(e) => setFormData({ ...formData, homeState: e.target.value })}
                                    >
                                        {states.map(state => <option key={state} value={state}>{state}</option>)}
                                    </select>
                                </div>

                                {/* Gender */}
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold text-outline opacity-80">
                                        Gender Filter
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['Gender-Neutral', 'Female Only'].map(g => (
                                            <button
                                                key={g}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, gender: g })}
                                                className={`py-3.5 rounded-[20px] text-[11px] font-bold border-2 uppercase transition-all ${formData.gender === g
                                                    ? 'bg-primary-fixed text-primary-container border-primary-container/20'
                                                    : 'bg-white text-outline border-outline-variant/10 hover:border-primary-fixed'
                                                    }`}
                                            >
                                                {g}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Branch Filter */}
                                <div className="md:col-span-2 space-y-3">
                                    <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold text-outline opacity-80">
                                        <GraduationCap size={12} className="text-primary-fixed-dim" /> Branch Preference
                                    </label>
                                    <select
                                        className="w-full px-7 py-4 bg-primary-fixed/20 border-2 border-transparent rounded-[20px] outline-none focus:border-primary-container/30 focus:bg-white transition-all font-bold text-on-surface-variant text-sm appearance-none"
                                        value={formData.branch}
                                        onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                                    >
                                        {branches.map(b => <option key={b} value={b}>{b}</option>)}
                                    </select>
                                </div>

                                <div className="md:col-span-2 pt-12">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-6 bg-gradient-brand text-white rounded-[24px] font-bold text-xs uppercase tracking-[0.3em] shadow-xl shadow-primary/10 hover:shadow-2xl transition-all duration-500 flex items-center justify-center gap-4 group scale-100 active:scale-95 bg-[length:200%_auto] hover:bg-right"
                                    >
                                        {loading ? (
                                            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                Predict Best Matches
                                                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                            </>
                                        )}
                                    </button>

                                    <div className="mt-10 flex items-center justify-center gap-8 opacity-60">
                                        <div className="flex items-center gap-2 text-xs font-bold text-outline uppercase tracking-widest">
                                            <ShieldCheck size={14} className="text-primary-container" /> Verifying 2025 Trends
                                        </div>
                                        <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                                        <div className="flex items-center gap-2 text-xs font-bold text-outline uppercase tracking-widest">
                                            <ShieldCheck size={14} className="text-primary-container" /> End-to-End Encrypted
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </motion.div>

                        {/* Educational Sidebar */}
                        <div className="lg:col-span-4 space-y-8">
                            <EducationalTip
                                title="What is CRL Rank?"
                                content="Common Rank List is your overall India rank. Use this for the most accurate prediction across all colleges."
                            />
                            <EducationalTip
                                title="The -5% Relaxation"
                                content="We widen your search by 5% below your rank. If your rank is 5000, we also show colleges with closing ranks down to 4750."
                                type="idea"
                            />
                            <EducationalTip
                                title="HS vs AI Quota"
                                content="Home State (HS) quota offers lower cutoffs at NITs and GFTIs for students from that state. Other State (OS) / All India quota is open to everyone. IIITs only have OS quota."
                            />

                            <div className="p-8 bg-primary rounded-2xl text-white space-y-5 relative editorial-shadow group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container opacity-20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-all duration-1000"></div>
                                <h4 className="text-xl font-bold serif-font italic">Need Personal Help?</h4>
                                <p className="text-[12px] text-primary-fixed-dim/60 font-medium uppercase tracking-widest leading-relaxed">
                                    Our mentors are IIT & NIT alumni who have been through this exact process.
                                </p>
                                <button className="w-full py-4 bg-white text-on-surface rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-primary-fixed transition-all">
                                    Chat with Mentor
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-12 text-left"
                        >
                            {/* ─── Summary Dashboard ─── */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white rounded-2xl editorial-shadow p-10 md:p-14 border border-transparent relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-container/[0.02] rounded-full -mr-64 -mt-64 blur-3xl"></div>

                                <div className="flex flex-col lg:flex-row items-start justify-between gap-12 relative z-10">
                                    {/* Left: Rank + Tags */}
                                    <div className="space-y-5 text-center lg:text-left">
                                        <span className="text-xs font-bold uppercase tracking-[0.4em] text-primary-container/70">Your Entered Rank</span>
                                        <h2 className="text-7xl md:text-9xl font-bold serif-font italic text-on-surface tracking-tighter leading-none">
                                            #{parseInt(formData.rank).toLocaleString()}
                                        </h2>
                                        <div className="flex flex-wrap gap-3 pt-2 justify-center lg:justify-start">
                                            {['category', 'homeState', 'examType'].map(key => (
                                                <div key={key} className="px-4 py-1.5 bg-primary-fixed/30 rounded-full text-[10px] font-bold text-primary-container/70 uppercase tracking-widest border border-outline-variant/30">
                                                    {formData[key]}
                                                </div>
                                            ))}
                                        </div>

                                        {/* ─── Counters ─── */}
                                        <div className="flex flex-wrap gap-4 pt-4">
                                            {!prediction.isAdvanced ? (
                                                <>
                                                    <div className="bg-blue-50 border border-blue-100 rounded-2xl px-6 py-4 text-center min-w-[140px]">
                                                        <div className="text-3xl font-bold text-[#0462C3] serif-font italic">{prediction.totalAiEligible}</div>
                                                        <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-1">Other State / AI</div>
                                                    </div>
                                                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl px-6 py-4 text-center min-w-[140px]">
                                                        <div className="text-3xl font-bold text-emerald-600 serif-font italic">{prediction.totalHsEligible}</div>
                                                        <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-1">Home State</div>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="bg-blue-50 border border-blue-100 rounded-2xl px-6 py-4 text-center min-w-[140px]">
                                                    <div className="text-3xl font-bold text-[#0462C3] serif-font italic">{prediction.totalAiEligible}</div>
                                                    <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-1">IIT All India</div>
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-[10px] text-outline italic font-medium leading-relaxed max-w-sm">
                                            Showing top recommendations. More options are available for your profile.
                                        </p>
                                    </div>

                                    {/* Right: Summary + Buttons */}
                                    <div className="w-full lg:w-[400px] space-y-5 flex-shrink-0">
                                        <div className="bg-primary-fixed/20 p-6 rounded-[24px] border border-primary-fixed shadow-soft relative">
                                            <div className="absolute -top-3 -right-3 w-10 h-10 bg-white shadow-soft rounded-2xl flex items-center justify-center">
                                                <Sparkles className="text-primary-fixed-dim animate-pulse" size={20} />
                                            </div>
                                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-outline mb-2">
                                                Prediction Summary
                                            </h4>
                                            <p className="text-sm text-on-surface-variant leading-relaxed font-bold italic">
                                                {prediction.isAdvanced ? (
                                                    <>"Rank #{parseInt(formData.rank).toLocaleString()} — Found <span className="text-gradient-brand">{prediction.totalAiEligible}</span> All India IIT seats matching your profile."
                                                    </>
                                                ) : (
                                                    <>"Rank #{parseInt(formData.rank).toLocaleString()} — Found <span className="text-gradient-brand">{prediction.totalAiEligible}</span> Other State and <span className="text-gradient-brand">{prediction.totalHsEligible}</span> Home State options."
                                                    </>
                                                )}
                                            </p>
                                        </div>

                                        <div className="flex gap-3">
                                            <button
                                                onClick={downloadReport}
                                                className="flex-1 py-4 bg-white border border-outline-variant/20 rounded-2xl text-[11px] font-bold text-outline uppercase tracking-widest hover:border-primary-container/30 transition-all flex items-center justify-center gap-2"
                                            >
                                                <FileText size={14} /> Report
                                            </button>
                                            <button
                                                onClick={callMentor}
                                                className="flex-1 py-4 bg-gradient-brand text-white rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all duration-500 flex items-center justify-center gap-2 shadow-soft hover:shadow-lg bg-[length:200%_auto] hover:bg-right"
                                            >
                                                <MessageSquare size={14} /> Expert Help
                                            </button>
                                            <button
                                                onClick={() => { setPrediction(null); setInstituteFilter('all'); }}
                                                className="py-4 px-5 bg-white border border-outline-variant/20 rounded-2xl text-[11px] font-bold text-outline uppercase tracking-widest hover:border-primary-container/30 transition-all flex items-center justify-center gap-2"
                                            >
                                                <Search size={14} /> New
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* ─── Institute Type Filter Buttons (JEE Main only) ─── */}
                            {!prediction.isAdvanced && <InstituteFilterBar />}

                            {/* ─── FILTERED VIEW (NIT / IIIT / GFTI selected) ─── */}
                            {instituteFilter !== 'all' && filteredByInstituteType ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <CollegeTable
                                        title={`${instituteFilter} Colleges — Best Matches`}
                                        icon={Building2}
                                        iconColor="bg-primary-fixed/30 text-blue-600"
                                        colleges={filteredByInstituteType}
                                        visibleColleges={filteredByInstituteType}
                                        totalEligible={filteredByInstituteType.length}
                                        quotaTag={instituteFilter}
                                        emptyMessage={`No ${instituteFilter} colleges found for your rank & filters. Try adjusting your selections.`}
                                    />
                                </motion.div>
                            ) : (
                                /* ─── DEFAULT VIEW ─── */
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {prediction.isAdvanced ? (
                                        /* ═══ JEE Advanced: Full-width IIT results ═══ */
                                        <div className="space-y-4">
                                            {/* Compact info note */}
                                            <div className="flex items-center gap-3 px-5 py-3 bg-blue-50/80 border border-blue-100 rounded-2xl">
                                                <Home size={16} className="text-[#0462C3] flex-shrink-0" />
                                                <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                                                    IIT admissions are based on <span className="font-bold text-slate-700">All India quota only</span>. Home State quota does not apply to IITs.
                                                </p>
                                            </div>
                                            {/* Full-width table */}
                                            <CollegeTable
                                                title="All India IIT Colleges"
                                                icon={Globe}
                                                iconColor="bg-primary-fixed/30 text-blue-600"
                                                colleges={prediction.aiColleges}
                                                visibleColleges={visibleAiColleges}
                                                totalEligible={prediction.totalAiEligible}
                                                quotaTag="AI Quota"
                                                emptyMessage="No IIT colleges found for your rank & filters. Try adjusting your selections."
                                            />
                                        </div>
                                    ) : (
                                        /* ═══ JEE Main: OS/AI LEFT, HS RIGHT ═══ */
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                            {/* Left: Other State / All India */}
                                            <CollegeTable
                                                title="Other State / All India"
                                                icon={Globe}
                                                iconColor="bg-primary-fixed/30 text-blue-600"
                                                colleges={prediction.aiColleges}
                                                visibleColleges={visibleAiColleges}
                                                totalEligible={prediction.totalAiEligible}
                                                quotaTag="OS Quota"
                                                emptyMessage="No Other State / All India colleges found for your rank & filters. Try adjusting your selections."
                                            />
                                            {/* Right: Home State */}
                                            <CollegeTable
                                                title="Home State Colleges"
                                                icon={Home}
                                                iconColor="bg-emerald-50 text-emerald-600"
                                                colleges={prediction.hsColleges}
                                                visibleColleges={visibleHsColleges}
                                                totalEligible={prediction.totalHsEligible}
                                                quotaTag="HS Quota"
                                                emptyMessage="No Home State options available for your current profile."
                                            />
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {/* CTA Banner */}
                            <div className="mt-16 relative rounded-[48px] overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#0462C3] via-[#0351a1] to-slate-900"></div>
                                <div className="absolute top-0 right-0 w-full h-full opacity-10">
                                    <Search className="w-[800px] h-[800px] -mr-96 -mt-96" />
                                </div>

                                <div className="relative z-10 p-12 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-12">
                                    <div className="max-w-xl text-center lg:text-left space-y-6">
                                        <h4 className="text-4xl md:text-5xl font-bold text-white leading-tight text-left">
                                            Lost in Choice Filling?<br />
                                            <span className="serif-font italic font-medium text-primary-fixed-dim">Don't guess.</span> Win.
                                        </h4>
                                        <p className="text-primary-fixed-dim/80 font-bold italic text-lg leading-relaxed text-left">
                                            Get a personalized preference list designed by IIT & NIT Alumni. We ensure you get the best possible college for your rank.
                                        </p>
                                    </div>
                                    <button
                                        onClick={callMentor}
                                        className="px-14 py-7 bg-white text-[#0462C3] rounded-[32px] font-bold text-xs uppercase tracking-[0.3em] shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:bg-primary-fixed/30 transition-all hover:scale-110 active:scale-95 whitespace-nowrap"
                                    >
                                        Talk to Admission Expert
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
};

export default RankPredictor;
