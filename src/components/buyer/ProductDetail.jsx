import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowRight, Heart, Share2, CheckCircle2, ShoppingBag, Sparkles, Globe, Play, Pause, Volume2 } from 'lucide-react';
import PropTypes from 'prop-types';

export default function ProductDetail({ product, isLiked, onClose, onToggleLike, onAddToCart }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [language] = useState('English');
    const speechRef = useRef(null);
    const waveformHeights = useMemo(() => Array.from({ length: 20 }, () => Math.random() * 80 + 20), []);

    useEffect(() => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(product.audioStory);
            utterance.rate = 0.9;
            utterance.onend = () => setIsPlaying(false);
            speechRef.current = utterance;
        }
    }, [product]);

    useEffect(() => {
        if (isPlaying && speechRef.current) {
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(speechRef.current);
        } else {
            window.speechSynthesis.cancel();
        }
        return () => window.speechSynthesis.cancel();
    }, [isPlaying]);

    return (
        <div className="h-full bg-slate-950 relative overflow-y-auto animate-slide-up scrollbar-hide z-50">
            <div className="h-[50%] relative group">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-slate-950"></div>

                <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
                    <button onClick={onClose} className="w-10 h-10 bg-black/20 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/10"><ArrowRight className="rotate-180" size={20} /></button>
                    <div className="flex gap-3">
                        <button onClick={onToggleLike} className={`w-10 h-10 bg-black/20 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center transition-all ${isLiked ? 'text-red-500 bg-red-500/20' : 'text-white hover:bg-white/10'}`}>
                            <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                        </button>
                        <button className="w-10 h-10 bg-black/20 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/10"><Share2 size={18} /></button>
                    </div>
                </div>
            </div>

            <div className="px-6 -mt-20 relative z-10 pb-32">
                <div className="flex items-center gap-2 text-amber-500 text-[10px] font-bold tracking-widest uppercase mb-2 bg-amber-500/10 w-fit px-2 py-1 rounded-md border border-amber-500/20">
                    <CheckCircle2 size={10} /> Verified Authentic
                </div>
                <h1 className="text-3xl font-heritage font-bold text-white mb-6 leading-tight">{product.title}</h1>

                <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-2xl mb-8 backdrop-blur-md">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold">{product.artisan.charAt(0)}</div>
                    <div className="flex-1">
                        <div className="text-slate-200 text-sm font-bold">{product.artisan}</div>
                        <div className="text-slate-500 text-xs">{product.location}</div>
                    </div>
                    <button className="px-4 py-1.5 text-xs font-semibold bg-white text-slate-950 rounded-full hover:bg-amber-500 transition-colors">Follow</button>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 border border-white/10 rounded-3xl p-5 mb-8 relative overflow-hidden group">
                    <div className="flex justify-between items-center mb-6 relative z-10">
                        <div className="flex items-center gap-2 text-amber-400"><Sparkles size={14} /><span className="text-xs font-bold tracking-wider">AI STORY TAG</span></div>
                        <button className="text-xs font-medium text-slate-300 flex items-center gap-1.5 bg-slate-800/80 border border-white/10 px-3 py-1.5 rounded-full"><Globe size={12} /> {language}</button>
                    </div>
                    <div className="flex items-center gap-4 mb-2">
                        <button onClick={() => setIsPlaying(!isPlaying)} className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg ${isPlaying ? 'bg-amber-500 text-slate-900 scale-95' : 'bg-white text-slate-900 hover:scale-105'}`}>
                            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                        </button>
                        <div className="flex-1 h-10 flex items-center gap-1">
                            {waveformHeights.map((h, i) => (
                                <div key={i} className={`w-1 rounded-full bg-amber-500/50 ${isPlaying ? 'waveform-bar' : 'h-1'}`} style={{ height: isPlaying ? `${h}%` : '4px', animationDelay: `${i * 0.05}s` }}></div>
                            ))}
                        </div>
                    </div>
                </div>

                <h3 className="text-lg font-heritage font-bold text-white mb-3">Craftsmanship</h3>
                <p className="text-slate-400 text-sm leading-7 mb-6 font-light">{product.description}</p>
                <div className="flex flex-wrap gap-2 mb-20">
                    {product.materials?.map(m => <span key={m} className="px-4 py-1.5 bg-slate-900 border border-white/10 rounded-lg text-xs font-medium text-slate-300">{m}</span>)}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-slate-950/90 backdrop-blur-xl border-t border-white/5 z-20 flex items-center gap-4">
                <div className="flex-1">
                    <div className="text-xs text-slate-500 mb-1">Total Price</div>
                    <div className="text-xl font-bold text-white">{product.price}</div>
                </div>
                <button onClick={onAddToCart} className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-2xl font-bold text-sm shadow-lg shadow-amber-900/20 transition-all active:scale-95 flex items-center gap-2">
                    <ShoppingBag size={18} /> Add to Cart
                </button>
            </div>
        </div>
    );
}

ProductDetail.propTypes = {
    product: PropTypes.object.isRequired,
    isLiked: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onToggleLike: PropTypes.func.isRequired,
    onAddToCart: PropTypes.func.isRequired
};
