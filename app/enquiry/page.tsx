"use client";

import Image from "next/image";

export default function Enquiry() {
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
                        <form className="space-y-8">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-[#1a1a5e]">Your name<span className="text-[#d93025]">*</span></label>
                                <input
                                    type="text"
                                    placeholder="Enter your name..."
                                    className="w-full px-4 py-3 border border-gray-200 rounded focus:border-[#242171] focus:ring-1 focus:ring-[#242171] outline-none transition-all placeholder:text-gray-300"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-[#1a1a5e]">Your email<span className="text-[#d93025]">*</span></label>
                                <input
                                    type="email"
                                    placeholder="Enter your email..."
                                    className="w-full px-4 py-3 border border-gray-200 rounded focus:border-[#242171] focus:ring-1 focus:ring-[#242171] outline-none transition-all placeholder:text-gray-300"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-[#1a1a5e]">Subject<span className="text-[#d93025]">*</span></label>
                                <input
                                    type="text"
                                    placeholder="Your subject..."
                                    className="w-full px-4 py-3 border border-gray-200 rounded focus:border-[#242171] focus:ring-1 focus:ring-[#242171] outline-none transition-all placeholder:text-gray-300"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-[#1a1a5e]">Your message (optional)</label>
                                <textarea
                                    rows={6}
                                    placeholder="Your message..."
                                    className="w-full px-4 py-3 border border-gray-200 rounded focus:border-[#242171] focus:ring-1 focus:ring-[#242171] outline-none transition-all resize-none placeholder:text-gray-300"
                                ></textarea>
                            </div>

                            {/* reCAPTCHA Mockup */}
                            <div className="bg-[#f9f9f9] border border-[#d3d3d3] rounded-sm p-3 w-fit flex items-center gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 border-2 border-gray-300 bg-white rounded-sm cursor-pointer"></div>
                                    <span className="text-sm text-[#333]">I'm not a robot</span>
                                </div>
                                <div className="flex flex-col items-center ml-4">
                                    <div className="w-8 h-8 relative opacity-70">
                                        <div className="absolute inset-0 border-2 border-blue-500 rounded-full border-t-transparent animate-spin hidden"></div>
                                        <span className="text-[10px] font-bold text-blue-500">reCAP</span>
                                    </div>
                                    <span className="text-[8px] text-gray-400">Privacy - Terms</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="bg-[#242171] text-white px-12 py-3 rounded font-bold hover:bg-[#1a1a5e] transition-all uppercase tracking-widest text-sm shadow-md"
                            >
                                Send
                            </button>
                        </form>
                    </div>

                    {/* Right Side: Map & Info */}
                    <div className="space-y-8">
                        <h3 className="text-xl font-bold text-[#1a1a5e]">We Are Here</h3>

                        <div className="relative group">
                            {/* Map Placeholder */}
                            <div className="w-full aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-sm relative border border-gray-200">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-gray-300 font-bold italic text-lg uppercase tracking-tighter opacity-50">Google Maps View: Amar Plaza, Delhi</div>
                                </div>
                                {/* Decorative Map Pins Style */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <div className="w-8 h-8 text-red-600">📍</div>
                                </div>
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
                                        <li className="flex gap-2 text-blue-600 hover:text-[#242171] cursor-pointer">
                                            <span>✉️</span> www.hraoi.in@gmail.com
                                        </li>
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
