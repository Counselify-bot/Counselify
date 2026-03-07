import { Headset } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const FloatingContactButton = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleClick = (e) => {
        e.preventDefault();
        if (user) {
            navigate('/advisor');
        } else {
            navigate('/login?redirect=/advisor');
        }
    };

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-10 right-10 z-50 bg-[#0462C3] text-white p-5 flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-90 group border border-white/10 overflow-hidden rounded-full"
        >
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>

            <Headset size={26} className="relative z-10" />

            <div className="absolute right-full mr-4 bg-white text-slate-900 px-6 py-3 shadow-2xl border border-slate-50 text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full">
                {user?.name ? `Hi ${user.name.split(' ')[0]}, ` : ''}Speak to Advisor Now
            </div>
        </button>
    );
};

export default FloatingContactButton;
