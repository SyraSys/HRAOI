"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

type Photo = {
    id: string;
    title: string;
    event: string;
    imageUrl: string;
    uploadedAt: string;
};

export default function PhotoGallery() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [lightbox, setLightbox] = useState<Photo | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/gallery")
            .then((r) => r.json())
            .then((data) => { setPhotos(data); setLoading(false); });
    }, []);

    // Group photos by event
    const events = photos.reduce((acc, photo) => {
        if (!acc[photo.event]) {
            acc[photo.event] = [];
        }
        acc[photo.event].push(photo);
        return acc;
    }, {} as Record<string, Photo[]>);

    const eventNames = Object.keys(events);

    const filteredPhotos = selectedEvent ? events[selectedEvent] : [];

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 py-8">

                {/* Breadcrumbs / Back Navigation */}
                {selectedEvent && (
                    <div className="mb-8">
                        <button
                            onClick={() => setSelectedEvent(null)}
                            className="flex items-center gap-2 text-[#1a1a5e] font-bold hover:text-[#d93025] transition-colors"
                        >
                            <span>←</span> Back to All Events
                        </button>
                    </div>
                )}

                {/* Page Title & Description */}
                {!selectedEvent && (
                    <div className="mb-10">
                        <h1 className="text-2xl font-bold text-[#1a1a5e] mb-2 inline-block relative px-1">
                            Photo Gallery
                            <div className="absolute left-0 -bottom-1 w-1/2 h-1 bg-[#d93025]"></div>
                        </h1>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-8">


                    {/* Main Gallery Content */}
                    <main className={`${selectedEvent ? "w-full" : "lg:w-full"}`}>
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                                <div className="w-12 h-12 border-4 border-[#1a1a5e]/10 border-t-[#d93025] rounded-full animate-spin mb-4"></div>
                                <p className="font-medium">Loading our memories...</p>
                            </div>
                        ) : photos.length === 0 ? (
                            <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
                                <div className="text-6xl mb-6">📸</div>
                                <h3 className="text-xl font-bold text-[#1a1a5e] mb-2">No photos yet</h3>
                                <p className="text-gray-500">We're currently gathering moments to share with you.</p>
                            </div>
                        ) : !selectedEvent ? (
                            /* Events Grid View - Matched to User Image */
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {eventNames.map((name) => (
                                    <div
                                        key={name}
                                        onClick={() => setSelectedEvent(name)}
                                        className="group cursor-pointer bg-[#1a1a5e] rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-[270px] flex flex-col"
                                    >
                                        <div className="aspect-video overflow-hidden bg-gray-200">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={events[name][0].imageUrl}
                                                alt={name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="flex-1 flex items-center justify-center p-2 text-center">
                                            <h3 className="text-white font-semibold text-base md:text-lg leading-tight tracking-wide group-hover:text-blue-300 transition-colors line-clamp-2">
                                                {name}
                                            </h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Individual Event View */
                            <div className="space-y-8">

                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {filteredPhotos.map((photo) => (
                                        <div
                                            key={photo.id}
                                            className="group cursor-pointer relative aspect-video rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300"
                                            onClick={() => setLightbox(photo)}
                                        >
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={photo.imageUrl}
                                                alt={photo.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />

                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Lightbox Modal */}
            {lightbox && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-10 transition-all duration-300"
                    onClick={() => setLightbox(null)}
                >
                    <button
                        className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-50 border border-white/20 hover:scale-110 active:scale-95 shadow-xl"
                        onClick={() => setLightbox(null)}
                        aria-label="Close lightbox"
                    >
                        <X size={24} />
                    </button>

                    <div
                        className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full h-full flex items-center justify-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={lightbox.imageUrl}
                                alt={lightbox.title}
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
