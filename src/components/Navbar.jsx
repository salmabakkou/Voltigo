"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { User } from "lucide-react";

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

    const isLoginActive = currentPath === "/login";

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

                    {/* Login / Profile Icon */}
                    <Link
                        href="/login"
                        title="Sign In / Account"
                        className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 group ${isLoginActive
                            ? "border-[#CFFF1A] bg-[#CFFF1A]/20 shadow-[0_0_15px_rgba(207,255,26,0.3)]"
                            : "border-white/10 bg-white/5 hover:border-[#CFFF1A]/50 hover:bg-[#CFFF1A]/10"
                        }`}
                    >
                        <User className={`w-4 h-4 transition-colors ${isLoginActive ? "text-[#CFFF1A]" : "text-gray-300 group-hover:text-[#CFFF1A]"}`} />
                    </Link>
                </div>

                {/* Modern Mobile Menu Toggle (Hamburger to X) */}
                <div className="flex items-center gap-4 md:hidden">
                    <Link
                        href="/login"
                        className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center"
                    >
                        <User className="w-4 h-4 text-[#CFFF1A]" />
                    </Link>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex flex-col items-end gap-1.5 p-2 focus:outline-none"
                    >
                        <span className={`h-[2px] bg-white transition-all duration-300 ease-in-out ${isOpen ? 'w-6 rotate-45 translate-y-[8px]' : 'w-8'}`}></span>
                        <span className={`h-[2px] bg-white transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0 w-6' : 'w-6'}`}></span>
                        <span className={`h-[2px] bg-white transition-all duration-300 ease-in-out ${isOpen ? 'w-6 -rotate-45 -translate-y-[8px]' : 'w-4'}`}></span>
                    </button>
                </div>
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
                    );
                })}

                <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 text-lg uppercase font-bold text-[#CFFF1A] tracking-widest border border-[#CFFF1A]/30 bg-[#CFFF1A]/10 px-6 py-2.5 rounded-full"
                >
                    <User className="w-5 h-5 text-[#CFFF1A]" /> Sign In
                </Link>
            </div>
        </nav>
    );
}
