import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Target, Zap, ChevronRight, Share2, Info, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import EducationalTip from '../components/EducationalTip';

const PercentileToRank = () => {
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState('percentile'); // 'percentile' or 'marks'
    const navigate = useNavigate();

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
            const marginOfError = Math.floor(estimatedRank * 0.05); // 5% margin
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
                exact: estimatedRank > 0 ? estimatedRank : 1,
                rangeStr: rangeStr
            });
            setLoading(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 800);
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
                        JEE Score Algorithmic Assessment
                    </span>
                    <h1 className="text-4xl md:text-7xl font-bold text-on-surface leading-[1.1] mb-5 tracking-tighter">
                        Percentile to <span className="serif-font italic font-medium text-primary-container">Rank</span>
                    </h1>
                    <p className="max-w-xl mx-auto text-on-surface-variant text-sm md:text-base font-bold leading-relaxed italic">
                        Precise conversion of your JEE Main percentile into a tangible Common Rank List (CRL) estimate, utilizing 2024 candidate distribution matrices.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Form Component */}
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
                            CRL Input Parameter
                        </h2>

                        <form onSubmit={calculateRank}>
                            {/* Toggle */}
                            <div className="grid grid-cols-2 gap-3 mb-10">
                                <button
                                    type="button"
                                    onClick={() => { setMode('percentile'); setInputValue(''); setResult(null); }}
                                    className={`py-3.5 rounded-2xl text-[11px] font-bold transition-all border-2 ${mode === 'percentile' ? 'bg-primary-container text-white border-primary-container shadow-lg shadow-primary-fixed' : 'bg-white text-outline border-outline-variant/10 hover:border-primary-fixed'}`}
                                >
                                    Percentile
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setMode('marks'); setInputValue(''); setResult(null); }}
                                    className={`py-3.5 rounded-2xl text-[11px] font-bold transition-all border-2 ${mode === 'marks' ? 'bg-primary-container text-white border-primary-container shadow-lg shadow-primary-fixed' : 'bg-white text-outline border-outline-variant/10 hover:border-primary-fixed'}`}
                                >
                                    Marks
                                </button>
                            </div>

                            <div className="mb-12 space-y-3">
                                <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold text-outline opacity-80">
                                    <Target size={12} className="text-primary-fixed-dim" /> {mode === 'percentile' ? 'NTA Percentile Score' : 'Expected Marks (Out of 300)'}
                                </label>
                                <input
                                    type="number"
                                    step={mode === 'percentile' ? "0.0000001" : "1"}
                                    min={mode === 'percentile' ? "0" : "-75"}
                                    max={mode === 'percentile' ? "100" : "300"}
                                    placeholder={mode === 'percentile' ? "e.g. 96.745" : "e.g. 150"}
                                    value={inputValue}
                                    onChange={(e) => {
                                        setInputValue(e.target.value);
                                        setResult(null);
                                    }}
                                    className="w-full px-7 py-4 bg-primary-fixed/20 border-2 border-transparent rounded-[20px] outline-none focus:border-primary-container/30 focus:bg-white transition-all text-lg font-bold text-on-surface placeholder:text-outline-variant [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    required
                                />
                                <p className="text-[11px] text-outline opacity-70 font-bold">
                                    {mode === 'percentile' ? 'Enter your NTA percentile to estimate your All India Rank (CRL).' : 'Enter your expected JEE Main marks to estimate your rank.'}
                                </p>
                            </div>

                            <AnimatePresence mode="wait">
                                {!result ? (
                                    <motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        type="submit"
                                        disabled={loading || !inputValue}
                                        className="w-full px-6 py-4 bg-primary-container hover:bg-primary text-white rounded-2xl font-bold text-[13px] uppercase tracking-[0.15em] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-fixed active:scale-[0.97] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                                    >
                                        {loading ? (
                                            <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <>Synthesize Rank <Zap size={18} /></>
                                        )}
                                    </motion.button>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="bg-primary-fixed/20 rounded-[24px] p-8 md:p-10 border border-primary-container/10 text-left relative overflow-hidden"
                                    >
                                        {result.type === 'marks' && (
                                            <div className="mb-6 pb-6 border-b border-primary-container/10">
                                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-container mb-1">Algorithm Computed Percentile</p>
                                                <h4 className="text-2xl font-bold text-on-surface">{result.estimatedPercentile}%</h4>
                                            </div>
                                        )}

                                        <div className="mb-6">
                                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-outline opacity-80 mb-2">
                                                Your Estimated Rank:
                                            </p>
                                            <h4 className="text-5xl font-bold text-on-surface tracking-tighter">
                                                {result.exact.toLocaleString()}
                                            </h4>
                                            <p className="text-[11px] text-outline opacity-70 mt-2 font-bold">Statistical Range: {result.rangeStr}</p>
                                        </div>

                                        <div className="bg-white rounded-2xl p-5 border border-outline-variant/10 shadow-soft mb-8">
                                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-container mb-3">Possible Colleges:</p>
                                            <ul className="space-y-2">
                                                <li className="flex items-center gap-2 text-sm font-bold text-on-surface-variant">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary-container"></div> NIT Raipur
                                                </li>
                                                <li className="flex items-center gap-2 text-sm font-bold text-on-surface-variant">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary-container"></div> IIIT Nagpur
                                                </li>
                                                <li className="flex items-center gap-2 text-sm font-bold text-on-surface-variant">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary-container"></div> NIT Silchar
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="flex flex-col gap-3 relative z-10 w-full">
                                            <button
                                                onClick={() => navigate(`/services`)}
                                                className="w-full px-6 py-4 bg-primary-container hover:bg-primary text-white rounded-2xl font-bold text-[13px] uppercase tracking-[0.15em] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-fixed active:scale-[0.97] flex items-center justify-center gap-2 group"
                                            >
                                                See Best Colleges for Your Rank <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                            <button
                                                onClick={() => { setInputValue(''); setResult(null); }}
                                                className="w-full px-6 py-3 text-primary-container font-bold text-[11px] uppercase tracking-[0.15em] hover:underline transition-all flex items-center justify-center"
                                            >
                                                Calculate Another
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-4 space-y-8"
                    >
                        <EducationalTip
                            title="How is this Calculated?"
                            content="Your rank is determined by the formula: [(100 - Your Percentile) / 100] × Total Candidates. We use 1.4M (14 Lakh) as the baseline for the 2024/25 candidate pool for high-accuracy estimations."
                        />
                        <EducationalTip
                            title="Percentile vs Percentage"
                            content="A 96 percentile means you scored better than 96% of the candidates who appeared. It is NOT the percentage of marks you scored."
                            type="idea"
                        />
                        <div className="p-8 bg-primary-container/5 rounded-[32px] border border-primary-container/20 text-on-surface space-y-5">
                            <h4 className="text-lg font-bold tracking-tighter flex items-center gap-3">
                                <Share2 size={20} className="text-primary-container" /> Need Category Ranks?
                            </h4>
                            <p className="text-[12px] text-on-surface-variant font-bold italic leading-relaxed">
                                NTA releases exact category ranks only after the April attempt. Our general CRL gives you the fundamental starting point. Use our College Predictor engine to input your category directly against your estimated CRL.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default PercentileToRank;
