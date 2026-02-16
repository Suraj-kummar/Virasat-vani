import React from 'react';
import { ShoppingBag, X, Minus, Plus, Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';

export default function CartModal({ cart, onClose, onRemove, onUpdateQty, onCheckout }) {
    const total = cart.reduce((acc, item) => acc + (item.priceNum * item.qty), 0);

    return (
        <div className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex flex-col animate-slide-up">
            <div className="p-6 bg-slate-900 border-b border-white/10 flex justify-between items-center shadow-lg">
                <h2 className="text-xl font-heritage font-bold text-white">Your Cart</h2>
                <button onClick={onClose} className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-4">
                        <ShoppingBag size={48} className="opacity-20" />
                        <p>Your cart is empty</p>
                        <button onClick={onClose} className="text-amber-500 font-bold text-sm">Continue Shopping</button>
                    </div>
                ) : (
                    cart.map(item => (
                        <div key={item.id} className="bg-slate-900 border border-white/5 rounded-xl p-3 flex gap-4">
                            <img src={item.image} alt="" className="w-20 h-20 rounded-lg object-cover" />
                            <div className="flex-1">
                                <h3 className="text-white font-medium text-sm line-clamp-1">{item.title}</h3>
                                <p className="text-amber-500 text-sm font-bold mt-1">{item.price}</p>
                                <div className="flex items-center gap-3 mt-3">
                                    <div className="flex items-center gap-3 bg-slate-800 rounded-lg px-2 py-1">
                                        <button onClick={() => onUpdateQty(item.id, -1)} className="text-slate-400 hover:text-white"><Minus size={14} /></button>
                                        <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                                        <button onClick={() => onUpdateQty(item.id, 1)} className="text-slate-400 hover:text-white"><Plus size={14} /></button>
                                    </div>
                                    <button onClick={() => onRemove(item.id)} className="ml-auto text-red-500/50 hover:text-red-500"><Trash2 size={18} /></button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {cart.length > 0 && (
                <div className="p-6 bg-slate-900 border-t border-white/10">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-slate-400">Total</span>
                        <span className="text-2xl font-bold text-white">₹ {total.toLocaleString()}</span>
                    </div>
                    <button onClick={onCheckout} className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl shadow-lg shadow-amber-900/20 active:scale-95 transition-all">
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
}

CartModal.propTypes = {
    cart: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onUpdateQty: PropTypes.func.isRequired,
    onCheckout: PropTypes.func.isRequired
};
