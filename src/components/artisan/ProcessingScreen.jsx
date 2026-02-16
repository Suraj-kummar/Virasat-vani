import React from 'react';
import { Sparkles } from 'lucide-react';

export default function ProcessingScreen() {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-slate-950 p-8 text-center relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1e293b_0%,#020617_100%)]"></div>
            <div className="w-32 h-32 relative flex items-center justify-center mb-10">
                <div className="absolute inset-0 border-t-4 border-amber-500 rounded-full animate-spin"></div>
                <Sparkles className="text-amber-500 animate-pulse" size={40} />
            </div>
            <h2 className="text-2xl font-heritage font-bold text-white mb-2">Analyzing Heritage</h2>
            <p className="text-slate-400 text-sm">Gemini 1.5 Pro is crafting your story...</p>
        </div>
    )
}
