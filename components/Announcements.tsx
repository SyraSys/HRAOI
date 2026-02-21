"use client";

import { useState, useEffect } from "react";

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
        <div className="bg-background-light-purple p-8 rounded-2xl shadow-sm border border-purple-100">
            <h2 className="text-2xl font-bold mb-6 text-[#1a1a5e]">HRAOI Announcements</h2>

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
                <ul className="space-y-4">
                    {announcements.map((item) => (
                        <li
                            key={item.id}
                            onClick={() => setSelected(item)}
                            className="flex gap-3 border-b border-gray-100 pb-4 group cursor-pointer hover:bg-white/40 p-2 rounded-lg transition-all"
                        >
                            <span className="text-primary font-bold mt-1">•</span>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-4">
                                    <h3 className="font-bold text-sm text-[#1a1a5e] group-hover:text-primary transition-colors truncate">
                                        {item.title}
                                    </h3>
                                    <span className="text-[10px] font-bold text-gray-400 whitespace-nowrap bg-white px-2 py-0.5 rounded shadow-sm">
                                        {new Date(item.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1 line-clamp-1 italic">Click to view details...</p>
                            </div>
                        </li>
                    ))}
                    <li className="text-sm text-gray-600 leading-relaxed italic pt-4">
                        All presidents should ensure through icards distribution program in their subordinate state/division/districts
                    </li>
                </ul>
            )}

            {/* Modal for full announcement */}
            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl transform transition-all animate-in fade-in zoom-in duration-300">
                        <div className="bg-[#1a1a5e] p-6 text-white flex justify-between items-start">
                            <div>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-blue-300 mb-1">
                                    {new Date(selected.date).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}
                                </div>
                                <h2 className="text-xl font-black">{selected.title}</h2>
                            </div>
                            <button
                                onClick={() => setSelected(null)}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-8">
                            <div className="prose prose-sm max-w-none">
                                <p className="text-gray-600 leading-relaxed text-base whitespace-pre-wrap">
                                    {selected.description}
                                </p>
                            </div>
                            <div className="mt-10 flex justify-end">
                                <button
                                    onClick={() => setSelected(null)}
                                    className="bg-primary text-white px-8 py-2.5 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
