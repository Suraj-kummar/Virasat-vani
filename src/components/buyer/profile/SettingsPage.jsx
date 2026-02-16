import React from 'react';
import { ArrowLeft, ToggleLeft, ToggleRight } from 'lucide-react';
import PropTypes from 'prop-types';

export default function SettingsPage({ onBack }) {
    return (
        <div className="p-6 pt-12 animate-slide-in-right h-full bg-slate-950">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={onBack}><ArrowLeft className="text-white" /></button>
                <h2 className="text-2xl font-bold font-heritage text-white">Settings</h2>
            </div>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <span className="text-white">Dark Mode</span>
                    <ToggleRight className="text-amber-500" size={32} />
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-white">Notifications</span>
                    <ToggleRight className="text-amber-500" size={32} />
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-white">Data Saver</span>
                    <ToggleLeft className="text-slate-600" size={32} />
                </div>
                <div className="pt-8 border-t border-white/10">
                    <button className="text-red-500 text-sm font-bold">Delete Account</button>
                </div>
            </div>
        </div>
    )
}

SettingsPage.propTypes = {
    onBack: PropTypes.func.isRequired
};
