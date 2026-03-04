"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DonationAdmin() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [message, setMessage] = useState({ type: "", text: "" });

    const [formData, setFormData] = useState({
        upiId: "",
        qrCodeUrl: "",
        qrCodePublicId: "",
        accountName: "",
        accountNumber: "",
        bankName: "",
        ifscCode: "",
    });

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await fetch("/api/donation-details");
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.id) {
                        setFormData(data);
                    }
                }
            } catch (error) {
                console.error("Error fetching donation details:", error);
            } finally {
                setFetching(false);
            }
        };
        fetchDetails();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "hroi_gallery"); // Assuming this preset exists based on gallery upload

        try {
            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: data,
                }
            );

            if (res.ok) {
                const fileData = await res.json();
                setFormData((prev) => ({
                    ...prev,
                    qrCodeUrl: fileData.secure_url,
                    qrCodePublicId: fileData.public_id,
                }));
                setMessage({ type: "success", text: "QR Code uploaded successfully!" });
            } else {
                setMessage({ type: "error", text: "Failed to upload QR Code." });
            }
        } catch (err) {
            console.error(err);
            setMessage({ type: "error", text: "An error occurred during upload." });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            const res = await fetch("/api/donation-details", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setMessage({ type: "success", text: "Donation details updated successfully!" });
            } else {
                const error = await res.json();
                setMessage({ type: "error", text: error.error || "Failed to update details." });
            }
        } catch (err) {
            console.error(err);
            setMessage({ type: "error", text: "An error occurred." });
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="p-8">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <h2 className="text-2xl font-black text-[#1a1a5e] mb-6">Manage Donation Details</h2>

                {message.text && (
                    <div className={`p-4 rounded-lg mb-6 ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* UPI Details */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-700">UPI Information</h3>
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">UPI ID</label>
                                <input
                                    type="text"
                                    name="upiId"
                                    value={formData.upiId}
                                    onChange={handleChange}
                                    placeholder="e.g. 9871640670@paytm"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a1a5e] transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">QR Code Image</label>
                                <input
                                    type="file"
                                    onChange={handleFileUpload}
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                {formData.qrCodeUrl && (
                                    <div className="mt-4 p-2 border rounded-lg inline-block">
                                        <Image src={formData.qrCodeUrl} alt="QR Code" width={150} height={150} className="rounded" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Bank Details */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-700">Bank Information</h3>
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Account Holder Name</label>
                                <input
                                    type="text"
                                    name="accountName"
                                    value={formData.accountName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a1a5e] transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Account Number</label>
                                <input
                                    type="text"
                                    name="accountNumber"
                                    value={formData.accountNumber}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a1a5e] transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Bank Name & Branch</label>
                                <input
                                    type="text"
                                    name="bankName"
                                    value={formData.bankName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a1a5e] transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">IFSC Code</label>
                                <input
                                    type="text"
                                    name="ifscCode"
                                    value={formData.ifscCode}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a1a5e] transition-all"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full md:w-auto px-8 py-3 bg-[#1a1a5e] text-white font-bold rounded-xl hover:bg-[#242171] transition-all disabled:opacity-50"
                        >
                            {loading ? "Updating..." : "Update Donation Details"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
