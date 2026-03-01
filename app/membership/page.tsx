"use client";

import { useState } from "react";
import MemberSearch from "@/components/MemberSearch";
import { motion } from "framer-motion";
import { FadeIn, Stagger, StaggerItem, Pressable } from "@/components/Motion";

export default function Membership() {
    const [form, setForm] = useState({
        name: "", fatherName: "", address1: "", address2: "",
        city: "", state: "", district: "", pincode: "",
        phone: "", dob: "", doj: "", proposedPost: "",
        area: "", recommendationId: "",
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
            setForm({ name: "", fatherName: "", address1: "", address2: "", city: "", state: "", district: "", pincode: "", phone: "", dob: "", doj: "", proposedPost: "", area: "", recommendationId: "" });
            setPhoto(null);
        } else {
            setStatus("error");
        }
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 py-8">
                {/* Page Title */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-[#1a1a5e] inline-block relative px-1">
                        Membership Request
                        <div className="absolute left-0 -bottom-1 w-1/2 h-1 bg-[#d93025]"></div>
                    </h2>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="lg:w-1/4 space-y-8">
                        <MemberSearch />

                        <div className="bg-[#f8f7ff] p-6 rounded-xl border border-purple-100 shadow-sm">
                            <h3 className="text-lg font-bold mb-4">Human Rights Association of India</h3>
                            <div className="space-y-4">
                                <p className="text-xs text-gray-600 leading-relaxed italic">
                                    सभी अध्यक्ष अपने अधीनस्थ राज्य/संभाग/जिला में आईकार्ड वितरण कार्यक्रम के माध्यम से सूचित करें।
                                </p>
                                <p className="text-[10px] text-gray-500 italic">
                                    All presidents should ensure through icards distribution program in their subordinate state/division/districts
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#242171] text-white p-6 rounded-xl text-center shadow-md">
                            <p className="text-xs leading-relaxed italic">
                                ** Dear all Members of HRAOI, the renewal process is stated please contact your District President for any information Please contact Delhi Office, or you can drop us a mail at www.hraoi.in@gmail.com**
                            </p>
                        </div>
                    </aside>

                    {/* Membership Form */}
                    <main className="lg:w-3/4">
                        {status === "success" && (
                            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm font-medium">
                                ✓ Your membership application has been submitted successfully! We will review it and contact you soon.
                            </div>
                        )}
                        {status === "error" && (
                            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
                                Something went wrong. Please try again.
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                {/* Left Column */}
                                <div className="space-y-6">
                                    <input name="name" value={form.name} onChange={handleChange} type="text" placeholder="Name" required className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#242171] transition-colors" />
                                    <input name="address1" value={form.address1} onChange={handleChange} type="text" placeholder="Address 1" required className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#242171] transition-colors" />
                                    <input name="recommendationId" value={form.recommendationId} onChange={handleChange} type="text" placeholder="Recommendation person ID" className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#242171] transition-colors" />
                                    <input name="state" value={form.state} onChange={handleChange} type="text" placeholder="State" required className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#242171] transition-colors" />
                                    <input name="pincode" value={form.pincode} onChange={handleChange} type="text" placeholder="PinCode" required className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#242171] transition-colors" />
                                    <input name="dob" value={form.dob} onChange={handleChange} type="text" placeholder="DOB: DD.MM.YYYY" required className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#242171] transition-colors" />
                                    <input name="proposedPost" value={form.proposedPost} onChange={handleChange} type="text" placeholder="Proposed Post" required className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#242171] transition-colors" />
                                </div>

                                {/* Right Column */}
                                <div className="space-y-6">
                                    <input name="fatherName" value={form.fatherName} onChange={handleChange} type="text" placeholder="Father's Name" required className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#242171] transition-colors" />
                                    <input name="address2" value={form.address2} onChange={handleChange} type="text" placeholder="Address 2" className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#242171] transition-colors" />
                                    <input name="city" value={form.city} onChange={handleChange} type="text" placeholder="City" required className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#242171] transition-colors" />
                                    <input name="district" value={form.district} onChange={handleChange} type="text" placeholder="District" required className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#242171] transition-colors" />
                                    <input name="phone" value={form.phone} onChange={handleChange} type="text" placeholder="Phone No." required className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#242171] transition-colors" />
                                    <input name="doj" value={form.doj} onChange={handleChange} type="text" placeholder="DOJ: DD.MM.YY" required className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#242171] transition-colors" />
                                    <input name="area" value={form.area} onChange={handleChange} type="text" placeholder="Area" className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#242171] transition-colors" />
                                </div>
                            </div>

                            {/* Photo Upload */}
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
                                <label className="text-sm font-bold text-[#1a1a5e]">Upload Photo in jpg Only</label>
                                <div className="flex-1 max-w-md w-full">
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/jpg"
                                        onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                                        className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 cursor-pointer border rounded-md p-1"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <Pressable>
                                    <button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="bg-[#242171] text-white px-20 py-3 rounded-lg font-bold hover:bg-[#1a1a5e] transition-all uppercase tracking-widest text-sm shadow-lg w-full md:w-fit disabled:opacity-60"
                                    >
                                        {status === "loading" ? (
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                className="flex items-center justify-center gap-2"
                                            >
                                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full"></div>
                                                Submitting...
                                            </motion.div>
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
