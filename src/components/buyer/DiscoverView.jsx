import React from 'react';
import { Search, Filter, MapPin } from 'lucide-react';

export default function DiscoverView() {
    return (
        <div className="h-full bg-slate-950 p-6 pt-12 animate-fade-in">
            <div className="flex items-center gap-3 bg-slate-900 p-3 rounded-2xl border border-white/10 mb-8">
                <Search className="text-slate-500" size={20} />
                <input type="text" placeholder="Search artisans, places..." className="bg-transparent w-full text-white placeholder:text-slate-500 focus:outline-none" />
                <div className="p-1.5 bg-slate-800 rounded-lg"><Filter size={16} className="text-amber-500" /></div>
            </div>

            <h2 className="text-xl font-bold font-heritage text-white mb-4">Explore Map</h2>
            <div className="w-full h-48 bg-slate-900 rounded-3xl border border-white/5 relative overflow-hidden mb-8 group cursor-pointer">
                {/* Map Mockup */}
                <img
                    src="/heritage_map.png"
                    alt="Explore Map"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <MapPin className="text-amber-500 drop-shadow-lg animate-bounce" size={32} fill="currentColor" />
                    <div className="bg-slate-950/80 px-3 py-1 rounded-full text-xs font-bold text-white mt-2 backdrop-blur-md">Shilpgram, Udaipur</div>
                </div>
            </div>

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold font-heritage text-white">Trending Collections</h2>
                <span className="text-amber-500 text-xs font-bold">View All</span>
            </div>
            <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-4 rounded-2xl border border-white/5 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-slate-800 overflow-hidden"><img src="https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=200" className="w-full h-full object-cover" alt="Art" /></div>
                    <div>
                        <h3 className="font-bold text-white">Royal Blue Art</h3>
                        <p className="text-xs text-slate-400">128 Items • Jaipur</p>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-amber-900/50 to-red-900/50 p-4 rounded-2xl border border-white/5 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-slate-800 overflow-hidden"><img src="https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=200" className="w-full h-full object-cover" alt="Art" /></div>
                    <div>
                        <h3 className="font-bold text-white">Desert Leather</h3>
                        <p className="text-xs text-slate-400">85 Items • Jodhpur</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
