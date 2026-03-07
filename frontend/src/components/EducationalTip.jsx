import { motion } from 'framer-motion';
import { Lightbulb, Info, Sparkles } from 'lucide-react';

const EducationalTip = ({ title, content, type = 'info' }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="p-6 rounded-[32px] bg-white border border-slate-100 shadow-soft flex gap-5 group relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-full -mr-12 -mt-12 transition-all group-hover:scale-110"></div>

            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${type === 'info' ? 'bg-blue-50 text-brand-blue' : 'bg-orange-50 text-orange-500'
                }`}>
                {type === 'info' ? <Info size={24} /> : <Lightbulb size={24} />}
            </div>

            <div>
                <h4 className="text-sm font-black text-slate-800 mb-1 flex items-center gap-2">
                    {title} <Sparkles size={14} className="text-brand-accent animate-pulse" />
                </h4>
                <p className="text-xs text-slate-500 font-bold leading-relaxed italic">
                    {content}
                </p>
            </div>
        </motion.div>
    );
};

export default EducationalTip;
