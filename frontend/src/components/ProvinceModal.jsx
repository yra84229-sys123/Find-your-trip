import React from 'react';
import { X, MapPin, Eye, Sparkles } from 'lucide-react';

export default function ProvinceModal({ province, onClose, onSelectPlace }) {
    if (!province) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 p-6 sm:p-8">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Hero Header */}
                <div className="relative h-64 sm:h-80 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 overflow-hidden rounded-t-3xl">
                    <img
                        src={province.coverImg || province.detailImg}
                        alt={province.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
                        <div className="flex items-center gap-2 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-1">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Cambodia Province</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                            {province.name} <span className="font-normal text-slate-300 text-2xl font-serif">({province.khmerName})</span>
                        </h2>
                        {province.tagline && (
                            <p className="text-slate-300 text-sm sm:text-base mt-1 italic">
                                "{province.tagline}"
                            </p>
                        )}
                    </div>
                </div>

                {/* Places Grid */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-blue-600" />
                            <span>Top Attractions & Landmarks</span>
                        </h3>
                        <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-semibold">
                            {province.places?.length || 0} Places
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {province.places?.map((place) => (
                            <div
                                key={place.id}
                                onClick={() => onSelectPlace(place)}
                                className="group cursor-pointer rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 flex flex-col"
                            >
                                <div className="h-44 overflow-hidden relative">
                                    <img
                                        src={place.img}
                                        alt={place.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                                </div>
                                <div className="p-4 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h4 className="font-bold text-base group-hover:text-blue-600 transition-colors">
                                            {place.name}
                                        </h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                                            {place.khmerName}
                                        </p>
                                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                                            {place.desc}
                                        </p>
                                    </div>
                                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                                        <span>View Details</span>
                                        <Eye className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
