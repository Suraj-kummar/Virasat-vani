import React, { useState } from 'react';
import { Volume2, Heart, MessageCircle, Share2 } from 'lucide-react';
import PropTypes from 'prop-types';

export default function StoriesView({ products }) {
    const [following, setFollowing] = useState(new Set());
    const toggleFollow = (id) => {
        setFollowing(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    }

    return (
        <div className="h-full snap-y snap-mandatory overflow-y-scroll scrollbar-hide bg-black">
            {products.map((p, index) => (
                <div key={index} className="h-full w-full snap-center relative">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"></div>
                    <div className="absolute bottom-28 left-0 p-6 w-full">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border-2 border-amber-500 text-amber-500 font-bold text-xs">{p.artisan.charAt(0)}</div>
                            <span className="text-white font-bold text-shadow">{p.artisan}</span>
                            <button onClick={() => toggleFollow(p.id)} className={`text-xs border px-3 py-1 rounded-full backdrop-blur-sm transition-colors ${following.has(p.id) ? 'bg-white text-black border-white' : 'border-white/50 text-white'}`}>
                                {following.has(p.id) ? 'Following' : 'Follow'}
                            </button>
                        </div>
                        <p className="text-white text-lg font-heritage leading-relaxed mb-4 drop-shadow-md">"{p.audioStory.substring(0, 80)}..."</p>
                        <div className="flex gap-2">
                            <div className="bg-slate-900/50 backdrop-blur-md px-3 py-1 rounded-lg text-xs text-amber-500 border border-amber-500/30 flex items-center gap-1"><Volume2 size={12} /> AI Story</div>
                        </div>
                    </div>
                    <div className="absolute bottom-28 right-4 flex flex-col gap-6 items-center">
                        <div className="flex flex-col items-center gap-1 cursor-pointer group">
                            <div className="p-2 rounded-full bg-white/10 group-hover:bg-red-500/20 transition-colors"><Heart size={28} className="text-white group-hover:text-red-500 transition-colors" /></div>
                            <span className="text-xs text-white font-bold">4.2k</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 cursor-pointer">
                            <div className="p-2 rounded-full bg-white/10"><MessageCircle size={28} className="text-white" /></div>
                            <span className="text-xs text-white font-bold">285</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 cursor-pointer">
                            <div className="p-2 rounded-full bg-white/10"><Share2 size={28} className="text-white" /></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

StoriesView.propTypes = {
    products: PropTypes.array.isRequired
};
