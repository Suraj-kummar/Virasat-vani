import React from 'react';
import { Camera, ShoppingBag, Mic } from 'lucide-react';
import PropTypes from 'prop-types';
import RoleCard from '../components/ui/RoleCard';

export default function LandingScreen({ onInitiate }) {
    return (
        <div className="h-full flex flex-col items-center justify-center p-8 text-center relative animate-fade-in">
            <div className="w-28 h-28 bg-gradient-to-tr from-amber-500 to-orange-700 rounded-3xl flex items-center justify-center mb-10 shadow-[0_0_50px_rgba(245,158,11,0.3)] rotate-6 border border-white/10 animate-float">
                <Mic className="text-white w-14 h-14 drop-shadow-md" strokeWidth={1.5} />
            </div>

            <h1 className="text-5xl font-bold font-heritage bg-gradient-to-b from-amber-100 to-amber-600 bg-clip-text text-transparent mb-4 tracking-wider">
                VIRASAT VANI
            </h1>
            <p className="text-slate-400 mb-16 max-w-[240px] leading-relaxed font-light tracking-wide text-sm">
                Where Udaipur's Heritage meets <br /> <span className="text-amber-400 font-medium">AI Singularity</span>.
            </p>

            <div className="space-y-4 w-full px-2 z-10">
                <RoleCard
                    role="Artisan"
                    desc="I want to sell my craft"
                    icon={Camera}
                    color="from-amber-500/20 to-orange-600/5"
                    onClick={() => onInitiate('artisan')}
                />
                <RoleCard
                    role="Explorer"
                    desc="I want to buy heritage"
                    icon={ShoppingBag}
                    color="from-blue-500/20 to-indigo-600/5"
                    onClick={() => onInitiate('buyer')}
                />
            </div>

            <div className="mt-auto pt-8 text-xs text-slate-600 uppercase tracking-widest opacity-60">
                Powered by Gemini 1.5 Pro
            </div>
        </div>
    );
}

LandingScreen.propTypes = {
    onInitiate: PropTypes.func.isRequired
};
