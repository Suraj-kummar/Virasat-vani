import React, { useState } from 'react';
import { Settings, Bell, Heart, LogOut } from 'lucide-react';
import PropTypes from 'prop-types';
import MenuButton from '../ui/MenuButton';
import NotificationsPage from './profile/NotificationsPage';
import FavoritesPage from './profile/FavoritesPage';
import SettingsPage from './profile/SettingsPage';

export default function ProfileView({ user, onLogout, products, likes }) {
    const [subView, setSubView] = useState('main'); // main, notifications, favorites, settings

    if (subView === 'notifications') return <NotificationsPage onBack={() => setSubView('main')} />;
    if (subView === 'favorites') return <FavoritesPage onBack={() => setSubView('main')} products={products} likes={likes} />;
    if (subView === 'settings') return <SettingsPage onBack={() => setSubView('main')} />;

    return (
        <div className="p-6 pt-12 animate-fade-in">
            <div className="flex flex-col items-center mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 p-[3px] mb-4 shadow-xl shadow-amber-500/20">
                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-4xl font-bold text-white">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-white font-heritage">{user?.name || 'Guest User'}</h2>
                <p className="text-slate-400 text-sm">Heritage Explorer • Udaipur</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-900 rounded-2xl p-4 text-center border border-white/5">
                    <div className="text-2xl font-bold text-amber-500">{likes.size}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Favorites</div>
                </div>
                <div className="bg-slate-900 rounded-2xl p-4 text-center border border-white/5">
                    <div className="text-2xl font-bold text-white">5</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Following</div>
                </div>
            </div>

            <div className="space-y-2">
                <MenuButton icon={Settings} label="Settings" onClick={() => setSubView('settings')} />
                <MenuButton icon={Bell} label="Notifications" badge="3" onClick={() => setSubView('notifications')} />
                <MenuButton icon={Heart} label="Favorites" onClick={() => setSubView('favorites')} />
                <MenuButton icon={LogOut} label="Log Out" onClick={onLogout} isDanger />
            </div>
        </div>
    );
}

ProfileView.propTypes = {
    user: PropTypes.object,
    onLogout: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
    likes: PropTypes.object.isRequired
};
