"use client";

import { useEffect, useState, useRef } from "react";

interface FileItem {
    id: string;
    title: string;
    fileUrl: string;
    date: string;
    uploadedAt: string;
}

export default function AdminOrders() {
    const [items, setItems] = useState<FileItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const fetchItems = async () => {
        const res = await fetch("/api/admin/orders");
        const data = await res.json();
        setItems(data);
        setLoading(false);
    };

    useEffect(() => { fetchItems(); }, []);

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !file) return;
        setUploading(true);
        setMessage(null);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("date", date);
        formData.append("file", file);

        const res = await fetch("/api/admin/orders", { method: "POST", body: formData });
        setUploading(false);

        if (res.ok) {
            setMessage({ type: "success", text: "Order uploaded successfully!" });
            setTitle("");
            setDate("");
            setFile(null);
            if (fileRef.current) fileRef.current.value = "";
            fetchItems();
        } else {
            setMessage({ type: "error", text: "Upload failed. Please try again." });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this order?")) return;
        const res = await fetch("/api/admin/orders", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        if (res.ok) fetchItems();
    };

    return (
        <div className="space-y-8">
            {/* Upload Form */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="font-bold text-[#1a1a5e] text-lg mb-5">Upload New Order</h2>
                {message && (
                    <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                        {message.text}
                    </div>
                )}
                <form onSubmit={handleUpload} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <input
                        type="text"
                        placeholder="Order title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#242171]"
                    />
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#242171] text-gray-500"
                    />
                    <input
                        ref={fileRef}
                        type="file"
                        accept=".pdf,image/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        required
                        className="text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#242171] file:text-white hover:file:bg-[#1a1a5e] cursor-pointer"
                    />
                    <button
                        type="submit"
                        disabled={uploading}
                        className="bg-[#242171] text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#1a1a5e] transition-colors disabled:opacity-60"
                    >
                        {uploading ? "Uploading..." : "Upload Order"}
                    </button>
                </form>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="font-bold text-[#1a1a5e] text-lg">All Orders ({items.length})</h2>
                </div>
                {loading ? (
                    <div className="text-center py-12 text-gray-400">Loading...</div>
                ) : items.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                        <div className="text-4xl mb-3">📋</div>
                        <p>No orders uploaded yet.</p>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">File</th>
                                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {items.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.title}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(item.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" className="text-[#242171] text-sm font-semibold hover:underline">
                                            View File ↗
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 text-sm font-semibold transition-colors">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
