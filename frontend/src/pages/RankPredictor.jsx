import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EducationalTip from '../components/EducationalTip';
import {
    Calculator, Trophy, Info, Search, Building2,
    GraduationCap, Target, ShieldCheck, Zap,
    MapPin, IndianRupee, Briefcase, ChevronRight,
    Download, Phone, Mail, User, Lock, ArrowRight,
    CheckCircle2, XCircle, AlertTriangle, FileText,
    MessageSquare, Star
} from 'lucide-react';
import { calculateProbability } from '../utils/probabilityEngine';

// Sample data import simulation
import josaaData from '../data/josaa_data.json';
import stateData from '../data/state_counselling_data.json';
import privateData from '../data/private_colleges_data.json';

const RankPredictor = () => {
    const [formData, setFormData] = useState({
        rank: '',
        category: 'General',
        examType: 'JEE Main',
        gender: 'Gender-Neutral',
        homeState: 'Uttar Pradesh',
        budget: 'Any',
        branch: 'Any'
    });

    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isLocked, setIsLocked] = useState(true);
    const [strategyMode, setStrategyMode] = useState('Normal');
    const [leadInfo, setLeadInfo] = useState({ name: '', phone: '' });

    const categories = ['General', 'OBC-NCL', 'SC', 'ST', 'EWS', 'General-PwD'];
    const exams = ['JEE Main', 'JEE Advanced', 'BITSAT'];
    const states = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
        'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
        'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
        'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
        'Uttarakhand', 'West Bengal'
    ];

    const branches = ['Any', 'Computer Science', 'IT', 'ECE', 'Electrical', 'Mechanical', 'Civil', 'Chemical'];
    const budgets = ['Any', 'Under 5 Lakhs', 'Under 10 Lakhs', 'Under 15 Lakhs', '15 Lakhs+'];

    const handlePredict = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            const userRank = parseInt(formData.rank);
            const trend = 0.05;

            // Filter JoSAA based on selections
            const filteredJosaa = josaaData.filter(item => {
                // Require exact category match (e.g., General -> General, OBC-NCL -> OBC-NCL)
                if (item.category !== formData.category) return false;

                // Gender logic: 
                // "Gender-Neutral" users can only see "Gender-Neutral" seats
                // "Female Only" users can also compete in "Gender-Neutral" standard seats
                if (formData.gender === 'Gender-Neutral' && item.gender === 'Female Only') return false;

                // Exam type matching:
                // IITs use JEE Advanced, NITs/IIITs/GFTIs use JEE Main. (BITSAT not in JoSAA)
                const isIIT = item.institute_type === 'IIT';
                if (formData.examType === 'JEE Advanced' && !isIIT) return false;
                if (formData.examType === 'JEE Main' && isIIT) return false;
                if (formData.examType === 'BITSAT') return false; 

                // If branch filter is active
                if (formData.branch !== 'Any') {
                    const sb = formData.branch?.toLowerCase() || '';
                    const b = item.branch?.toLowerCase() || '';
                    
                    if (sb === 'it' && !b.includes('information technology') && !b.includes('  it ')) return false;
                    else if (sb === 'ece' && !b.includes('electronics and communication')) return false;
                    else if (sb !== 'it' && sb !== 'ece' && !b.includes(sb)) return false;
                }

                return true;
            });

            // Process filtered JoSAA
            const processedJosaa = filteredJosaa.map(item => ({
                ...item,
                ...calculateProbability(userRank, item.closing_rank, trend)
            }));

            // Process State
            const processedState = stateData.map(item => ({
                ...item,
                ...calculateProbability(userRank, item.closing_rank, trend),
                institute_type: 'State GC'
            }));

            // Process Private
            const processedPrivate = privateData.map(item => ({
                ...item,
                institute_type: 'Private',
                probability: 90, // Generally high if rank is specified unless top private
                text: 'Direct/Rank Based',
                color: 'text-orange-600 bg-orange-50 border-orange-100'
            }));

            setPrediction({
                rank: userRank,
                category: formData.category,
                josaa: processedJosaa,
                state: processedState,
                private: processedPrivate,
                aiAdvice: `Based on your ${userRank} rank and the current 5% competition trend, we see strong potential for NIT Bhopal and IIIT Lucknow. ${userRank < 20000 ? 'Focus on JoSAA Round 1-3 for top branches.' : 'State level counselling (UPTAC) will be your primary anchor for CSE.'}`
            });

            setLoading(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1500);
    };

    // Filtered results based on strategy mode
    const filteredResults = useMemo(() => {
        if (!prediction) return null;

        // Sort by probability descending, then by closing_rank ascending (better colleges first)
        const sortPredicts = (arr) => arr.sort((a, b) => {
            const pA = a.probability || 0;
            const pB = b.probability || 0;
            if (pB !== pA) return pB - pA;
            const cA = a.closing_rank || 9999999;
            const cB = b.closing_rank || 9999999;
            return cA - cB;
        });

        let bestMatches = sortPredicts([...prediction.josaa.filter(item => item.probability >= 60)]);
        let strategicChoices = sortPredicts([...prediction.josaa.filter(item => item.probability >= 25 && item.probability < 60)]);
        let safeBackups = sortPredicts([...prediction.state.filter(item => item.probability >= 75)]);
        let privateColleges = sortPredicts([...prediction.private]);

        if (strategyMode === 'Safe') {
            bestMatches = sortPredicts([...prediction.josaa.filter(item => item.probability >= 80)]);
            strategicChoices = sortPredicts([...prediction.josaa.filter(item => item.probability >= 50 && item.probability < 80)]);
        } else if (strategyMode === 'Aggressive') {
            strategicChoices = sortPredicts([...prediction.josaa.filter(item => item.probability >= 15 && item.probability < 60)]);
        }

        // TEASER PATTERN: Limit to 2 results if locked
        const limit = isLocked ? 2 : 6;

        return {
            bestMatches: bestMatches.slice(0, limit),
            strategicChoices: strategicChoices.slice(0, limit),
            safeBackups: safeBackups.slice(0, limit),
            privateColleges: privateColleges.slice(0, limit)
        };
    }, [prediction, strategyMode, isLocked]);

    const handleLeadSubmit = (e) => {
        e.preventDefault();
        const leadData = {
            name: e.target[0].value,
            phone: e.target[1].value,
            rank: formData.rank,
            category: formData.category,
            homeState: formData.homeState
        };
        console.log("Strategic Lead Captured:", leadData);
        setIsLocked(false);
    };

    const downloadReport = () => alert("Generating your Personalized Strategy Report (PDF)...");
    const callMentor = () => alert("Connecting you with an IIT/NIT Mentor...");

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
                        {/* Form Sidebar/Main */}
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
                                {/* Exam Type - Full Width */}
                                <div className="md:col-span-2 space-y-6">
                                    <label className="text-[11px] uppercase tracking-[0.2em] font-black text-slate-400 opacity-80">Select Exam Path</label>
                                    <div className="grid grid-cols-3 gap-3">
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
                                title="The Strategy Filter"
                                content="Our AI doesn't just show colleges. It categorizes them into 'Safe', 'Strategic', and 'Dream' picks based on historic round 6 closing trends."
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
                            {/* Summary */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white rounded-[48px] shadow-soft p-10 md:p-14 border border-brand-muted relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/[0.02] rounded-full -mr-64 -mt-64 blur-3xl"></div>

                                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
                                    <div className="space-y-4 text-center lg:text-left">
                                        <span className="text-xs font-black uppercase tracking-[0.4em] text-brand-blue/60">Computation Complete</span>
                                        <h2 className="text-8xl md:text-9xl font-black serif-font italic text-brand-dark tracking-tighter leading-none">
                                            #{prediction.rank.toLocaleString()}
                                        </h2>
                                        <div className="flex flex-wrap gap-4 pt-6 justify-center lg:justify-start">
                                            {['category', 'homeState', 'examType'].map(key => (
                                                <div key={key} className="px-6 py-2 bg-brand-muted/30 rounded-full text-xs font-black text-brand-blue/60 uppercase tracking-widest border border-brand-muted/50">
                                                    {formData[key]}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="w-full lg:w-[450px] space-y-8">
                                        <div className="bg-brand-muted/20 p-8 rounded-[32px] border border-brand-muted shadow-soft relative">
                                            <div className="absolute -top-3 -right-3 w-10 h-10 bg-white shadow-soft rounded-2xl flex items-center justify-center">
                                                <Sparkles className="text-brand-accent animate-pulse" size={20} />
                                            </div>
                                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-3">
                                                Strategic Intelligence
                                            </h4>
                                            <p className="text-sm md:text-base text-slate-600/80 leading-relaxed font-bold italic">
                                                "{prediction.aiAdvice}"
                                            </p>
                                        </div>

                                        <div className="flex gap-4">
                                            <button
                                                onClick={downloadReport}
                                                className="flex-1 py-5 bg-white border border-slate-100 rounded-2xl text-[11px] font-black text-slate-400 uppercase tracking-widest hover:border-brand-blue/30 transition-all flex items-center justify-center gap-3"
                                            >
                                                <FileText size={18} /> Download Analysis
                                            </button>
                                            <button
                                                onClick={callMentor}
                                                className="flex-1 py-5 bg-brand-blue text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-brand-dark transition-all flex items-center justify-center gap-3 shadow-soft"
                                            >
                                                <MessageSquare size={18} /> Human Support
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Strategy Toggles */}
                            <div className="sticky top-24 z-20 flex flex-col md:flex-row items-center justify-between gap-6 bg-white/70 backdrop-blur-xl p-6 rounded-[32px] border border-white shadow-soft">
                                <div className="flex items-center gap-4 px-2">
                                    <div className="w-12 h-12 bg-brand-muted rounded-2xl flex items-center justify-center text-brand-blue">
                                        <Briefcase size={22} />
                                    </div>
                                    <div className="text-left">
                                        <h5 className="font-black text-brand-dark text-sm">Adaptive Strategy</h5>
                                        <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest">Fine-tune risk tolerance</p>
                                    </div>
                                </div>
                                <div className="flex p-2 bg-brand-muted/20 rounded-2xl gap-2 w-full md:w-auto overflow-x-auto">
                                    {['Safe', 'Normal', 'Aggressive'].map(mode => (
                                        <button
                                            key={mode}
                                            onClick={() => setStrategyMode(mode)}
                                            className={`flex-1 md:px-10 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap ${strategyMode === mode
                                                ? 'bg-white text-brand-blue shadow-soft scale-105'
                                                : 'text-slate-400 hover:text-slate-600'
                                                }`}
                                        >
                                            {mode}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Results Grid - Using Low Contrast Dividers */}
                            <div className={`relative ${isLocked ? 'max-h-[1200px] overflow-hidden' : ''}`}>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                    {[
                                        { title: 'Optimized Outcomes', data: filteredResults.bestMatches, icon: <Target />, color: 'text-brand-blue' },
                                        { title: 'Strategic Reach', data: filteredResults.strategicChoices, icon: <Zap />, color: 'text-brand-accent' },
                                        { title: 'Safety Anchors', data: filteredResults.safeBackups, icon: <ShieldCheck />, color: 'text-slate-500' },
                                        { title: 'Private Excellence', data: filteredResults.privateColleges, icon: <GraduationCap />, color: 'text-slate-600' }
                                    ].map((section, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="space-y-8"
                                        >
                                            <h3 className={`flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] ${section.color} px-4`}>
                                                <div className="flex items-center justify-center w-8 h-8 bg-brand-muted rounded-xl">
                                                    {section.icon}
                                                </div>
                                                {section.title}
                                            </h3>

                                            <div className="space-y-6">
                                                {section.data.length > 0 ? (
                                                    section.data.map((college, cIdx) => (
                                                        <CollegeCard key={cIdx} college={college} />
                                                    ))
                                                ) : (
                                                    <div className="p-16 text-center text-slate-300 bg-brand-muted/10 rounded-[40px] border border-dashed border-brand-muted italic font-bold text-sm">
                                                        Deep scanning required. <Link to="/signup" className="text-brand-blue underline">Unlock more.</Link>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {isLocked && (
                                    <div className="absolute inset-x-0 bottom-0 h-[800px] bg-gradient-to-t from-bg-light via-bg-light/95 to-transparent z-50 flex items-end justify-center p-6 pb-24">
                                        <motion.div
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-white p-12 md:p-16 rounded-[64px] shadow-[0_40px_100px_rgba(0,34,68,0.1)] border border-brand-muted max-w-2xl w-full text-center relative z-10"
                                        >
                                            <div className="w-20 h-20 bg-brand-muted rounded-[24px] flex items-center justify-center text-brand-blue mx-auto mb-8 shadow-inner">
                                                <Lock size={32} />
                                            </div>
                                            <h3 className="text-4xl font-black text-brand-dark mb-4 tracking-tighter">Strategic Depth Halted</h3>
                                            <p className="text-slate-400 font-bold mb-12 max-w-sm mx-auto leading-relaxed italic uppercase tracking-[0.15em] text-[12px]">
                                                We're hiding 124 more predicted combinations. Create your secure identity to view the full report.
                                            </p>

                                            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                                                <Link
                                                    to="/signup"
                                                    className="w-full sm:w-auto px-12 py-6 bg-brand-blue text-white rounded-[24px] font-black text-[12px] uppercase tracking-[0.3em] shadow-xl shadow-blue-900/10 hover:bg-brand-dark transition-all flex items-center justify-center gap-4 group/btn"
                                                >
                                                    Access Full Intelligence <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
                                                </Link>
                                                <Link to="/login" className="text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-brand-blue transition-colors px-8 py-6">
                                                    I have an account
                                                </Link>
                                            </div>
                                        </motion.div>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* CTA Banner Section inside Results */}
                        <div className="mt-24 relative rounded-[48px] overflow-hidden">
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
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
};

const CollegeCard = ({ college }) => {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="group bg-white rounded-[32px] border border-brand-muted/50 p-8 shadow-soft hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 relative flex flex-col justify-between h-full group text-left"
        >
            <div className="space-y-6">
                <div className="flex justify-between items-start">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-brand-muted text-brand-blue rounded-xl text-[11px] font-black uppercase tracking-widest border border-brand-blue/10">
                                {college.institute_type || 'GFTI'}
                            </span>
                            {college.probability > 80 && (
                                <span className="bg-green-50 text-green-600 px-3 py-1 rounded-xl text-[11px] font-black uppercase tracking-widest">High Probability</span>
                            )}
                        </div>
                        <h4 className="text-xl font-black text-brand-dark leading-tight group-hover:text-brand-blue transition-colors">
                            {college.college_name}
                        </h4>
                        <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-2">
                            <Target size={14} className="text-brand-accent/50" /> {college.branch}
                        </p>
                    </div>
                    <div className="w-12 h-12 bg-brand-muted/30 rounded-2xl flex items-center justify-center text-brand-blue/30 group-hover:text-brand-blue group-hover:bg-brand-muted transition-all">
                        <Building2 size={24} />
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 text-[11px] font-black">
                    <div className="flex items-center gap-3 bg-brand-muted/10 px-4 py-2.5 rounded-2xl border border-brand-muted/20">
                        <span className="text-[10px] text-slate-300 uppercase tracking-tighter">Closing Rank</span>
                        <span className="text-brand-dark italic serif-font text-sm">#{college.closing_rank?.toLocaleString() || college.rank_range}</span>
                    </div>
                </div>
            </div>

            <div className="mt-10 pt-8 border-t border-brand-muted/30 flex items-end justify-between">
                <div className="space-y-3 flex-grow max-w-[180px]">
                    <div className="flex justify-between items-end mb-1">
                        <p className="text-[11px] uppercase tracking-[0.1em] font-black text-slate-300">Success Probability</p>
                        <span className="text-[14px] font-black italic serif-font text-brand-blue">
                            {college.probability}%
                        </span>
                    </div>
                    <div className="w-full h-1.5 bg-brand-muted/30 rounded-full overflow-hidden p-0.5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${college.probability}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full rounded-full bg-brand-blue"
                        ></motion.div>
                    </div>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-brand-muted text-brand-blue opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                    <ChevronRight size={20} />
                </div>
            </div>

            {/* Hover Insight Overlay */}
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 bg-brand-dark text-white text-[11px] font-black px-4 py-2 rounded-2xl shadow-xl pointer-events-none flex items-center gap-2 uppercase tracking-widest">
                <AlertTriangle size={12} className="text-brand-accent" /> Strategic Potential
            </div>
        </motion.div>
    );
};

export default RankPredictor;
