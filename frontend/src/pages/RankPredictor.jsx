import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import EducationalTip from '../components/EducationalTip';
import {
    Calculator, Search, Building2,
    GraduationCap, Target, ShieldCheck,
    MapPin, Briefcase, ChevronRight,
    User, ArrowRight,
    AlertTriangle, FileText,
    MessageSquare, Sparkles, Home, Globe, Lock
} from 'lucide-react';

import josaaData from '../data/josaa_data.json';

const RankPredictor = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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

    const categories = ['General', 'OBC-NCL', 'SC', 'ST', 'EWS', 'General-PwD', 'OBC-NCL-PwD', 'EWS-PwD', 'SC-PwD', 'ST-PwD'];
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
        setInstituteFilter('all'); 

        setTimeout(() => {
            const userRank = parseInt(formData.rank);
            const relaxedRank = Math.floor(userRank * 0.95); 
            const isAdvanced = formData.examType === 'JEE Advanced';

            const baseFiltered = josaaData.filter(item => {
                if (item.category !== formData.category) return false;
                if (formData.gender === 'Gender-Neutral' && item.gender === 'Female Only') return false;
                const isIIT = item.institute_type === 'IIT';
                if (isAdvanced && !isIIT) return false;
                if (!isAdvanced && isIIT) return false;
                if (!matchesBranch(item.branch, formData.branch)) return false;
                return true;
            });

            const rankFiltered = baseFiltered.filter(item => (item.closing_rank || 0) >= relaxedRank);

            /* ─── NATURAL RELEVANCE SORT ─── */
            const naturalSort = (arr) => [...arr].sort((a, b) => {
                const diffA = Math.abs(a.closing_rank - userRank);
                const diffB = Math.abs(b.closing_rank - userRank);
                return diffA - diffB;
            });

            if (isAdvanced) {
                const aiEligible = naturalSort(rankFiltered.filter(item => item.home_state === 'AI'));
                const safeAiCount = aiEligible.filter(item => item.closing_rank >= userRank).length;
                setPrediction({ 
                    rank: userRank, 
                    relaxedRank, 
                    isAdvanced: true, 
                    hsColleges: [], 
                    aiColleges: aiEligible.slice(0, 25), 
                    fullOsPool: aiEligible, 
                    totalHsEligible: 0, 
                    totalAiEligible: safeAiCount 
                });
            } else {
                const userState = stateMapping[formData.homeState] || formData.homeState;
                
                // OS POOL: NIT + IIIT + GFTI (Other State quota / All India quota)
                const osEligible = naturalSort(rankFiltered.filter(item => 
                    (item.home_state === 'OS' || item.home_state === 'AI') && 
                    (item.institute_type === 'NIT' || item.institute_type === 'IIIT' || item.institute_type === 'GFTI')
                ));

                // HS POOL: NIT + GFTI (Home State quota, state matches)
                const hsEligible = naturalSort(rankFiltered.filter(item => 
                    item.home_state === 'HS' && (item.institute_type === 'NIT' || item.institute_type === 'GFTI') && item.state === userState
                ));

                const safeHsCount = hsEligible.filter(item => item.closing_rank >= userRank).length;
                const safeOsCount = osEligible.filter(item => item.closing_rank >= userRank).length;

                setPrediction({ 
                    rank: userRank, 
                    relaxedRank, 
                    isAdvanced: false, 
                    hsColleges: hsEligible.slice(0, 25), 
                    aiColleges: osEligible.slice(0, 25), 
                    fullOsPool: osEligible, 
                    totalHsEligible: safeHsCount, 
                    totalAiEligible: safeOsCount 
                });
            }
            setLoading(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1500);
    };

    const callMentor = () => alert("Connecting Mentor...");

    const visibleHsColleges = useMemo(() => prediction?.hsColleges || [], [prediction]);
    const visibleAiColleges = useMemo(() => prediction?.aiColleges || [], [prediction]);

    /* ─── Institute-type filtered list (NIT/IIIT/GFTI buttons) ─── */
    const filteredByInstituteType = useMemo(() => {
        if (!prediction || instituteFilter === 'all') return null;
        
        // As per rules: Individual filters are All India basis only (OS pool)
        const pool = prediction.fullOsPool || [];
        
        return pool
            .filter(item => item.institute_type === instituteFilter)
            .slice(0, 25);
    }, [prediction, instituteFilter]);

    /* ─── Chance Logic ─── */
    const getChance = (closingRank, userRank) => {
        const diff = closingRank - userRank;
        if (diff >= 0) {
            return { label: 'Safe', color: 'text-emerald-600 bg-emerald-50 border-emerald-100' };
        }
        // Reach: within 2% of rank
        if (diff >= -(userRank * 0.02)) {
            return { label: 'Reach', color: 'text-amber-600 bg-amber-50 border-amber-100' };
        }
        // Low Chance: Yellow logic
        return { label: 'Low Chance', color: 'text-yellow-700 bg-yellow-50 border-yellow-200' };
    };

    const CollegeTable = ({ title, icon: Icon, iconColor, visibleColleges, totalEligible, quotaTag, emptyMessage }) => (
        <div className="relative">
            <div className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${iconColor}`}>
                            <Icon size={18} />
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">{title}</h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
                                {visibleColleges.length} matches shown
                            </p>
                        </div>
                    </div>
                    {quotaTag && (
                        <span className="px-3 py-1 bg-blue-50 text-[#0462C3] rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100/50">
                            {quotaTag}
                        </span>
                    )}
                </div>
                <div className="grid grid-cols-12 gap-2 px-5 py-3 bg-slate-50 border-b border-slate-100">
                    <div className="col-span-1 text-[9px] font-black uppercase tracking-widest text-slate-400">#</div>
                    <div className="col-span-4 text-[9px] font-black uppercase tracking-widest text-slate-400">College</div>
                    <div className="col-span-3 text-[9px] font-black uppercase tracking-widest text-slate-400">Branch</div>
                    <div className="col-span-2 text-[9px] font-black uppercase tracking-widest text-slate-400 text-right">Rank</div>
                    <div className="col-span-2 text-[9px] font-black uppercase tracking-widest text-slate-400 text-right">Match</div>
                </div>
                {visibleColleges.length > 0 ? visibleColleges.map((college, idx) => {
                    const chance = getChance(college.closing_rank, prediction.rank);
                    return (
                        <div key={idx} className="grid grid-cols-12 gap-2 px-5 py-4 border-b border-slate-50 hover:bg-slate-50 transition-all items-center">
                            <div className="col-span-1 text-[11px] font-black text-slate-300 italic">{idx + 1}</div>
                            <div className="col-span-4">
                                <p className="text-[11px] font-black text-slate-800 leading-tight line-clamp-2">{college.college_name}</p>
                                <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 mt-1 inline-block">{college.institute_type}</span>
                            </div>
                            <div className="col-span-3 text-[10px] font-medium text-slate-500 line-clamp-2">{college.branch}</div>
                            <div className="col-span-2 text-right text-xs font-black text-slate-800 italic">{college.closing_rank?.toLocaleString()}</div>
                            <div className="col-span-2 text-right">
                                <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase border ${chance.color}`}>
                                    {chance.label}
                                </span>
                            </div>
                        </div>
                    );
                }) : <div className="p-12 text-center text-slate-400 text-xs font-bold italic">{emptyMessage}</div>}
            </div>
        </div>
    );

    const InstituteFilterBar = () => {
        const filters = [ { key: 'all', label: 'ALL' }, { key: 'NIT', label: 'NIT' }, { key: 'IIIT', label: 'IIIT' }, { key: 'GFTI', label: 'GFTI' } ];
        return (
            <div className="bg-slate-100/80 backdrop-blur-sm rounded-full p-1 inline-flex items-center gap-1 border border-slate-200">
                {filters.map(f => (
                    <button key={f.key} onClick={() => setInstituteFilter(f.key)} className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${instituteFilter === f.key ? 'bg-[#0462C3] text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-slate-800'}`}>
                        {f.label}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className="pt-24 lg:pt-32 pb-16 lg:pb-32 mesh-gradient-hero min-h-screen relative overflow-hidden">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-blue-400/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-4 lg:px-6 max-w-7xl text-left relative z-10">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 lg:mb-20 space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-1">
                        <Sparkles size={12} className="text-[#0462C3]" />
                        <span className="text-[10px] font-black text-[#0462C3] uppercase tracking-[0.2em]">AI-Powered Prediction Engine</span>
                    </div>
                    <h1 className="text-[34px] lg:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
                        Smart Rank <span className="serif-font italic font-medium text-[#0462C3]">Intelligence</span>
                    </h1>
                    <p className="max-w-[280px] lg:max-w-xl mx-auto text-slate-500 text-[13px] lg:text-base font-medium leading-relaxed opacity-80 mt-2">
                        Advanced AI + historical JoSAA data to predict your best colleges instantly.
                    </p>
                </motion.div>

                {!prediction ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-8 bg-white/70 backdrop-blur-xl rounded-[28px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] p-5 lg:p-16 border border-white">
                            <h2 className="text-[20px] lg:text-2xl font-black text-slate-900 mb-8 lg:mb-10 flex items-center gap-3 lg:gap-4">
                                <div className="p-2 lg:p-2.5 bg-blue-50 rounded-xl text-[#0462C3]">
                                    <Calculator size={22} strokeWidth={2.5} />
                                </div>
                                Personal Profile
                            </h2>
                            <form onSubmit={handlePredict} className="flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-10">
                                <div className="lg:col-span-2 space-y-3">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Select Exam Path</label>
                                    <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-100">
                                        {exams.map(exam => (
                                            <button key={exam} type="button" onClick={() => setFormData({ ...formData, examType: exam })} className={`flex-1 py-3 rounded-xl text-[11px] font-black transition-all ${formData.examType === exam ? 'bg-[#0462C3] text-white shadow-[0_6px_16px_rgba(4,98,195,0.3)]' : 'text-slate-500 hover:text-slate-800'}`}>{exam}</button>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 flex items-center gap-1.5"><User size={10} strokeWidth={3} /> Category</label>
                                        <select className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-100 rounded-xl outline-none focus:bg-white focus:border-[#0462C3]/30 transition-all font-bold text-slate-700 text-[13px] appearance-none" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 flex items-center gap-1.5"><Target size={10} strokeWidth={3} /> Category Rank</label>
                                        <input type="number" placeholder="Category Rank" className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-100 rounded-xl outline-none focus:bg-white focus:border-[#0462C3]/30 transition-all font-bold text-slate-800 text-[13px] placeholder:text-slate-300" value={formData.rank} onChange={(e) => setFormData({ ...formData, rank: e.target.value })} required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 flex items-center gap-1.5"><MapPin size={10} strokeWidth={3} /> Home State</label>
                                    <select className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-100 rounded-xl outline-none focus:bg-white focus:border-[#0462C3]/30 transition-all font-bold text-slate-700 text-[13px] appearance-none" value={formData.homeState} onChange={(e) => setFormData({ ...formData, homeState: e.target.value })}>
                                        {states.map(state => <option key={state} value={state}>{state}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Gender Filter</label>
                                    <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-100">
                                        {['Gender-Neutral', 'Female Only'].map(g => (
                                            <button key={g} type="button" onClick={() => setFormData({ ...formData, gender: g })} className={`flex-1 py-3 rounded-xl text-[9px] lg:text-[10px] font-black uppercase tracking-tight transition-all ${formData.gender === g ? 'bg-blue-50 text-[#0462C3] border border-blue-100/50 font-black' : 'text-slate-400 hover:text-slate-700'}`}>{g.split(' ')[0]} {g.split(' ')[1] || ''}</button>
                                        ))}
                                    </div>
                                </div>
                                <div className="lg:col-span-2 space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 flex items-center gap-1.5"><GraduationCap size={10} strokeWidth={3} /> Branch Preference</label>
                                    <select className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-100 rounded-xl outline-none focus:bg-white focus:border-[#0462C3]/30 transition-all font-bold text-slate-700 text-[13px] appearance-none" value={formData.branch} onChange={(e) => setFormData({ ...formData, branch: e.target.value })}>
                                        {branches.map(b => <option key={b} value={b}>{b}</option>)}
                                    </select>
                                </div>
                                <div className="lg:col-span-2 pt-6 lg:pt-10">
                                    <button type="submit" disabled={loading} className="w-full py-4 lg:py-6 bg-gradient-to-r from-[#0462C3] to-blue-600 shadow-[0_12px_32px_rgba(4,98,195,0.3)] text-white rounded-2xl font-black text-[12px] uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
                                        {loading ? <div className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin"></div> : <><Sparkles size={18} strokeWidth={2.5} /> Predict Best Matches</>}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                        <div className="hidden lg:flex lg:col-span-4 flex-col gap-8">
                            <EducationalTip title="What is CRL Rank?" content="Common Rank List is your overall India rank. Use this for the most accurate prediction across all colleges." />
                            <EducationalTip title="The -5% Relaxation" content="We widen your search by 5% below your rank to give you dream options." type="idea" />
                            <div className="p-8 bg-[#0462C3] rounded-[28px] text-white space-y-4 relative overflow-hidden shadow-xl shadow-blue-900/10">
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                                <h4 className="text-xl font-bold italic serif-font">Need Help?</h4>
                                <p className="text-[12px] opacity-80 font-medium leading-relaxed">Our mentors are IIT/NIT alumni who can assist with your choice filling.</p>
                                <button className="w-full py-4 bg-white text-[#0462C3] rounded-xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all">Chat with Mentor</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8 lg:space-y-12">
                            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-[28px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] p-6 lg:p-14 border border-slate-50 relative overflow-hidden">
                                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 relative z-10">
                                    <div className="text-center lg:text-left space-y-4">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Your Prediction Summary</span>
                                        <div className="flex flex-col items-center lg:items-start">
                                            <h2 className="text-6xl lg:text-9xl font-black serif-font italic text-slate-900 leading-none">#{parseInt(formData.rank).toLocaleString()}</h2>
                                            <div className="flex flex-wrap gap-2 mt-4 justify-center lg:justify-start">
                                                {['category', 'examType', 'homeState'].map(k => (
                                                    <span key={k} className="px-3 py-1 bg-slate-50 rounded-full text-[9px] font-black uppercase text-slate-500 border border-slate-100">{formData[k]}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex gap-6 pt-2">
                                            {!prediction.isAdvanced ? (
                                                <>
                                                    <div className="text-center"><p className="text-3xl font-black text-[#0462C3]">{prediction.totalAiEligible}</p><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Other State</p></div>
                                                    <div className="text-center"><p className="text-3xl font-black text-emerald-600">{prediction.totalHsEligible}</p><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Home State</p></div>
                                                </>
                                            ) : (
                                                <div className="text-center"><p className="text-3xl font-black text-[#0462C3]">{prediction.totalAiEligible}</p><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">IIT AI Quota</p></div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-[400px] flex flex-col gap-4">
                                        <div className="bg-blue-50/50 p-5 rounded-[20px] border border-blue-100/30">
                                            <p className="text-[13px] text-slate-600 font-bold italic leading-relaxed">
                                                Based on rank #{parseInt(formData.rank).toLocaleString()}, these are your best matches sorted by <span className="text-[#0462C3] font-black">relevance</span>.
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button onClick={() => { setPrediction(null); setInstituteFilter('all'); }} className="py-4 bg-slate-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 border border-slate-100">Predict New</button>
                                            <button onClick={callMentor} className="py-4 bg-[#0462C3] rounded-xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-blue-500/20">Get Help</button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {!prediction.isAdvanced && <div className="flex justify-center"><InstituteFilterBar /></div>}

                            <div className="space-y-8">
                                {instituteFilter !== 'all' ? (
                                    <CollegeTable title={`${instituteFilter} Matches`} icon={Building2} iconColor="bg-blue-50 text-[#0462C3]" visibleColleges={filteredByInstituteType} quotaTag="All India Basis" emptyMessage="No matches found for this institute type." />
                                ) : (
                                    prediction.isAdvanced ? (
                                        <CollegeTable title="IIT All India" icon={Globe} iconColor="bg-blue-50 text-[#0462C3]" visibleColleges={visibleAiColleges} quotaTag="AI Quota" emptyMessage="No IITs matched your rank." />
                                    ) : (
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                            <CollegeTable title="Other State / AI" icon={Globe} iconColor="bg-blue-50 text-[#0462C3]" visibleColleges={visibleAiColleges} quotaTag="OS Matches" emptyMessage="No other state matches found." />
                                            <CollegeTable title="Home State" icon={Home} iconColor="bg-emerald-50 text-emerald-600" visibleColleges={visibleHsColleges} quotaTag="HS Matches" emptyMessage="No home state matches found." />
                                        </div>
                                    )
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
};

export default RankPredictor;
