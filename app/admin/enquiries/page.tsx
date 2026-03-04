"use client";

import { useEffect, useState } from "react";

interface Enquiry {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string | null;
    status: string;
    createdAt: string;
}

const statusColors: Record<string, string> = {
    new: "bg-yellow-100 text-yellow-800",
    read: "bg-blue-100 text-blue-800",
    replied: "bg-green-100 text-green-800",
};

export default function AdminEnquiries() {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState<string | null>(null);

    const fetchEnquiries = async () => {
        const res = await fetch("/api/admin/enquiries");
        const data = await res.json();
        setEnquiries(data);
        setLoading(false);
    };

    useEffect(() => { fetchEnquiries(); }, []);

    const updateStatus = async (id: string, status: string) => {
        await fetch("/api/admin/enquiries", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status }),
        });
        fetchEnquiries();
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="font-bold text-[#1a1a5e] text-lg">All Enquiries ({enquiries.length})</h2>
                    <div className="flex gap-2 text-xs">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">
                            {enquiries.filter((e) => e.status === "new").length} New
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
                            {enquiries.filter((e) => e.status === "read").length} Read
                        </span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
                            {enquiries.filter((e) => e.status === "replied").length} Replied
                        </span>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-12 text-gray-400">Loading...</div>
                ) : enquiries.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                        <div className="text-4xl mb-3">✉️</div>
                        <p>No enquiries yet.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {enquiries.map((enquiry) => (
                            <div key={enquiry.id} className="hover:bg-gray-50 transition-colors">
                                <div
                                    className="px-6 py-4 flex items-center gap-4 cursor-pointer"
                                    onClick={() => setExpanded(expanded === enquiry.id ? null : enquiry.id)}
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="font-semibold text-sm text-gray-900">{enquiry.name}</span>
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusColors[enquiry.status]}`}>
                                                {enquiry.status}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 truncate">{enquiry.email} · {enquiry.subject}</p>
                                    </div>
                                    <div className="text-xs text-gray-400 whitespace-nowrap">
                                        {new Date(enquiry.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                                    </div>
                                    <span className="text-gray-400 text-sm">{expanded === enquiry.id ? "▲" : "▼"}</span>
                                </div>

                                {expanded === enquiry.id && (
                                    <div className="px-6 pb-5 bg-gray-50 border-t border-gray-100">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 mb-1">From</p>
                                                <p className="text-sm text-gray-900">{enquiry.name} — <a href={`mailto:${enquiry.email}`} className="text-[#242171] hover:underline">{enquiry.email}</a></p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 mb-1">Subject</p>
                                                <p className="text-sm text-gray-900">{enquiry.subject}</p>
                                            </div>
                                            {enquiry.message && (
                                                <div className="md:col-span-2">
                                                    <p className="text-xs font-semibold text-gray-500 mb-1">Message</p>
                                                    <p className="text-sm text-gray-700 bg-white p-3 rounded-lg border border-gray-200">{enquiry.message}</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap gap-4 mt-6 items-center justify-between border-t border-gray-100 pt-5">
                                            <button
                                                onClick={() => {
                                                    updateStatus(enquiry.id, "replied");
                                                    const subject = encodeURIComponent(`Regarding: ${enquiry.subject}`);
                                                    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${enquiry.email}&su=${subject}`;
                                                    window.open(gmailUrl, "_blank");
                                                }}
                                                className="bg-[#242171] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#1a1a5e] transition-all flex items-center gap-2 shadow-md"
                                            >
                                                <span>✉️</span> Reply via Gmail
                                            </button>

                                            <div className="flex gap-2 items-center">
                                                <p className="text-xs font-semibold text-gray-500 mr-2">Update Status:</p>
                                                {["new", "read", "replied"].map((s) => (
                                                    <button
                                                        key={s}
                                                        onClick={() => updateStatus(enquiry.id, s)}
                                                        className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${enquiry.status === s ? statusColors[s] + " ring-2 ring-offset-1 ring-current" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                                                    >
                                                        {s.charAt(0).toUpperCase() + s.slice(1)}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
