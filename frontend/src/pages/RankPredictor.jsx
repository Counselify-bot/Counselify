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
    MessageSquare, Sparkles
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

            // Step 2: Pick colleges whose closing rank is >= relaxedRank (i.e., user can get in)
            // closing_rank >= relaxedRank means the cutoff is around or above the user's adjusted rank
            // We want colleges where userRank <= closingRank (user's rank is better/lower than cutoff)
            // But with -5% relaxation: we also include colleges where closingRank >= relaxedRank
            const eligible = filtered.filter(item => {
                const cr = item.closing_rank || 0;
                // User can get in if their rank is <= closing rank
                // With -5% relaxation: also show colleges where closing rank >= relaxedRank
                return cr >= relaxedRank;
            });

            // Step 3: Sort by closeness to user rank (closest closing_rank first = most competitive match)
            // Colleges with closing_rank just above the user's rank are the best strategic picks
            eligible.sort((a, b) => {
                const diffA = Math.abs(a.closing_rank - userRank);
                const diffB = Math.abs(b.closing_rank - userRank);
                return diffA - diffB;
            });

            // Step 4: Take exactly 25
            const top25 = eligible.slice(0, 25);

            setPrediction({
                rank: userRank,
                relaxedRank,
                colleges: top25,
                totalEligible: eligible.length
            });

            setLoading(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1500);
    };

    const downloadReport = () => alert("Generating your Personalized Strategy Report (PDF)...");
    const callMentor = () => alert("Connecting you with an IIT/NIT Mentor...");

    // How many to show: teaser shows 5, unlocked shows all 25
    const visibleColleges = useMemo(() => {
        if (!prediction) return [];
        return isLocked ? prediction.colleges.slice(0, 5) : prediction.colleges;
    }, [prediction, isLocked]);

    return (
        <div className="pt-24 md:pt-32 pb-32 bg-transparent min-h-screen">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl text-left">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20 space-y-4"
                >
                    <span className="inline-block px-4 py-1.5 bg-brand-muted text-brand-blue text-xs font-black uppercase tracking-[0.2em] rounded-full">
                        Precision Analytics Engine
                    </span>
                    <h1 className="text-4xl md:text-7xl font-black text-brand-dark leading-[1.1] mb-5 tracking-tighter">
                        Rank <span className="serif-font italic font-medium text-brand-blue">Intelligence</span>
                    </h1>
                    <p className="max-w-xl mx-auto text-slate-500/80 text-sm md:text-base font-bold leading-relaxed italic">
                        Strategic college mapping powered by historical trends and AI optimization.
                    </p>
                </motion.div>

                {!prediction ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-8 bg-white/70 backdrop-blur-md rounded-[48px] shadow-soft p-10 md:p-16 border border-white relative overflow-hidden text-left"
                        >
                            <div className="absolute top-0 left-0 w-2 h-full bg-brand-blue/20"></div>

                            <h2 className="text-2xl font-black text-brand-dark mb-10 flex items-center gap-4">
                                <div className="p-2.5 bg-brand-muted rounded-xl text-brand-blue">
                                    <Calculator size={22} />
                                </div>
                                Personal Profile
                            </h2>

                            <form onSubmit={handlePredict} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                {/* Exam Type */}
                                <div className="md:col-span-2 space-y-6">
                                    <label className="text-[11px] uppercase tracking-[0.2em] font-black text-slate-400 opacity-80">Select Exam Path</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {exams.map(exam => (
                                            <button
                                                key={exam}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, examType: exam })}
                                                className={`py-3.5 rounded-2xl text-[11px] font-black transition-all border-2 ${formData.examType === exam
                                                    ? 'bg-brand-blue text-white border-brand-blue shadow-lg shadow-blue-100'
                                                    : 'bg-white text-slate-400 border-slate-50 hover:border-brand-muted'
                                                    }`}
                                            >
                                                {exam}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* CRL Rank */}
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-black text-slate-400 opacity-80">
                                        <Target size={12} className="text-brand-accent" /> Total Rank (CRL)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="e.g. 15000"
                                        className="w-full px-7 py-4 bg-brand-muted/20 border-2 border-transparent rounded-[20px] outline-none focus:border-brand-blue/30 focus:bg-white transition-all text-lg font-black text-brand-dark placeholder:text-slate-300"
                                        value={formData.rank}
                                        onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                                        required
                                    />
                                </div>

                                {/* Category */}
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-black text-slate-400 opacity-80">
                                        <User size={12} className="text-brand-accent" /> Category
                                    </label>
                                    <select
                                        className="w-full px-7 py-4 bg-brand-muted/20 border-2 border-transparent rounded-[20px] outline-none focus:border-brand-blue/30 focus:bg-white transition-all font-black text-slate-700 text-sm appearance-none"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>

                                {/* Home State */}
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-black text-slate-400 opacity-80">
                                        <MapPin size={12} className="text-brand-accent" /> Home State
                                    </label>
                                    <select
                                        className="w-full px-7 py-4 bg-brand-muted/20 border-2 border-transparent rounded-[20px] outline-none focus:border-brand-blue/30 focus:bg-white transition-all font-black text-slate-700 text-sm appearance-none"
                                        value={formData.homeState}
                                        onChange={(e) => setFormData({ ...formData, homeState: e.target.value })}
                                    >
                                        {states.map(state => <option key={state} value={state}>{state}</option>)}
                                    </select>
                                </div>

                                {/* Gender */}
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-black text-slate-400 opacity-80">
                                        Gender Filter
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['Gender-Neutral', 'Female Only'].map(g => (
                                            <button
                                                key={g}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, gender: g })}
                                                className={`py-3.5 rounded-[20px] text-[11px] font-black border-2 uppercase transition-all ${formData.gender === g
                                                    ? 'bg-brand-muted text-brand-blue border-brand-blue/20'
                                                    : 'bg-white text-slate-400 border-slate-50 hover:border-brand-muted'
                                                    }`}
                                            >
                                                {g}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Branch Filter */}
                                <div className="md:col-span-2 space-y-3">
                                    <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-black text-slate-400 opacity-80">
                                        <GraduationCap size={12} className="text-brand-accent" /> Branch Preference
                                    </label>
                                    <select
                                        className="w-full px-7 py-4 bg-brand-muted/20 border-2 border-transparent rounded-[20px] outline-none focus:border-brand-blue/30 focus:bg-white transition-all font-black text-slate-700 text-sm appearance-none"
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
                                        className="w-full py-6 bg-brand-blue hover:bg-brand-dark text-white rounded-[24px] font-black text-xs uppercase tracking-[0.3em] shadow-xl shadow-blue-900/10 transition-all flex items-center justify-center gap-4 group scale-100 active:scale-95"
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
                                        <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                                            <ShieldCheck size={14} className="text-brand-blue" /> Verifying 2025 Trends
                                        </div>
                                        <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                                        <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                                            <Lock size={14} className="text-brand-blue" /> End-to-End Encrypted
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
                                title="Category Advantage"
                                content="Reserved category seats often have lower cutoffs. Ensure you select the correct category for accurate seat allocation data."
                            />

                            <div className="p-8 bg-brand-dark rounded-[32px] text-white space-y-5 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue opacity-20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-all duration-1000"></div>
                                <h4 className="text-xl font-black serif-font italic">Need Personal Help?</h4>
                                <p className="text-[12px] text-blue-100/60 font-medium uppercase tracking-widest leading-relaxed">
                                    Our mentors are IIT & NIT alumni who have been through this exact process.
                                </p>
                                <button className="w-full py-4 bg-white text-brand-dark rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-brand-muted transition-all">
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
                                className="bg-white rounded-[48px] shadow-soft p-10 md:p-14 border border-brand-muted relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/[0.02] rounded-full -mr-64 -mt-64 blur-3xl"></div>

                                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                                    <div className="space-y-4 text-center lg:text-left">
                                        <span className="text-xs font-black uppercase tracking-[0.4em] text-brand-blue/60">Computation Complete</span>
                                        <h2 className="text-7xl md:text-9xl font-black serif-font italic text-brand-dark tracking-tighter leading-none">
                                            #{prediction.rank.toLocaleString()}
                                        </h2>
                                        <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
                                            {['category', 'homeState', 'examType'].map(key => (
                                                <div key={key} className="px-5 py-2 bg-brand-muted/30 rounded-full text-xs font-black text-brand-blue/60 uppercase tracking-widest border border-brand-muted/50">
                                                    {formData[key]}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="w-full lg:w-[420px] space-y-6">
                                        <div className="bg-brand-muted/20 p-7 rounded-[28px] border border-brand-muted shadow-soft relative">
                                            <div className="absolute -top-3 -right-3 w-10 h-10 bg-white shadow-soft rounded-2xl flex items-center justify-center">
                                                <Sparkles className="text-brand-accent animate-pulse" size={20} />
                                            </div>
                                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
                                                Prediction Summary
                                            </h4>
                                            <p className="text-sm text-slate-600/80 leading-relaxed font-bold italic">
                                                "Showing <span className="text-brand-blue">{prediction.colleges.length}</span> best colleges for rank #{prediction.rank.toLocaleString()} with -5% relaxation (down to #{prediction.relaxedRank.toLocaleString()}). Total eligible: <span className="text-brand-blue">{prediction.totalEligible}</span>."
                                            </p>
                                        </div>

                                        <div className="flex gap-4">
                                            <button
                                                onClick={downloadReport}
                                                className="flex-1 py-4 bg-white border border-slate-100 rounded-2xl text-[11px] font-black text-slate-400 uppercase tracking-widest hover:border-brand-blue/30 transition-all flex items-center justify-center gap-3"
                                            >
                                                <FileText size={16} /> Report
                                            </button>
                                            <button
                                                onClick={callMentor}
                                                className="flex-1 py-4 bg-brand-blue text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-brand-dark transition-all flex items-center justify-center gap-3 shadow-soft"
                                            >
                                                <MessageSquare size={16} /> Expert Help
                                            </button>
                                            <button
                                                onClick={() => { setPrediction(null); }}
                                                className="py-4 px-6 bg-white border border-slate-100 rounded-2xl text-[11px] font-black text-slate-400 uppercase tracking-widest hover:border-brand-blue/30 transition-all flex items-center justify-center gap-2"
                                            >
                                                <Search size={16} /> New
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* College Table */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className={`relative ${isLocked ? 'max-h-[900px] overflow-hidden' : ''}`}
                            >
                                <div className="bg-white rounded-[40px] shadow-soft border border-brand-muted overflow-hidden">
                                    {/* Table Header */}
                                    <div className="grid grid-cols-12 gap-4 px-8 py-5 bg-brand-muted/30 border-b border-brand-muted/50">
                                        <div className="col-span-1 text-[10px] font-black uppercase tracking-widest text-slate-400">#</div>
                                        <div className="col-span-4 text-[10px] font-black uppercase tracking-widest text-slate-400">College Name</div>
                                        <div className="col-span-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Branch</div>
                                        <div className="col-span-1 text-[10px] font-black uppercase tracking-widest text-slate-400">Type</div>
                                        <div className="col-span-1 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Open</div>
                                        <div className="col-span-1 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Close</div>
                                        <div className="col-span-1 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Match</div>
                                    </div>

                                    {/* Table Body */}
                                    {visibleColleges.map((college, idx) => {
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
                                                className="grid grid-cols-12 gap-4 px-8 py-5 border-b border-brand-muted/20 hover:bg-brand-muted/10 transition-all group cursor-pointer items-center"
                                            >
                                                <div className="col-span-1 text-sm font-black text-slate-300 serif-font italic">
                                                    {idx + 1}
                                                </div>
                                                <div className="col-span-4">
                                                    <p className="text-sm font-black text-brand-dark leading-tight group-hover:text-brand-blue transition-colors truncate" title={college.college_name}>
                                                        {college.college_name}
                                                    </p>
                                                </div>
                                                <div className="col-span-3">
                                                    <p className="text-[11px] font-bold text-slate-500 truncate" title={college.branch}>
                                                        {college.branch}
                                                    </p>
                                                </div>
                                                <div className="col-span-1">
                                                    <span className="px-2 py-0.5 bg-brand-muted text-brand-blue rounded-lg text-[10px] font-black uppercase">
                                                        {college.institute_type || 'GFTI'}
                                                    </span>
                                                </div>
                                                <div className="col-span-1 text-right">
                                                    <span className="text-sm font-black text-slate-500 serif-font italic">
                                                        {college.opening_rank?.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="col-span-1 text-right">
                                                    <span className="text-sm font-black text-brand-dark serif-font italic">
                                                        {college.closing_rank?.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="col-span-1 text-right">
                                                    <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${matchColor}`}>
                                                        {matchLabel}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        );
                                    })}

                                    {prediction.colleges.length === 0 && (
                                        <div className="p-16 text-center text-slate-300 italic font-bold text-sm">
                                            No colleges found for your selections. Try adjusting your filters.
                                        </div>
                                    )}
                                </div>

                                {/* Lock Overlay */}
                                {isLocked && prediction.colleges.length > 5 && (
                                    <div className="absolute inset-x-0 bottom-0 h-[500px] bg-gradient-to-t from-bg-light via-bg-light/95 to-transparent z-50 flex items-end justify-center p-6 pb-16">
                                        <motion.div
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-white p-10 md:p-14 rounded-[48px] shadow-[0_40px_100px_rgba(0,34,68,0.1)] border border-brand-muted max-w-xl w-full text-center relative z-10"
                                        >
                                            <div className="w-16 h-16 bg-brand-muted rounded-[20px] flex items-center justify-center text-brand-blue mx-auto mb-6 shadow-inner">
                                                <Lock size={28} />
                                            </div>
                                            <h3 className="text-3xl font-black text-brand-dark mb-3 tracking-tighter">
                                                {prediction.colleges.length - 5} More Colleges Hidden
                                            </h3>
                                            <p className="text-slate-400 font-bold mb-10 max-w-sm mx-auto leading-relaxed italic uppercase tracking-[0.15em] text-[11px]">
                                                Sign up to see all {prediction.colleges.length} predicted colleges with full details.
                                            </p>

                                            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                                                <Link
                                                    to="/signup"
                                                    className="w-full sm:w-auto px-10 py-5 bg-brand-blue text-white rounded-[20px] font-black text-[11px] uppercase tracking-[0.3em] shadow-xl shadow-blue-900/10 hover:bg-brand-dark transition-all flex items-center justify-center gap-3 group/btn"
                                                >
                                                    Unlock All Colleges <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                                                </Link>
                                                <Link to="/login" className="text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-brand-blue transition-colors px-6 py-5">
                                                    I have an account
                                                </Link>
                                            </div>
                                        </motion.div>
                                    </div>
                                )}
                            </motion.div>

                            {/* CTA Banner */}
                            <div className="mt-16 relative rounded-[48px] overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#0462C3] via-[#0351a1] to-slate-900"></div>
                                <div className="absolute top-0 right-0 w-full h-full opacity-10">
                                    <Search className="w-[800px] h-[800px] -mr-96 -mt-96" />
                                </div>

                                <div className="relative z-10 p-12 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-12">
                                    <div className="max-w-xl text-center lg:text-left space-y-6">
                                        <h4 className="text-4xl md:text-5xl font-black text-white leading-tight text-left">
                                            Lost in Choice Filling?<br />
                                            <span className="serif-font italic font-medium text-blue-300">Don't guess.</span> Win.
                                        </h4>
                                        <p className="text-blue-100/80 font-bold italic text-lg leading-relaxed text-left">
                                            Get a personalized preference list designed by IIT & NIT Alumni. We ensure you get the best possible college for your rank.
                                        </p>
                                    </div>
                                    <button
                                        onClick={callMentor}
                                        className="px-14 py-7 bg-white text-[#0462C3] rounded-[32px] font-black text-xs uppercase tracking-[0.3em] shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:bg-blue-50 transition-all hover:scale-110 active:scale-95 whitespace-nowrap"
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
