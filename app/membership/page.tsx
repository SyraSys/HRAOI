"use client";

import { useState } from "react";
import MemberSearch from "@/components/MemberSearch";
import { motion } from "framer-motion";
import { FadeIn, Stagger, StaggerItem, Pressable } from "@/components/Motion";

export default function Membership() {
    const [form, setForm] = useState({
        name: "",
        fatherName: "",
        parentsAddress: "",
        permanentAddress: "",
        aadharNumber: "",
        vehicleNumber: "",
        educationQualification: "",
        dob: "",
        bloodGroup: "",
        phone: "",
        profession: "",
        familyDetails: "",
        introducedBy: ""
    });
    const [photo, setPhoto] = useState<File | null>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData();
        Object.entries(form).forEach(([key, val]) => formData.append(key, val));
        if (photo) formData.append("photo", photo);

        const res = await fetch("/api/membership", { method: "POST", body: formData });

        if (res.ok) {
            setStatus("success");
            setForm({
                name: "",
                fatherName: "",
                parentsAddress: "",
                permanentAddress: "",
                aadharNumber: "",
                vehicleNumber: "",
                educationQualification: "",
                dob: "",
                bloodGroup: "",
                phone: "",
                profession: "",
                familyDetails: "",
                introducedBy: ""
            });
            setPhoto(null);
        } else {
            setStatus("error");
        }
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 py-6 lg:py-8">
                {/* Page Title */}
                <div className="mb-8 lg:mb-12">
                    <h2 className="text-xl lg:text-2xl font-bold text-[#1a1a5e] inline-block relative px-1">
                        Membership Request
                        <div className="absolute left-0 -bottom-1 w-1/2 h-1 bg-[#d93025]"></div>
                    </h2>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Sidebar */}
                    <aside className="lg:w-1/4 space-y-6 lg:space-y-8">
                        <MemberSearch />

                        <div className="bg-[#f8f7ff] p-4 lg:p-6 rounded-xl border border-purple-100 shadow-sm">
                            <h3 className="text-base lg:text-lg font-bold mb-3 lg:mb-4">Human Rights Association of India</h3>
                            <div className="space-y-3 lg:space-y-4">
                                <p className="text-xs text-gray-600 leading-relaxed italic">
                                    सभी अध्यक्ष अपने अधीनस्थ राज्य/संभाग/जिला में आईकार्ड वितरण कार्यक्रम के माध्यम से सूचित करें।
                                </p>
                                <p className="text-[10px] text-gray-500 italic">
                                    All presidents should ensure through icards distribution program in their subordinate state/division/districts
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#242171] text-white p-4 lg:p-6 rounded-xl text-center shadow-md">
                            <p className="text-xs leading-relaxed italic">
                                ** Dear all Members of HRAOI, the renewal process is stated please contact your District President for any information Please contact Delhi Office, or you can drop us a mail at www.hraoi.in@gmail.com**
                            </p>
                        </div>
                    </aside>

                    {/* Membership Form */}
                    <main className="lg:w-3/4">
                        {status === "success" && (
                            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-xs lg:text-sm font-medium">
                                ✓ Your membership application has been submitted successfully! We will review it and contact you soon.
                            </div>
                        )}
                        {status === "error" && (
                            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-xs lg:text-sm font-medium">
                                Something went wrong. Please try again.
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-4 lg:gap-y-6">
                                {/* Left Column */}
                                <div className="space-y-4 lg:space-y-6">
                                    <div>
                                        <label className="block text-xs font-bold text-[#1a1a5e] uppercase mb-2">Name</label>
                                        <input name="name" value={form.name} onChange={handleChange} type="text" placeholder="Full Name" required className="w-full px-3 lg:px-4 py-2 lg:py-2.5 border border-gray-200 rounded text-xs lg:text-sm outline-none focus:border-[#242171] transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#1a1a5e] uppercase mb-2">Father's Name</label>
                                        <input name="fatherName" value={form.fatherName} onChange={handleChange} type="text" placeholder="Father's Name" required className="w-full px-3 lg:px-4 py-2 lg:py-2.5 border border-gray-200 rounded text-xs lg:text-sm outline-none focus:border-[#242171] transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#1a1a5e] uppercase mb-2">Parents Address</label>
                                        <textarea name="parentsAddress" value={form.parentsAddress} onChange={(e: any) => setForm(p => ({ ...p, parentsAddress: e.target.value }))} placeholder="Complete Parents Address" required className="w-full px-3 lg:px-4 py-2 lg:py-2.5 border border-gray-200 rounded text-xs lg:text-sm outline-none focus:border-[#242171] transition-colors min-h-[80px] lg:min-h-[100px] resize-none" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#1a1a5e] uppercase mb-2">Aadhar Number</label>
                                        <input name="aadharNumber" value={form.aadharNumber} onChange={handleChange} type="text" placeholder="Aadhar Number" required className="w-full px-3 lg:px-4 py-2 lg:py-2.5 border border-gray-200 rounded text-xs lg:text-sm outline-none focus:border-[#242171] transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#1a1a5e] uppercase mb-2">Education Qualification</label>
                                        <input name="educationQualification" value={form.educationQualification} onChange={handleChange} type="text" placeholder="High School, Graduate, etc." required className="w-full px-3 lg:px-4 py-2 lg:py-2.5 border border-gray-200 rounded text-xs lg:text-sm outline-none focus:border-[#242171] transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#1a1a5e] uppercase mb-2">Blood Group</label>
                                        <input name="bloodGroup" value={form.bloodGroup} onChange={handleChange} type="text" placeholder="A+, B-, etc." required className="w-full px-3 lg:px-4 py-2 lg:py-2.5 border border-gray-200 rounded text-xs lg:text-sm outline-none focus:border-[#242171] transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#1a1a5e] uppercase mb-2">Profession</label>
                                        <input name="profession" value={form.profession} onChange={handleChange} type="text" placeholder="Your Occupation" required className="w-full px-3 lg:px-4 py-2 lg:py-2.5 border border-gray-200 rounded text-xs lg:text-sm outline-none focus:border-[#242171] transition-colors" />
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-4 lg:space-y-6">
                                    <div>
                                        <label className="block text-xs font-bold text-[#1a1a5e] uppercase mb-2">DOB</label>
                                        <input name="dob" value={form.dob} onChange={handleChange} type="text" placeholder="DD.MM.YYYY" required className="w-full px-3 lg:px-4 py-2 lg:py-2.5 border border-gray-200 rounded text-xs lg:text-sm outline-none focus:border-[#242171] transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#1a1a5e] uppercase mb-2">Phone Number</label>
                                        <input name="phone" value={form.phone} onChange={handleChange} type="text" placeholder="+91 XXXXX XXXXX" required className="w-full px-3 lg:px-4 py-2 lg:py-2.5 border border-gray-200 rounded text-xs lg:text-sm outline-none focus:border-[#242171] transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#1a1a5e] uppercase mb-2">Permanent Address</label>
                                        <textarea name="permanentAddress" value={form.permanentAddress} onChange={(e: any) => setForm(p => ({ ...p, permanentAddress: e.target.value }))} placeholder="Complete Permanent Address" required className="w-full px-3 lg:px-4 py-2 lg:py-2.5 border border-gray-200 rounded text-xs lg:text-sm outline-none focus:border-[#242171] transition-colors min-h-[80px] lg:min-h-[100px] resize-none" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#1a1a5e] uppercase mb-2">Vehicle Number</label>
                                        <input name="vehicleNumber" value={form.vehicleNumber} onChange={handleChange} type="text" placeholder="Optional" className="w-full px-3 lg:px-4 py-2 lg:py-2.5 border border-gray-200 rounded text-xs lg:text-sm outline-none focus:border-[#242171] transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#1a1a5e] uppercase mb-2">Family Details</label>
                                        <textarea name="familyDetails" value={form.familyDetails} onChange={(e: any) => setForm(p => ({ ...p, familyDetails: e.target.value }))} placeholder="Name, Age, Relation" required className="w-full px-3 lg:px-4 py-2 lg:py-2.5 border border-gray-200 rounded text-xs lg:text-sm outline-none focus:border-[#242171] transition-colors min-h-[80px] lg:min-h-[100px] resize-none" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#1a1a5e] uppercase mb-2">Introduced By</label>
                                        <input name="introducedBy" value={form.introducedBy} onChange={handleChange} type="text" placeholder="Name or Member ID" className="w-full px-3 lg:px-4 py-2 lg:py-2.5 border border-gray-200 rounded text-xs lg:text-sm outline-none focus:border-[#242171] transition-colors" />
                                    </div>
                                </div>
                            </div>

                            {/* Photo Upload */}
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 lg:gap-4 pt-4">
                                <label className="text-sm font-bold text-[#1a1a5e]">Upload Photo in jpg Only</label>
                                <div className="flex-1 max-w-md w-full">
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/jpg"
                                        onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                                        className="w-full text-xs text-gray-500 file:mr-3 lg:file:mr-4 file:py-1.5 lg:file:py-2 file:px-3 lg:file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 cursor-pointer border rounded-md p-1"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4 lg:pt-6">
                                <Pressable>
                                    <button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="bg-[#242171] text-white px-12 lg:px-20 py-2.5 lg:py-3 rounded-lg font-bold hover:bg-[#1a1a5e] transition-all uppercase tracking-widest text-xs lg:text-sm shadow-lg w-full md:w-fit disabled:opacity-60"
                                    >
                                        {status === "loading" ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                    className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full"
                                                ></motion.div>
                                                Submitting...
                                            </div>
                                        ) : "SUBMIT"}
                                    </button>
                                </Pressable>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
}
