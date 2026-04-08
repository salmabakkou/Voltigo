"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    const navLinks = [
        { name: "CARS", path: "/cars" },
        { name: "ABOUT", path: "/about" },
    ];

    return (
        <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-10 bg-transparent w-full">
            {/* Logo - Returning to Home */}
            <Link href="/">
                <span className="text-[1.7rem] font-serif italic text-white tracking-widest ml-2 mix-blend-difference cursor-pointer hover:text-[#CFFF1A] transition-colors">
                    Voltigo
                </span>
            </Link>

            {/* Right Navigation */}
            <div className="flex items-center gap-12">
                <div className="flex gap-10">
                    {navLinks.map((link) => {
                        // Check if current path starts with link.path (so /cars/1 will still highlight CARS)
                        const isActive = pathname.startsWith(link.path);

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
            </div>
        </nav>
    );
}
