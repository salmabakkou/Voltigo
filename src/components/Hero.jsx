"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden font-sans bg-[#0A100E]">

            {/* SINGLE Background Image (hero.png) containing the car and landscape */}
            {/* Gently zooms out on load to add premium feel */}
            <div className={`absolute inset-0 z-0 transition-transform duration-[3000ms] ease-out ${mounted ? 'scale-100' : 'scale-105'}`}>
                <img
                    src="/hero.png"
                    alt="Voltigo Hero Background"
                    className="w-full h-full object-cover object-center"
                />
                {/* Modern moody gradient applied over the image, deepening the left side for crisp text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A100E] via-[#0A100E]/60 to-transparent opacity-90"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A100E] via-transparent to-[#0A100E]/50 opacity-90"></div>
            </div>

            {/* Hero Content Container */}
            <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 md:px-16 lg:px-24">

                {/* Left Aligned Content Block - Staggered entrance animations */}
                <div className="flex flex-col items-start select-none w-full lg:w-2/3 mt-20 md:mt-0 relative">

                    <div className="relative z-10 w-full">
                        <h2 className={`flex items-center text-[#CFFF1A] text-[10px] md:text-sm font-semibold tracking-[0.3em] uppercase mb-2 md:mb-4 opacity-0 transform transition-all duration-1000 delay-[200ms] ${mounted ? 'opacity-100 translate-y-0' : 'translate-y-8'}`}>
                            <span className="w-4 md:w-8 h-[1px] bg-[#CFFF1A] mr-2 md:mr-4"></span>
                            Voltigo <span className="text-white/40 ml-2 md:ml-2">&mdash; Next Gen</span>
                        </h2>

                        {/* Main Huge Typography - Perfectly Responsive */}
                        <div className={`opacity-0 transform transition-all duration-1000 delay-[400ms] ${mounted ? 'opacity-100 translate-y-0' : 'translate-y-8'}`}>
                            <h1 className="text-[17vw] md:text-[8rem] lg:text-[10rem] xl:text-[11.5rem] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/5 uppercase leading-[0.85] tracking-tighter drop-shadow-2xl">
                                ECOSPORT
                            </h1>
                            <h3 className="text-xl md:text-4xl lg:text-5xl font-light text-[#677A71] uppercase tracking-[0.2em] md:tracking-[0.4em] pl-1 md:pl-2 mt-2">
                                PERFORMANCE
                            </h3>
                        </div>

                        {/* Structured modern paragraph */}
                        <p className={`text-gray-400 text-xs md:text-sm lg:text-base font-light max-w-[90%] md:max-w-md leading-relaxed mt-6 md:mt-10 pl-4 md:pl-6 border-l-[2px] border-[#CFFF1A]/30 opacity-0 transform transition-all duration-1000 delay-[600ms] ${mounted ? 'opacity-100 translate-y-0' : 'translate-y-8'}`}>
                            Reimagine your journeys with our 100% electric luxury fleet. Experience thrilling dynamics wrapped in a sustainable, zero-emission architecture.
                        </p>

                        {/* Modern Buttons - Responsive stacking */}
                        <div className={`pointer-events-auto mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 pl-1 opacity-0 transform transition-all duration-1000 delay-[800ms] ${mounted ? 'opacity-100 translate-y-0' : 'translate-y-8'}`}>

                            <Link href="/cars" className="relative group overflow-hidden bg-[#CFFF1A] text-black px-6 md:px-10 py-3 md:py-4 font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase rounded-sm shadow-[0_0_20px_rgba(207,255,26,0.15)] hover:shadow-[0_0_40px_rgba(207,255,26,0.4)] transition-all duration-500 min-w-max text-center">
                                <span className="relative z-10 block transition-transform duration-300 group-hover:scale-105">Book Now</span>
                                <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/60 to-transparent group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out skew-x-[-20deg]"></div>
                            </Link>

                            <Link href="/about" className="relative overflow-hidden border border-white/20 bg-white/5 backdrop-blur-md text-white px-6 md:px-10 py-3 md:py-4 font-medium text-[10px] md:text-xs tracking-[0.2em] uppercase rounded-sm hover:bg-white/10 hover:border-white/40 hover:text-[#CFFF1A] transition-all duration-500 min-w-max text-center">
                                Explore Fleet
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modern architectural watermark */}
            <div className={`absolute -right-24 bottom-32 origin-bottom-right -rotate-90 z-0 hidden lg:block transition-all duration-1000 delay-1000 pointer-events-none ${mounted ? 'opacity-20 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                <p className="text-white text-[12rem] font-bold tracking-tighter mix-blend-overlay leading-none">2026</p>
            </div>

            {/* Smooth transition to next sections */}
            <div className="absolute bottom-0 left-0 w-full h-32 md:h-40 bg-gradient-to-t from-[#0A100E] via-[#0A100E]/80 to-transparent z-30 pointer-events-none"></div>
        </div>
    );
}
