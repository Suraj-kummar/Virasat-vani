import React from 'react';
import { ArrowLeft } from 'lucide-react';
import PropTypes from 'prop-types';
import { NOTIFICATIONS } from '../../../data/mockData';

export default function NotificationsPage({ onBack }) {
    return (
        <div className="p-6 pt-12 animate-slide-in-right h-full bg-slate-950">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={onBack}><ArrowLeft className="text-white" /></button>
                <h2 className="text-2xl font-bold font-heritage text-white">Notifications</h2>
            </div>
            <div className="space-y-4">
                {NOTIFICATIONS.map(n => (
                    <div key={n.id} className="bg-slate-900 border border-white/5 p-4 rounded-2xl flex gap-4">
                        <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-amber-500"><n.icon size={20} /></div>
                        <div>
                            <h4 className="text-white font-bold text-sm">{n.title}</h4>
                            <p className="text-slate-400 text-xs mt-1">{n.msg}</p>
                            <p className="text-slate-600 text-[10px] mt-2">{n.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

NotificationsPage.propTypes = {
    onBack: PropTypes.func.isRequired
};
