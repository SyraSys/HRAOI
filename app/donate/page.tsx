"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface DonationDetails {
    id: string;
    upiId: string;
    qrCodeUrl: string;
    qrCodePublicId: string;
    accountName: string;
    accountNumber: string;
    bankName: string;
    ifscCode: string;
}

export default function Donate() {
    const [details, setDetails] = useState<DonationDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await fetch("/api/donation-details");
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.id) {
                        setDetails(data);
                    }
                }
            } catch (error) {
                console.error("Error fetching donation details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a1a5e]"></div>
            </div>
        );
    }

    // Default values if no details are set yet
    const upiId = details?.upiId || "";
    const qrCodeUrl = details?.qrCodeUrl;
    const accountName = details?.accountName || "";
    const accountNumber = details?.accountNumber || "";
    const bankName = details?.bankName || "";
    const ifscCode = details?.ifscCode || "";

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
                            {/* QR Code Container */}
                            <div className="bg-white p-4 rounded-lg shadow-inner">
                                <div className="w-64 h-64 relative flex items-center justify-center">
                                    {qrCodeUrl ? (
                                        <Image
                                            src={qrCodeUrl}
                                            alt="UPI QR Code"
                                            fill
                                            className="rounded-sm object-contain p-2"
                                        />
                                    ) : (
                                        <>
                                            {/* Using a placeholder for the QR code */}
                                            <div className="absolute inset-0 bg-[#f8f9fa] flex items-center justify-center border-2 border-dashed border-gray-200">
                                                <div className="text-center p-4">
                                                    <div className="text-4xl mb-2">QR</div>
                                                    <div className="text-[10px] text-gray-400 font-mono break-all px-2">
                                                        UPI: {upiId}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Mock QR pattern overlay for aesthetics */}
                                            <div className="grid grid-cols-8 grid-rows-8 w-48 h-48 gap-1 opacity-20">
                                                {Array.from({ length: 64 }).map((_, i) => (
                                                    <div key={i} className={`bg-black ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`}></div>
                                                ))}
                                            </div>
                                            {/* Central icon or text */}
                                            <div className="absolute bg-white p-2 rounded shadow-md">
                                                <span className="text-blue-600 font-black text-xs">UPI</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* UPI Details */}
                            <div className="text-center space-y-2">
                                <p className="text-white font-bold text-lg tracking-tight">
                                    UPI ID: <span className="text-blue-300">{upiId}</span>
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
                                    {accountName}
                                </h4>

                                <div className="space-y-3 text-lg">
                                    <p className="text-blue-100">
                                        <span className="text-white/60 font-medium block text-sm uppercase tracking-widest mb-1">Account Number</span>
                                        <span className="font-bold text-white tracking-widest text-xl">{accountNumber}</span>
                                    </p>

                                    <p className="text-blue-100">
                                        <span className="text-white/60 font-medium block text-sm uppercase tracking-widest mb-1">Bank & Branch</span>
                                        <span className="font-semibold text-white">{bankName}</span>
                                    </p>

                                    <p className="text-blue-100">
                                        <span className="text-white/60 font-medium block text-sm uppercase tracking-widest mb-1">IFSC Code</span>
                                        <span className="font-bold text-blue-300 tracking-widest text-xl">{ifscCode}</span>
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
