"use client";

import { useEffect, useState } from "react";

interface Member {
    id: string;
    name: string;
    fatherName: string;
    parentsAddress: string;
    permanentAddress: string;
    aadharNumber: string;
    vehicleNumber: string | null;
    educationQualification: string;
    dob: string;
    bloodGroup: string;
    phone: string;
    profession: string;
    familyDetails: string;
    introducedBy: string | null;
    photoUrl: string | null;
    status: string;
    createdAt: string;
}

const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
};

export default function AdminMembership() {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<Member | null>(null);

    const fetchMembers = async () => {
        const res = await fetch("/api/admin/membership");
        const data = await res.json();
        setMembers(data);
        setLoading(false);
    };

    useEffect(() => { fetchMembers(); }, []);

    const updateStatus = async (id: string, status: string) => {
        await fetch("/api/admin/membership", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status }),
        });
        fetchMembers();
        if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status } : null);
    };

    return (
        <div className="space-y-6">
            {/* Detail Modal */}
            {selected && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="bg-[#1a1a5e] px-6 py-5 rounded-t-2xl flex items-center justify-between">
                            <h3 className="text-white font-bold text-lg">Membership Application</h3>
                            <button onClick={() => setSelected(null)} className="text-white/70 hover:text-white text-xl">✕</button>
                        </div>
                        <div className="p-6 space-y-5">
                            {/* Photo + Status */}
                            <div className="flex items-start gap-5">
                                {selected.photoUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={selected.photoUrl} alt={selected.name} className="w-24 h-24 rounded-xl object-cover border border-gray-200 shadow" />
                                ) : (
                                    <div className="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center text-3xl">👤</div>
                                )}
                                <div className="flex-1">
                                    <h4 className="text-xl font-black text-[#1a1a5e]">{selected.name}</h4>
                                    <p className="text-gray-500 text-sm">{selected.profession}</p>
                                    <span className={`inline-block mt-2 text-xs px-3 py-1 rounded-full font-semibold ${statusColors[selected.status]}`}>
                                        {selected.status.charAt(0).toUpperCase() + selected.status.slice(1)}
                                    </span>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                {[
                                    ["Father's Name", selected.fatherName],
                                    ["Phone", selected.phone],
                                    ["Date of Birth", selected.dob],
                                    ["Blood Group", selected.bloodGroup],
                                    ["Aadhar Number", selected.aadharNumber],
                                    ["Vehicle Number", selected.vehicleNumber || "—"],
                                    ["Education", selected.educationQualification],
                                    ["Profession", selected.profession],
                                    ["Parents Address", selected.parentsAddress],
                                    ["Permanent Address", selected.permanentAddress],
                                    ["Family Details", selected.familyDetails],
                                    ["Introduced By", selected.introducedBy || "—"],
                                    ["Applied On", new Date(selected.createdAt).toLocaleDateString("en-IN")],
                                ].map(([label, value]) => (
                                    <div key={label} className={label.includes("Address") || label === "Family Details" ? "col-span-2" : ""}>
                                        <p className="text-xs font-semibold text-gray-400 mb-0.5">{label}</p>
                                        <p className="text-gray-800 font-medium whitespace-pre-wrap">{value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-2 border-t border-gray-100">
                                <button
                                    onClick={() => updateStatus(selected.id, "approved")}
                                    className="flex-1 bg-green-500 text-white py-2.5 rounded-lg font-bold text-sm hover:bg-green-600 transition-colors disabled:opacity-50"
                                    disabled={selected.status === "approved"}
                                >
                                    ✓ Approve
                                </button>
                                <button
                                    onClick={() => updateStatus(selected.id, "rejected")}
                                    className="flex-1 bg-red-500 text-white py-2.5 rounded-lg font-bold text-sm hover:bg-red-600 transition-colors disabled:opacity-50"
                                    disabled={selected.status === "rejected"}
                                >
                                    ✕ Reject
                                </button>
                                <button
                                    onClick={() => updateStatus(selected.id, "pending")}
                                    className="flex-1 bg-yellow-400 text-yellow-900 py-2.5 rounded-lg font-bold text-sm hover:bg-yellow-500 transition-colors disabled:opacity-50"
                                    disabled={selected.status === "pending"}
                                >
                                    ↺ Pending
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="font-bold text-[#1a1a5e] text-lg">Membership Applications ({members.length})</h2>
                    <div className="flex gap-2 text-xs">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">
                            {members.filter((m) => m.status === "pending").length} Pending
                        </span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
                            {members.filter((m) => m.status === "approved").length} Approved
                        </span>
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full font-semibold">
                            {members.filter((m) => m.status === "rejected").length} Rejected
                        </span>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-12 text-gray-400">Loading...</div>
                ) : members.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                        <div className="text-4xl mb-3">👥</div>
                        <p>No membership applications yet.</p>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Profession</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Applied</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {members.map((member) => (
                                <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">{member.name}</p>
                                            <p className="text-xs text-gray-500">{member.phone}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{member.phone}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">{member.profession}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(member.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${statusColors[member.status]}`}>
                                            {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => setSelected(member)}
                                            className="text-[#242171] text-sm font-semibold hover:underline"
                                        >
                                            View Details
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
