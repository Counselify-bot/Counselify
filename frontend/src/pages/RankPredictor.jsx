import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EducationalTip from '../components/EducationalTip';
import {
    Calculator, Search, Building2,
    GraduationCap, Target, ShieldCheck,
    MapPin, Briefcase, ChevronRight,
    User, Lock, ArrowRight,
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

    const { user } = useAuth();

    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const isLocked = !user; // Show all 25 if logged in, only 5 if not

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

    const handlePredict = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            const userRank = parseInt(formData.rank);
            const relaxedRank = Math.floor(userRank * 0.95); // -5% relaxation

            // Step 1: Filter by category, gender, exam, branch
            const filtered = josaaData.filter(item => {
                if (item.category !== formData.category) return false;
                if (formData.gender === 'Gender-Neutral' && item.gender === 'Female Only') return false;

                const isIIT = item.institute_type === 'IIT';
                if (formData.examType === 'JEE Advanced' && !isIIT) return false;
                if (formData.examType === 'JEE Main' && isIIT) return false;

                if (formData.branch !== 'Any') {
                    const sb = formData.branch?.toLowerCase() || '';
                    const b = item.branch?.toLowerCase() || '';
                    if (sb === 'it' && !b.includes('information technology')) return false;
                    else if (sb === 'ece' && !b.includes('electronics and communication')) return false;
                    else if (sb === 'computer science' && !b.includes('computer science')) return false;
                    else if (sb !== 'it' && sb !== 'ece' && sb !== 'computer science' && !b.includes(sb)) return false;
                }

                return true;
            });

            // Step 2: Separate HS (Home State) and AI (All India) eligible colleges
            const hsEligible = filtered.filter(item => {
                const cr = item.closing_rank || 0;
                return cr >= relaxedRank && item.home_state === 'HS';
            });

            const aiEligible = filtered.filter(item => {
                const cr = item.closing_rank || 0;
                return cr >= relaxedRank && item.home_state === 'AI';
            });

            // Step 3: Sort both by closeness to user rank (best matches first)
            const sortByCloseness = (arr) => [...arr].sort((a, b) => {
                const diffA = Math.abs(a.closing_rank - userRank);
                const diffB = Math.abs(b.closing_rank - userRank);
                return diffA - diffB;
            });

            const sortedHS = sortByCloseness(hsEligible).slice(0, 25);
            const sortedAI = sortByCloseness(aiEligible).slice(0, 25);

            setPrediction({
                rank: userRank,
                relaxedRank,
                hsColleges: sortedHS,
                aiColleges: sortedAI,
                totalHsEligible: hsEligible.length,
                totalAiEligible: aiEligible.length
            });

            setLoading(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1500);
    };

    const downloadReport = () => alert("Generating your Personalized Strategy Report (PDF)...");
    const callMentor = () => alert("Connecting you with an IIT/NIT Mentor...");

    // How many to show: teaser shows 5, unlocked shows all
    const visibleHsColleges = useMemo(() => {
        if (!prediction) return [];
        return isLocked ? prediction.hsColleges.slice(0, 5) : prediction.hsColleges;
    }, [prediction, isLocked]);

    const visibleAiColleges = useMemo(() => {
        if (!prediction) return [];
        return isLocked ? prediction.aiColleges.slice(0, 5) : prediction.aiColleges;
    }, [prediction, isLocked]);

    const isAdvanced = formData.examType === 'JEE Advanced';

    // Reusable college table component
    const CollegeTable = ({ title, icon: Icon, iconColor, colleges, visibleColleges, totalEligible, quotaTag, emptyMessage }) => (
        <div className="relative">
            <div className={`bg-white rounded-2xl editorial-shadow border border-transparent overflow-hidden ${isLocked && visibleColleges.length > 0 ? 'max-h-[700px] overflow-hidden' : ''}`}>
                {/* Table Title */}
                <div className="px-6 py-5 border-b border-outline-variant/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${iconColor}`}>
                            <Icon size={18} />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">{title}</h3>
                            <p className="text-[10px] font-bold text-outline uppercase tracking-widest mt-0.5">
                                {colleges.length} shown · {totalEligible} eligible
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

            {/* Lock Overlay */}
            {isLocked && colleges.length > 5 && (
                <div className="absolute inset-x-0 bottom-0 h-[350px] bg-gradient-to-t from-bg-light via-bg-light/95 to-transparent z-50 flex items-end justify-center p-4 pb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-8 rounded-2xl editorial-shadow border border-transparent max-w-sm w-full text-center relative z-10"
                    >
                        <div className="w-12 h-12 bg-primary-fixed rounded-2xl flex items-center justify-center text-primary-container mx-auto mb-4 shadow-inner">
                            <Lock size={22} />
                        </div>
                        <h3 className="text-xl font-bold text-on-surface mb-2 tracking-tighter">
                            {colleges.length - 5} More Hidden
                        </h3>
                        <p className="text-outline font-bold mb-6 leading-relaxed italic uppercase tracking-[0.12em] text-[10px]">
                            Sign up to see all {colleges.length} predicted colleges.
                        </p>

                        <Link
                            to="/signup"
                            className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-brand text-white rounded-2xl font-bold text-[10px] uppercase tracking-[0.25em] shadow-lg shadow-primary/10 hover:shadow-xl transition-all duration-500 group/btn bg-[length:200%_auto] hover:bg-right"
                        >
                            Unlock All <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/login" className="block mt-3 text-[10px] font-bold text-outline uppercase tracking-widest hover:text-primary-container transition-colors py-2">
                            I have an account
                        </Link>
                    </motion.div>
                </div>
            )}
        </div>
    );

    return (
        <div className="pt-24 md:pt-32 pb-32 bg-background min-h-screen">
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

                                {/* CRL Rank */}
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold text-outline opacity-80">
                                        <Target size={12} className="text-primary-fixed-dim" /> Total Rank (CRL)
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
                                            <Lock size={14} className="text-primary-container" /> End-to-End Encrypted
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
                                content="Home State (HS) quota offers lower cutoffs at NITs for students from that state. All India (AI) quota is open to everyone. We show both lists side by side."
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
                            {/* Summary Header */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white rounded-2xl editorial-shadow p-10 md:p-14 border border-transparent relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-container/[0.02] rounded-full -mr-64 -mt-64 blur-3xl"></div>

                                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                                    <div className="space-y-4 text-center lg:text-left">
                                        <span className="text-xs font-bold uppercase tracking-[0.4em] text-primary-container/70">Computation Complete</span>
                                        <h2 className="text-7xl md:text-9xl font-bold serif-font italic text-on-surface tracking-tighter leading-none">
                                            #{prediction.rank.toLocaleString()}
                                        </h2>
                                        <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
                                            {['category', 'homeState', 'examType'].map(key => (
                                                <div key={key} className="px-5 py-2 bg-primary-fixed/30 rounded-full text-xs font-bold text-primary-container/70 uppercase tracking-widest border border-outline-variant/30">
                                                    {formData[key]}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="w-full lg:w-[420px] space-y-6">
                                        <div className="bg-primary-fixed/20 p-7 rounded-[28px] border border-primary-fixed shadow-soft relative">
                                            <div className="absolute -top-3 -right-3 w-10 h-10 bg-white shadow-soft rounded-2xl flex items-center justify-center">
                                                <Sparkles className="text-primary-fixed-dim animate-pulse" size={20} />
                                            </div>
                                            <h4 className="text-xs font-bold uppercase tracking-widest text-outline mb-3">
                                                Prediction Summary
                                            </h4>
                                            <p className="text-sm text-on-surface-variant leading-relaxed font-bold italic">
                                                "Rank #{prediction.rank.toLocaleString()} with -5% relaxation (down to #{prediction.relaxedRank.toLocaleString()}).
                                                Found <span className="text-gradient-brand">{prediction.totalHsEligible}</span> Home State
                                                and <span className="text-gradient-brand">{prediction.totalAiEligible}</span> All India eligible seats."
                                            </p>
                                        </div>

                                        <div className="flex gap-4">
                                            <button
                                                onClick={downloadReport}
                                                className="flex-1 py-4 bg-white border border-outline-variant/20 rounded-2xl text-[11px] font-bold text-outline uppercase tracking-widest hover:border-primary-container/30 transition-all flex items-center justify-center gap-3"
                                            >
                                                <FileText size={16} /> Report
                                            </button>
                                            <button
                                                onClick={callMentor}
                                                className="flex-1 py-4 bg-gradient-brand text-white rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all duration-500 flex items-center justify-center gap-3 shadow-soft hover:shadow-lg bg-[length:200%_auto] hover:bg-right"
                                            >
                                                <MessageSquare size={16} /> Expert Help
                                            </button>
                                            <button
                                                onClick={() => { setPrediction(null); }}
                                                className="py-4 px-6 bg-white border border-outline-variant/20 rounded-2xl text-[11px] font-bold text-outline uppercase tracking-widest hover:border-primary-container/30 transition-all flex items-center justify-center gap-2"
                                            >
                                                <Search size={16} /> New
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Dual College Tables — Side by Side */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                            >
                                {/* Home State Table */}
                                <CollegeTable
                                    title="Home State Colleges"
                                    icon={Home}
                                    iconColor="bg-emerald-50 text-emerald-600"
                                    colleges={prediction.hsColleges}
                                    visibleColleges={visibleHsColleges}
                                    totalEligible={prediction.totalHsEligible}
                                    quotaTag="HS Quota"
                                    emptyMessage={
                                        isAdvanced
                                            ? "IITs only have All India (AI) quota. Home State quota applies to NITs, IIITs & GFTIs via JEE Main."
                                            : "No Home State colleges found for your rank & filters. Try adjusting your selections."
                                    }
                                />

                                {/* All India Table */}
                                <CollegeTable
                                    title="All India Colleges"
                                    icon={Globe}
                                    iconColor="bg-primary-fixed/30 text-blue-600"
                                    colleges={prediction.aiColleges}
                                    visibleColleges={visibleAiColleges}
                                    totalEligible={prediction.totalAiEligible}
                                    quotaTag="AI Quota"
                                    emptyMessage="No All India colleges found for your rank & filters. Try adjusting your selections."
                                />
                            </motion.div>

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
