import React, { useState, useMemo, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Search, Building2, GraduationCap, Target,
    MapPin, ChevronRight, ArrowRight, ArrowLeft,
    AlertTriangle, MessageSquare, Sparkles,
    Home, Globe, Info, Star, Shield, Filter,
    TrendingUp, Rocket
} from 'lucide-react';

import csabRawData from '../../data/csab_data.json';

/* ─────────────────────────────────────────────
   ERROR BOUNDARY
   ───────────────────────────────────────────── */

class CSABErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="pt-24 pb-32 mesh-gradient-hero min-h-screen flex items-center justify-center">
                    <div className="bg-white rounded-3xl border border-slate-200 p-12 max-w-lg text-center shadow-sm">
                        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h2>
                        <p className="text-sm text-slate-500 mb-6">The CSAB predictor ran into an issue. Please try refreshing the page.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-[#0462C3] text-white rounded-xl font-bold text-sm hover:bg-[#034a94] transition-all"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

/* ─────────────────────────────────────────────
   DATA CLEANING & PREPROCESSING
   ───────────────────────────────────────────── */

const IGNORED_BRANCH_KEYWORDS = [
    'architecture', 'b.arch', 'bachelor of architecture',
    'planning', 'b.planning', 'bachelor of planning',
    'school of planning and architecture'
];
const IGNORED_QUOTA_KEYWORDS = ['dasa', 'ciwg'];

const cleanRow = (row) => {
    const prog = (row.academic_program_name || '').toLowerCase();
    const quota = (row.quota || '').toLowerCase();

    // Ignore architecture / planning
    if (IGNORED_BRANCH_KEYWORDS.some(kw => prog.includes(kw))) return null;
    // Ignore DASA / CIWG quotas
    if (IGNORED_QUOTA_KEYWORDS.some(kw => quota.includes(kw))) return null;
    // Only B.Tech
    if (!prog.includes('bachelor of technology') && !prog.includes('b.tech')) return null;

    return row;
};

// Flatten all rounds, tag each row with round number, clean
let allRows = [];
try {
    const rawRounds = csabRawData?.rounds || csabRawData || [];
    const roundsArray = Array.isArray(rawRounds) ? rawRounds : [];

    roundsArray.forEach(roundObj => {
        const roundNum = roundObj.round || 0;
        const data = roundObj.data || [];
        data.forEach(row => {
            const cleaned = cleanRow(row);
            if (cleaned) {
                allRows.push({ ...cleaned, round: roundNum });
            }
        });
    });
} catch (err) {
    console.error('CSAB data processing error:', err);
    allRows = [];
}

// Pre-compute unique states from data for the dropdown
const dataStates = [...new Set(allRows.map(r => r.state))].filter(Boolean).sort();

/* ─────────────────────────────────────────────
   BRANCH MATCHING HELPER
   ───────────────────────────────────────────── */

const BRANCH_MAP = {
    'CSE': ['computer science'],
    'IT': ['information technology'],
    'ECE': ['electronics and communication', 'electronics & communication'],
    'Electrical': ['electrical engineering', 'electrical and electronics'],
    'Mechanical': ['mechanical'],
    'Civil': ['civil'],
    'Data Science': ['data science'],
    'AI / AIML': ['artificial intelligence', 'machine learning', ' ai ', 'aiml'],
    'Core Branches': ['mechanical', 'civil', 'chemical', 'metallurg', 'mining', 'textile', 'ceramic', 'production', 'industrial'],
    'Circuital Branches': ['computer science', 'information technology', 'electronics', 'electrical', 'data science', 'artificial intelligence', 'machine learning']
};

function matchesBranch(programName, branchPref) {
    if (branchPref === 'Any') return true;
    const lower = programName.toLowerCase();
    const keywords = BRANCH_MAP[branchPref];
    if (!keywords) return lower.includes(branchPref.toLowerCase());
    return keywords.some(kw => lower.includes(kw));
}

/* ─────────────────────────────────────────────
   BRANCH PRIORITY (for sorting)
   ───────────────────────────────────────────── */
const BRANCH_PRIORITY_KEYWORDS = [
    'computer science', 'data science', 'artificial intelligence',
    'information technology', 'electronics and communication',
    'electrical', 'mechanical', 'civil', 'chemical'
];

function getBranchPriority(programName) {
    const lower = programName.toLowerCase();
    for (let i = 0; i < BRANCH_PRIORITY_KEYWORDS.length; i++) {
        if (lower.includes(BRANCH_PRIORITY_KEYWORDS[i])) return i;
    }
    return BRANCH_PRIORITY_KEYWORDS.length;
}

/* ─────────────────────────────────────────────
   CHANCE LOGIC
   ───────────────────────────────────────────── */

// Safe chance: for colleges where closing_rank >= user rank
function getSafeChance(userRank, closingRank) {
    const margin = closingRank - userRank; // positive = safe
    if (margin >= 0) return { label: 'Very High Chance', priority: 0, color: 'green' };
    if (margin >= -2000) return { label: 'High Chance', priority: 1, color: 'green' };
    if (margin >= -4000) return { label: 'Moderate Chance', priority: 2, color: 'yellow' };
    return { label: 'Low Chance', priority: 3, color: 'red' };
}

// Dream chance: for aspirational colleges (closing_rank < user rank)
function getDreamChance(userRank, closingRank) {
    const gap = userRank - closingRank;
    if (gap <= 500) return { label: 'Low Chance', priority: 3, color: 'red' };
    return { label: 'Dream Option', priority: 4, color: 'red' };
}

/* ─────────────────────────────────────────────
   CONSTANTS
   ───────────────────────────────────────────── */

const CATEGORIES = ['OPEN', 'OPEN (PwD)', 'EWS', 'OBC-NCL', 'SC', 'ST'];

const INDIAN_STATES = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh',
    'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
    'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
    'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
    'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const BRANCHES = [
    'Any', 'CSE', 'IT', 'ECE', 'Electrical', 'Mechanical',
    'Civil', 'Data Science', 'AI / AIML', 'Core Branches', 'Circuital Branches'
];

/* ─────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────── */

const CSABPredictor = () => {
    const [formData, setFormData] = useState({
        rank: '',
        category: 'OPEN',
        gender: 'Gender-Neutral',
        homeState: 'Uttar Pradesh',
        branch: 'Any'
    });

    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);

    /* ─── Predict ─── */
    const handlePredict = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            const userRank = parseInt(formData.rank);
            if (isNaN(userRank) || userRank <= 0) {
                setLoading(false);
                return;
            }

            // Step 1: Dream floor — only colleges within 3000 ranks better
            const dreamFloor = Math.max(1, userRank - 3000);

            // Step 2: Filter rows by category, gender, branch
            const filtered = allRows.filter(row => {
                if (row.seat_type !== formData.category) return false;
                if (formData.gender === 'Gender-Neutral' && row.gender !== 'Gender-Neutral') return false;
                if (formData.gender === 'Female-only (including Supernumerary)' &&
                    row.gender !== 'Female-only (including Supernumerary)' &&
                    row.gender !== 'Gender-Neutral') return false;
                if (!matchesBranch(row.academic_program_name, formData.branch)) return false;
                return true;
            });

            // Step 3: Deduplicate — for each unique combo, keep the most favorable closing rank
            const bestMap = new Map();
            filtered.forEach(row => {
                const key = `${row.institute}||${row.academic_program_name}||${row.quota}||${row.gender}`;
                const existing = bestMap.get(key);
                if (!existing || row.closing_rank > existing.closing_rank) {
                    bestMap.set(key, { ...row });
                } else if (row.closing_rank === existing.closing_rank && row.round > existing.round) {
                    bestMap.set(key, { ...row });
                }
            });

            // Track latest round per key
            const roundInfoMap = new Map();
            filtered.forEach(row => {
                const key = `${row.institute}||${row.academic_program_name}||${row.quota}||${row.gender}`;
                const existing = roundInfoMap.get(key);
                if (!existing || row.round > existing) {
                    roundInfoMap.set(key, row.round);
                }
            });

            const dedupedRows = [...bestMap.values()].map(row => {
                const key = `${row.institute}||${row.academic_program_name}||${row.quota}||${row.gender}`;
                return { ...row, lastRound: roundInfoMap.get(key) || row.round };
            });

            // ═══════════════════════════════════════════════
            // LEFT SIDE: HOME STATE (simple best-match, independent)
            // ═══════════════════════════════════════════════
            const hsPool = dedupedRows
                .filter(row => row.quota === 'Home State' && row.state === formData.homeState)
                .filter(row => row.closing_rank >= userRank * 0.85) // include near matches
                .map(row => {
                    // Simple chance label for Home State (no dream logic)
                    const margin = row.closing_rank - userRank;
                    let chance;
                    if (margin >= 0) chance = { label: 'Available', priority: 0, color: 'green' };
                    else if (margin >= -1000) chance = { label: 'Possible', priority: 1, color: 'yellow' };
                    else chance = { label: 'Reach', priority: 2, color: 'red' };

                    return {
                        ...row,
                        chance,
                        branchPriority: getBranchPriority(row.academic_program_name)
                    };
                });

            // Sort HS: available first, then lower closing rank, then branch
            hsPool.sort((a, b) => {
                if (a.chance.priority !== b.chance.priority) return a.chance.priority - b.chance.priority;
                if (a.closing_rank !== b.closing_rank) return a.closing_rank - b.closing_rank;
                return a.branchPriority - b.branchPriority;
            });

            const hsColleges = hsPool.slice(0, 10);

            // ═══════════════════════════════════════════════
            // RIGHT SIDE: ALL INDIA / OTHER STATE (dream + safe logic)
            // ═══════════════════════════════════════════════
            const nationalRows = dedupedRows.filter(row =>
                row.quota === 'All India' || row.quota === 'Other State'
            );

            // Dream options — strictly within (R-3000) to R only
            const dreamPool = nationalRows
                .filter(row => row.closing_rank >= dreamFloor && row.closing_rank < userRank)
                .map(row => ({
                    ...row,
                    chance: getDreamChance(userRank, row.closing_rank),
                    branchPriority: getBranchPriority(row.academic_program_name),
                    isDream: true
                }));

            dreamPool.sort((a, b) => {
                if (a.closing_rank !== b.closing_rank) return a.closing_rank - b.closing_rank;
                return a.branchPriority - b.branchPriority;
            });

            // Safe options — closing_rank >= userRank
            const safePool = nationalRows
                .filter(row => row.closing_rank >= userRank)
                .map(row => ({
                    ...row,
                    chance: getSafeChance(userRank, row.closing_rank),
                    branchPriority: getBranchPriority(row.academic_program_name),
                    isDream: false
                }));

            safePool.sort((a, b) => {
                if (a.chance.priority !== b.chance.priority) return a.chance.priority - b.chance.priority;
                if (a.closing_rank !== b.closing_rank) return a.closing_rank - b.closing_rank;
                return a.branchPriority - b.branchPriority;
            });

            const dreamOptions = dreamPool.slice(0, 5);
            const safeOptions = safePool.slice(0, 25);

            setPrediction({
                rank: userRank,
                homeState: formData.homeState,
                category: formData.category,
                gender: formData.gender,
                branch: formData.branch,
                hsColleges,
                dreamColleges: dreamOptions,
                safeColleges: safeOptions,
                // Total available options at this rank (closing_rank >= userRank)
                totalHs: dedupedRows.filter(r => r.quota === 'Home State' && r.state === formData.homeState && r.closing_rank >= userRank).length,
                totalNational: nationalRows.filter(r => r.closing_rank >= userRank).length
            });

            setLoading(false);

            setTimeout(() => {
                document.getElementById('csab-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 200);
        }, 1200);
    };

    /* ─── Chance Badge Component ─── */
    const ChanceBadge = ({ chance }) => {
        if (!chance) return null;
        const colorClasses = {
            green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            yellow: 'bg-amber-50 text-amber-700 border-amber-200',
            red: 'bg-red-50 text-red-700 border-red-200'
        };
        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${colorClasses[chance.color] || ''}`}>
                {chance.label || ''}
            </span>
        );
    };

    /* ─── College Card Component ─── */
    const CollegeCard = ({ item, index, isBestMatch }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className="group relative bg-white rounded-2xl border border-slate-200 p-6 hover:border-[#0462C3] hover:shadow-[0_12px_32px_-8px_rgba(4,98,195,0.15)] hover:-translate-y-1 transition-all duration-300"
        >
            {isBestMatch && (
                <div className="absolute -top-3 left-5 flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#0462C3] to-[#0351a1] text-white text-[9px] font-bold uppercase tracking-widest rounded-full shadow-md">
                    <Star className="w-3 h-3 fill-current" /> Best Match
                </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0462C3] transition-colors leading-tight mb-1">
                        {item.institute}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span>{item.state}</span>
                    </div>
                </div>
                <ChanceBadge chance={item.chance} />
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2.5 py-1 bg-slate-50 text-slate-700 border border-slate-100 rounded-lg text-[10px] font-bold">
                    {item.academic_program_name}
                </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[10px] font-bold uppercase tracking-wider bg-slate-50 rounded-xl p-3 border border-slate-100">
                <div>
                    <span className="text-slate-400 block mb-0.5">Quota</span>
                    <span className="text-slate-800">{item.quota}</span>
                </div>
                <div>
                    <span className="text-slate-400 block mb-0.5">Category</span>
                    <span className="text-slate-800">{item.seat_type}</span>
                </div>
                <div>
                    <span className="text-slate-400 block mb-0.5">Gender</span>
                    <span className="text-slate-800">{item.gender === 'Gender-Neutral' ? 'Neutral' : 'Female'}</span>
                </div>
                <div>
                    <span className="text-slate-400 block mb-0.5">Closing Rank</span>
                    <span className="text-[#0462C3] font-extrabold">{item.closing_rank?.toLocaleString()}</span>
                </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                <span>Last year closed at CRL <strong className="text-slate-800">{item.closing_rank?.toLocaleString()}</strong></span>
                <span className="text-[#0462C3] font-bold">Seen till Round {item.lastRound} in CSAB 2025</span>
            </div>
        </motion.div>
    );

    /* ─── Results Section ─── */
    const ResultSection = ({ title, subtitle, icon: Icon, iconColor, colleges, emptyMsg }) => (
        <div>
            <div className="flex items-center gap-3 mb-6">
                <div className={`p-2.5 rounded-xl ${iconColor}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                    <p className="text-xs text-slate-500 font-medium">{subtitle}</p>
                </div>
                <span className="ml-auto px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                    {colleges.length} found
                </span>
            </div>

            {colleges.length > 0 ? (
                <div className="space-y-4">
                    {colleges.map((item, idx) => (
                        <CollegeCard key={idx} item={item} index={idx} isBestMatch={idx < 3} />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
                    <AlertTriangle className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                    <p className="text-sm text-slate-500 font-medium max-w-md mx-auto">{emptyMsg}</p>
                </div>
            )}
        </div>
    );

    return (
        <div className="pt-24 md:pt-32 pb-32 mesh-gradient-hero min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ─── Back Link ─── */}
                <div className="mb-8 mt-4">
                    <Link to="/college-predictor" className="inline-flex items-center gap-2 text-sm font-bold text-[#0462C3] hover:underline">
                        <ArrowLeft className="w-4 h-4" /> Back to Predictor Selection
                    </Link>
                </div>

                {/* ─── Hero ─── */}
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <span className="inline-block py-1 px-4 rounded-full bg-blue-50 text-[#0462C3] text-sm font-bold mb-5 border border-blue-100 shadow-sm">
                        CSAB Special Rounds · 2025 Data
                    </span>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-5 tracking-tight leading-tight">
                        CSAB College <span className="text-[#0462C3]">Predictor</span>
                    </h1>
                    <p className="text-base text-slate-600 leading-relaxed font-medium max-w-2xl mx-auto">
                        Explore CSAB special round college options based on last year's closing rank trends.
                        Enter your details to get personalized predictions.
                    </p>
                </div>

                {/* ─── FORM ─── */}
                {!prediction ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="lg:col-span-8 bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm"
                        >
                            <h2 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                                <div className="p-2.5 bg-blue-50 rounded-xl text-[#0462C3]">
                                    <Filter className="w-5 h-5" />
                                </div>
                                Enter Your Details
                            </h2>

                            <form onSubmit={handlePredict} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* CRL Rank */}
                                <div className="md:col-span-2 space-y-2">
                                    <label className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-slate-400">
                                        <Target className="w-3.5 h-3.5 text-[#0462C3]" /> Enter Your CRL Rank
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="e.g. 45000"
                                        className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl outline-none focus:border-[#0462C3] focus:bg-white transition-all text-lg font-bold text-slate-900 placeholder:text-slate-400"
                                        value={formData.rank}
                                        onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                                        required
                                        min="1"
                                    />
                                    <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1 mt-1">
                                        <Info className="w-3 h-3" /> CSAB counselling uses CRL (Common Rank List / All India Rank)
                                    </p>
                                </div>

                                {/* Category */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-slate-400">
                                        <Shield className="w-3.5 h-3.5 text-[#0462C3]" /> Category
                                    </label>
                                    <select
                                        className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl outline-none focus:border-[#0462C3] focus:bg-white transition-all font-bold text-slate-700 text-sm appearance-none cursor-pointer"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>

                                {/* Home State */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-slate-400">
                                        <MapPin className="w-3.5 h-3.5 text-[#0462C3]" /> Home State
                                    </label>
                                    <select
                                        className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl outline-none focus:border-[#0462C3] focus:bg-white transition-all font-bold text-slate-700 text-sm appearance-none cursor-pointer"
                                        value={formData.homeState}
                                        onChange={(e) => setFormData({ ...formData, homeState: e.target.value })}
                                    >
                                        {INDIAN_STATES.map(st => <option key={st} value={st}>{st}</option>)}
                                    </select>
                                </div>

                                {/* Gender */}
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest font-bold text-slate-400">Gender Filter</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['Gender-Neutral', 'Female-only (including Supernumerary)'].map(g => (
                                            <button
                                                key={g}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, gender: g })}
                                                className={`py-3.5 rounded-2xl text-[11px] font-bold border-2 uppercase transition-all ${formData.gender === g
                                                    ? 'bg-[#0462C3] text-white border-[#0462C3] shadow-md'
                                                    : 'bg-white text-slate-500 border-slate-200 hover:border-[#0462C3]/30'
                                                    }`}
                                            >
                                                {g === 'Gender-Neutral' ? 'Gender-Neutral' : 'Female Only'}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Branch Preference */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-slate-400">
                                        <GraduationCap className="w-3.5 h-3.5 text-[#0462C3]" /> Branch Preference
                                    </label>
                                    <select
                                        className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl outline-none focus:border-[#0462C3] focus:bg-white transition-all font-bold text-slate-700 text-sm appearance-none cursor-pointer"
                                        value={formData.branch}
                                        onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                                    >
                                        {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                                    </select>
                                </div>

                                {/* Submit */}
                                <div className="md:col-span-2 pt-6">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-5 bg-[#0462C3] hover:bg-[#034a94] text-white rounded-2xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-blue-200/50 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group active:scale-[0.98]"
                                    >
                                        {loading ? (
                                            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                Predict CSAB Colleges
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>

                        {/* Sidebar Hints */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                    <Info className="w-4 h-4 text-[#0462C3]" />
                                    <h4 className="text-sm font-bold text-slate-900">What is CSAB?</h4>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                    The Central Seat Allocation Board (CSAB) conducts special rounds after JoSAA for vacant seats in NITs, IIITs, and GFTIs. It's a second opportunity for students who didn't get allocated in JoSAA.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                    <Sparkles className="w-4 h-4 text-[#0462C3]" />
                                    <h4 className="text-sm font-bold text-slate-900">How Predictions Work</h4>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                    Predictions are based on CSAB 2025 closing rank trends across 3 rounds. We compare your rank with last year's cutoffs and assign a probability level to each option.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                    <Home className="w-4 h-4 text-[#0462C3]" />
                                    <h4 className="text-sm font-bold text-slate-900">Home State Quota</h4>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                    NITs and GFTIs reserve ~50% seats for Home State candidates. If you're from the same state as the NIT, your cutoff might be significantly lower. IIITs typically don't have HS quota.
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-[#0462C3] to-[#034a94] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                                <h4 className="text-lg font-bold mb-2 relative z-10">Need Expert Help?</h4>
                                <p className="text-xs text-blue-100 leading-relaxed mb-4 relative z-10 font-medium">
                                    Our mentors can guide you through the CSAB choice-filling process.
                                </p>
                                <Link to="/advisor" className="relative z-10 block w-full py-3 bg-white text-[#0462C3] rounded-xl font-bold text-xs uppercase tracking-widest text-center hover:bg-blue-50 transition-all">
                                    Chat with Mentor
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* ─── RESULTS ─── */
                    <AnimatePresence mode="wait">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            id="csab-results"
                            className="space-y-10"
                        >
                            {/* Summary Bar */}
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-sm"
                            >
                                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                                    <div className="text-center lg:text-left">
                                        <span className="text-xs font-bold uppercase tracking-widest text-[#0462C3]/60">Your CRL Rank</span>
                                        <h2 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tighter mt-1">
                                            #{prediction.rank.toLocaleString()}
                                        </h2>
                                        <div className="flex flex-wrap gap-2 mt-4 justify-center lg:justify-start">
                                            {[prediction.category, prediction.homeState, prediction.gender === 'Gender-Neutral' ? 'Gender-Neutral' : 'Female Only', prediction.branch !== 'Any' ? prediction.branch : null].filter(Boolean).map((tag, i) => (
                                                <span key={i} className="px-3 py-1 bg-blue-50 text-[#0462C3] rounded-full text-[10px] font-bold uppercase tracking-wider border border-blue-100">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 text-center min-w-[120px]">
                                            <div className="text-2xl font-extrabold text-emerald-600">{prediction.totalHs}</div>
                                            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">Home State</div>
                                        </div>
                                        <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100 text-center min-w-[120px]">
                                            <div className="text-2xl font-extrabold text-[#0462C3]">{prediction.totalNational}</div>
                                            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">All India</div>
                                        </div>
                                        <button
                                            onClick={() => setPrediction(null)}
                                            className="py-4 px-6 bg-white border-2 border-slate-200 rounded-2xl text-xs font-bold text-slate-600 uppercase tracking-wider hover:border-[#0462C3] hover:text-[#0462C3] transition-all flex items-center justify-center gap-2"
                                        >
                                            <Search className="w-4 h-4" /> New Search
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                                    <Info className="w-3 h-3" />
                                    Counts represent options available at or above your entered rank based on CSAB 2025 closing ranks. Cards below show the best recommendations.
                                </div>
                            </motion.div>

                            {/* ═══ TWO COLUMN LAYOUT ═══ */}
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

                                {/* LEFT: All India / Other State (dream + safe) */}
                                <div className="space-y-10">
                                    {/* Dream sub-section — only if options exist */}
                                    {prediction.dreamColleges.length > 0 && (
                                        <ResultSection
                                            title="Dream / Aspirational"
                                            subtitle="Slightly better options — low chance but worth trying"
                                            icon={Rocket}
                                            iconColor="bg-red-50 text-red-600"
                                            colleges={prediction.dreamColleges}
                                            emptyMsg=""
                                        />
                                    )}

                                    {/* Safe sub-section */}
                                    <ResultSection
                                        title="All India / Other State"
                                        subtitle="Colleges available outside home state quota"
                                        icon={Globe}
                                        iconColor="bg-blue-50 text-[#0462C3]"
                                        colleges={prediction.safeColleges}
                                        emptyMsg="No All India options found. Try broadening your branch preference."
                                    />
                                </div>

                                {/* RIGHT: Home State Opportunities (simple best-match) */}
                                <div>
                                    <ResultSection
                                        title="Home State Opportunities"
                                        subtitle="Colleges available through your home state quota"
                                        icon={Home}
                                        iconColor="bg-emerald-50 text-emerald-600"
                                        colleges={prediction.hsColleges}
                                        emptyMsg="No home state options available for your current profile."
                                    />
                                </div>
                            </div>

                            {/* Bottom CTA */}
                            <div className="bg-gradient-to-br from-[#0462C3] to-[#034a94] rounded-3xl p-10 md:p-14 text-center text-white shadow-xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-white/5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
                                <div className="relative z-10">
                                    <h3 className="text-2xl md:text-3xl font-extrabold mb-4">Need Personalized CSAB Choice Filling Help?</h3>
                                    <p className="text-blue-100 text-base mb-8 max-w-2xl mx-auto font-medium">
                                        Our team can help you decide the safest and smartest CSAB options based on your rank and goals.
                                    </p>
                                    <Link
                                        to="/advisor"
                                        className="inline-flex items-center gap-2 bg-white text-[#0462C3] py-4 px-8 rounded-xl font-bold text-base hover:bg-blue-50 hover:scale-105 hover:shadow-lg transition-all duration-300"
                                    >
                                        Talk to a Counselling Advisor
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
};

// Wrap with error boundary to prevent blank page crashes
const CSABPredictorWithBoundary = () => (
    <CSABErrorBoundary>
        <CSABPredictor />
    </CSABErrorBoundary>
);

export default CSABPredictorWithBoundary;
