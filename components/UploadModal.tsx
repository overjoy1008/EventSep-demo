import React, { useState } from 'react';
import { ComparisonData } from './ComparisonRow';

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ComparisonData) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [name, setName] = useState('Example 1');
    const [files, setFiles] = useState<{ [key: string]: File | null }>({
        mixture: null,
        audiosep: null,
        flowsep: null,
        eventsep: null,
        groundTruth: null
    });

    if (!isOpen) return null;

    const handleFileChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFiles(prev => ({ ...prev, [key]: e.target.files![0] }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Create object URLs
        const data: ComparisonData = {
            id: Date.now().toString(),
            name,
            mixture: files.mixture ? URL.createObjectURL(files.mixture) : null,
            audiosep: files.audiosep ? URL.createObjectURL(files.audiosep) : null,
            flowsep: files.flowsep ? URL.createObjectURL(files.flowsep) : null,
            eventsep: files.eventsep ? URL.createObjectURL(files.eventsep) : null,
            groundTruth: files.groundTruth ? URL.createObjectURL(files.groundTruth) : null,
        };
        
        onSubmit(data);
        // Reset
        setName('New Example');
        setFiles({ mixture: null, audiosep: null, flowsep: null, eventsep: null, groundTruth: null });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-800">Add New Comparison Example</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Example Name</label>
                        <input 
                            type="text" 
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g., Gunshot in Street"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { key: 'mixture', label: 'Input Mixture' },
                            { key: 'audiosep', label: 'AudioSep Output' },
                            { key: 'flowsep', label: 'FlowSep Output' },
                            { key: 'eventsep', label: 'EventSep Output' },
                            { key: 'groundTruth', label: 'Ground Truth (Optional)' }
                        ].map((field) => (
                            <div key={field.key} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                                <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                                    {field.label}
                                </label>
                                <input 
                                    type="file" 
                                    accept="audio/*"
                                    onChange={handleFileChange(field.key)}
                                    className="block w-full text-sm text-slate-500
                                      file:mr-4 file:py-2 file:px-4
                                      file:rounded-full file:border-0
                                      file:text-xs file:font-semibold
                                      file:bg-blue-50 file:text-blue-700
                                      hover:file:bg-blue-100"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm"
                        >
                            Generate Comparison
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadModal;