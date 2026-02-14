"use client";

import { useState } from "react";

type Event = {
    id: string;
    title: string;
    thumbnail?: string;
};

const events: Event[] = [
    { id: "shirdi", title: "Shirdi Event" },
    { id: "legal", title: "Legal awareness" },
    { id: "utsav-2014", title: "Utsav 2014" },
    { id: "hr-day-2022", title: "Human Rights Day 2022" },
    { id: "youtube", title: "youtube video gallery" },
];

export default function PhotoGallery() {
    const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

    const handleEventClick = (id: string) => {
        setSelectedEvent(id);
    };

    const handleBack = () => {
        setSelectedEvent(null);
    };

    const activeEventTitle = events.find(e => e.id === selectedEvent)?.title;

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 py-8">
                {/* Page Title */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-[#1a1a5e] inline-block relative px-1">
                        Photo Gallery
                        <div className="absolute left-0 -bottom-1 w-1/2 h-1 bg-[#d93025]"></div>
                    </h2>
                </div>

                {!selectedEvent ? (
                    /* Event Grid View */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => (
                            <div
                                key={event.id}
                                className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg border border-gray-100 transition-all hover:shadow-2xl"
                                onClick={() => handleEventClick(event.id)}
                            >
                                {/* Image Placeholder Area */}
                                <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center relative overflow-hidden">
                                    {event.id === 'hr-day-2022' ? (
                                        <div className="flex flex-col items-center">
                                            <div className="w-24 h-24 border-8 border-gray-300 rounded-full flex items-center justify-center">
                                                <div className="w-12 h-2 bg-gray-300 rotate-45"></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">Event Poster</div>
                                    )}
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-[#242171]/0 group-hover:bg-[#242171]/20 transition-all duration-300"></div>
                                </div>
                                {/* Event Title Footer */}
                                <div className="bg-[#242171] p-3 text-center">
                                    <h3 className="text-white text-sm font-bold tracking-wide">{event.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Event Details View (Image Grid) */
                    <div className="space-y-6">
                        <button
                            onClick={handleBack}
                            className="group flex items-center gap-2 text-[#7f8c8d] hover:text-[#242171] transition-colors font-semibold"
                        >
                            <span className="text-xl">←</span>
                            <span className="text-sm">Back</span>
                        </button>

                        <div className="pb-4 border-b border-gray-100">
                            <h3 className="text-xl font-bold text-[#242171]">{activeEventTitle}</h3>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
                            {[...Array(16)].map((_, i) => (
                                <div
                                    key={i}
                                    className="aspect-square bg-gray-100 rounded-sm md:rounded-lg overflow-hidden relative cursor-zoom-in hover:opacity-90 transition-opacity"
                                >
                                    <div className="absolute inset-0 flex items-center justify-center text-[10px] text-gray-400 font-bold">
                                        IMG_{1000 + i}_{activeEventTitle?.slice(0, 3).toUpperCase()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
