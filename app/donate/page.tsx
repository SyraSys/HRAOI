"use client";

import React from "react";

export default function Donate() {
    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 py-8">
                {/* Page Title */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-[#1a1a5e] inline-block relative px-1">
                        Help us
                        <div className="absolute left-0 -bottom-1 w-1/2 h-1 bg-[#d93025]"></div>
                    </h2>
                </div>

                {/* Donation Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">

                    {/* UPI Donation Card */}
                    <div className="flex flex-col rounded-sm overflow-hidden shadow-xl border border-gray-100">
                        {/* Header */}
                        <div className="bg-[#d93025] py-3 px-6 text-center">
                            <h3 className="text-white font-bold text-xl tracking-wider uppercase">
                                Donate via UPI
                            </h3>
                        </div>

                        {/* Body */}
                        <div className="bg-[#1a1a5e] flex-1 p-8 flex flex-col items-center justify-center space-y-8">
                            {/* QR Code Placeholder Container */}
                            <div className="bg-white p-4 rounded-lg shadow-inner">
                                <div className="w-64 h-64 relative flex items-center justify-center">
                                    {/* Using a placeholder for the QR code */}
                                    <div className="absolute inset-0 bg-[#f8f9fa] flex items-center justify-center border-2 border-dashed border-gray-200">
                                        <div className="text-center p-4">
                                            <div className="text-4xl mb-2">QR</div>
                                            <div className="text-[10px] text-gray-400 font-mono break-all px-2">
                                                UPI: 9871640670@PAYTM
                                            </div>
                                        </div>
                                    </div>
                                    {/* Mock QR pattern overlay for aesthetics if no image */}
                                    <div className="grid grid-cols-8 grid-rows-8 w-48 h-48 gap-1 opacity-20">
                                        {Array.from({ length: 64 }).map((_, i) => (
                                            <div key={i} className={`bg-black ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`}></div>
                                        ))}
                                    </div>
                                    {/* Central icon or text */}
                                    <div className="absolute bg-white p-2 rounded shadow-md">
                                        <span className="text-blue-600 font-black text-xs">UPI</span>
                                    </div>
                                </div>
                            </div>

                            {/* UPI Details */}
                            <div className="text-center space-y-2">
                                <p className="text-white font-bold text-lg tracking-tight">
                                    UPI ID: <span className="text-blue-300">9871640670@PAYTM</span>
                                </p>
                                <p className="text-blue-100/80 font-medium text-sm">
                                    PAYTM: 9871640670
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bank Transfer Card */}
                    <div className="flex flex-col rounded-sm overflow-hidden shadow-xl border border-gray-100">
                        {/* Header */}
                        <div className="bg-[#d93025] py-3 px-6 text-center">
                            <h3 className="text-white font-bold text-xl tracking-wider uppercase">
                                Donate via NEFT/RTGS
                            </h3>
                        </div>

                        {/* Body */}
                        <div className="bg-[#1a1a5e] flex-1 p-12 flex flex-col items-center justify-center text-center space-y-6">
                            <div className="space-y-4">
                                <h4 className="text-white font-black text-2xl tracking-tight mb-6">
                                    Anurag Chandravanshi
                                </h4>

                                <div className="space-y-3 text-lg">
                                    <p className="text-blue-100">
                                        <span className="text-white/60 font-medium block text-sm uppercase tracking-widest mb-1">Account Number</span>
                                        <span className="font-bold text-white tracking-widest text-xl">628101511095</span>
                                    </p>

                                    <p className="text-blue-100">
                                        <span className="text-white/60 font-medium block text-sm uppercase tracking-widest mb-1">Bank & Branch</span>
                                        <span className="font-semibold text-white">ICICI Bank, Indirapuram, Ghaziabad</span>
                                    </p>

                                    <p className="text-blue-100">
                                        <span className="text-white/60 font-medium block text-sm uppercase tracking-widest mb-1">IFSC Code</span>
                                        <span className="font-bold text-blue-300 tracking-widest text-xl">ICIC0000718</span>
                                    </p>
                                </div>
                            </div>

                            {/* Decorative element */}
                            <div className="pt-8 opacity-20">
                                <div className="w-16 h-1 bg-white mx-auto rounded-full"></div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Optional Footer Message */}
                <div className="mt-16 text-center max-w-2xl mx-auto">
                    <p className="text-gray-500 italic text-sm leading-relaxed">
                        "Your contribution helps us protect and promote human rights across the nation. Every bit matters."
                    </p>
                </div>
            </div>
        </div>
    );
}
