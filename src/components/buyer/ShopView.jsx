import React, { useState } from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import PropTypes from 'prop-types';

export default function ShopView({ products, onSelect, onOpenCart, cartCount, user }) {
    const [filter, setFilter] = useState('All Items');

    // FILTER LOGIC
    const filteredProducts = filter === 'All Items'
        ? products
        : products.filter(p => p.category === filter);

    return (
        <div className="pb-20 animate-fade-in">
            <div className="p-6 pt-10 pb-4 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-20 border-b border-white/5 flex justify-between items-center">
                <div>
                    <div className="text-[10px] text-amber-500 font-bold tracking-[0.2em] uppercase mb-1 font-modern">Virasat Vani</div>
                    <h2 className="text-2xl font-heritage font-bold text-white">Curated Heritage</h2>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={onOpenCart} className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-white relative hover:bg-slate-800">
                        <ShoppingBag size={18} />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full text-[10px] font-bold flex items-center justify-center text-slate-900">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 p-[2px]">
                        <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold text-amber-500">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 px-6 overflow-x-auto pb-6 scrollbar-hide pt-4">
                {['All Items', 'Pottery', 'Textiles', 'Woodwork'].map((tag) => (
                    <button
                        key={tag}
                        onClick={() => setFilter(tag)}
                        className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${filter === tag ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' : 'bg-slate-900 border border-white/10 text-slate-400 hover:bg-slate-800'}`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4 px-4">
                {filteredProducts.map((p) => (
                    <div key={p.id} onClick={() => onSelect(p)} className="group relative bg-slate-900 rounded-3xl overflow-hidden border border-white/5 shadow-2xl cursor-pointer active:scale-95 transition-all duration-300">
                        <div className="aspect-[4/5] overflow-hidden bg-slate-800">
                            <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90"></div>
                            {p.id === 'new-1' && <div className="absolute top-3 right-3 bg-amber-500/90 backdrop-blur-md text-slate-950 text-[10px] font-bold px-3 py-1 rounded-full animate-pulse">NEW</div>}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                            <div className="text-[10px] text-amber-500 font-bold tracking-wider uppercase mb-1">{p.location}</div>
                            <h3 className="text-slate-100 text-sm font-heritage font-bold leading-tight mb-2 line-clamp-2">{p.title}</h3>
                            <div className="flex items-center justify-between">
                                <span className="text-white font-bold">{p.price}</span>
                                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center"><ArrowRight size={12} className="text-white -rotate-45" /></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {filteredProducts.length === 0 && <div className="text-center text-slate-500 py-10">No items found in this category.</div>}
        </div>
    );
}

ShopView.propTypes = {
    products: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    onOpenCart: PropTypes.func.isRequired,
    cartCount: PropTypes.number.isRequired,
    user: PropTypes.object
};
