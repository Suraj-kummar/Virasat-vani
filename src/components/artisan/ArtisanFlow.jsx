import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import PropTypes from 'prop-types';
import ProcessingScreen from './ProcessingScreen';
import { MOCK_GENERATED_PRODUCT } from '../../data/mockData';

export default function ArtisanFlow({ onBack, onComplete, setCapturedImage }) {
    const [step, setStep] = useState('camera'); // camera, recording, processing
    const [timeLeft, setTimeLeft] = useState(8);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (step === 'camera' || step === 'recording') {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => { if (videoRef.current) videoRef.current.srcObject = stream; })
                .catch(err => console.log("Camera simulated", err));
        }
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            const stream = videoRef.current?.srcObject;
            const tracks = stream?.getTracks();
            tracks?.forEach(track => track.stop());
        }
    }, [step]);

    useEffect(() => {
        if (step === 'recording') {
            if (timeLeft > 0) setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
            else {
                if (videoRef.current && canvasRef.current) {
                    const context = canvasRef.current.getContext('2d');
                    context.drawImage(videoRef.current, 0, 0, 300, 400);
                    setCapturedImage(canvasRef.current.toDataURL('image/jpeg'));
                }
                setStep('processing');
            }
        }
    }, [step, timeLeft, setCapturedImage]);

    useEffect(() => {
        if (step === 'processing') setTimeout(() => onComplete(MOCK_GENERATED_PRODUCT), 5500);
    }, [step, onComplete]);

    return (
        <div className="h-full relative flex flex-col bg-black">
            <canvas ref={canvasRef} width="300" height="400" className="hidden"></canvas>
            {step === 'processing' ? <ProcessingScreen /> : (
                <>
                    <div className="absolute top-4 left-4 z-20">
                        <button onClick={onBack} className="p-3 bg-black/20 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-white/10"><X size={20} /></button>
                    </div>
                    <div className="flex-1 relative overflow-hidden rounded-[2.5rem] m-2">
                        <video ref={videoRef} autoPlay playsInline muted className={`w-full h-full object-cover transition-transform duration-[10s] ${step === 'recording' ? 'scale-110' : 'scale-100'}`} />
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_center,black_40%,transparent_100%)]"></div>
                            <div className="absolute top-0 left-0 w-full h-1 bg-amber-400/50 shadow-[0_0_15px_rgba(251,191,36,0.8)] animate-scan"></div>
                        </div>
                        <div className="absolute inset-0 flex flex-col justify-end p-8 pb-12 bg-gradient-to-t from-black via-black/40 to-transparent">
                            {step === 'recording' ? (
                                <div className="flex flex-col items-center mb-12">
                                    <div className="text-7xl font-heritage font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] tabular-nums">00:0{timeLeft}</div>
                                    <div className="flex items-center gap-2 mt-4 bg-red-500/20 border border-red-500/30 px-4 py-1.5 rounded-full backdrop-blur-sm">
                                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                        <span className="text-xs font-semibold text-red-200 tracking-wide uppercase">Listening</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center mb-10">
                                    <p className="text-lg font-heritage text-white mb-1">Show & Tell</p>
                                    <p className="text-sm text-slate-300">Point at your craft and speak its story.</p>
                                </div>
                            )}
                            <div className="flex justify-center items-center relative">
                                {step === 'recording' && <div className="absolute w-24 h-24 rounded-full border border-red-500/30 animate-ping"></div>}
                                <button onClick={() => setStep(step === 'camera' ? 'recording' : 'processing')} className={`w-20 h-20 rounded-full border-[3px] border-white flex items-center justify-center transition-all duration-300 z-10 shadow-lg ${step === 'recording' ? 'bg-red-600 scale-95' : 'bg-white/10 hover:bg-red-600/80 backdrop-blur-sm'}`}>
                                    {step === 'recording' ? <div className="w-8 h-8 bg-white rounded-md" /> : <div className="w-16 h-16 bg-red-600 rounded-full" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

ArtisanFlow.propTypes = {
    onBack: PropTypes.func.isRequired,
    onComplete: PropTypes.func.isRequired,
    setCapturedImage: PropTypes.func.isRequired
};
