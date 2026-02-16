import React from 'react';
import { ArrowLeft } from 'lucide-react';
import PropTypes from 'prop-types';

export default function FavoritesPage({ onBack, products, likes }) {
    const likedProducts = products.filter(p => likes.has(p.id));
    return (
        <div className="p-6 pt-12 animate-slide-in-right h-full bg-slate-950">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={onBack}><ArrowLeft className="text-white" /></button>
                <h2 className="text-2xl font-bold font-heritage text-white">Favorites</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {likedProducts.length === 0 ? <p className="text-slate-500 col-span-2 text-center">No favorites yet.</p> :
                    likedProducts.map(p => (
                        <div key={p.id} className="bg-slate-900 rounded-2xl overflow-hidden border border-white/5">
                            <img src={p.image} className="w-full h-32 object-cover" alt={p.title} />
                            <div className="p-3">
                                <h3 className="text-white text-xs font-bold line-clamp-1">{p.title}</h3>
                                <p className="text-amber-500 text-xs mt-1">{p.price}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

FavoritesPage.propTypes = {
    onBack: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
    likes: PropTypes.object.isRequired // Set
};
