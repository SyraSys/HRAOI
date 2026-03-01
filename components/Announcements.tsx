"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface Announcement {
    id: string;
    title: string;
    description: string;
    date: string;
}

export default function Announcements() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<Announcement | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        fetch("/api/announcements")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) setAnnouncements(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-[2rem] shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800">HRAOI Announcements</h2>
            </div>

            {loading ? (
                <div className="flex items-center gap-2 text-gray-400 py-4">
                    <div className="w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    <p className="text-sm font-medium">Checking for updates...</p>
                </div>
            ) : announcements.length === 0 ? (
                <div className="py-4 text-gray-500 italic text-sm">
                    No new announcements at this time.
                </div>
            ) : (
                <ul className="space-y-3">
                    {announcements.map((item) => (
                        <li
                            key={item.id}
                            onClick={() => setSelected(item)}
                            className="flex gap-3 bg-gray-50/80 hover:bg-white p-4 rounded-2xl cursor-pointer transition-all duration-300 border border-transparent hover:border-gray-200 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] group"
                        >
                            <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-4">
                                    <h3 className="font-semibold text-sm text-gray-800 group-hover:text-primary transition-colors truncate">
                                        {item.title}
                                    </h3>
                                    <span className="text-[10px] font-bold text-gray-500 whitespace-nowrap bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                                        {new Date(item.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1.5">Click to view details...</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* Modal for full announcement - rendered via portal */}
            {mounted && selected && createPortal(
                <div 
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
                    onClick={() => setSelected(null)}
                >
                    <div 
                        className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] max-w-lg w-full overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.3)] transform transition-all"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header with gradient accent */}
                        <div className="relative px-8 pt-8 pb-6">
                            {/* Decorative gradient blob */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            
                            {/* Close button */}
                            <button
                                onClick={() => setSelected(null)}
                                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-all duration-300 hover:rotate-90"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Date badge */}
                            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {new Date(selected.date).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}
                            </div>

                            {/* Title */}
                            <h2 className="text-2xl font-bold text-gray-900 pr-12 leading-tight">{selected.title}</h2>
                        </div>

                        {/* Divider */}
                        <div className="mx-8 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

                        {/* Content */}
                        <div className="px-8 py-6">
                            <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-100">
                                <p className="text-gray-600 leading-relaxed text-[15px] whitespace-pre-wrap">
                                    {selected.description}
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-8 pb-8 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                                Official Announcement
                            </div>
                            <button
                                onClick={() => setSelected(null)}
                                className="bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-3 rounded-full font-semibold hover:shadow-[0_4px_20px_rgba(36,33,113,0.4)] transition-all duration-300 hover:-translate-y-0.5"
                            >
                                Got it
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
