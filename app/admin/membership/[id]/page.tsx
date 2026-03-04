"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

export default function MemberDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [member, setMember] = useState<Member | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchMember = async () => {
        const res = await fetch(`/api/admin/membership/${id}`);
        if (res.ok) {
            const data = await res.json();
            setMember(data);
        } else {
            router.push("/admin/membership");
        }
        setLoading(false);
    };

    const updateStatus = async (status: string) => {
        if (!member) return;
        await fetch("/api/admin/membership", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: member.id, status }),
        });
        fetchMember();
    };

    useEffect(() => { fetchMember(); }, [id]);

    if (loading) return <div className="p-8 text-center text-gray-400">Loading details...</div>;
    if (!member) return <div className="p-8 text-center text-red-500">Member not found</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-20">
            <div className="flex items-center justify-between">
                <Link href="/admin/membership" className="text-sm font-bold text-[#242171] hover:underline flex items-center gap-2">
                    ← Back to List
                </Link>
                <div className="flex gap-2">
                    <button onClick={() => window.print()} className="text-xs font-bold text-gray-500 hover:text-gray-800 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
                        Print Application
                    </button>
                    <button onClick={() => fetchMember()} className="text-xs font-bold text-gray-500 hover:text-gray-800 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
                        Refresh
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Header Section */}
                <div className="bg-[#1a1a5e] p-8 text-white relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="relative shrink-0">
                            {member.photoUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={member.photoUrl}
                                    alt={member.name}
                                    className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border-4 border-white/20 shadow-2xl"
                                />
                            ) : (
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-5xl border-2 border-white/20">👤</div>
                            )}
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">{member.name}</h1>
                            <p className="text-white/70 font-medium text-lg mb-4">{member.profession}</p>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                <span className={`text-xs px-4 py-1.5 rounded-full font-bold uppercase tracking-wider ${statusColors[member.status]} bg-opacity-100 shadow-sm border border-white/10`}>
                                    {member.status}
                                </span>
                                <span className="text-xs bg-white/10 px-4 py-1.5 rounded-full font-bold uppercase tracking-wider">
                                    ID: {member.id.slice(-6).toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Primary Info */}
                    <div className="space-y-6">
                        <SectionTitle title="Personal Information" />
                        <DetailItem label="Full Name" value={member.name} />
                        <DetailItem label="Father's Name" value={member.fatherName} />
                        <DetailItem label="Date of Birth" value={member.dob} />
                        <DetailItem label="Blood Group" value={member.bloodGroup} />
                        <DetailItem label="Education" value={member.educationQualification} />
                        <DetailItem label="Profession" value={member.profession} />
                    </div>

                    <div className="space-y-6">
                        <SectionTitle title="Contact & Identification" />
                        <DetailItem label="Phone Number" value={member.phone} highlight />
                        <DetailItem label="Aadhar Number" value={member.aadharNumber} />
                        <DetailItem label="Vehicle Number" value={member.vehicleNumber || "Not Provided"} />
                        <DetailItem label="Introduced By" value={member.introducedBy || "Direct Application"} />
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        <SectionTitle title="Address Details" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailItem label="Parents Address" value={member.parentsAddress} multiline />
                            <DetailItem label="Permanent Address" value={member.permanentAddress} multiline />
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        <SectionTitle title="Family & Additional Details" />
                        <DetailItem label="Family Information" value={member.familyDetails} multiline />
                    </div>
                </div>

                {/* Status Update Footer */}
                <div className="bg-gray-50 border-t border-gray-100 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h4 className="text-sm font-bold text-gray-900 mb-1">Update Application Status</h4>
                        <p className="text-xs text-gray-500 font-medium">Changing the status will update the record immediately.</p>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <StatusButton
                            currentStatus={member.status}
                            targetStatus="approved"
                            color="bg-green-600 hover:bg-green-700"
                            label="Approve"
                            onClick={() => updateStatus("approved")}
                        />
                        <StatusButton
                            currentStatus={member.status}
                            targetStatus="rejected"
                            color="bg-red-600 hover:bg-red-700"
                            label="Reject"
                            onClick={() => updateStatus("rejected")}
                        />
                        <StatusButton
                            currentStatus={member.status}
                            targetStatus="pending"
                            color="bg-yellow-500 hover:bg-yellow-600"
                            label="Set Pending"
                            onClick={() => updateStatus("pending")}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function SectionTitle({ title }: { title: string }) {
    return (
        <h3 className="text-xs font-black text-[#1a1a5e] uppercase tracking-[0.2em] pb-2 border-b-2 border-gray-100 flex items-center gap-3">
            {title}
            <span className="flex-1 h-[1px] bg-gray-100"></span>
        </h3>
    );
}

function DetailItem({ label, value, multiline, highlight }: { label: string; value: string; multiline?: boolean; highlight?: boolean }) {
    return (
        <div className={multiline ? "bg-gray-50/50 p-4 rounded-xl border border-gray-100" : ""}>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
            <p className={`text-gray-900 font-semibold ${highlight ? "text-lg text-[#1a1a5e]" : "text-sm"} ${multiline ? "whitespace-pre-wrap leading-relaxed" : ""}`}>
                {value}
            </p>
        </div>
    );
}

function StatusButton({ currentStatus, targetStatus, color, label, onClick }: { currentStatus: string; targetStatus: string; color: string; label: string; onClick: () => void }) {
    const isActive = currentStatus === targetStatus;
    return (
        <button
            onClick={onClick}
            disabled={isActive}
            className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg ${isActive ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none" : `${color} text-white shadow-current/10 active:scale-95`}`}
        >
            {isActive ? `✓ ${label}d` : label}
        </button>
    );
}
