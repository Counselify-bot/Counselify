import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success) {
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/');
                window.location.reload(); // To update Navbar
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Server error, please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-24 pb-32 bg-transparent min-h-screen text-left flex items-center justify-center">
            <div className="container mx-auto px-6 max-w-xl">
                <div className="bg-white p-12 md:p-16 rounded-[64px] shadow-2xl border border-slate-100 relative group overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-0 bg-[#0462C3] group-hover:h-full transition-all duration-700"></div>

                    <div className="text-center mb-10 space-y-4">
                        <span className="text-xs font-black uppercase tracking-[0.4rem] text-[#0462C3]">Welcome Back</span>
                        <h1 className="text-4xl font-black text-slate-900 serif-font italic tracking-tighter">Login to Counselify</h1>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="relative group">
                            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0462C3] transition-colors" size={20} />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:border-blue-200 transition-all font-black text-slate-700"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0462C3] transition-colors" size={20} />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:border-blue-200 transition-all font-black text-slate-700"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-6 bg-[#0462C3] text-white rounded-[28px] font-black text-[13px] uppercase tracking-[0.2em] shadow-xl hover:bg-[#0351a1] transition-all flex items-center justify-center gap-4 mt-8"
                        >
                            {loading ? <div className="animate-spin border-2 border-white/30 border-t-white rounded-full w-5 h-5"></div> : <>Login to Engine <LogIn size={20} /></>}
                        </button>
                    </form>

                    <div className="mt-10 text-center space-y-4">
                        <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                            Don't have an account? <Link to="/signup" className="text-[#0462C3] hover:underline">Register Now</Link>
                        </p>
                        <div className="flex items-center justify-center gap-4 text-[11px] font-black text-slate-300 uppercase tracking-widest">
                            <ShieldCheck size={14} /> Official Encryption Active
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
