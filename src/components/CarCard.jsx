import Link from "next/link";

export default function CarCard({ car }) {
    // Secured fallback properties mapping
    const {
        id = "1",
        name = "Voltigo Concept",
        type = "Electric",
        range = "500 km",
        acceleration = "3.0s",
        price = "$100",
        image = "/hero.png"
    } = car || {};

    return (
        <div className="group relative w-full h-[420px] bg-[#0c120f] border border-white/5 rounded-2xl overflow-hidden cursor-pointer transition-colors duration-700 hover:bg-[#111915]">

            {/* Subtle background radial glow appearing on hover */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#CFFF1A]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-0"></div>

            {/* ----- HEADER INFO (Always Visible) ----- */}
            {/* Shifts slightly upward on hover to give a dynamic feel */}
            <div className="absolute top-8 left-8 right-8 z-20 flex justify-between items-start transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-2">
                <div>
                    <h4 className="text-[10px] text-[#CFFF1A] uppercase tracking-[0.3em] font-bold mb-2 drop-shadow-md">
                        {type}
                    </h4>
                    <h2 className="text-2xl md:text-3xl font-black tracking-widest uppercase text-white/50 group-hover:text-white transition-colors duration-500 drop-shadow-lg">
                        {name}
                    </h2>
                </div>
            </div>

            {/* ----- CAR IMAGE ----- */}
            {/* Rests neutrally, then leaps upward & scales gracefully on hover */}
            <div className="absolute inset-0 pt-28 pb-12 px-6 flex items-center justify-center transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-16 group-hover:scale-[1.15] z-10 pointer-events-none">
                <img
                    src={image}
                    alt={name}
                    /* Image always displays native base colors as requested by user */
                    className="w-full h-full object-contain filter group-hover:brightness-110 transition-all duration-[800ms] drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
                />
            </div>

            {/* ----- DETAILS PANEL (Hidden by default, Revealed on Hover) ----- */}
            {/* Slides up from the bottom boundary while fading in */}
            <div className="absolute bottom-0 left-0 right-0 z-30 p-8 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] bg-gradient-to-t from-[#050807] via-[#050807]/90 to-transparent pt-24">

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6 border-t border-white/10 pt-6">
                    <div className="flex flex-col">
                        <span className="text-[9px] text-gray-500 uppercase tracking-[0.2em] mb-1">Range</span>
                        <span className="text-sm font-bold text-white tracking-widest drop-shadow-md">{range}</span>
                    </div>
                    <div className="flex flex-col pl-6 border-l border-white/10">
                        <span className="text-[9px] text-gray-500 uppercase tracking-[0.2em] mb-1">0-100 km/h</span>
                        <span className="text-sm font-bold text-white tracking-widest drop-shadow-md">{acceleration}</span>
                    </div>
                </div>

                {/* Pricing & Call to Action */}
                <div className="flex items-end justify-between mt-2">
                    <div className="flex flex-col">
                        <span className="text-[9px] text-gray-500 uppercase tracking-[0.2em] mb-1">Starting at</span>
                        <span className="text-2xl font-black text-[#CFFF1A] drop-shadow-md">
                            {price} <span className="text-[9px] text-gray-500 font-normal uppercase tracking-widest">/ day</span>
                        </span>
                    </div>
                    <Link
                        href={`/cars/${id}`}
                        className="bg-white/5 backdrop-blur-md border border-white/20 text-white px-6 py-3.5 text-[10px] uppercase tracking-[0.2em] font-bold rounded-sm hover:bg-[#CFFF1A] hover:text-black hover:border-[#CFFF1A] hover:shadow-[0_0_20px_rgba(207,255,26,0.3)] transition-all duration-500"
                    >
                        Explore
                    </Link>
                </div>
            </div>

        </div>
    );
}
