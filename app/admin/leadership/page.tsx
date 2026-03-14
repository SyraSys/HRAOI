"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LeadershipEntry {
    id: string;
    name: string;
    designation: string;
    bio: string;
    photoUrl: string;
}

export default function AdminLeadership() {
    const [entries, setEntries] = useState<LeadershipEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form state
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [bio, setBio] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const fetchEntries = async () => {
        try {
            const res = await fetch("/api/admin/leadership");
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

    useEffect(() => { fetchEntries(); }, []);

    const resetForm = () => {
        setName("");
        setDesignation("");
        setBio("");
        setFile(null);
        setEditingId(null);
        if (fileRef.current) fileRef.current.value = "";
        setMessage(null);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        const formData = new FormData();
        if (editingId) formData.append("id", editingId);
        formData.append("name", name);
        formData.append("designation", designation);
        formData.append("bio", bio);
        if (file) formData.append("file", file);

        const url = "/api/admin/leadership";
        const method = editingId ? "PATCH" : "POST";

        try {
            const res = await fetch(url, { method, body: formData });
            if (res.ok) {
                setMessage({ type: "success", text: `Entry ${editingId ? "updated" : "added"} successfully!` });
                resetForm();
                fetchEntries();
            } else {
                const err = await res.json();
                setMessage({ type: "error", text: err.error || "Operation failed." });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Something went wrong." });
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (entry: LeadershipEntry) => {
        setEditingId(entry.id);
        setName(entry.name);
        setDesignation(entry.designation);
        setBio(entry.bio);
        setFile(null);
        if (fileRef.current) fileRef.current.value = "";
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this entry?")) return;
        try {
            const res = await fetch("/api/admin/leadership", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            if (res.ok) fetchEntries();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-[#242171] p-6 text-white">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        {editingId ? "Edit Leadership Member" : "Add New Leadership Member"}
                    </h2>
                    <p className="text-blue-100 text-sm mt-1 opacity-80">
                        {editingId ? "Update the details below to modify the entry." : "Fill in the details below to add a new member to the leadership team."}
                    </p>
                </div>

                <div className="p-8">
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mb-6 p-4 rounded-xl text-sm font-medium flex items-center gap-3 ${message.type === "success"
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                    : "bg-red-50 text-red-700 border border-red-100"
                                }`}
                        >
                            <span className="text-lg">{message.type === "success" ? "✓" : "⚠"}</span>
                            {message.text}
                        </motion.div>
                    )}

                    <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Dr. John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#242171]/20 focus:bg-white transition-all shadow-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Designation</label>
                            <input
                                type="text"
                                placeholder="e.g. Executive Director"
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#242171]/20 focus:bg-white transition-all shadow-sm"
                            />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Biography</label>
                            <textarea
                                placeholder="Describe their background and role..."
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                required
                                rows={4}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#242171]/20 focus:bg-white transition-all shadow-sm resize-none"
                            />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Profile Photo</label>
                            <div className="mt-1 flex items-center gap-4">
                                <div className="relative group cursor-pointer">
                                    <input
                                        ref={fileRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                                        required={!editingId}
                                        className="hidden"
                                        id="photo-upload"
                                    />
                                    <label htmlFor="photo-upload" className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-200 rounded-2xl hover:border-[#242171] hover:bg-[#242171]/5 transition-all cursor-pointer overflow-hidden bg-gray-50">
                                        {file ? (
                                            /* eslint-disable-next-line @next/next/no-img-element */
                                            <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" alt="Preview" />
                                        ) : (
                                            <div className="text-center p-2">
                                                <span className="text-2xl mb-1 block">📸</span>
                                                <span className="text-[10px] font-bold text-gray-400">UPLOAD</span>
                                            </div>
                                        )}
                                    </label>
                                </div>
                                <div className="text-sm text-gray-500">
                                    <p className="font-semibold text-gray-700">Select a high-quality portrait</p>
                                    <p className="text-xs">JPG, PNG or WEBP. Max 5MB.</p>
                                    {editingId && <p className="text-xs text-blue-600 mt-1 italic">Leave empty to keep current photo.</p>}
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2 pt-4 flex gap-3">
                            <button
                                type="submit"
                                disabled={saving}
                                className="bg-[#242171] text-white px-8 py-3.5 cursor-pointer rounded-xl text-sm font-bold hover:bg-[#1a1a5e] transition-all disabled:opacity-60 shadow-lg shadow-blue-900/10 flex items-center gap-2"
                            >
                                {saving ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                        {editingId ? "Updating..." : "Saving..."}
                                    </>
                                ) : (
                                    editingId ? "Update Member" : "Save Member"
                                )}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="bg-gray-100 text-gray-600 px-8 py-3.5 cursor-pointer rounded-xl text-sm font-bold hover:bg-gray-200 transition-all"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-xl font-bold text-[#1a1a5e]">Leadership Team</h2>
                        <p className="text-gray-400 text-xs mt-1 uppercase tracking-widest">Total Members: {entries.length}</p>
                    </div>
                </div>

                {loading ? (
                    <div className="py-20 text-center">
                        <div className="w-10 h-10 border-4 border-[#242171]/10 border-t-[#242171] rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-400 text-sm font-medium">Fetching team data...</p>
                    </div>
                ) : entries.length === 0 ? (
                    <div className="py-20 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
                        <div className="text-5xl mb-4 opacity-20">👥</div>
                        <p className="text-gray-400 font-medium italic">No leadership members added yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {entries.map((entry) => (
                                <motion.div
                                    key={entry.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 flex flex-col"
                                >
                                    <div className="relative aspect-[4/5] overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={entry.photoUrl}
                                            alt={entry.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                                            <h3 className="font-bold text-lg leading-tight">{entry.name}</h3>
                                            <p className="text-blue-300 text-xs font-bold uppercase tracking-wider mt-1">{entry.designation}</p>
                                        </div>
                                    </div>

                                    <div className="p-5 space-y-4 flex-1 flex flex-col">
                                        <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed flex-1">
                                            {entry.bio}
                                        </p>
                                        <div className="flex gap-2 pt-2 border-t border-gray-50">
                                            <button
                                                onClick={() => handleEdit(entry)}
                                                className="flex-1 bg-blue-50 text-[#242171] text-xs cursor-pointer font-bold py-3 rounded-lg hover:bg-[#242171] hover:text-white transition-all uppercase tracking-widest"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(entry.id)}
                                                className="bg-red-50 text-red-600 px-4 py-3 cursor-pointer rounded-lg hover:bg-red-600 hover:text-white transition-all"
                                            >
                                                <span className="text-sm">🗑</span>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}
