import CarCard from "../../components/CarCard";

export default function CarsPage() {
    // Mock data for the fleet
    const cars = [
        { id: 1, name: "Voltigo Aero GT", type: "Electric Sports", range: "650 km", acceleration: "2.1s", price: "$200", image: "/hero.png" },
        { id: 2, name: "Eco SUV Prime", type: "Hybrid Family", range: "800 km", acceleration: "4.5s", price: "$120", image: "/hero.png" },
        { id: 3, name: "City Whisper", type: "Compact Electric", range: "350 km", acceleration: "6.0s", price: "$75", image: "/hero.png" },
        { id: 4, name: "Ecosport Performante", type: "Hypercar", range: "500 km", acceleration: "1.9s", price: "$450", image: "/hero.png" },
        { id: 5, name: "Luxe Sedan E", type: "Executive", range: "600 km", acceleration: "3.2s", price: "$180", image: "/hero.png" },
        { id: 6, name: "Off-Road Explorer", type: "Electric 4x4", range: "550 km", acceleration: "4.8s", price: "$150", image: "/hero.png" },
    ];

    return (
        <main className="min-h-screen bg-[#0A100E] text-white pt-32 md:pt-40 px-6 md:px-12 lg:px-24 pb-20 font-sans overflow-x-hidden">

            {/* Header Section */}
            <div className="flex flex-col items-center text-center mb-16 md:mb-20 relative">
                {/* Subtle Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-[#CFFF1A]/5 rounded-full blur-[100px] pointer-events-none"></div>

                <h3 className="text-[#CFFF1A] text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-4 relative z-10">Our Vehicles</h3>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter drop-shadow-2xl relative z-10 text-center flex flex-col sm:block">
                    The <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/10">Fleet</span>
                </h1>
                <p className="text-gray-400 mt-4 md:mt-6 max-w-xl text-xs md:text-sm leading-relaxed relative z-10 px-4">
                    Choose from our exclusive selection of 100% electric and hybrid vehicles. Uncompromised performance, zero emissions.
                </p>
            </div>

            {/* Grid of Cars - Responsive container */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
                {cars.map((car) => (
                    <CarCard key={car.id} car={car} />
                ))}
            </div>

        </main>
    );
}
