import React from 'react';
import Spectrogram from './Spectrogram';
import AudioPlayer from './AudioPlayer';

export interface ComparisonData {
    id: string;
    name: string;
    mixture: string | null;
    audiosep: string | null;
    flowsep: string | null;
    eventsep: string | null;
    groundTruth: string | null;
}

interface ComparisonRowProps {
    data: ComparisonData;
    onDelete?: (id: string) => void;
}

const ComparisonRow: React.FC<ComparisonRowProps> = ({ data }) => {
    // Order strictly as requested: Mixture -> AudioSep -> FlowSep -> EventSep -> GT
    const sections = [
        { key: 'mixture', title: 'Input Mixture', desc: 'Mixed Audio' },
        { key: 'audiosep', title: 'AudioSep Output', desc: 'Baseline 1' },
        { key: 'flowsep', title: 'FlowSep Output', desc: 'Baseline 2' },
        { key: 'eventsep', title: 'EventSep (Ours)', desc: 'Proposed Model' },
        { key: 'groundTruth', title: 'Ground Truth', desc: 'Target Source' },
    ] as const;

    return (
        <div className="w-full mb-16">
            <div className="flex items-center gap-4 mb-6 px-2">
                <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
                <h3 className="font-bold text-2xl text-slate-800">{data.name}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {sections.map((section) => (
                    <div key={section.key} className="flex flex-col group">
                        <div className="mb-3 px-1">
                            <h4 className={`text-sm font-bold uppercase tracking-wide ${section.key === 'eventsep' ? 'text-blue-600' : 'text-slate-700'}`}>
                                {section.title}
                            </h4>
                        </div>
                        
                        <div className="flex-1 flex flex-col bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                            {/* Spectrogram Container */}
                            <div className="w-full relative bg-black">
                                <Spectrogram 
                                    audioUrl={data[section.key]} 
                                    label={section.title} 
                                />
                            </div>
                            
                            {/* Player Container */}
                            <div className="p-3 bg-slate-50 border-t border-slate-100">
                                <AudioPlayer src={data[section.key]} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ComparisonRow;