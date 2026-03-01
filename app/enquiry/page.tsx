"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, Pressable, Stagger, StaggerItem } from "@/components/Motion";

export default function Enquiry() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        const res = await fetch("/api/enquiry", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            setStatus("success");
            setForm({ name: "", email: "", subject: "", message: "" });
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
                        Enquiry and Feedback
                        <div className="absolute left-0 -bottom-1 w-1/2 h-1 bg-[#d93025]"></div>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left Side: Form */}
                    <div className="space-y-6">
                        {status === "success" && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm font-medium">
                                ✓ Your enquiry has been submitted successfully! We will get back to you soon.
                            </div>
                        )}
                        {status === "error" && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
                                Something went wrong. Please try again.
                            </div>
                        )}

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <Stagger delay={0.2}>
                                <StaggerItem>
                                    <div className="space-y-1">
                                        <label className="block text-sm font-bold text-[#1a1a5e]">Your name<span className="text-[#d93025]">*</span></label>
                                        <motion.input
                                            whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(36, 33, 113, 0.1)" }}
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Enter your name..."
                                            required
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#242171] focus:ring-1 focus:ring-[#242171] outline-none transition-all placeholder:text-gray-300"
                                        />
                                    </div>
                                </StaggerItem>

                                <StaggerItem>
                                    <div className="space-y-1 mt-4">
                                        <label className="block text-sm font-bold text-[#1a1a5e]">Your email<span className="text-[#d93025]">*</span></label>
                                        <motion.input
                                            whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(36, 33, 113, 0.1)" }}
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email..."
                                            required
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#242171] focus:ring-1 focus:ring-[#242171] outline-none transition-all placeholder:text-gray-300"
                                        />
                                    </div>
                                </StaggerItem>

                                <StaggerItem>
                                    <div className="space-y-1 mt-4">
                                        <label className="block text-sm font-bold text-[#1a1a5e]">Subject<span className="text-[#d93025]">*</span></label>
                                        <motion.input
                                            whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(36, 33, 113, 0.1)" }}
                                            type="text"
                                            name="subject"
                                            value={form.subject}
                                            onChange={handleChange}
                                            placeholder="Your subject..."
                                            required
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#242171] focus:ring-1 focus:ring-[#242171] outline-none transition-all placeholder:text-gray-300"
                                        />
                                    </div>
                                </StaggerItem>

                                <StaggerItem>
                                    <div className="space-y-1 mt-4">
                                        <label className="block text-sm font-bold text-[#1a1a5e]">Your message (optional)</label>
                                        <motion.textarea
                                            whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(36, 33, 113, 0.1)" }}
                                            rows={6}
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            placeholder="Your message..."
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#242171] focus:ring-1 focus:ring-[#242171] outline-none transition-all resize-none placeholder:text-gray-300"
                                        ></motion.textarea>
                                    </div>
                                </StaggerItem>

                                <StaggerItem>
                                    <div className="mt-6">
                                        <Pressable>
                                            <button
                                                type="submit"
                                                disabled={status === "loading"}
                                                className="bg-[#242171] text-white px-12 py-2 rounded-lg font-bold hover:bg-[#1a1a5e] transition-all uppercase tracking-widest text-sm shadow-md disabled:opacity-60"
                                            >
                                                {status === "loading" ? (
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full"></div>
                                                        Sending...
                                                    </motion.div>
                                                ) : "Send"}
                                            </button>
                                        </Pressable>
                                    </div>
                                </StaggerItem>
                            </Stagger>
                        </form>
                    </div>

                    {/* Right Side: Map & Info */}
                    <div className="space-y-8">
                        <h3 className="text-xl font-bold text-[#1a1a5e]">We Are Here</h3>

                        <div className="relative group">
                            {/* Google Map */}
                            <div className="w-full aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-sm relative border border-gray-200">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    src="https://maps.google.com/maps?q=45%20D%2C%20Amar%20Plaza%2C%20Hasanpur%20Main%20Road%2C%20I.P.%20Extension%2C%20Delhi%20-%2092&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>

                            {/* Overlay Info Box */}
                            <div className="mt-8 lg:absolute lg:right-4 lg:-bottom-24 lg:mt-0 bg-white p-8 rounded-2xl shadow-2xl border border-blue-50/50 w-full lg:max-w-xs z-10">
                                <h4 className="text-base font-black text-[#1a1a5e] mb-6 uppercase tracking-tight">Contact Us</h4>
                                <div className="space-y-4 text-xs font-semibold text-gray-600 leading-relaxed">
                                    <p className="flex gap-2">
                                        <span className="text-[#d93025]">📍</span>
                                        Address: 45 D, Amar Plaza, Hasanpur Main Road, I.P. Extention, Delhi - 92
                                    </p>
                                    <p className="flex gap-2">
                                        <span className="text-blue-500">📞</span>
                                        Phone: 011- 32405800
                                    </p>
                                    <ul className="space-y-1">
                                        <li className="flex gap-2 text-blue-600 hover:text-[#242171] cursor-pointer">
                                            <span>✉️</span> www.hraoi.in@gmail.com
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
