"use client";

import { useEffect, useState } from "react";

interface Announcement {
    id: string;
    title: string;
    description: string;
    date: string;
    createdAt: string;
}

export default function AdminAnnouncements() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const fetchAnnouncements = async () => {
        const res = await fetch("/api/admin/announcements");
        const data = await res.json();
        if (Array.isArray(data)) {
            setAnnouncements(data);
        }
        setLoading(false);
    };

    useEffect(() => { fetchAnnouncements(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        const res = await fetch("/api/admin/announcements", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description, date }),
        });
        setSaving(false);

        if (res.ok) {
            setMessage({ type: "success", text: "Announcement created successfully!" });
            setTitle("");
            setDescription("");
            setDate(new Date().toISOString().split("T")[0]);
            fetchAnnouncements();
        } else {
            setMessage({ type: "error", text: "Failed to create announcement." });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this announcement?")) return;
        const res = await fetch("/api/admin/announcements", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        if (res.ok) fetchAnnouncements();
    };

    return (
        <div className="space-y-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="font-bold text-[#1a1a5e] text-lg mb-5">Create New Announcement</h2>
                {message && (
                    <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                        {message.text}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex-1">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter announcement title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#242171] focus:ring-2 focus:ring-[#242171]/10 transition-all"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#242171] focus:ring-2 focus:ring-[#242171]/10 transition-all"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            rows={4}
                            placeholder="Enter full announcement details..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#242171] focus:ring-2 focus:ring-[#242171]/10 transition-all"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-[#242171] text-white px-10 py-3.5 rounded-lg text-sm font-bold hover:bg-[#1a1a5e] transition-colors disabled:opacity-60 shadow-lg shadow-blue-900/10"
                        >
                            {saving ? "Saving..." : "Post Announcement"}
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="font-bold text-[#1a1a5e] text-lg mb-5">
                    Manage Announcements ({announcements.length})
                </h2>
                {loading ? (
                    <div className="text-center py-12 text-gray-400">Loading...</div>
                ) : announcements.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                        <div className="text-4xl mb-3">📢</div>
                        <p>No announcements yet.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Title</th>
                                    <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {announcements.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                                            {new Date(item.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm font-bold text-[#1a1a5e]">{item.title}</div>
                                            <div className="text-xs text-gray-500 line-clamp-1 mt-1">{item.description}</div>
                                        </td>
                                        <td className="px-4 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-wider"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
