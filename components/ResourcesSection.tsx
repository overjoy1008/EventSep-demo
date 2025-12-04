
import React from 'react';

const ResourcesSection: React.FC = () => {
    return (
        <section className="py-12 bg-slate-50 border-t border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h3 className="text-2xl font-bold mb-8 text-slate-800">Resources & Downloads</h3>
                <div className="flex flex-col md:flex-row justify-center gap-6">
                    <a 
                        href="#" 
                        className="group flex items-center justify-center gap-3 px-8 py-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200"
                        onClick={(e) => e.preventDefault()} // Prevent nav for demo
                    >
                        <span className="text-3xl">📄</span>
                        <div className="text-left">
                            <div className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Research Paper</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">PDF Format</div>
                        </div>
                    </a>

                    <a 
                        href="#" 
                        className="group flex items-center justify-center gap-3 px-8 py-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-purple-300 transition-all duration-200"
                        onClick={(e) => e.preventDefault()} // Prevent nav for demo
                    >
                        <span className="text-3xl">🖼️</span>
                        <div className="text-left">
                            <div className="font-bold text-slate-800 group-hover:text-purple-600 transition-colors">Poster Presentation</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">PDF Format</div>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ResourcesSection;
