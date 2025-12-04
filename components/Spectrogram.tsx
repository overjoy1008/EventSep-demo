import React, { useEffect, useRef, useState } from 'react';
import { generateSpectrogram } from '../utils/dsp';

interface SpectrogramProps {
    audioUrl: string | null;
    label: string;
}

const Spectrogram: React.FC<SpectrogramProps> = ({ audioUrl, label }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!audioUrl || !canvasRef.current) return;

        let active = true;
        const render = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(audioUrl);
                if (!response.ok) throw new Error("Load failed");
                const arrayBuffer = await response.arrayBuffer();
                
                // Decode audio
                const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
                const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

                if (active && canvasRef.current) {
                   await generateSpectrogram(audioBuffer, canvasRef.current);
                }
            } catch (err) {
                console.error(err);
                if (active) setError("Error");
            } finally {
                if (active) setLoading(false);
            }
        };

        render();
        return () => { active = false; };
    }, [audioUrl]);

    return (
        <div className="relative w-full aspect-[2/1] bg-black group-hover:opacity-90 transition-opacity">
            {/* Overlay Grid lines (Optional for research look) */}
            <div className="absolute inset-0 pointer-events-none opacity-20"
                 style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, #ffffff 25%, #ffffff 26%, transparent 27%, transparent 74%, #ffffff 75%, #ffffff 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, #ffffff 25%, #ffffff 26%, transparent 27%, transparent 74%, #ffffff 75%, #ffffff 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }}>
            </div>

            {loading && (
                <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/50 backdrop-blur-sm">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
            )}
            
            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-red-400 text-xs z-20">
                    N/A
                </div>
            )}

            <canvas 
                ref={canvasRef} 
                width={300} 
                height={150} 
                className="w-full h-full object-fill block"
            />
            
            {/* Axis Labels */}
            <div className="absolute bottom-1 left-1 text-[9px] text-white/70 font-mono">Time (s) →</div>
            <div className="absolute top-1 left-1 text-[9px] text-white/70 font-mono">Freq (Hz) ↑</div>
        </div>
    );
};

export default Spectrogram;