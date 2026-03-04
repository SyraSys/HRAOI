"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Header() {
    const pathname = usePathname();
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <header className="py-2 sm:py-4 px-4 bg-white">
                <div className="container mx-auto flex justify-center">
                    <img src="/images/header.jpeg" alt="HRAOI Header" className="max-w-full h-auto" />
                </div>
            </header>

            {/* Desktop Navigation (hidden on mobile) */}
            <div className="hidden lg:flex sticky top-0 z-50 justify-center px-4 py-3 bg-white/80 backdrop-blur-md">
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

            {/* Mobile Navigation */}
            <div className="lg:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <Link href="/" className="text-lg font-bold text-primary-dark">HRAOI</Link>
                    
                    {/* Hamburger Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <span className={`w-6 h-0.5 bg-primary-dark transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-primary-dark transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-primary-dark transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden bg-white border-t border-gray-100"
                        >
                            <nav className="container mx-auto px-4 py-2">
                                <ul className="space-y-1">
                                    {navItems.map((item) => {
                                        const isActive = pathname === item.path;
                                        return (
                                            <li key={item.path}>
                                                <Link
                                                    href={item.path}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className={`block px-4 py-3 rounded-lg font-semibold text-sm transition-colors ${
                                                        isActive 
                                                            ? 'bg-primary text-white' 
                                                            : 'text-gray-700 hover:bg-gray-100'
                                                    }`}
                                                >
                                                    {item.name}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
