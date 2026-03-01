"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Header() {
    const pathname = usePathname();
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);

    const navItems = [
        { name: 'HOME', path: '/' },
        { name: 'ABOUT US', path: '/about-us' },
        { name: 'PHOTO GALLERY', path: '/photo-gallery' },
        { name: 'CIRCULARS', path: '/circulars' },
        { name: 'ORDERS', path: '/orders' },
        { name: 'ENQUIRY', path: '/enquiry' },
        { name: 'MEMBERSHIP', path: '/membership' },
        // { name: 'SEARCH', path: '/search' },
        { name: 'CONTACT US', path: '/contact-us' },
    ];

    return (
        <>
            <header className="py-4 px-4 bg-white ">
                {/* <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-30">
                    <div className="flex items-center gap-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                            className="w-20 h-20 rounded-lg overflow-hidden flex items-center justify-center shadow-sm"
                        >
                            <img src="/images/Logo.jpg" alt="HRAOI Logo" className="w-full h-full object-contain" />
                        </motion.div>
                        <div className="text-center md:text-left">
                            <motion.h1
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-2xl md:text-3xl font-bold text-primary-dark leading-tight"
                            >
                                भारतीय मानवाधिकार एसोसिएशन
                            </motion.h1>
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="inline-block bg-secondary text-white px-4 py-1 mt-1 font-bold tracking-wider uppercase"
                            >
                                HUMAN RIGHTS ASSOCIATION OF INDIA
                            </motion.div>
                            <p className="text-xs text-gray-600 mt-1 font-semibold">www.hraoi.in , email: www.hraoi.in@gmail.com</p>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center gap-4">
                        <div className="w-30 h-30 overflow-hidden flex items-center justify-center bg-white">
                            <img src="/icons/niti-ayog.png" alt="Niti Aayog" className="w-full h-full object-contain p-1" />
                        </div>
                        <div className="w-24 h-24  overflow-hidden flex items-center justify-center">
                            <img src="/images/headerbg.png" alt="Official" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div> */}
                <div className="container mx-auto flex justify-center">
                    <img src="/images/header.jpeg" alt="HRAOI Header" className="max-w-full h-auto" />
                </div>
            </header>

            <div className="sticky top-0 z-50 flex justify-center px-4 py-3 bg-white/80 backdrop-blur-md">
                <nav className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.12),0_1px_6px_rgba(0,0,0,0.06)] px-3 py-2 max-w-fit">
                    <ul className="flex flex-wrap items-center justify-center gap-1.5 relative">
                        {navItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <li key={item.path} className="relative">
                                    <Link
                                        href={item.path}
                                        onMouseEnter={() => setHoveredPath(item.path)}
                                        onMouseLeave={() => setHoveredPath(null)}
                                        className={`relative block px-6 py-2.5 text-sm font-semibold z-10 rounded-full transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-600 hover:text-primary-dark'}`}
                                    >
                                        {item.name}

                                        {/* Hover Indicator */}
                                        {hoveredPath === item.path && !isActive && (
                                            <motion.div
                                                layoutId="navHover"
                                                className="absolute inset-0 bg-gray-100 rounded-full -z-10"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                            />
                                        )}

                                        {/* Active Pill */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="navActive"
                                                className="absolute inset-0 bg-primary rounded-full -z-10"
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </>
    );
}
