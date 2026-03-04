"use client";

import { useEffect, useState, useRef } from "react";
import { getNormalizedFileUrl } from "@/lib/utils";
import { motion } from "framer-motion";

interface FileItem {
    id: string;
    title: string;
    fileUrl: string;
    uploadedAt: string;
}

interface AdminFileManagerProps {
    apiPath: string;
    label: string;
    icon: string;
    accept?: string;
}

function AdminFileManager({ apiPath, label, icon, accept = ".pdf,image/*" }: AdminFileManagerProps) {
    const [items, setItems] = useState<FileItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [title, setTitle] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const fetchItems = async () => {
        const res = await fetch(apiPath);
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
        formData.append("file", file);

        const res = await fetch(apiPath, { method: "POST", body: formData });
        setUploading(false);

        if (res.ok) {
            setMessage({ type: "success", text: `${label} uploaded successfully!` });
            setTitle("");
            setFile(null);
            if (fileRef.current) fileRef.current.value = "";
            fetchItems();
        } else {
            setMessage({ type: "error", text: "Upload failed. Please try again." });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm(`Delete this ${label.toLowerCase()}?`)) return;
        const res = await fetch(apiPath, {
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
                <h2 className="font-bold text-[#1a1a5e] text-lg mb-5">Upload New {label}</h2>
                {message && (
                    <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                        {message.text}
                    </div>
                )}
                <form onSubmit={handleUpload} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder={`${label} title`}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#242171]"
                    />
                    <input
                        ref={fileRef}
                        type="file"
                        accept={accept}
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        required
                        className="text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#242171] file:text-white hover:file:bg-[#1a1a5e] cursor-pointer"
                    />
                    <button
                        type="submit"
                        disabled={uploading}
                        className="bg-[#242171] text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#1a1a5e] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
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
                        ) : `Upload ${label}`}
                    </button>
                </form>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="font-bold text-[#1a1a5e] text-lg">
                        All {label}s ({items.length})
                    </h2>
                </div>
                {loading ? (
                    <div className="text-center py-12 text-gray-400">Loading...</div>
                ) : items.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                        <div className="text-4xl mb-3">{icon}</div>
                        <p>No {label.toLowerCase()}s uploaded yet.</p>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">File</th>
                                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {items.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.title}</td>
                                    <td className="px-6 py-4">
                                        <a
                                            href={getNormalizedFileUrl(item.fileUrl)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#242171] text-sm font-semibold hover:underline"
                                        >
                                            View File ↗
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-red-500 hover:text-red-700 text-sm font-semibold transition-colors"
                                        >
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

export default function AdminCirculars() {
    return <AdminFileManager apiPath="/api/admin/circulars" label="Circular" icon="📄" accept=".pdf,image/*" />;
}
