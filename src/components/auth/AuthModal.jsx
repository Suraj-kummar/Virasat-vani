import React, { useState } from 'react';
import { Mail, Lock, Loader2, Camera, ShoppingBag, X } from 'lucide-react';
import PropTypes from 'prop-types';

export default function AuthModal({ role, onLogin, onClose }) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onLogin({
                name: isLogin ? "Demo User" : "New User",
                email: email || "demo@virasat.com"
            });
        }, 1500);
    };

    return (
        <div className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-4">
            <div className="w-full bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl animate-slide-up relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={20} /></button>
                <div className="text-center mb-6">
                    <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${role === 'artisan' ? 'bg-amber-500/20 text-amber-500' : 'bg-blue-500/20 text-blue-500'}`}>
                        {role === 'artisan' ? <Camera size={32} /> : <ShoppingBag size={32} />}
                    </div>
                    <h2 className="text-2xl font-heritage font-bold text-white">
                        {isLogin ? 'Welcome Back' : 'Join Virasat'}
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">
                        {role === 'artisan' ? 'Share your craft with the world' : 'Discover authentic heritage'}
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <div className="relative">
                            <Mail className="absolute left-4 top-3.5 text-slate-500" size={18} />
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 text-slate-500" size={18} />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : (isLogin ? 'Log In' : 'Sign Up')}
                    </button>
                </form>
                <div className="mt-6 text-center text-sm text-slate-400">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button onClick={() => setIsLogin(!isLogin)} className="text-amber-500 font-semibold hover:underline">
                        {isLogin ? 'Sign Up' : 'Log In'}
                    </button>
                </div>
            </div>
        </div>
    );
}

AuthModal.propTypes = {
    role: PropTypes.string,
    onLogin: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};
