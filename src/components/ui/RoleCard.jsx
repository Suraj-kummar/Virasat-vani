import React from 'react';
import { ArrowRight } from 'lucide-react';
import PropTypes from 'prop-types';

export default function RoleCard({ role, desc, icon: Icon, color, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`w-full p-5 rounded-2xl bg-gradient-to-r ${color} border border-white/10 hover:bg-white/5 active:scale-95 transition-all group flex items-center justify-between backdrop-blur-sm`}
        >
            <div className="flex items-center gap-5">
                <div className={`w-12 h-12 rounded-full bg-slate-950/50 flex items-center justify-center text-white border border-white/5 shadow-inner`}>
                    <Icon size={22} />
                </div>
                <div className="text-left">
                    <div className="font-heritage font-bold text-lg text-slate-100">{role}</div>
                    <div className="text-xs text-slate-400 font-medium">{desc}</div>
                </div>
            </div>
            <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors`}>
                <ArrowRight size={14} className="text-white" />
            </div>
        </button>
    );
}

RoleCard.propTypes = {
    role: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    color: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};
