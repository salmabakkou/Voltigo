"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative bg-[#040705] border-t border-white/10 text-white font-sans overflow-hidden z-20">
            {/* Top ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#7CFF3C]/50 to-transparent" />
            
            <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand column */}
                    <div className="md:col-span-2 space-y-4">
                        <Link href="/" className="inline-block">
                            <span className="text-3xl font-serif italic text-white tracking-widest hover:text-[#7CFF3C] transition-colors">
                                Voltigo
                            </span>
                        </Link>
                        <p className="text-gray-400 text-xs sm:text-sm font-light max-w-sm leading-relaxed">
                            Morocco&#39;s premier luxury 100% electric vehicle rental ecosystem. Uncompromising high-voltage performance meets sustainable freedom.
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7CFF3C]/10 border border-[#7CFF3C]/30 text-[10px] font-mono text-[#7CFF3C] uppercase tracking-wider">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#7CFF3C] animate-pulse" />
                                100% Zero-Emission Fleet
                            </span>
                        </div>
                    </div>

                    {/* Quick navigation */}
                    <div>
                        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#7CFF3C] font-bold mb-4">
                            Navigation
                        </div>
                        <ul className="space-y-2.5 text-xs text-gray-400">
                            <li>
                                <Link href="/cars" className="hover:text-white transition-colors flex items-center gap-1 group">
                                    Electric Fleet <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-white transition-colors flex items-center gap-1 group">
                                    About Voltigo <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/login" className="hover:text-white transition-colors flex items-center gap-1 group">
                                    VIP Member Portal <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Hub Locations */}
                    <div>
                        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#7CFF3C] font-bold mb-4">
                            Morocco Hubs
                        </div>
                        <ul className="space-y-2 text-xs text-gray-400">
                            <li>Casablanca Finance City (CFC)</li>
                            <li>Marrakech Hivernage Hub</li>
                            <li>Tangier Marina Bay</li>
                            <li>Rabat Agdal Prestige</li>
                            <li>Agadir Bay & Beachfront</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom line */}
                <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-gray-500">
                    <div>
                        © {new Date().getFullYear()} VOLTIGO TECHNOLOGIES INC. ALL RIGHTS RESERVED.
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="hover:text-gray-400 transition-colors cursor-pointer">PRIVACY PROTOCOL</span>
                        <span className="hover:text-gray-400 transition-colors cursor-pointer">TERMS OF SERVICE</span>
                        <span className="hover:text-gray-400 transition-colors cursor-pointer">SECURITY & COMPLIANCE</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
