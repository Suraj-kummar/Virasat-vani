import React from 'react';
import PropTypes from 'prop-types';

export default function NavIcon({ icon: Icon, label, active, onClick }) {
    return (
        <div onClick={onClick} className={`flex flex-col items-center gap-1.5 ${active ? 'text-amber-500' : 'text-slate-500 hover:text-slate-300'} transition-colors cursor-pointer w-full`}>
            <Icon size={22} strokeWidth={active ? 2.5 : 2} />
            <span className="text-[10px] font-medium tracking-wide">{label}</span>
        </div>
    );
}

NavIcon.propTypes = {
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    active: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};
