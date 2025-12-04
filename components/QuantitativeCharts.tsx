
import React, { useEffect, useState } from 'react';

// Hard-coded data from thesis/prompt
const DATA = {
    metrics: [
        { id: 'clap', label: 'CLAPScore', max: 0.4 },
        { id: 'clapA', label: 'CLAPScore-A', max: 0.9 },
        { id: 'stoi', label: 'STOI', max: 0.8 },
        { id: 'estoi', label: 'ESTOI', max: 0.7 },
    ],
    models: [
        { 
            name: 'AudioSep', 
            color: 'bg-[#ff6b6b]', 
            bg: 'bg-red-50',
            values: { clap: 0.2838, clapA: 0.7881, stoi: 0.6408, estoi: 0.5790 } 
        },
        { 
            name: 'FlowSep', 
            color: 'bg-[#6b5bcd]', 
            bg: 'bg-indigo-50',
            values: { clap: 0.3222, clapA: 0.7344, stoi: 0.4278, estoi: 0.3429 } 
        },
        { 
            name: 'EventSep', 
            color: 'bg-[#8b5cf6]', 
            bg: 'bg-purple-50',
            isOurs: true,
            values: { clap: 0.3549, clapA: 0.8199, stoi: 0.6403, estoi: 0.5786 } 
        },
    ]
};

const QuantitativeCharts: React.FC = () => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        // Trigger animation shortly after mount
        const timer = setTimeout(() => setAnimate(true), 200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="py-16 bg-white">
            <div className="max-w-5xl mx-auto px-4">
                <h3 className="text-2xl font-bold mb-4 text-center text-slate-800">
                    Interactive Quantitative Results (VGGSound)
                </h3>
                <p className="text-center text-slate-500 mb-12 max-w-2xl mx-auto">
                    Comparison of CLAPScore, STOI, and ESTOI metrics. 
                    <br/>
                    <span className="text-sm font-semibold text-[#8b5cf6]">EventSep</span> achieves superior performance in semantic alignment (CLAP) and intelligibility.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    {DATA.metrics.map((metric) => (
                        <div key={metric.id} className="bg-white">
                            <div className="flex justify-between items-end mb-3 border-b border-gray-100 pb-2">
                                <h4 className="font-bold text-slate-700">{metric.label}</h4>
                                <span className="text-xs text-slate-400 uppercase">Higher is better</span>
                            </div>
                            
                            <div className="space-y-4">
                                {DATA.models.map((model) => {
                                    // Calculate percentage width based on max value for this metric
                                    const value = model.values[metric.id as keyof typeof model.values];
                                    const widthPercent = Math.min(100, (value / metric.max) * 100);
                                    
                                    return (
                                        <div key={model.name} className="relative">
                                            <div className="flex justify-between text-xs font-semibold mb-1">
                                                <span className={model.isOurs ? 'text-[#8b5cf6]' : 'text-slate-600'}>
                                                    {model.name} {model.isOurs && '(Ours)'}
                                                </span>
                                                <span className="text-slate-900 font-mono">{value.toFixed(4)}</span>
                                            </div>
                                            <div className={`h-3 w-full rounded-full ${model.bg} overflow-hidden`}>
                                                <div 
                                                    className={`h-full rounded-full ${model.color} transition-all duration-1000 ease-out`}
                                                    style={{ width: animate ? `${widthPercent}%` : '0%' }}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default QuantitativeCharts;
