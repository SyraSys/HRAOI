"use client";

import { useEffect, useState } from "react";
import { FadeIn, Stagger, StaggerItem } from "@/components/Motion";

interface LeadershipEntry {
    id: string;
    name: string;
    designation: string;
    bio: string;
    photoUrl: string;
}

export default function LeadershipPage() {
    const [entries, setEntries] = useState<LeadershipEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const res = await fetch("/api/leadership");
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();
                if (Array.isArray(data)) {
                    setEntries(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchEntries();
    }, []);

    return (
        <div className="bg-white min-h-screen pt-12 pb-24">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="mb-16">
                    <h1 className="text-3xl font-black text-[#1a1a5e] tracking-tight inline-block relative">
                        OUR LEADERSHIP
                        <div className="absolute -bottom-2 left-0 w-full h-1.5 bg-[#e11d48]"></div>
                    </h1>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-400 font-medium">Loading our team...</p>
                    </div>
                ) : entries.length === 0 ? (
                    <div className="text-center py-20 text-gray-500 italic">
                        No leadership details found.
                    </div>
                ) : (
                    <Stagger className="space-y-8 ">
                        {entries.map((entry) => (
                            <StaggerItem key={entry.id}>
                                <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)] flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 hover:shadow-[0_15px_50px_-10px_rgba(0,0,0,0.12)] transition-all duration-500">
                                    {/* Image with Hexagonal Frame */}
                                    <div className="flex-shrink-0 relative group">
                                        <div className="w-48 h-48 md:w-56 md:h-56 relative flex items-center justify-center">
                                            {/* Decorative Background Hexagon Shape (simplified for CSS) */}
                                            <div className="absolute inset-0 bg-white border border-gray-100 rounded-[2rem] shadow-inner"></div>

                                            {/* The polygonal frame from the image */}
                                            <div className="absolute inset-2 overflow-hidden bg-white z-10 flex items-center justify-center p-1">
                                                <div className="relative w-full h-full flex items-center justify-center">
                                                    {/* Outer Hexagon border SVG */}
                                                    <svg className="absolute inset-0 w-full h-full text-[#1a1a5e] opacity-80" viewBox="0 0 100 100">
                                                        <path
                                                            d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <circle cx="90" cy="25" r="1.5" fill="currentColor" />
                                                        <circle cx="10" cy="75" r="1.5" fill="currentColor" />
                                                    </svg>

                                                    {/* Inset photo */}
                                                    <div className="w-[75%] h-[75%] overflow-hidden bg-gray-50 flex items-center justify-center relative">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img
                                                            src={entry.photoUrl}
                                                            alt={entry.name}
                                                            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Text Content */}
                                    <div className="flex-1 text-center md:text-left pt-2">
                                        <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a5e] mb-1">
                                            {entry.name}
                                        </h2>
                                        <p className="text-[#1a1a5e] text-xs font-bold uppercase tracking-widest mb-6">
                                            {entry.designation}
                                        </p>
                                        <div className="relative">
                                            <p className="text-gray-500 italic text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                                                {entry.bio}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </StaggerItem>
                        ))}
                    </Stagger>
                )}
            </div>
        </div>
    );
}
