import React from 'react';

const FiguresSection: React.FC = () => {
    return (
        <section className="py-16 bg-white border-b border-gray-100">
            <div className="max-w-5xl mx-auto px-4">
                <h3 className="text-2xl font-bold mb-12 text-center text-slate-800">Figures from the Paper & Poster</h3>
                
                <div className="space-y-16">

                    {/* Figure A: Architecture */}
                    <div className="flex flex-col items-center">
                        <div className="w-full max-w-4xl bg-white p-2 rounded-lg border border-slate-100 shadow-sm overflow-hidden">
                            <img 
                                src="/figures/eventsep_overview.png"
                                alt="Figure A: Model Architecture"
                                className="w-full h-auto"
                            />
                        </div>
                        <p className="mt-4 text-center text-sm text-slate-600 italic max-w-2xl">
                            <strong>Figure A.</strong> Overall architecture of EventSep (Text-guided + SED + FlowSep Ensemble).
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-start md:gap-12 gap-16">

                        {/* Figure B: Quantitative Comparisons */}
                        <div className="flex flex-col items-center md:col-span-2">
                            <div className="w-full bg-white p-2 rounded-lg border border-slate-100 shadow-sm overflow-hidden">
                                <img 
                                    src="/figures/figure_b.png"
                                    alt="Figure B: Quantitative Bar Charts Image"
                                    className="w-full h-auto"
                                />
                            </div>
                            <p className="mt-4 text-center text-sm text-slate-600 italic">
                                <strong>Figure B.</strong> Performance comparison across AudioSep, FlowSep, and EventSep.
                            </p>
                        </div>

                        {/* Figure C: Table */}
                        <div className="flex flex-col items-center">
                            <div className="w-full bg-white p-2 rounded-lg border border-slate-100 shadow-sm overflow-hidden">
                                <img 
                                    src="/figures/figure_c.png"
                                    alt="Figure C: Hard vs Soft Masking Table"
                                    className="w-full h-auto"
                                />
                            </div>
                            <p className="mt-4 text-center text-sm text-slate-600 italic">
                                <strong>Figure C.</strong> Hard vs Soft Masking (SDRi, SI-SDR).
                            </p>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default FiguresSection;
