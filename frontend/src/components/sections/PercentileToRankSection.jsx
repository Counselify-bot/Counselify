import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ArrowRight, Target, Zap, ChevronRight, CheckCircle2, RefreshCcw, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

const PercentileToRankSection = () => {
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState('percentile'); // 'percentile' or 'marks'

    const calculateRank = (e) => {
        e.preventDefault();
        let p = 0;
        let estimatedRank = 0;
        let rangeStr = "";
        let calcPercentile = null;

        if (mode === 'percentile') {
            p = parseFloat(inputValue);
            if (isNaN(p) || p < 0 || p > 100) return;
            const totalCandidates = 1400000;
            estimatedRank = Math.floor(((100 - p) / 100) * totalCandidates);
            estimatedRank = estimatedRank > 0 ? estimatedRank : 1;
            const marginOfError = Math.floor(estimatedRank * 0.05);
            rangeStr = `${Math.max(1, estimatedRank - marginOfError).toLocaleString()} - ${(estimatedRank + marginOfError).toLocaleString()}`;
        } else {
            const marks = parseInt(inputValue);
            if (isNaN(marks) || marks < -75 || marks > 300) return;

            const data = [
                [291, 1, 15], [281, 16, 36], [271, 37, 100], [261, 101, 160],
                [251, 161, 428], [241, 429, 755], [231, 756, 1189], [221, 1190, 1893],
                [211, 1894, 2720], [201, 2721, 3803], [191, 3804, 5320], [181, 5321, 7354],
                [171, 7355, 9968], [161, 9969, 13163], [151, 13164, 17290], [141, 17291, 22533],
                [131, 22534, 29145], [121, 29146, 37440], [111, 37441, 47979], [101, 47980, 61651],
                [91, 61652, 79298], [81, 79299, 102421], [71, 102422, 135695], [61, 135696, 183105],
                [51, 183106, 260722], [41, 260723, 380928], [31, 380929, 568308], [21, 568309, 844157],
                [11, 844158, 1118638], [-75, 1118639, 1400000]
            ];

            let foundRankLow = 1;
            let foundRankHigh = 1400000;

            for (let i = 0; i < data.length; i++) {
                if (marks >= data[i][0]) {
                    foundRankLow = data[i][1];
                    foundRankHigh = data[i][2];
                    break;
                }
            }

            estimatedRank = Math.floor((foundRankLow + foundRankHigh) / 2);
            rangeStr = `${foundRankLow.toLocaleString()} - ${foundRankHigh.toLocaleString()}`;
            calcPercentile = (((1400000 - estimatedRank) / 1400000) * 100).toFixed(2);
        }

        setLoading(true);

        setTimeout(() => {
            setResult({
                type: mode,
                input: inputValue,
                estimatedPercentile: calcPercentile,
                exact: estimatedRank,
                rangeStr: rangeStr
            });
            setLoading(false);
        }, 800);
    };

    return (
        <section id="percentile-predictor" className="py-12 lg:py-32 bg-background border-y border-outline-variant/30 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-1/4 h-full bg-primary-container/5 -z-10 skew-x-[-12deg] translate-x-32 blur-3xl"></div>

            <div className="section-container relative z-10">
                {/* Desktop Layout */}
                <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <div className="text-left space-y-8">
                        <div className="inline-flex items-center gap-3 cursor-default">
                            <div className="h-[2px] w-6 bg-primary-container rounded-full"></div>
                            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-primary-container">ALGORITHMIC CONVERSION</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold serif-font text-on-surface leading-[1] tracking-tighter">
                            Percentile to <br />
                            <span className="italic font-normal text-primary-container">Rank Prediction</span>
                        </h2>
                        <p className="text-[17px] text-on-surface-variant font-bold leading-relaxed italic max-w-md">
                            Instantly convert your JEE Main NTA score into a tangible Common Rank List (CRL) estimate based on historical candidate volume trends.
                        </p>

                        <div className="pt-4 flex items-center gap-6">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-9 h-9 rounded-full border border-white bg-[#eef5fc] flex items-center justify-center text-[9px] font-bold text-primary-container shadow-sm">
                                        NTA
                                    </div>
                                ))}
                            </div>
                            <div className="text-[9px] font-bold text-outline uppercase tracking-[0.2em] leading-relaxed">
                                UPDATED FOR <span className="text-on-surface">2024/25</span> <br /> BATCH DATA
                            </div>
                        </div>
                    </div>

                    {/* Right: Calculator Tool */}
                    <div className="glass-panel rounded-2xl p-10 md:p-14 editorial-shadow relative overflow-hidden text-left max-w-xl mx-auto w-full border border-white/50">
                        <div className="flex items-center gap-4 mb-10 relative z-10">
                            <div className="w-10 h-10 bg-[#e3effa] rounded-xl flex items-center justify-center text-primary-container">
                                <Calculator size={18} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h3 className="text-[22px] font-bold serif-font text-on-surface tracking-tight leading-none mb-1">CRL Estimator</h3>
                                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-outline">PRECISION ANALYTICS ENGINE</p>
                            </div>
                        </div>

                        <form onSubmit={calculateRank} className="relative z-10">
                            {/* Toggle */}
                            <div className="flex p-1.5 bg-[#eef5fc] rounded-2xl mb-8 relative border border-blue-900/5">
                                <button
                                    type="button"
                                    onClick={() => { setMode('percentile'); setInputValue(''); setResult(null); }}
                                    className={`flex-1 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl transition-all duration-300 relative z-10 ${mode === 'percentile' ? 'text-primary-container' : 'text-outline hover:text-on-surface-variant'}`}
                                >
                                    NTA PERCENTILE
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setMode('marks'); setInputValue(''); setResult(null); }}
                                    className={`flex-1 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl transition-all duration-300 relative z-10 ${mode === 'marks' ? 'text-primary-container' : 'text-outline hover:text-on-surface-variant'}`}
                                >
                                    JEE MARKS
                                </button>
                                <div className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white shadow-sm rounded-xl transition-transform duration-300 ${mode === 'marks' ? 'translate-x-[calc(100%+6px)]' : 'translate-x-0'}`}></div>
                            </div>

                            <div className="space-y-4 mb-10">
                                <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-outline">
                                    <Target size={12} className="text-primary-fixed-dim" /> {mode === 'percentile' ? 'YOUR NTA PERCENTILE' : 'YOUR EXPECTED MARKS'}
                                </label>
                                <div className="relative group">
                                    <input
                                        type="number"
                                        step={mode === 'percentile' ? "0.0000001" : "1"}
                                        min={mode === 'percentile' ? "0" : "-75"}
                                        max={mode === 'percentile' ? "100" : "300"}
                                        placeholder={mode === 'percentile' ? "e.g. 95.54321" : "e.g. 150"}
                                        value={inputValue}
                                        onChange={(e) => {
                                            setInputValue(e.target.value);
                                            setResult(null);
                                        }}
                                        className="w-full pl-6 pr-24 py-5 bg-[#eef5fc] font-sans border-0 rounded-2xl outline-none transition-all text-[22px] font-bold text-on-surface placeholder:text-[#cedbe8] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        required
                                    />
                                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-sm font-bold text-primary-container">{mode === 'percentile' ? '%' : 'MARKS'}</span>
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                {!result ? (
                                    <motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        type="submit"
                                        disabled={loading || !inputValue}
                                        className="w-full py-5 bg-[#0462C3] hover:bg-primary text-white rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-primary/10 transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <>Compute Rank <Zap size={18} className="group-hover:scale-125 transition-transform" /></>
                                        )}
                                    </motion.button>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-white rounded-2xl p-8 text-center editorial-shadow"
                                    >
                                        {result.type === 'marks' && (
                                            <div className="mb-6 pb-6 border-b border-outline-variant/30">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary-container mb-1">Estimated Percentile</p>
                                                <h4 className="text-2xl font-bold text-on-surface">{result.estimatedPercentile}%</h4>
                                            </div>
                                        )}
                                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-outline mb-2">Estimated CRL Rank</p>
                                        <h4 className="text-5xl font-bold serif-font italic text-on-surface tracking-tighter mb-4">
                                            #{result.exact.toLocaleString()}
                                        </h4>
                                        <div className="inline-block px-4 py-2 bg-white rounded-xl text-xs font-bold text-primary-container uppercase tracking-widest shadow-sm">
                                            Range: {result.rangeStr}
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-outline-variant/20">
                                            <Link to={`/rank-predictor?rank=${result.exact}`} className="text-[11px] font-bold uppercase tracking-widest text-on-surface hover:text-primary-container transition-colors flex items-center justify-center gap-2 group">
                                                Predict Colleges for this rank <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform text-primary-container" />
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </div>
                </div>

                {/* Mobile Layout (Premium AI Tool Redesign) */}
                <div className="flex lg:hidden flex-col items-center w-full max-w-[420px] mx-auto text-center px-4 relative mt-2 pb-12">
                    
                    {/* Minimal AI Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 border border-slate-200/60 bg-slate-50/80 rounded-[8px] mx-auto shadow-sm">
                        <Zap size={12} strokeWidth={2.5} className="text-[#0462C3]" />
                        <span className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500">AI Powered Tool</span>
                    </div>

                    {/* Dominant Hero Heading */}
                    <div className="flex flex-col mb-10 w-full" style={{ padding: '0 8px' }}>
                        <h2 
                            className="font-black text-slate-900 text-center"
                            style={{ 
                                fontSize: '64px', 
                                lineHeight: '1.05', 
                                letterSpacing: '-0.03em',
                                fontFamily: 'Newsreader, serif',
                                wordBreak: 'keep-all',
                                overflowWrap: 'break-word'
                            }}
                        >
                            Predict Your <br />
                            <span style={{ color: '#0462C3', fontStyle: 'italic' }}>Actual Rank</span>
                        </h2>
                        <p className="text-[15px] font-medium text-slate-500 leading-relaxed max-w-[280px] mx-auto mt-5 text-center">
                            Instantly convert your JEE NTA score into an exact CRL rank estimate.
                        </p>
                    </div>

                    {/* Main Interaction Tool (Center Focus) */}
                    <div className="w-full bg-white rounded-[32px] p-1.5 shadow-[0_24px_50px_-12px_rgba(4,98,195,0.12)] border border-blue-100/60 relative overflow-hidden mb-8">
                        <div className="bg-slate-50/50 rounded-[26px] p-5 lg:p-6 h-full flex flex-col relative z-20 border border-white/50">
                            
                            {/* Seamless Toggle inside Tool */}
                            <div className="flex p-1 bg-white rounded-[20px] relative border border-slate-100 mb-6 shadow-sm">
                                <button
                                    type="button"
                                    onClick={() => { setMode('percentile'); setInputValue(''); setResult(null); }}
                                    className={`flex-1 py-3.5 text-[11px] font-extrabold uppercase tracking-[0.1em] rounded-[16px] transition-all duration-300 relative z-10 ${mode === 'percentile' ? 'text-white' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    NTA PERCENTILE
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setMode('marks'); setInputValue(''); setResult(null); }}
                                    className={`flex-1 py-3.5 text-[11px] font-extrabold uppercase tracking-[0.1em] rounded-[16px] transition-all duration-300 relative z-10 ${mode === 'marks' ? 'text-white' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    JEE MARKS
                                </button>
                                {/* Active pill bg */}
                                <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-brand shadow-md shadow-blue-500/20 rounded-[16px] transition-transform duration-300 ${mode === 'marks' ? 'translate-x-[calc(100%+0px)]' : 'translate-x-0'}`}></div>
                            </div>

                            <form onSubmit={calculateRank} className="flex flex-col flex-1 space-y-5">
                                {/* Immense Input Field */}
                                <div className="flex flex-col gap-2.5 text-left relative group">
                                    <label className="text-[11px] uppercase font-black tracking-widest text-[#0462C3] flex items-center gap-1.5 ml-2">
                                        <Calculator size={12} strokeWidth={3} className="text-[#0462C3]" />
                                        {mode === 'percentile' ? 'Enter Percentile' : 'Enter Marks'}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step={mode === 'percentile' ? "0.0000001" : "1"}
                                            min={mode === 'percentile' ? "0" : "-75"}
                                            max={mode === 'percentile' ? "100" : "300"}
                                            placeholder={mode === 'percentile' ? "95.54..." : "150"}
                                            value={inputValue}
                                            onChange={(e) => {
                                                setInputValue(e.target.value);
                                                setResult(null);
                                            }}
                                            className="w-full px-6 py-5 bg-white border-2 border-slate-100 rounded-[20px] outline-none text-[28px] font-black text-slate-800 placeholder:text-slate-200 focus:bg-[#f8fafc] focus:border-[#0462C3] focus:ring-4 focus:ring-blue-50 transition-all font-sans tracking-tight shadow-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            required
                                        />
                                    </div>
                                </div>

                                <AnimatePresence mode="wait">
                                    {!result ? (
                                        <motion.button
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            type="submit"
                                            disabled={loading || !inputValue}
                                            className="w-full mt-2 py-5 bg-gradient-brand text-white rounded-[20px] font-extrabold text-[14px] uppercase tracking-[0.1em] shadow-[0_12px_28px_-6px_rgba(4,98,195,0.4)] transition-transform active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex justify-center items-center gap-2 group"
                                        >
                                            {loading ? (
                                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            ) : (
                                                <>Get My Rank <ArrowRight size={18} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" /></>
                                            )}
                                        </motion.button>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-white rounded-[20px] p-6 text-center border-2 border-[#0462C3] shadow-[0_8px_32px_rgba(4,98,195,0.15)] mt-2"
                                        >
                                            {result.type === 'marks' && (
                                                <div className="mb-4 pb-4 border-b border-slate-100">
                                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0462C3] mb-1">Estimated Percentile</p>
                                                    <h4 className="text-2xl font-black text-slate-800">{result.estimatedPercentile}%</h4>
                                                </div>
                                            )}
                                            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Your CRL Rank</p>
                                            <h4 className="text-[48px] leading-none font-black text-[#0462C3] tracking-tighter mb-4 italic serif-font">
                                                #{result.exact.toLocaleString()}
                                            </h4>
                                            <div className="inline-block px-4 py-2 bg-blue-50/80 rounded-xl text-[11px] font-black text-[#0462C3] uppercase tracking-widest border border-blue-200/50">
                                                Range: {result.rangeStr}
                                            </div>

                                            <div className="mt-6 pt-5 border-t border-slate-100">
                                                <Link to={`/rank-predictor?rank=${result.exact}`} className="text-[11px] font-black uppercase tracking-widest text-slate-800 hover:text-[#0462C3] flex items-center justify-center gap-1.5 transition-colors group">
                                                    Predict Colleges Now <ArrowRight size={14} strokeWidth={3} className="text-[#0462C3] group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </form>

                        </div>
                    </div>

                    {/* Trust Signals Tri-Grid */}
                    <div className="grid grid-cols-3 gap-3 w-full opacity-80 pt-2 border-t border-slate-200/60 max-w-[340px] mx-auto">
                        <div className="flex flex-col items-center justify-center gap-2">
                            <Database size={16} strokeWidth={2.5} className="text-slate-400" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">JoSAA Data</span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2 border-x border-slate-200/60">
                            <RefreshCcw size={16} strokeWidth={2.5} className="text-[#0462C3]" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-[#0462C3]">Updated '25</span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2">
                            <Zap size={16} strokeWidth={2.5} className="text-amber-500" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-amber-500">Instant</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default PercentileToRankSection;
