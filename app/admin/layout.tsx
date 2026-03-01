"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/gallery", label: "Photo Gallery", icon: "🖼️" },
    { href: "/admin/announcements", label: "Announcements", icon: "📢" },
    { href: "/admin/circulars", label: "Circulars", icon: "📄" },
    { href: "/admin/orders", label: "Orders", icon: "📋" },
    { href: "/admin/certificates", label: "Certificates", icon: "🎓" },
    { href: "/admin/enquiries", label: "Enquiries", icon: "✉️" },
    { href: "/admin/membership", label: "Membership", icon: "👥" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-[#1a1a5e] text-white flex flex-col fixed h-full z-10">
                {/* Logo */}
                <div className="px-6 py-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                            <span className="text-[#1a1a5e] font-black text-sm">HR</span>
                        </div>
                        <div>
                            <p className="font-black text-sm leading-tight">HRAOI Admin</p>
                            <p className="text-blue-300 text-xs">Control Panel</p>
                        </div>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive =
                            item.href === "/admin"
                                ? pathname === "/admin"
                                : pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive
                                    ? "bg-white text-[#1a1a5e] shadow-md"
                                    : "text-blue-100 hover:bg-white/10"
                                    }`}
                            >
                                <span className="text-base">{item.icon}</span>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="px-3 py-4 border-t border-white/10">
                    <button
                        onClick={() => signOut({ callbackUrl: "/admin/login" })}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-300 hover:bg-red-500/20 transition-all"
                    >
                        <span>🚪</span>
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64">
                {/* Top Bar */}
                <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
                    <div className="flex items-center justify-between">
                        <h1 className="text-[#1a1a5e] font-bold text-lg">
                            {navItems.find((n) =>
                                n.href === "/admin" ? pathname === "/admin" : pathname.startsWith(n.href)
                            )?.label ?? "Admin Panel"}
                        </h1>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
                            Logged in as Admin
                        </div>
                    </div>
                </header>

                <div className="p-8">{children}</div>
            </main>
        </div>
    );
}
