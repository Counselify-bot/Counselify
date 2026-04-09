import React, { useState, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Search, Building2, GraduationCap, Target,
    MapPin, ChevronRight, ArrowRight, ArrowLeft,
    AlertTriangle, Sparkles, Info, Star, Shield,
    Filter, Rocket, Users, Globe, Crown
} from 'lucide-react';

import jacRawData from '../../data/jac_delhi_cutoff_data.json';

/* ─────────────────────────────────────────────
   ERROR BOUNDARY
   ───────────────────────────────────────────── */

class JACErrorBoundary extends Component {
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
                        <p className="text-sm text-slate-500 mb-6">The JAC Delhi predictor ran into an issue. Please try refreshing the page.</p>
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
   IGNORED BRANCHES
   ───────────────────────────────────────────── */

const IGNORED_BRANCH_KEYWORDS = [
    'architecture', 'b.arch', 'planning'
];

function isIgnoredBranch(branch) {
    const lower = (branch || '').toLowerCase();
    return IGNORED_BRANCH_KEYWORDS.some(kw => lower.includes(kw));
}

/* ─────────────────────────────────────────────
   DATA PREPROCESSING
   ───────────────────────────────────────────── */

const preprocessData = () => {
    try {
        const data = Array.isArray(jacRawData) ? jacRawData : [];

        // Group by unique key and keep highest round (latest)
        const bestRoundMap = new Map();

        data.forEach(entry => {
            // Skip invalid ranks
            if (!entry.closingRank || entry.closingRank <= 0) return;

            // Skip architecture / planning branches
            if (isIgnoredBranch(entry.branch)) return;

            const key = `${entry.college}||${entry.branch}||${entry.quota}||${entry.category}||${entry.gender}`;
            const existing = bestRoundMap.get(key);

            if (!existing || entry.round > existing.round) {
                bestRoundMap.set(key, { ...entry });
            }
        });

        return [...bestRoundMap.values()];
    } catch (err) {
        console.error('JAC Delhi data preprocessing error:', err);
        return [];
    }
};

const processedData = preprocessData();

/* ─────────────────────────────────────────────
   CAMPUS TAG HELPER
   ───────────────────────────────────────────── */

function getCampusTag(campus) {
    if (!campus) return null;
    const lower = campus.toLowerCase();
    if (lower.includes('main')) return 'Top';
    return 'Other';
}

/* ─────────────────────────────────────────────
   CONSTANTS
   ───────────────────────────────────────────── */

const CATEGORIES = ['General', 'OBC', 'SC', 'ST', 'EWS'];
const GENDERS = ['Male', 'Female'];
const REGIONS = ['Delhi Region', 'Outside Delhi Region'];

const LOW_CHANCE_RANGE = 500;
const MAX_LOW_CHANCE = 5;
const MAX_SAFE = 25;

/* ─────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────── */

const JacDelhiPredictor = () => {
    const [formData, setFormData] = useState({
        rank: '',
        category: 'General',
        gender: 'Male',
        region: 'Delhi Region'
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

            // Map region to quota
            const quotaFilter = formData.region === 'Delhi Region' ? 'Delhi' : 'Outside Delhi';

            // Step 1: Filter by category, region (quota), gender
            const filtered = processedData.filter(entry => {
                if (entry.category !== formData.category) return false;
                if (entry.quota !== quotaFilter) return false;
                if (formData.gender === 'Male' && entry.isGirlsOnly === true) return false;
                return true;
            });

            // Step 2: Deduplicate on college + branch (keep entry with best/highest closingRank)
            const dedupMap = new Map();
            filtered.forEach(entry => {
                const key = `${entry.college}||${entry.branch}`;
                const existing = dedupMap.get(key);
                if (!existing || entry.closingRank > existing.closingRank) {
                    dedupMap.set(key, { ...entry });
                }
            });
            const dedupedRows = [...dedupMap.values()];

            // ──── LOW CHANCE OPTIONS (closingRank within 500 ranks below userRank) ────
            const lowerBound = Math.max(1, userRank - LOW_CHANCE_RANGE);
            const lowChancePool = dedupedRows
                .filter(entry => entry.closingRank >= lowerBound && entry.closingRank < userRank)
                .map(entry => ({
                    ...entry,
                    chance: 'Low',
                    campusTag: getCampusTag(entry.campus),
                    rankDifference: entry.closingRank - userRank
                }));

            // Sort: closest to userRank first (highest closingRank first)
            lowChancePool.sort((a, b) => b.closingRank - a.closingRank);
            const lowChanceOptions = lowChancePool.slice(0, MAX_LOW_CHANCE);

            // ──── SAFE OPTIONS (all colleges where closingRank >= userRank, no upper cap) ────
            const safePool = dedupedRows
                .filter(entry => entry.closingRank >= userRank)
                .map(entry => ({
                    ...entry,
                    chance: 'High',
                    campusTag: getCampusTag(entry.campus),
                    rankDifference: entry.closingRank - userRank
                }));

            // Sort: closest rank first (lowest closingRank first)
            safePool.sort((a, b) => a.closingRank - b.closingRank);
            const safeOptions = safePool.slice(0, MAX_SAFE);

            setPrediction({
                rank: userRank,
                category: formData.category,
                gender: formData.gender,
                region: formData.region,
                lowChanceOptions,
                safeOptions,
                summary: {
                    lowChanceCount: lowChanceOptions.length,
                    safeCount: safeOptions.length
                }
            });

            setLoading(false);

            setTimeout(() => {
                document.getElementById('jac-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 200);
        }, 1200);
    };

    /* ─── Chance Badge ─── */
    const ChanceBadge = ({ chance }) => {
        const isLow = chance === 'Low';
        return (
            <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${
                isLow
                    ? 'bg-red-50 text-red-700 border-red-200'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>
                {isLow ? '⚡ Low Chance' : '✅ High Chance'}
            </span>
        );
    };

    /* ─── Campus Badge ─── */
    const CampusBadge = ({ campus, campusTag }) => {
        if (!campus) return null;
        const isTop = campusTag === 'Top';
        return (
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider border ${
                isTop
                    ? 'bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border-amber-200'
                    : 'bg-slate-50 text-slate-500 border-slate-200'
            }`}>
                {isTop && <Crown className="w-3 h-3" />}
                {campus}
            </span>
        );
    };

    /* ─── College Card ─── */
    const CollegeCard = ({ item, index, isBestMatch }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className="group relative bg-white rounded-[20px] border border-slate-200/80 p-5 hover:border-[#0462C3]/60 hover:shadow-[0_8px_30px_-12px_rgba(4,98,195,0.2)] hover:-translate-y-0.5 transition-all duration-300"
        >
            {isBestMatch && (
                <div className="absolute -top-3 left-5 flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#0462C3] to-[#0351a1] text-white text-[9px] font-bold uppercase tracking-widest rounded-full shadow-md">
                    <Star className="w-3 h-3 fill-current" /> Best Match
                </div>
            )}

            {/* TOP ROW: College + Chance Badge */}
            <div className="flex items-start justify-between gap-4 mb-3">
                <h4 className="text-[15px] font-extrabold text-slate-900 group-hover:text-[#0462C3] transition-colors leading-tight">
                    {item.college}
                </h4>
                <div className="flex-shrink-0">
                    <ChanceBadge chance={item.chance} />
                </div>
            </div>

            {/* SECOND ROW: Branch + Campus */}
            <div className="mb-4">
                <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded border border-slate-100">B.Tech · 4 Years</span>
                    {item.campus && <CampusBadge campus={item.campus} campusTag={item.campusTag} />}
                </div>
                <h5 className="text-[14px] font-extrabold text-slate-800 leading-snug">
                    {item.branch}
                </h5>
            </div>

            {/* THIRD ROW: Stats Grid */}
            <div className="grid grid-cols-4 gap-2 text-[9px] font-bold uppercase tracking-wider bg-[#f8fafc] rounded-xl p-3 border border-slate-100 mb-4 items-center">
                <div>
                    <span className="text-slate-400 block mb-0.5">Quota</span>
                    <span className="text-slate-800 text-[10px]">{item.quota}</span>
                </div>
                <div>
                    <span className="text-slate-400 block mb-0.5">Category</span>
                    <span className="text-slate-800 text-[10px]">{item.category}</span>
                </div>
                <div>
                    <span className="text-slate-400 block mb-0.5">Close Rank</span>
                    <span className="text-[#0462C3] font-extrabold text-[11px]">{item.closingRank?.toLocaleString()}</span>
                </div>
                <div>
                    <span className="text-slate-400 block mb-0.5">Rank Gap</span>
                    <span className={`font-extrabold text-[11px] ${item.rankDifference > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {item.rankDifference > 0 ? '+' : ''}{item.rankDifference?.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* FOOTER ROW */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-[10px] text-slate-500 font-medium">
                <span>Closed at CRL <strong className="text-slate-800">{item.closingRank?.toLocaleString()}</strong></span>
                <span className="text-[#0462C3] font-bold">Round {item.round} · JAC Delhi 2025</span>
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
                        <CollegeCard key={`${item.college}-${item.branch}-${idx}`} item={item} index={idx} isBestMatch={idx < 3} />
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
                        JAC Delhi Counselling · 2025 Data
                    </span>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-5 tracking-tight leading-tight">
                        JAC Delhi College <span className="text-[#0462C3]">Predictor</span>
                    </h1>
                    <p className="text-base text-slate-600 leading-relaxed font-medium max-w-2xl mx-auto">
                        Predict your admission chances at DTU, NSUT, IGDTUW and IIIT Delhi based
                        on last year's JAC Delhi closing rank trends.
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
                                        placeholder="e.g. 25000"
                                        className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl outline-none focus:border-[#0462C3] focus:bg-white transition-all text-lg font-bold text-slate-900 placeholder:text-slate-400"
                                        value={formData.rank}
                                        onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                                        required
                                        min="1"
                                        id="jac-rank-input"
                                    />
                                    <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1 mt-1">
                                        <Info className="w-3 h-3" /> JAC Delhi uses CRL (Common Rank List) from JEE Main
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
                                        id="jac-category-select"
                                    >
                                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>

                                {/* Region */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-slate-400">
                                        <Globe className="w-3.5 h-3.5 text-[#0462C3]" /> Region
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {REGIONS.map(r => (
                                            <button
                                                key={r}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, region: r })}
                                                className={`py-3.5 rounded-2xl text-[11px] font-bold border-2 uppercase transition-all ${formData.region === r
                                                    ? 'bg-[#0462C3] text-white border-[#0462C3] shadow-md'
                                                    : 'bg-white text-slate-500 border-slate-200 hover:border-[#0462C3]/30'
                                                }`}
                                                id={`jac-region-${r === 'Delhi Region' ? 'delhi' : 'outside'}`}
                                            >
                                                {r === 'Delhi Region' ? 'Delhi' : 'Outside Delhi'}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Gender */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-slate-400">
                                        <Users className="w-3.5 h-3.5 text-[#0462C3]" /> Gender
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {GENDERS.map(g => (
                                            <button
                                                key={g}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, gender: g })}
                                                className={`py-3.5 rounded-2xl text-[11px] font-bold border-2 uppercase transition-all ${formData.gender === g
                                                    ? 'bg-[#0462C3] text-white border-[#0462C3] shadow-md'
                                                    : 'bg-white text-slate-500 border-slate-200 hover:border-[#0462C3]/30'
                                                }`}
                                                id={`jac-gender-${g.toLowerCase()}`}
                                            >
                                                {g}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Info note */}
                                <div className="md:col-span-2">
                                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                                        <Info className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                                        <p className="text-[11px] text-amber-800 font-medium leading-relaxed">
                                            <strong>Note:</strong> IGDTUW is a women-only university and will only appear for female candidates.
                                            NSUT results clearly show campus (Main / East / West). Architecture & Planning branches are excluded.
                                        </p>
                                    </div>
                                </div>

                                {/* Submit */}
                                <div className="md:col-span-2 pt-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-5 bg-[#0462C3] hover:bg-[#034a94] text-white rounded-2xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-blue-200/50 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group active:scale-[0.98]"
                                        id="jac-predict-btn"
                                    >
                                        {loading ? (
                                            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                Predict JAC Delhi Colleges
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
                                    <h4 className="text-sm font-bold text-slate-900">What is JAC Delhi?</h4>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                    Joint Admission Committee (JAC) Delhi manages admissions to DTU, NSUT, IGDTUW, and IIIT Delhi based on JEE Main scores. It has separate cutoffs for Delhi and Outside Delhi candidates.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                    <Sparkles className="w-4 h-4 text-[#0462C3]" />
                                    <h4 className="text-sm font-bold text-slate-900">How Predictions Work</h4>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                    We show only realistic, close-range options near your rank. <strong className="text-red-600">Low Chance</strong> options are within 500 ranks below you. <strong className="text-emerald-600">Safe</strong> options are above your rank within a tight range.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                    <Building2 className="w-4 h-4 text-[#0462C3]" />
                                    <h4 className="text-sm font-bold text-slate-900">Colleges Covered</h4>
                                </div>
                                <ul className="text-xs text-slate-500 leading-relaxed font-medium space-y-1.5 mt-2">
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#0462C3] rounded-full"></span> DTU — Delhi Technological University</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#0462C3] rounded-full"></span> NSUT — Main / East / West Campus</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#0462C3] rounded-full"></span> IGDTUW — Women Only</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#0462C3] rounded-full"></span> IIIT Delhi</li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-[#0462C3] to-[#034a94] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                                <h4 className="text-lg font-bold mb-2 relative z-10">Need Expert Help?</h4>
                                <p className="text-xs text-blue-100 leading-relaxed mb-4 relative z-10 font-medium">
                                    Our mentors can guide you through JAC Delhi choice-filling and help you pick the best options.
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
                            id="jac-results"
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
                                            {[prediction.category, prediction.region, prediction.gender].map((tag, i) => (
                                                <span key={i} className="px-3 py-1 bg-blue-50 text-[#0462C3] rounded-full text-[10px] font-bold uppercase tracking-wider border border-blue-100">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <div className="bg-red-50 rounded-2xl p-5 border border-red-100 text-center min-w-[120px]">
                                            <div className="text-2xl font-extrabold text-red-600">{prediction.summary.lowChanceCount}</div>
                                            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">Low Chance</div>
                                        </div>
                                        <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 text-center min-w-[120px]">
                                            <div className="text-2xl font-extrabold text-emerald-600">{prediction.summary.safeCount}</div>
                                            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">Safe</div>
                                        </div>
                                        <button
                                            onClick={() => setPrediction(null)}
                                            className="py-4 px-6 bg-white border-2 border-slate-200 rounded-2xl text-xs font-bold text-slate-600 uppercase tracking-wider hover:border-[#0462C3] hover:text-[#0462C3] transition-all flex items-center justify-center gap-2"
                                            id="jac-new-search-btn"
                                        >
                                            <Search className="w-4 h-4" /> New Search
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                                    <Info className="w-3 h-3" />
                                    Low Chance = within 500 ranks below you. Safe = all valid colleges above your rank, sorted by nearest match, top 25 shown. B.Arch & Planning excluded.
                                </div>
                            </motion.div>

                            {/* Result Cards */}
                            <div className="space-y-10">
                                {/* Low Chance section — only if results exist */}
                                {prediction.lowChanceOptions.length > 0 && (
                                    <ResultSection
                                        title="Low Chance Options"
                                        subtitle="These colleges closed slightly above your profile last year"
                                        icon={Rocket}
                                        iconColor="bg-red-50 text-red-600"
                                        colleges={prediction.lowChanceOptions}
                                        emptyMsg=""
                                    />
                                )}

                                {/* Safe section */}
                                <ResultSection
                                    title="Safe / Best Match Options"
                                    subtitle="These are the best realistic options available at or above your rank"
                                    icon={Shield}
                                    iconColor="bg-emerald-50 text-emerald-600"
                                    colleges={prediction.safeOptions}
                                    emptyMsg="No safe options found at your current rank. Try a higher rank value or different category."
                                />
                            </div>

                            {/* Bottom CTA */}
                            <div className="bg-gradient-to-br from-[#0462C3] to-[#034a94] rounded-3xl p-10 md:p-14 text-center text-white shadow-xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-white/5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
                                <div className="relative z-10">
                                    <h3 className="text-2xl md:text-3xl font-extrabold mb-4">Need Help with JAC Delhi Choice Filling?</h3>
                                    <p className="text-blue-100 text-base mb-8 max-w-2xl mx-auto font-medium">
                                        Our counselling experts can help you strategize your JAC Delhi preferences for DTU, NSUT, IGDTUW and IIIT Delhi.
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

// Wrap with error boundary
const JacDelhiPredictorWithBoundary = () => (
    <JACErrorBoundary>
        <JacDelhiPredictor />
    </JACErrorBoundary>
);

export default JacDelhiPredictorWithBoundary;
