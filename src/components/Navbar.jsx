"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Safeguard: make sure we handle null pathnames just in case (hydration sync)
    const currentPath = pathname || "/";

    if (currentPath.startsWith("/admin")) return null;

    const navLinks = [
        { name: "CARS", path: "/cars" },
        { name: "ABOUT", path: "/about" },
    ];

    return (
        <nav className="absolute top-0 left-0 right-0 z-50 px-6 md:px-16 py-6 md:py-10 bg-transparent w-full">
            <div className="flex items-center justify-between relative z-50">
                {/* Logo - Returning to Home */}
                <Link href="/">
                    <span className="text-2xl md:text-[1.7rem] font-serif italic text-white tracking-widest ml-1 mix-blend-difference cursor-pointer hover:text-[#CFFF1A] transition-colors">
                        Voltigo
                    </span>
                </Link>

                {/* Right Navigation - Desktop */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => {
                        const isActive = currentPath.startsWith(link.path);
                        return (
                            <Link
                                key={link.name}
                                href={link.path}
                                className={`text-[10px] uppercase font-bold tracking-[0.2em] transition-colors pb-1 border-b-[3px] relative ${isActive
                                    ? "border-[#CFFF1A] text-white"
                                    : "border-transparent text-gray-400 hover:text-white"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Modern Mobile Menu Toggle (Hamburger to X) */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden flex flex-col items-end gap-1.5 p-2 focus:outline-none"
                >
                    <span className={`h-[2px] bg-white transition-all duration-300 ease-in-out ${isOpen ? 'w-6 rotate-45 translate-y-[8px]' : 'w-8'}`}></span>
                    <span className={`h-[2px] bg-white transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0 w-6' : 'w-6'}`}></span>
                    <span className={`h-[2px] bg-white transition-all duration-300 ease-in-out ${isOpen ? 'w-6 -rotate-45 -translate-y-[8px]' : 'w-4'}`}></span>
                </button>
            </div>

            {/* Mobile Navigation Drawer */}
            <div className={`fixed inset-0 bg-[#0A100E]/95 backdrop-blur-md z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {navLinks.map((link) => {
                    const isActive = currentPath.startsWith(link.path);
                    return (
                        <Link
                            key={link.name}
                            href={link.path}
                            onClick={() => setIsOpen(false)}
                            className={`text-2xl uppercase font-black tracking-widest transition-colors ${isActive ? "text-[#CFFF1A]" : "text-white hover:text-[#CFFF1A]"
                                }`}
                        >
                            {link.name}
                        </Link>
                    )
                })}
            </div>
        </nav>
    );
}
