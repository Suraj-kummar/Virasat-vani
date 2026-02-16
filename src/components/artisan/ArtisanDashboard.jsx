import React, { useState } from 'react';
import { Home, Package, Plus, User, ArrowLeft, TrendingUp, Eye, IndianRupee, LogOut } from 'lucide-react';
import PropTypes from 'prop-types';
import ArtisanFlow from './ArtisanFlow';

export default function ArtisanDashboard({ onLogout, onProductList, user }) {
    const [activeTab, setActiveTab] = useState('home'); // home, inventory, add, profile
    const [capturedImage, setCapturedImage] = useState(null);

    // Mock Stats
    const stats = [
        { label: 'Total Sales', value: '₹24,500', icon: IndianRupee, color: 'text-green-500', bg: 'bg-green-500/10' },
        { label: 'Profile Views', value: '1.2k', icon: Eye, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Trending', value: '+14%', icon: TrendingUp, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    ];

    if (activeTab === 'add') {
        return (
            <ArtisanFlow
                onBack={() => setActiveTab('home')}
                onComplete={(product) => {
                    onProductList(product);
                    setActiveTab('inventory');
                }}
                setCapturedImage={setCapturedImage}
            />
        );
    }

    return (
        <div className="h-full flex flex-col bg-slate-950 animate-fade-in relative">
            <header className="p-6 pt-8 bg-slate-900/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-heritage font-bold text-white">Namaste, {user?.name || 'Artisan'}</h1>
                    <p className="text-xs text-slate-400">Manage your digital heritage</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-slate-900 font-bold text-lg">
                    {user?.name?.charAt(0) || 'A'}
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-6 pb-24">
                {activeTab === 'home' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            {stats.map((stat, i) => (
                                <div key={i} className={`p-4 rounded-2xl border border-white/5 ${i === 0 ? 'col-span-2 bg-gradient-to-r from-slate-900 to-slate-800' : 'bg-slate-900'}`}>
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${stat.bg} ${stat.color}`}>
                                        <stat.icon size={18} />
                                    </div>
                                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-slate-900 rounded-2xl p-5 border border-white/5">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Package size={16} className="text-amber-500" /> Recent Orders</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-xl border border-white/5">
                                    <div className="w-10 h-10 bg-slate-800 rounded-lg"></div>
                                    <div className="flex-1">
                                        <div className="text-sm text-white font-medium">Bagh Print Saree</div>
                                        <div className="text-xs text-slate-500">2 mins ago • Jaipur</div>
                                    </div>
                                    <div className="text-green-500 text-sm font-bold">+ ₹4,200</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'inventory' && (
                    <div className="text-center py-20">
                        <Package size={48} className="mx-auto text-slate-700 mb-4" />
                        <h3 className="text-slate-400 font-medium">Your inventory is growing!</h3>
                        <p className="text-xs text-slate-600 mt-2">Added items will appear here.</p>
                        <button onClick={() => setActiveTab('add')} className="mt-6 px-6 py-2 bg-amber-500 text-slate-900 rounded-full font-bold text-sm">Add New Item</button>
                    </div>
                )}

                {activeTab === 'profile' && (
                    <div className="space-y-4">
                        <button onClick={onLogout} className="w-full flex items-center gap-3 p-4 bg-red-500/10 text-red-500 rounded-xl border border-red-500/20">
                            <LogOut size={20} />
                            <span className="font-bold">Log Out</span>
                        </button>
                    </div>
                )}
            </main>

            <nav className="absolute bottom-0 w-full bg-slate-950/90 backdrop-blur-xl border-t border-white/5 p-4 flex justify-around z-20">
                {[
                    { id: 'home', icon: Home, label: 'Home' },
                    { id: 'inventory', icon: Package, label: 'Items' },
                    { id: 'add', icon: Plus, label: 'Sell', highlight: true },
                    { id: 'profile', icon: User, label: 'Profile' }
                ].map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`flex flex-col items-center gap-1 transition-all ${activeTab === item.id ? 'text-amber-500 scale-110' : 'text-slate-500'}`}
                    >
                        {item.highlight ? (
                            <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-slate-900 -mt-6 shadow-lg shadow-amber-500/20 border-4 border-slate-950">
                                <Plus size={24} strokeWidth={3} />
                            </div>
                        ) : (
                            <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                        )}
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
}

ArtisanDashboard.propTypes = {
    onLogout: PropTypes.func.isRequired,
    onProductList: PropTypes.func.isRequired,
    user: PropTypes.object
};
