import Link from "next/link";
import { Zap, Gauge, ArrowUpRight } from "lucide-react";

export default function CarCard({ car }) {
    // Secured fallback properties mapping
    const {
        id = "1",
        name = "Voltigo Concept",
        type = "Electric",
        range = "500 km",
        acceleration = "3.0s",
        price = "$100",
        price_per_day,
        image = "/hero.png"
    } = car || {};

    const displayPrice = price_per_day ? `$${price_per_day}` : (price.startsWith("$") ? price : `$${price}`);

    return (
        <Link
            href={`/cars/${id}`}
            className="group relative w-full h-[460px] bg-[#070D0A] border border-[#182B20] hover:border-[#CFFF1A]/50 rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 shadow-[0_10px_35px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_40px_rgba(207,255,26,0.18)] flex flex-col justify-between block select-none"
        >

            {/* ═══ FUTURISTIC BACKGROUND SCENERY ═══ */}
            
            {/* 1. Cyber Grid overlay */}
            <div 
                className="absolute inset-0 opacity-[0.12] group-hover:opacity-[0.22] transition-opacity duration-700 pointer-events-none z-0"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(207, 255, 26, 0.15) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(207, 255, 26, 0.15) 1px, transparent 1px)
                    `,
                    backgroundSize: "28px 28px"
                }}
            />

            {/* 2. Concentric Holographic Speed Podiums */}
            <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full bg-gradient-to-b from-[#CFFF1A]/10 via-[#7CFF3C]/5 to-transparent blur-[60px] group-hover:scale-125 group-hover:from-[#CFFF1A]/20 transition-all duration-700 pointer-events-none z-0" />
            
            {/* 3. High-tech Light Horizon / Ground Beam */}
            <div className="absolute top-[62%] left-[-20%] right-[-20%] h-[1px] bg-gradient-to-r from-transparent via-[#CFFF1A]/40 to-transparent shadow-[0_0_20px_#CFFF1A] pointer-events-none z-0 group-hover:via-[#CFFF1A]/80 transition-all duration-700" />
            
            {/* 4. Elliptical Neon Platform under the vehicle */}
            <div className="absolute top-[58%] left-1/2 -translate-x-1/2 w-[260px] h-[55px] rounded-[100%] border border-[#CFFF1A]/25 bg-gradient-to-b from-[#CFFF1A]/10 to-transparent blur-[1px] shadow-[0_0_25px_rgba(207,255,26,0.2)] group-hover:border-[#CFFF1A]/60 group-hover:shadow-[0_0_35px_rgba(207,255,26,0.35)] transition-all duration-700 pointer-events-none z-0" />

            {/* 5. Cyber Corner Tech Accents */}
            <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-[#CFFF1A]/30 group-hover:border-[#CFFF1A] transition-colors duration-500 pointer-events-none z-10" />
            <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-[#CFFF1A]/30 group-hover:border-[#CFFF1A] transition-colors duration-500 pointer-events-none z-10" />

            {/* ═══ TOP HEADER INFO ═══ */}
            <div className="relative z-20 p-6 flex justify-between items-start pointer-events-none">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CFFF1A]/10 border border-[#CFFF1A]/30 mb-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#CFFF1A] animate-pulse" />
                        <span className="text-[10px] text-[#CFFF1A] uppercase tracking-[0.25em] font-bold">
                            {type}
                        </span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-black tracking-wider uppercase text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#CFFF1A] transition-all duration-500">
                        {name}
                    </h2>
                </div>

                <div className="text-right">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-medium">Daily</span>
                    <span className="text-xl font-black text-[#CFFF1A] drop-shadow-[0_0_10px_rgba(207,255,26,0.3)]">
                        {displayPrice}
                    </span>
                </div>
            </div>

            {/* ═══ CAR IMAGE CENTERSTAGE ═══ */}
            <div className="relative z-10 flex-1 px-4 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.12] group-hover:-translate-y-2 pointer-events-none">
                <img
                    src={image}
                    alt={name}
                    className="max-h-[190px] w-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] group-hover:drop-shadow-[0_20px_40px_rgba(207,255,26,0.25)] transition-all duration-700"
                />
            </div>

            {/* ═══ BOTTOM FUTURISTIC DOCK ═══ */}
            <div className="relative z-20 p-5 bg-gradient-to-t from-[#050907] via-[#050907]/90 to-transparent border-t border-white/5 pointer-events-none">
                
                {/* Stats row */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2.5 bg-white/[0.03] border border-white/5 group-hover:border-[#CFFF1A]/20 px-3 py-2 rounded-xl transition-colors">
                        <Zap className="w-4 h-4 text-[#CFFF1A]/80 shrink-0" />
                        <div className="flex flex-col">
                            <span className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold">Range</span>
                            <span className="text-xs font-bold text-white tracking-wide">{range}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5 bg-white/[0.03] border border-white/5 group-hover:border-[#CFFF1A]/20 px-3 py-2 rounded-xl transition-colors">
                        <Gauge className="w-4 h-4 text-[#CFFF1A]/80 shrink-0" />
                        <div className="flex flex-col">
                            <span className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold">0-100 km/h</span>
                            <span className="text-xs font-bold text-white tracking-wide">{acceleration}</span>
                        </div>
                    </div>
                </div>

                {/* Inspect Vehicle Button Simulation */}
                <div className="w-full py-3 bg-[#0c1611] group-hover:bg-[#CFFF1A] border border-[#CFFF1A]/30 group-hover:border-[#CFFF1A] text-white group-hover:text-black font-black text-xs uppercase tracking-[0.25em] rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.6)] group-hover:shadow-[0_0_25px_rgba(207,255,26,0.4)]">
                    <span>Inspect Vehicle</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>

            </div>

        </Link>
    );
}
