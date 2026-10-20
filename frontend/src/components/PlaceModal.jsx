import React from 'react';
import { X, Sparkles, Compass } from 'lucide-react';

export default function PlaceModal({ place, onClose }) {
    if (!place) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 p-6 sm:p-8">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Hero image */}
                <div className="relative h-64 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 overflow-hidden rounded-t-3xl">
                    <img
                        src={place.img}
                        alt={place.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6">
                        <span className="text-teal-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" /> Destination Highlight
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                            {place.name} <span className="font-normal text-slate-300 text-xl font-serif">({place.khmerName})</span>
                        </h2>
                    </div>
                </div>

                <div className="space-y-5">
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                            Overview
                        </h4>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            {place.desc}
                        </p>
                    </div>

                    {place.history && (
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                <Compass className="w-4 h-4 text-blue-500" />
                                Information & Significance
                            </h4>
                            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                                {place.history}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
