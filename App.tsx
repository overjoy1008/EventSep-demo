import React from 'react';
import ComparisonRow, { ComparisonData } from './components/ComparisonRow';
import ResourcesSection from './components/ResourcesSection';
import FiguresSection from './components/FiguresSection';
import QuantitativeCharts from './components/QuantitativeCharts';

// Static Data for the Demo (Simulating server-side pre-computed files)
const DEMO_SAMPLES: ComparisonData[] = [
    {
        id: 'sample-1',
        name: 'Example 1: Aespa - Whiplash (vocals)',
        // Using placeholder audio URLs for demonstration purposes
        mixture: '/audio/whiplash.mp3', 
        audiosep: '/audio/whiplash_audiosep.wav', 
        flowsep: '/audio/whiplash_flowsep.wav',
        eventsep: '/audio/whiplash_ours.wav',
        groundTruth: '/audio/whiplash_gt.mp3',
    },
    {
        id: 'sample-2',
        name: 'Example 2: Sound from MUSIC Dataset (Coming Soon)',
        mixture: '',
        audiosep: '',
        flowsep: '',
        eventsep: '',
        groundTruth: '',
    },
    // {
    //     id: 'sample-3',
    //     name: 'Example 3: Pop Song Separation (Coming Soon)',
    //     mixture: '',
    //     audiosep: '',
    //     flowsep: '',
    //     eventsep: '',
    //     groundTruth: '',
    // }
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* 1. Header Section */}
      <header className="pt-16 pb-10 px-4 border-b border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900">
            EventSep: 사전 학습 모델 결합 기반의 선택적 음원 분리
          </h1>
          <h2 className="text-xl text-slate-500 font-light mb-8">
            Comparison of Mixture / AudioSep / FlowSep / EventSep / GT
          </h2>
          
          <div className="max-w-3xl mx-auto bg-slate-50 p-6 rounded-lg border border-slate-100 text-sm md:text-base text-slate-600 leading-relaxed">
            <p>
              This demo page visualizes precomputed audio outputs from different separation models. 
              Each section contains a spectrogram and an audio player for direct comparison.
            </p>
          </div>
        </div>
      </header>

      {/* 2. Use Case Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
             <h3 className="text-2xl font-semibold mb-8 text-center text-slate-800">Real-world Applications</h3>
             <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 max-w-3xl mx-auto">
                {[
                    "Video editing (remove or isolate sounds)",
                    "Music production (extract specific instruments)",
                    "Noise reduction for accessibility",
                    "Audio forensics",
                    "Research & sound analysis"
                ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-500"></span>
                        <span className="text-slate-700 font-medium">{item}</span>
                    </li>
                ))}
             </ul>
        </div>
      </section>

      {/* 3. Demo Section */}
      <main className="max-w-[1400px] mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold mb-12 text-center border-b pb-4 mx-auto max-w-xs border-slate-200">
            Audio Comparison
        </h3>
        
        <div className="space-y-20">
          {DEMO_SAMPLES.map((sample) => (
            <ComparisonRow 
              key={sample.id} 
              data={sample} 
              onDelete={() => {}} // No-op for static demo
            />
          ))}
        </div>
      </main>

      {/* 4. Resources Section */}
      <ResourcesSection />

      {/* 5. Figures Section */}
      <FiguresSection />

      {/* 6. Quantitative Results */}
      <QuantitativeCharts />

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12 text-center text-slate-500 text-sm">
        <p className="font-mono mb-4">EventSep Research Demo © 2024</p>
        {/* <div className="flex justify-center gap-6 font-medium text-slate-400">
            <span>PAPER</span>
            <span>CODE</span>
            <span>DATASET</span>
        </div> */}
      </footer>
    </div>
  );
};

export default App;
