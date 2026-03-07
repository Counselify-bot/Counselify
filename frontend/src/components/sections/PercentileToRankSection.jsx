import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ArrowRight, Target, Zap, ChevronRight } from 'lucide-react';
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
        <section className="py-24 bg-transparent border-y border-brand-muted/50 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-1/4 h-full bg-brand-blue/5 -z-10 skew-x-[-12deg] translate-x-32 blur-3xl"></div>

            <div className="section-container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <div className="text-left space-y-8">
                        <div className="inline-flex items-center gap-3 cursor-default">
                            <div className="h-[2px] w-6 bg-brand-blue rounded-full"></div>
                            <span className="text-[10px] uppercase tracking-[0.25em] font-black text-brand-blue">ALGORITHMIC CONVERSION</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black serif-font text-brand-dark leading-[1] tracking-tighter">
                            Percentile to <br />
                            <span className="italic font-normal text-brand-blue">Rank Prediction</span>
                        </h2>
                        <p className="text-[17px] text-slate-500 font-bold leading-relaxed italic max-w-md">
                            Instantly convert your JEE Main NTA score into a tangible Common Rank List (CRL) estimate based on historical candidate volume trends.
                        </p>

                        <div className="pt-4 flex items-center gap-6">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-9 h-9 rounded-full border border-white bg-[#eef5fc] flex items-center justify-center text-[9px] font-black text-brand-blue shadow-sm">
                                        NTA
                                    </div>
                                ))}
                            </div>
                            <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] leading-relaxed">
                                UPDATED FOR <span className="text-brand-dark">2024/25</span> <br /> BATCH DATA
                            </div>
                        </div>
                    </div>

                    {/* Right: Calculator Tool */}
                    <div className="bg-[#f2f7fc]/95 backdrop-blur-2xl border border-white/50 rounded-[40px] p-10 md:p-14 shadow-2xl relative overflow-hidden text-left shadow-blue-900/10 max-w-xl mx-auto w-full">
                        <div className="flex items-center gap-4 mb-10 relative z-10">
                            <div className="w-10 h-10 bg-[#e3effa] rounded-xl flex items-center justify-center text-brand-blue">
                                <Calculator size={18} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h3 className="text-[22px] font-black serif-font text-brand-dark tracking-tight leading-none mb-1">CRL Estimator</h3>
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">PRECISION ANALYTICS ENGINE</p>
                            </div>
                        </div>

                        <form onSubmit={calculateRank} className="relative z-10">
                            {/* Toggle */}
                            <div className="flex p-1.5 bg-[#eef5fc] rounded-2xl mb-8 relative border border-blue-900/5">
                                <button
                                    type="button"
                                    onClick={() => { setMode('percentile'); setInputValue(''); setResult(null); }}
                                    className={`flex-1 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all duration-300 relative z-10 ${mode === 'percentile' ? 'text-brand-blue' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    NTA PERCENTILE
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setMode('marks'); setInputValue(''); setResult(null); }}
                                    className={`flex-1 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all duration-300 relative z-10 ${mode === 'marks' ? 'text-brand-blue' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    JEE MARKS
                                </button>
                                <div className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white shadow-sm rounded-xl transition-transform duration-300 ${mode === 'marks' ? 'translate-x-[calc(100%+6px)]' : 'translate-x-0'}`}></div>
                            </div>

                            <div className="space-y-4 mb-10">
                                <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">
                                    <Target size={12} className="text-brand-accent" /> {mode === 'percentile' ? 'YOUR NTA PERCENTILE' : 'YOUR EXPECTED MARKS'}
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
                                        className="w-full pl-6 pr-24 py-5 bg-[#eef5fc] font-sans border-0 rounded-2xl outline-none transition-all text-[22px] font-black text-brand-dark placeholder:text-[#cedbe8] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        required
                                    />
                                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-sm font-black text-brand-blue">{mode === 'percentile' ? '%' : 'MARKS'}</span>
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
                                        className="w-full py-5 bg-[#0462C3] hover:bg-brand-dark text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-blue-900/10 transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
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
                                        className="bg-brand-muted/20 border border-brand-muted/50 rounded-[32px] p-8 text-center"
                                    >
                                        {result.type === 'marks' && (
                                            <div className="mb-6 pb-6 border-b border-brand-muted/50">
                                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue mb-1">Estimated Percentile</p>
                                                <h4 className="text-2xl font-black text-brand-dark">{result.estimatedPercentile}%</h4>
                                            </div>
                                        )}
                                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Estimated CRL Rank</p>
                                        <h4 className="text-5xl font-black serif-font italic text-brand-dark tracking-tighter mb-4">
                                            #{result.exact.toLocaleString()}
                                        </h4>
                                        <div className="inline-block px-4 py-2 bg-white rounded-xl text-xs font-black text-brand-blue uppercase tracking-widest shadow-sm">
                                            Range: {result.rangeStr}
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-brand-muted/30">
                                            <Link to={`/rank-predictor?rank=${result.exact}`} className="text-[11px] font-black uppercase tracking-widest text-brand-dark hover:text-brand-blue transition-colors flex items-center justify-center gap-2 group">
                                                Predict Colleges for this rank <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform text-brand-blue" />
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PercentileToRankSection;
