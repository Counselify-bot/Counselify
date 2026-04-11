import { useState, useEffect } from 'react';
import { X, Bell, BellOff, Check, Youtube } from 'lucide-react';

// Reminder options per category
const REMINDER_OPTIONS = {
    Exam: [
        { id: 'start-day', label: 'Notify when exam starts' },
        { id: '24h-before-start', label: 'Notify 24 hours before' },
        { id: 'last-day', label: 'Last day reminder' }
    ],
    Registration: [
        { id: 'start-day', label: 'Notify when registration starts' },
        { id: '24h-before-end', label: 'Notify 24 hours before deadline' },
        { id: 'last-day', label: 'Notify on last day morning' }
    ],
    Result: [
        { id: 'start-day', label: 'Notify when result is announced' },
        { id: '24h-before-start', label: 'Notify 24 hours before expected date' }
    ],
    Counselling: [
        { id: 'start-day', label: 'Notify when counselling starts' },
        { id: '24h-before-end', label: 'Notify 24 hours before deadline' },
        { id: 'last-day', label: 'Notify on final day morning' }
    ],
    'Admit Card': [
        { id: 'start-day', label: 'Notify when available' },
        { id: '24h-before-start', label: 'Notify 24 hours before' }
    ],
    Video: [
        { id: 'video-upload', label: 'Notify when new video is uploaded' }
    ]
};

// Sensible defaults per category
const DEFAULT_SELECTIONS = {
    Exam: ['24h-before-start'],
    Registration: ['start-day', '24h-before-end'],
    Result: ['start-day'],
    Counselling: ['start-day', '24h-before-end'],
    'Admit Card': ['start-day'],
    Video: ['video-upload']
};

export default function ReminderModal({ isOpen, onClose, item, onSave, onRemove, existingPrefs = [], isAlreadyStarred = false }) {
    const [selected, setSelected] = useState(new Set());
    const [globalVideoAlert, setGlobalVideoAlert] = useState(false);

    const category = item?.tag || 'Exam';
    const options = REMINDER_OPTIONS[category] || REMINDER_OPTIONS.Exam;
    const hasEndDate = item?.hasEndDate ?? false;

    // Initialize selection
    useEffect(() => {
        if (isOpen) {
            if (existingPrefs.length > 0) {
                setSelected(new Set(existingPrefs));
            } else {
                setSelected(new Set(DEFAULT_SELECTIONS[category] || []));
            }
        }
    }, [isOpen, category, existingPrefs]);

    // Filter options based on available data
    const visibleOptions = options.filter(opt => {
        if (opt.id === '24h-before-end' && !hasEndDate && category !== 'Registration') return false;
        if (opt.id === 'last-day' && !hasEndDate && category !== 'Registration') return false;
        return true;
    });

    const toggleOption = (id) => {
        setSelected(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const handleSave = () => {
        onSave([...selected], globalVideoAlert);
    };

    const handleRemove = () => {
        onRemove();
    };

    if (!isOpen || !item) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-[150] bg-slate-900/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal — centered desktop, bottom sheet mobile */}
            <div className="fixed z-[151] inset-0 flex items-end sm:items-center justify-center pointer-events-none">
                <div
                    className="pointer-events-auto w-full sm:w-[420px] max-h-[85vh] overflow-y-auto bg-white rounded-t-[28px] sm:rounded-[28px] shadow-[0_24px_80px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom sm:zoom-in-95 fade-in duration-300"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="sticky top-0 bg-white rounded-t-[28px] sm:rounded-t-[28px] px-7 pt-6 pb-4 border-b border-slate-100 z-10">
                        {/* Drag handle (mobile) */}
                        <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-4 sm:hidden" />

                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#0462C3]/10 rounded-xl flex items-center justify-center text-[#0462C3]">
                                    <Bell size={18} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Set Reminder</h3>
                                    <p className="text-[11px] font-medium text-slate-400 mt-0.5">Choose when to be notified</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-all"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Item Title */}
                    <div className="px-7 pt-5 pb-2">
                        <p className="text-[13px] font-bold text-slate-500 line-clamp-2 leading-relaxed bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
                            {item.title}
                        </p>
                    </div>

                    {/* Options */}
                    <div className="px-7 py-4 space-y-2.5">
                        {visibleOptions.map((opt) => {
                            const isSelected = selected.has(opt.id);
                            return (
                                <button
                                    key={opt.id}
                                    onClick={() => toggleOption(opt.id)}
                                    className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl border-2 text-left transition-all duration-200 ${
                                        isSelected
                                            ? 'border-[#0462C3] bg-[#0462C3]/5 shadow-sm'
                                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                                    }`}
                                >
                                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                                        isSelected
                                            ? 'bg-[#0462C3] border-[#0462C3]'
                                            : 'border-slate-300 bg-white'
                                    }`}>
                                        {isSelected && <Check size={12} className="text-white" strokeWidth={3} />}
                                    </div>
                                    <span className={`text-[13px] font-bold ${isSelected ? 'text-slate-800' : 'text-slate-600'}`}>
                                        {opt.label}
                                    </span>
                                </button>
                            );
                        })}

                        {/* Global video alert toggle — only for Video category */}
                        {category === 'Video' && (
                            <button
                                onClick={() => setGlobalVideoAlert(!globalVideoAlert)}
                                className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl border-2 text-left transition-all duration-200 mt-3 ${
                                    globalVideoAlert
                                        ? 'border-red-400 bg-red-50 shadow-sm'
                                        : 'border-slate-200 bg-white hover:border-slate-300'
                                }`}
                            >
                                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                                    globalVideoAlert
                                        ? 'bg-red-500 border-red-500'
                                        : 'border-slate-300 bg-white'
                                }`}>
                                    {globalVideoAlert && <Check size={12} className="text-white" strokeWidth={3} />}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Youtube size={14} className="text-red-500" />
                                    <span className={`text-[13px] font-bold ${globalVideoAlert ? 'text-slate-800' : 'text-slate-600'}`}>
                                        Notify me for all new Counselify videos
                                    </span>
                                </div>
                            </button>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="px-7 pb-7 pt-3 space-y-3">
                        <button
                            onClick={handleSave}
                            disabled={selected.size === 0 && !globalVideoAlert}
                            className="w-full py-3.5 bg-[#0462C3] text-white font-bold text-[12px] uppercase tracking-[0.15em] rounded-xl shadow-lg shadow-blue-500/20 hover:bg-[#034a94] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                            {isAlreadyStarred ? 'Update Reminder' : 'Save Reminder'}
                        </button>

                        {isAlreadyStarred && (
                            <button
                                onClick={handleRemove}
                                className="w-full py-3 bg-white text-red-500 font-bold text-[12px] uppercase tracking-[0.15em] rounded-xl border-2 border-red-100 hover:bg-red-50 hover:border-red-200 transition-all flex items-center justify-center gap-2"
                            >
                                <BellOff size={14} />
                                Remove Reminder
                            </button>
                        )}

                        <button
                            onClick={onClose}
                            className="w-full py-3 text-slate-500 font-bold text-[12px] uppercase tracking-[0.15em] hover:text-slate-700 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
