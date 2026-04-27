"use client";

import { useEffect, useState } from "react";
import CarCard from "../../components/CarCard";
import { getCars } from "../../services/api";

export default function CarsPage() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFleet = async () => {
            try {
                setLoading(true);
                const data = await getCars();

                // Format the API data precisely structure expected by CarCard
                const formattedCars = data.map(car => ({
                    ...car,
                    price: `$${car.price_per_day}`, // Map the backend schema onto the frontend schema
                    acceleration: "3.2s" // Fallback data since the Admin Deploy Form doesn't ask for it
                }));

                setCars(formattedCars);
            } catch (err) {
                console.error("Failed to fetch vehicles from Data_Lake.", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFleet();
    }, []);

    return (
        <main className="min-h-[100dvh] bg-[#0A100E] text-white pt-32 md:pt-40 px-6 md:px-12 lg:px-24 pb-20 font-sans overflow-x-hidden">

            {/* Header Section */}
            <div className="flex flex-col items-center text-center mb-16 md:mb-20 relative">
                {/* Subtle Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-[#CFFF1A]/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

                <h3 className="text-[#CFFF1A] text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-4 relative z-10">Our Vehicles</h3>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter drop-shadow-2xl relative z-10 text-center flex flex-col sm:block">
                    The <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/10">Fleet</span>
                </h1>
                <p className="text-gray-400 mt-4 md:mt-6 max-w-xl text-xs md:text-sm leading-relaxed relative z-10 px-4">
                    Choose from our exclusive selection of 100% electric and hybrid vehicles. Uncompromised performance, zero emissions.
                </p>
            </div>

            {/* Content Loading & Display Architecture */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CFFF1A] animate-ping mb-6 shadow-[0_0_15px_rgba(207,255,26,1)]"></span>
                    <span className="text-[#CFFF1A]/70 text-[9px] uppercase tracking-[0.4em] font-bold">
                        Syncing Voltigo Vault...
                    </span>
                </div>
            ) : cars.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 border border-white/5 border-dashed rounded-3xl bg-white/[0.01]">
                    <span className="text-gray-600 text-[10px] uppercase tracking-[0.3em] font-bold">
                        No vehicles currently configured for public deployment.
                    </span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
                    {cars.map((car) => (
                        <CarCard key={car.id} car={car} />
                    ))}
                </div>
            )}

        </main>
    );
}
