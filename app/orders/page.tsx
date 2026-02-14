"use client";

import { useState } from "react";

type Order = {
    id: string;
    title: string;
    color: string;
};

const orders: Order[] = [
    { id: "reg-cert", title: "REGISTRATION CERTIFICATE", color: "bg-[#e2ede1]" },
    { id: "copy-right", title: "COPY RIGHT CERTIFICATE", color: "bg-[#fde5d8]" },
    { id: "copy-right-2", title: "COPY RIGHT CERTIFICATE2", color: "bg-[#fde5d8]" },
    { id: "trade-mark", title: "TRADE MARK", color: "bg-[#fff9e6]" },
];

export default function Orders() {
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

    const handleOrderClick = (id: string) => {
        setSelectedOrder(id);
    };

    const handleBack = () => {
        setSelectedOrder(null);
    };

    const activeOrder = orders.find(o => o.id === selectedOrder);

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 py-8">
                {/* Page Title */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-[#1a1a5e] inline-block relative px-1">
                        {selectedOrder ? activeOrder?.title : "Orders"}
                        <div className="absolute left-0 -bottom-1 w-1/2 h-1 bg-[#d93025]"></div>
                    </h2>
                </div>

                {!selectedOrder ? (
                    /* Main Layout with Sidebar and Grid */
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar */}
                        <aside className="lg:w-1/4 space-y-8">
                            {/* Member Search */}
                            <div className="bg-[#f0f9ff] p-6 rounded-xl border border-blue-100 shadow-sm">
                                <h3 className="text-lg font-bold mb-4">Member Search</h3>
                                <p className="text-xs text-gray-500 mb-2">Member NO.</p>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Only Numeric no."
                                        className="flex-1 px-3 py-2 text-sm rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#242171]"
                                    />
                                    <button className="bg-[#242171] text-white px-4 py-2 rounded text-xs font-semibold">Search</button>
                                </div>
                            </div>

                            {/* Manav Adhikar Garima */}
                            <div className="bg-[#f8f7ff] p-6 rounded-xl border border-purple-100 shadow-sm">
                                <h3 className="text-lg font-bold mb-4">Manav Adhikar Garima</h3>
                                <div className="space-y-4">
                                    <p className="text-xs text-gray-600 leading-relaxed italic">
                                        सभी अध्यक्ष अपने अधीनस्थ राज्य/संभाग/जिला में आईकार्ड वितरण कार्यक्रम के माध्यम से सूचित करें।
                                    </p>
                                    <p className="text-[10px] text-gray-500 italic">
                                        All presidents should ensure through icards distribution program in their subordinate state/division/districts
                                    </p>
                                </div>
                            </div>

                            {/* Blue Banner Box */}
                            <div className="bg-[#242171] text-white p-6 rounded-xl text-center shadow-md">
                                <p className="text-xs leading-relaxed italic">
                                    ** Dear all Members of HRAI, the renewal process is stated please contact your District President for any information Please contact Delhi Office, or you can drop us a mail at hrai_dli@yahoo.com**
                                </p>
                            </div>
                        </aside>

                        {/* Grid of Orders */}
                        <main className="lg:w-3/4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className={`${order.color} p-8 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-center text-center min-h-[140px] border border-black/5 group`}
                                        onClick={() => handleOrderClick(order.id)}
                                    >
                                        <span className="text-xs font-bold text-[#1a1a5e] uppercase tracking-wide leading-tight group-hover:scale-105 transition-transform">
                                            {order.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </main>
                    </div>
                ) : (
                    /* Document Detail View */
                    <div className="space-y-6">
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 text-gray-500 hover:text-[#242171] transition-colors font-semibold py-2"
                        >
                            <span>← Back to Orders</span>
                        </button>

                        <div className="bg-white border rounded-xl shadow-lg p-4 md:p-12 flex justify-center">
                            {/* Document Mockup */}
                            <div className="w-full max-w-2xl bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)] p-8 border border-gray-100 min-h-[800px] flex flex-col items-center">
                                <div className="w-full flex justify-between items-start mb-12">
                                    <div className="w-16 h-16 bg-gray-100 rounded-lg"></div>
                                    <div className="text-center flex-1 mx-4">
                                        <div className="text-[#1a1a5e] font-bold text-xl uppercase">Human Rights Association of India</div>
                                        <div className="text-[10px] text-gray-500">Regn No: S-47264-03 | www.hrai.co.in</div>
                                    </div>
                                    <div className="w-16 h-16 bg-gray-100 rounded-full"></div>
                                </div>

                                <div className="w-full h-[600px] bg-white rounded flex flex-col items-center justify-center border-2 border-dashed border-gray-200">
                                    <div className="text-gray-300 font-bold text-2xl mb-4 italic">Certificate: {activeOrder?.title}</div>
                                    <div className="w-48 h-1 bg-gray-100 mb-2"></div>
                                    <div className="w-64 h-1 bg-gray-100 mb-2"></div>
                                    <div className="w-56 h-1 bg-gray-100"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
