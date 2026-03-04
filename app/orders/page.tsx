"use client";

import { useState, useEffect } from "react";
import MemberSearch from "@/components/MemberSearch";
import { getNormalizedFileUrl } from "@/lib/utils";

type Order = {
    id: string;
    title: string;
    fileUrl: string;
};

const bgColors = [
    "bg-[#e2ede1]", "bg-[#fde5d8]", "bg-[#fff9e6]", "bg-[#d9f1f7]",
    "bg-[#fce1e5]", "bg-[#e0f7f3]", "bg-[#d8e0f5]", "bg-[#e8f1ff]",
];

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/orders")
            .then((r) => r.json())
            .then((data) => { setOrders(data); setLoading(false); });
    }, []);

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 py-8">
                {/* Page Title */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-[#1a1a5e] inline-block relative px-1">
                        Orders
                        <div className="absolute left-0 -bottom-1 w-1/2 h-1 bg-[#d93025]"></div>
                    </h2>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="lg:w-1/4 space-y-8">
                        <MemberSearch />
                        <div className="bg-[#f8f7ff] p-6 rounded-xl border border-purple-100 shadow-sm">
                            <h3 className="text-lg font-bold mb-4">Human Rights Association of India</h3>
                            <p className="text-xs text-gray-600 leading-relaxed italic">सभी अध्यक्ष अपने अधीनस्थ राज्य/संभाग/जिला में आईकार्ड वितरण कार्यक्रम के माध्यम से सूचित करें।</p>
                            <p className="text-[10px] text-gray-500 italic mt-2">All presidents should ensure through icards distribution program in their subordinate state/division/districts</p>
                        </div>
                        <div className="bg-[#242171] text-white p-6 rounded-xl text-center shadow-md">
                            <p className="text-xs leading-relaxed italic">** Dear all Members of HRAOI, the renewal process is stated please contact your District President for any information Please contact Delhi Office, or you can drop us a mail at www.hraoi.in@gmail.com**</p>
                        </div>
                    </aside>

                    {/* Grid of Orders */}
                    <main className="lg:w-3/4">
                        {loading ? (
                            <div className="text-center py-20 text-gray-400">Loading orders...</div>
                        ) : orders.length === 0 ? (
                            <div className="text-center py-20 text-gray-400">
                                <div className="text-4xl mb-3">📋</div>
                                <p>No orders available yet.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {orders.map((order, i) => (
                                    <a
                                        key={order.id}
                                        href={getNormalizedFileUrl(order.fileUrl)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${bgColors[i % bgColors.length]} p-8 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center justify-center text-center min-h-[100px] border border-black/5 group`}
                                    >
                                        <span className="text- font-medium text-[#1a1a5e] uppercase tracking-wide leading-tight group-hover:scale-105 transition-transform">
                                            {order.title}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
