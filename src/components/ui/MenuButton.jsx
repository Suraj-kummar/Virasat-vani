import React from 'react';
import { ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';

export default function MenuButton({ icon: Icon, label, onClick, isDanger, badge }) {
    return (
        <button onClick={onClick} className={`w-full flex items-center gap-4 p-4 rounded-xl border border-white/5 transition-colors ${isDanger ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400' : 'bg-slate-900 hover:bg-slate-800 text-white'}`}>
            <Icon size={20} />
            <span className="font-medium flex-1 text-left">{label}</span>
            {badge && <span className="bg-amber-500 text-slate-900 text-xs font-bold px-2 py-0.5 rounded-full">{badge}</span>}
            <ChevronRight size={16} className="opacity-50" />
        </button>
    )
}

MenuButton.propTypes = {
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isDanger: PropTypes.bool,
    badge: PropTypes.string
};
