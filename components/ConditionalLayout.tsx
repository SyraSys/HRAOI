"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith("/admin");

    if (isAdminPage) {
        return <main>{children}</main>;
    }

    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}
