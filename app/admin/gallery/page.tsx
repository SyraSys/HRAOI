"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface Photo {
    id: string;
    title: string;
    event: string;
    imageUrl: string;
    uploadedAt: string;
}

export default function AdminGallery() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [title, setTitle] = useState("");
    const [event, setEvent] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const uniqueEvents = Array.from(new Set(photos.map(p => p.event))).filter(Boolean);

    const fetchPhotos = async () => {
        const res = await fetch("/api/admin/gallery");
        const data = await res.json();
        setPhotos(data);
        setLoading(false);
    };

    useEffect(() => { fetchPhotos(); }, []);

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !event || !file) return;
        setUploading(true);
        setMessage(null);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("event", event);
        formData.append("file", file);

        const res = await fetch("/api/admin/gallery", { method: "POST", body: formData });
        setUploading(false);

        if (res.ok) {
            setMessage({ type: "success", text: "Photo uploaded successfully!" });
            setTitle("");
            setEvent("");
            setFile(null);
            if (fileRef.current) fileRef.current.value = "";
            fetchPhotos();
        } else {
            setMessage({ type: "error", text: "Upload failed. Please try again." });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this photo?")) return;
        const res = await fetch("/api/admin/gallery", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        if (res.ok) fetchPhotos();
    };

    return (
        <div className="space-y-8">
            {/* Upload Form */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="font-bold text-[#1a1a5e] text-lg mb-5">Upload New Photo</h2>
                {message && (
                    <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                        {message.text}
                    </div>
                )}
                <form onSubmit={handleUpload} className="flex flex-col gap-5">
                    <div className="flex flex-col sm:flex-row gap-5">
                        <div className="flex-1">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                Photo Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter a descriptive title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#242171] focus:ring-2 focus:ring-[#242171]/10 transition-all"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                Event Category <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    list="events-list"
                                    type="text"
                                    placeholder="Select or type new event"
                                    value={event}
                                    onChange={(e) => setEvent(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#242171] focus:ring-2 focus:ring-[#242171]/10 transition-all"
                                />
                                <datalist id="events-list">
                                    {uniqueEvents.map(ev => (
                                        <option key={ev} value={ev} />
                                    ))}
                                </datalist>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-5 items-end">
                        <div className="flex-1">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                Select Photo <span className="text-red-500">*</span>
                            </label>
                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/*"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                required
                                className="w-full text-sm text-gray-500 file:mr-3 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#242171] file:text-white hover:file:bg-[#1a1a5e] cursor-pointer border border-gray-200 rounded-lg p-1.5"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={uploading}
                            className="bg-[#242171] text-white px-10 py-3.5 rounded-lg text-sm font-bold hover:bg-[#1a1a5e] transition-all disabled:opacity-60 whitespace-nowrap shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2"
                        >
                            {uploading ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full"
                                    ></motion.div>
                                    Uploading...
                                </>
                            ) : "Upload Photo"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Gallery Grid */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="font-bold text-[#1a1a5e] text-lg mb-5">
                    All Photos ({photos.length})
                </h2>
                {loading ? (
                    <div className="text-center py-12 text-gray-400">Loading...</div>
                ) : photos.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                        <div className="text-4xl mb-3">🖼️</div>
                        <p>No photos uploaded yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {photos.map((photo) => (
                            <div key={photo.id} className="group relative rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={photo.imageUrl}
                                    alt={photo.title}
                                    className="w-full aspect-square object-cover"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 backdrop-blur-sm">
                                    <p className="text-white text-[10px] font-bold uppercase tracking-wider text-blue-300 mb-0.5">{photo.event}</p>
                                    <p className="text-white text-xs font-medium truncate">{photo.title}</p>
                                </div>
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                                    <button
                                        onClick={() => handleDelete(photo.id)}
                                        className="bg-red-500 text-white text-xs px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors shadow-lg"
                                    >
                                        Delete Photo
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
