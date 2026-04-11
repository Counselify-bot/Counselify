import { useState, useEffect, useCallback } from 'react';
import { CheckCircle2, XCircle, X, Bell, BellOff } from 'lucide-react';

let showToastGlobal = null;

export function useToast() {
    const [toasts, setToasts] = useState([]);

    const show = useCallback((message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3500);
    }, []);

    useEffect(() => {
        showToastGlobal = show;
        return () => { showToastGlobal = null; };
    }, [show]);

    return { toasts, show };
}

export function showToast(message, type = 'success') {
    if (showToastGlobal) showToastGlobal(message, type);
}

export default function ToastContainer({ toasts }) {
    const icons = {
        success: <Bell size={16} className="text-emerald-600 shrink-0" />,
        error: <BellOff size={16} className="text-red-500 shrink-0" />,
        info: <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
    };

    const bgStyles = {
        success: 'border-emerald-200 bg-white',
        error: 'border-red-200 bg-white',
        info: 'border-blue-200 bg-white'
    };

    return (
        <div className="fixed bottom-24 right-6 z-[200] flex flex-col gap-3 max-w-sm">
            {toasts.map(toast => (
                <div
                    key={toast.id}
                    className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border ${bgStyles[toast.type] || bgStyles.success} animate-in slide-in-from-right fade-in duration-300`}
                >
                    {icons[toast.type] || icons.success}
                    <p className="text-[13px] font-bold text-slate-700 leading-snug">{toast.message}</p>
                </div>
            ))}
        </div>
    );
}
