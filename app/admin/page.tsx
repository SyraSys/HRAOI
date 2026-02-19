"use client";

import { useEffect, useState } from "react";

interface Stats {
    gallery: number;
    circulars: number;
    orders: number;
    enquiries: number;
    membership: number;
    newEnquiries: number;
    pendingMemberships: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            const [gallery, circulars, orders, enquiries, membership] = await Promise.all([
                fetch("/api/admin/gallery").then((r) => r.json()),
                fetch("/api/admin/circulars").then((r) => r.json()),
                fetch("/api/admin/orders").then((r) => r.json()),
                fetch("/api/admin/enquiries").then((r) => r.json()),
                fetch("/api/admin/membership").then((r) => r.json()),
            ]);

            setStats({
                gallery: gallery.length,
                circulars: circulars.length,
                orders: orders.length,
                enquiries: enquiries.length,
                membership: membership.length,
                newEnquiries: enquiries.filter((e: { status: string }) => e.status === "new").length,
                pendingMemberships: membership.filter((m: { status: string }) => m.status === "pending").length,
            });
        };
        fetchStats();
    }, []);

    const cards = [
        { label: "Gallery Photos", value: stats?.gallery, icon: "🖼️", color: "bg-blue-50 border-blue-200", textColor: "text-blue-700", href: "/admin/gallery" },
        { label: "Circulars", value: stats?.circulars, icon: "📄", color: "bg-purple-50 border-purple-200", textColor: "text-purple-700", href: "/admin/circulars" },
        { label: "Orders", value: stats?.orders, icon: "📋", color: "bg-green-50 border-green-200", textColor: "text-green-700", href: "/admin/orders" },
        { label: "Total Enquiries", value: stats?.enquiries, icon: "✉️", color: "bg-yellow-50 border-yellow-200", textColor: "text-yellow-700", href: "/admin/enquiries" },
        { label: "Total Members", value: stats?.membership, icon: "👥", color: "bg-pink-50 border-pink-200", textColor: "text-pink-700", href: "/admin/membership" },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome */}
            <div className="bg-gradient-to-r from-[#1a1a5e] to-[#242171] rounded-2xl p-8 text-white">
                <h2 className="text-2xl font-black mb-1">Welcome back, Admin 👋</h2>
                <p className="text-blue-200 text-sm">
                    Human Rights Association of India — Admin Control Panel
                </p>
            </div>

            {/* Alert badges */}
            {stats && (stats.newEnquiries > 0 || stats.pendingMemberships > 0) && (
                <div className="flex flex-wrap gap-3">
                    {stats.newEnquiries > 0 && (
                        <a href="/admin/enquiries" className="flex items-center gap-2 bg-yellow-50 border border-yellow-300 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-yellow-100 transition-colors">
                            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                            {stats.newEnquiries} new enquir{stats.newEnquiries === 1 ? "y" : "ies"} pending
                        </a>
                    )}
                    {stats.pendingMemberships > 0 && (
                        <a href="/admin/membership" className="flex items-center gap-2 bg-red-50 border border-red-300 text-red-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-100 transition-colors">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                            {stats.pendingMemberships} membership application{stats.pendingMemberships === 1 ? "" : "s"} pending
                        </a>
                    )}
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {cards.map((card) => (
                    <a
                        key={card.label}
                        href={card.href}
                        className={`${card.color} border rounded-xl p-5 hover:shadow-md transition-all group`}
                    >
                        <div className="text-2xl mb-3">{card.icon}</div>
                        <div className={`text-3xl font-black ${card.textColor} mb-1`}>
                            {stats ? card.value : "—"}
                        </div>
                        <div className="text-xs font-semibold text-gray-500 group-hover:text-gray-700 transition-colors">
                            {card.label}
                        </div>
                    </a>
                ))}
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-[#1a1a5e] mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                        { label: "Upload Photo", href: "/admin/gallery", icon: "📸" },
                        { label: "Add Circular", href: "/admin/circulars", icon: "📄" },
                        { label: "Add Order", href: "/admin/orders", icon: "📋" },
                        { label: "View Enquiries", href: "/admin/enquiries", icon: "✉️" },
                        { label: "Review Members", href: "/admin/membership", icon: "👥" },
                    ].map((action) => (
                        <a
                            key={action.label}
                            href={action.href}
                            className="flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-[#242171] hover:text-white rounded-lg text-sm font-semibold text-gray-700 transition-all group"
                        >
                            <span>{action.icon}</span>
                            {action.label}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
