"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();

    const navItems = [
        { name: 'HOME', path: '/' },
        { name: 'ABOUT US', path: '/about-us' },
        { name: 'PHOTO GALLERY', path: '/photo-gallery' },
        { name: 'CIRCULARS', path: '/circulars' },
        { name: 'ORDERS', path: '/orders' },
        { name: 'ENQUIRY', path: '/enquiry' },
        { name: 'MEMBERSHIP', path: '/membership' },
        { name: 'CONTACT US', path: '/contact-us' },
    ];

    return (
        <>
            <header className="py-4 px-4 bg-white border-b">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex items-center justify-center">
                            <img src="/images/Logo.jpg" alt="HRAOI Logo" className="w-full h-full object-contain" />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-2xl md:text-3xl font-bold text-primary-dark leading-tight">भारतीय मानवाधिकार एसोसिएशन</h1>
                            <div className="inline-block bg-secondary text-white px-4 py-1 mt-1 font-bold tracking-wider uppercase">
                                HUMAN RIGHTS ASSOCIATION OF INDIA
                            </div>
                            <p className="text-xs text-gray-600 mt-1 font-semibold">www.hraoi.in , email: www.hraoi.in@gmail.com</p>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-[10px] text-gray-400">Award 1</div>
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-[10px] text-gray-400">Award 2</div>
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-[10px] text-gray-400">Award 3</div>
                        <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">Official Image</div>
                    </div>
                </div>
            </header>

            <nav className="bg-primary text-white sticky top-0 z-50">
                <div className="container mx-auto">
                    <ul className="flex flex-wrap justify-center md:justify-start gap-px">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    href={item.path}
                                    className={`block px-4 py-3 text-xs font-semibold hover:bg-primary-dark transition-colors ${pathname === item.path ? 'bg-primary-dark border-b-2 border-secondary' : ''}`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </>
    );
}
