"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
    ArrowRight,
    Leaf,
    Zap,
    Shield,
    Globe,
    Car,
    Battery,
    Sparkles,
    Activity,
    Compass,
    Cpu,
    Radio,
    Flame,
    Gauge,
    ChevronRight,
    TrendingUp,
    Award,
    Star,
    Layers,
    Smartphone,
    Navigation,
    KeyRound
} from "lucide-react";
import Hero from "../components/Hero";
import CarCard from "../components/CarCard";
import Footer from "../components/Footer";
import { getCars, getReservations } from "../services/api";

export default function Home() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [cars, setCars] = useState([]);
    const [loadingCars, setLoadingCars] = useState(true);
    const [fleetFilter, setFleetFilter] = useState("all");
    const [activeTechTab, setActiveTechTab] = useState(0);
    const [simulatorKm, setSimulatorKm] = useState(380);
    const [selectedPowertrain, setSelectedPowertrain] = useState("hypercar");

    // Track mouse coordinates for subtle ambient glow
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Fetch live fleet or fallback
    useEffect(() => {
        const fetchFleet = async () => {
            try {
                setLoadingCars(true);
                const [data, reservations] = await Promise.all([
                    getCars().catch(() => []),
                    getReservations().catch(() => [])
                ]);

                if (Array.isArray(data) && data.length > 0) {
                    const now = new Date();
                    const activeReservations = (reservations || []).filter(r => {
                        if (!r.returnDate) return true;
                        return new Date(r.returnDate) >= now;
                    });
                    const activeReservedIds = activeReservations.map(r => String(r.carId));

                    const formatted = data.map(c => {
                        const isReserved = activeReservedIds.includes(String(c.id));
                        return {
                            ...c,
                            isAvailable: !isReserved && c.status !== "unavailable" && c.status !== "booked",
                            price: `$${c.price_per_day || 250}`,
                            acceleration: c.acceleration || "2.8s",
                            range: c.range || "520 km"
                        };
                    });
                    setCars(formatted);
                } else {
                    // Futuristic fallback fleet
                    setCars([
                        {
                            id: "1",
                            name: "Porsche Taycan Turbo S",
                            type: "Electric",
                            price: "$390",
                            range: "510 km",
                            acceleration: "2.6s",
                            image: "/abouthero.jpg",
                            category: "hypercar",
                            isAvailable: true
                        },
                        {
                            id: "2",
                            name: "Tesla Model S Plaid",
                            type: "Tri-Motor AWD",
                            price: "$340",
                            range: "600 km",
                            acceleration: "1.99s",
                            image: "/hero.png",
                            category: "hypercar",
                            isAvailable: true
                        },
                        {
                            id: "3",
                            name: "BMW i4 M50 Gran Coupé",
                            type: "Dual Motor EV",
                            price: "$270",
                            range: "520 km",
                            acceleration: "3.7s",
                            image: "/hero.png",
                            category: "sedan",
                            isAvailable: true
                        },
                        {
                            id: "4",
                            name: "Audi RS e-tron GT",
                            type: "Electric Quattro",
                            price: "$380",
                            range: "495 km",
                            acceleration: "3.1s",
                            image: "/abouthero.jpg",
                            category: "hypercar",
                            isAvailable: true
                        },
                        {
                            id: "5",
                            name: "BMW iX xDrive50",
                            type: "Luxury SUV EV",
                            price: "$310",
                            range: "630 km",
                            acceleration: "4.4s",
                            image: "/hero.png",
                            category: "suv",
                            isAvailable: true
                        },
                        {
                            id: "6",
                            name: "Polestar 2 BST Edition",
                            type: "Performance EV",
                            price: "$220",
                            range: "480 km",
                            acceleration: "4.2s",
                            image: "/abouthero.jpg",
                            category: "sedan",
                            isAvailable: true
                        }
                    ]);
                }
            } catch (err) {
                console.error("Failed to load Voltigo fleet", err);
            } finally {
                setLoadingCars(false);
            }
        };

        fetchFleet();
    }, []);

    // Filter fleet
    const filteredCars = cars.filter(c => {
        if (fleetFilter === "all") return true;
        if (fleetFilter === "hypercar") return c.category === "hypercar" || (c.name && (c.name.includes("Plaid") || c.name.includes("Taycan") || c.name.includes("RS")));
        if (fleetFilter === "suv") return c.category === "suv" || (c.name && (c.name.includes("iX") || c.name.includes("SUV")));
        if (fleetFilter === "sedan") return c.category === "sedan" || (c.name && (c.name.includes("i4") || c.name.includes("Model 3") || c.name.includes("Polestar")));
        return true;
    });

    // Powertrain multiplier for clean drive simulator
    const powertrainSpecs = {
        hypercar: {
            name: "Hyper EV (Taycan Turbo / Plaid)",
            co2PerKm: 0.198,
            kwhPerKm: 0.21,
            litersPerKm: 0.11,
            accel: "2.1s"
        },
        suv: {
            name: "Grand Tourisme (BMW iX / e-tron)",
            co2PerKm: 0.225,
            kwhPerKm: 0.24,
            litersPerKm: 0.13,
            accel: "3.7s"
        },
        urban: {
            name: "Executive (Polestar / Model 3)",
            co2PerKm: 0.165,
            kwhPerKm: 0.16,
            litersPerKm: 0.085,
            accel: "4.2s"
        }
    };

    const currentSpec = powertrainSpecs[selectedPowertrain];
    const co2Saved = (simulatorKm * currentSpec.co2PerKm).toFixed(1);
    const fuelSaved = (simulatorKm * currentSpec.litersPerKm).toFixed(1);
    const energyHarvested = (simulatorKm * currentSpec.kwhPerKm * 0.35).toFixed(1);
    const treesEquivalent = Math.max(1, Math.round(co2Saved / 22));

    // Futuristic Architecture Matrix Tabs
    const techPillars = [
        {
            id: "powertrain",
            title: "800V Voltage Architecture",
            tag: "ULTRA FAST CHARGE",
            desc: "Our vehicles feature cutting-edge 800V ultra-fast architecture. Gain 10% to 80% battery capacity in just 18 minutes across Morocco's Supercharging network.",
            stats: [
                { label: "System Voltage", val: "800 Volts" },
                { label: "Peak Charge Rate", val: "350 kW" },
                { label: "10-80% Charge", val: "18 mins" },
            ],
            icon: Zap
        },
        {
            id: "telemetry",
            title: "AI Cockpit Telemetry",
            tag: "SATELLITE SYNC",
            desc: "Continuous satellite connectivity streams real-time battery thermal conditioning, tire pressures, energy consumption analytics, and smart supercharger routing.",
            stats: [
                { label: "Radar Polling", val: "100 Hz" },
                { label: "Telemetry Latency", val: "< 12 ms" },
                { label: "4G/5G Coverage", val: "99.8%" },
            ],
            icon: Radio
        },
        {
            id: "regen",
            title: "Kinetic KERS Braking",
            tag: "ZERO WASTE MOTION",
            desc: "Next-generation regenerative braking recuperates up to 35% of kinetic deceleration energy directly back into the battery pack when traversing the Atlas mountain passes.",
            stats: [
                { label: "Max Regeneration", val: "290 kW" },
                { label: "Range Extension", val: "+28%" },
                { label: "Brake Pad Wear", val: "-80%" },
            ],
            icon: Battery
        },
        {
            id: "network",
            title: "Voltigo Solar Grid",
            tag: "NATIONWIDE GRID",
            desc: "Complimentary, unrestricted access to 350+ certified high-speed green charging hubs situated in Casablanca, Marrakech, Tangier, Rabat, Agadir, and Fes.",
            stats: [
                { label: "Partner Hubs", val: "350+" },
                { label: "Green Energy", val: "100% Solar" },
                { label: "Availability", val: "24/7/365" },
            ],
            icon: Globe
        }
    ];

    // Core Protocols
    const coreProtocols = [
        {
            code: "VOLT-01",
            icon: Leaf,
            title: "100% Zero Direct Emissions",
            subtitle: "Clean By Design",
            description: "Every single vehicle in our hangar is fully electric. Zero fossil fuel combusted, zero atmospheric pollutants, zero environmental guilt.",
            badge: "0.0g CO₂ / KM"
        },
        {
            code: "VOLT-02",
            icon: Cpu,
            title: "Instantaneous Torque Delivery",
            subtitle: "Permanent Magnet Motors",
            description: "Feel instantaneous acceleration that pushes you into your seat in absolute silence. Unmatched responsiveness engineered for driving purists.",
            badge: "0-100 < 3.0s"
        },
        {
            code: "VOLT-03",
            icon: Shield,
            title: "Comprehensive All-Risk Shield",
            subtitle: "Zero Hidden Deductibles",
            description: "Complete premium all-risk insurance coverage, 24/7 roadside mechanical rescue, and personal VIP concierge assistance included on every rental.",
            badge: "100% COVERED"
        },
        {
            code: "VOLT-04",
            icon: Activity,
            title: "60-Second Digital Departure",
            subtitle: "Contactless Smartphone Key",
            description: "No counters, no lengthy paper forms. Complete your digital verification and unlock your assigned vehicle using your mobile device in under a minute.",
            badge: "BIOMETRIC KEY"
        },
        {
            code: "VOLT-05",
            icon: Compass,
            title: "Cross-Morocco Freedom",
            subtitle: "Guaranteed Range Reliability",
            description: "Travel smoothly from Tangier to Marrakech without range anxiety. Real-world range exceeding 500 km per charge with pre-configured route charging.",
            badge: "500+ KM RANGE"
        },
        {
            code: "VOLT-06",
            icon: Award,
            title: "Curated Hypercar Portfolio",
            subtitle: "Precision Engineering",
            description: "Porsche Taycan, Tesla Plaid, BMW M-Electric, Audi RS e-tron... We maintain only the highest-specification electric machines manufactured today.",
            badge: "ELITE SPEC"
        }
    ];

    // 3-Step Journey
    const steps = [
        {
            num: "01",
            title: "Select Your Machine",
            desc: "Browse our live curated fleet of electric hypercars, sports GTs, and luxury executive SUVs.",
            icon: Layers
        },
        {
            num: "02",
            title: "Instant Digital Key",
            desc: "Complete swift ID verification online and receive a digital biometric smartphone key or VIP valet handover.",
            icon: Smartphone
        },
        {
            num: "03",
            title: "Silent Pure Acceleration",
            desc: "Hit the road with 100% charge, inclusive Voltigo Supercharger Pass, and 24/7 satellite concierge.",
            icon: Navigation
        }
    ];

    // Reviews
    const reviews = [
        {
            name: "Yassine B.",
            city: "Casablanca",
            car: "Porsche Taycan Turbo S",
            text: "Unbelievable experience. The Taycan was delivered fully charged to CFC, flawless condition. Made the Casablanca to Marrakech drive in total comfort.",
            rating: 5
        },
        {
            name: "Alexander M.",
            city: "Marrakech",
            car: "Tesla Model S Plaid",
            text: "The acceleration of the Plaid is supernatural. Having free access to charging hubs all over Morocco made the trip seamless. Voltigo is unmatched.",
            rating: 5
        },
        {
            name: "Kenza T.",
            city: "Tangier",
            car: "Audi RS e-tron GT",
            text: "Pure luxury and sustainability without any compromise. The smartphone unlock worked in seconds. Will never rent a combustion car again.",
            rating: 5
        }
    ];

    return (
        <main className="min-h-screen bg-[#0A100E] text-white font-sans selection:bg-[#7CFF3C] selection:text-black overflow-x-hidden relative">
            
            {/* Interactive mouse spotlight glow */}
            <div
                className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 opacity-40 hidden lg:block"
                style={{
                    background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(124, 255, 60, 0.06), transparent 60%)`
                }}
            />

            {/* Subtle Tech Grid Background */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] bg-[linear-gradient(to_right,#7CFF3C_1px,transparent_1px),linear-gradient(to_bottom,#7CFF3C_1px,transparent_1px)] bg-[size:4rem_4rem]" />

            {/* ══════════════════════════════════════════════════════════
                01. ORIGINAL HERO SECTION (PRESERVED INTACT)
            ══════════════════════════════════════════════════════════ */}
            <Hero />

            {/* ══════════════════════════════════════════════════════════
                02. FEATURED FLEET SPOTLIGHT (LIVE CARDS GRID)
            ══════════════════════════════════════════════════════════ */}
            <section id="fleet" className="relative py-28 px-6 md:px-16 lg:px-24 z-10 border-t border-white/[0.06]">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Header with Category Filter */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 text-[#CFFF1A] font-mono text-xs font-bold tracking-[0.3em] uppercase mb-3">
                                <Car className="w-4 h-4" /> THE HIGH-VOLTAGE HANGAR
                            </div>
                            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight">
                                Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CFFF1A] to-[#7CFF3C]">Electric Fleet</span>
                            </h2>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex flex-wrap gap-2">
                            {[
                                { key: "all", label: "All Fleet" },
                                { key: "hypercar", label: "Hypercar GT" },
                                { key: "suv", label: "Luxury SUV" },
                                { key: "sedan", label: "Executive Sedan" },
                            ].map((f) => (
                                <button
                                    key={f.key}
                                    onClick={() => setFleetFilter(f.key)}
                                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 border ${
                                        fleetFilter === f.key
                                            ? "bg-[#CFFF1A]/20 border-[#CFFF1A] text-white shadow-[0_0_15px_rgba(207,255,26,0.2)]"
                                            : "bg-white/[0.03] border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                                    }`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Fleet Grid */}
                    {loadingCars ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <span className="w-2 h-2 rounded-full bg-[#CFFF1A] animate-ping mb-4" />
                            <span className="text-xs font-mono text-[#CFFF1A] tracking-widest uppercase">
                                Initializing Hangar Data...
                            </span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredCars.slice(0, 6).map((car) => (
                                <CarCard key={car.id} car={car} />
                            ))}
                        </div>
                    )}

                    {/* View All CTA */}
                    <div className="mt-14 text-center">
                        <Link
                            href="/cars"
                            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl border border-[#CFFF1A]/40 bg-[#CFFF1A]/5 text-[#CFFF1A] font-mono text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#CFFF1A] hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(207,255,26,0.1)] hover:shadow-[0_0_30px_rgba(207,255,26,0.4)]"
                        >
                            View Complete Fleet Specifications <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                03. INTERACTIVE CLEAN DRIVE SIMULATOR
            ══════════════════════════════════════════════════════════ */}
            <section id="simulator" className="relative py-28 px-6 md:px-16 lg:px-24 z-10 border-t border-white/[0.06]">
                
                {/* Background Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#7CFF3C]/[0.03] rounded-full blur-[160px] pointer-events-none" />

                <div className="max-w-7xl mx-auto">
                    
                    {/* Section Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 text-[#CFFF1A] font-mono text-xs font-bold tracking-[0.3em] uppercase mb-3">
                                <Gauge className="w-4 h-4" /> REAL-TIME ECO TELEMETRY
                            </div>
                            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight">
                                Calculate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CFFF1A] to-[#7CFF3C]">Clean Impact</span>
                            </h2>
                        </div>
                        <p className="text-gray-400 text-xs sm:text-sm max-w-md leading-relaxed font-light">
                            Adjust distance and vehicle class to compute real-time carbon abatement, kinetic energy recuperation, and fossil fuel savings across Morocco.
                        </p>
                    </div>

                    {/* Simulator Cyber Console */}
                    <div className="relative rounded-3xl border border-[#CFFF1A]/25 bg-[#09110D]/90 backdrop-blur-xl p-6 sm:p-10 lg:p-12 shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_0_30px_rgba(207,255,26,0.03)] overflow-hidden">
                        
                        {/* Decorative HUD Corner brackets */}
                        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#CFFF1A]" />
                        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#CFFF1A]" />
                        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#CFFF1A]" />
                        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#CFFF1A]" />

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                            
                            {/* Controls (Left 6 cols) */}
                            <div className="lg:col-span-6 space-y-8">
                                
                                {/* Powertrain Selector */}
                                <div>
                                    <label className="block text-[11px] font-mono text-gray-400 tracking-wider uppercase mb-3">
                                        01. Select Powertrain Class
                                    </label>
                                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                                        {[
                                            { key: "hypercar", label: "Hypercar", sub: "Taycan / Plaid" },
                                            { key: "suv", label: "Grand Tourisme", sub: "BMW iX / e-tron" },
                                            { key: "urban", label: "Executive", sub: "Polestar / Model 3" },
                                        ].map((t) => (
                                            <button
                                                key={t.key}
                                                onClick={() => setSelectedPowertrain(t.key)}
                                                className={`p-3 sm:p-4 rounded-xl text-left border transition-all duration-300 ${
                                                    selectedPowertrain === t.key
                                                        ? "bg-[#CFFF1A]/15 border-[#CFFF1A] text-white shadow-[0_0_20px_rgba(207,255,26,0.2)]"
                                                        : "bg-white/[0.03] border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                                                }`}
                                            >
                                                <div className="text-xs sm:text-sm font-bold text-white uppercase">{t.label}</div>
                                                <div className="text-[9px] sm:text-[10px] text-gray-400 mt-1">{t.sub}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Distance Slider */}
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <label className="text-[11px] font-mono text-gray-400 tracking-wider uppercase">
                                            02. Planned Expedition Distance
                                        </label>
                                        <span className="text-2xl font-black font-mono text-[#CFFF1A] drop-shadow-[0_0_10px_rgba(207,255,26,0.4)]">
                                            {simulatorKm} <span className="text-sm font-normal text-white">KM</span>
                                        </span>
                                    </div>

                                    {/* Range Input */}
                                    <div className="relative flex items-center">
                                        <input
                                            type="range"
                                            min="50"
                                            max="1200"
                                            step="25"
                                            value={simulatorKm}
                                            onChange={(e) => setSimulatorKm(Number(e.target.value))}
                                            className="w-full h-2.5 bg-black/60 rounded-lg appearance-none cursor-pointer accent-[#CFFF1A] border border-white/15 focus:outline-none"
                                        />
                                    </div>

                                    {/* Presets */}
                                    <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono mt-2">
                                        <span>Casablanca - Rabat (90 km)</span>
                                        <span>Casa - Marrakech (240 km)</span>
                                        <span>Tangier - Agadir (800 km)</span>
                                    </div>
                                </div>

                                {/* Vehicle Specs Mini-Cockpit */}
                                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-[#CFFF1A]/10 border border-[#CFFF1A]/30 flex items-center justify-center">
                                            <Activity className="w-5 h-5 text-[#CFFF1A]" />
                                        </div>
                                        <div>
                                            <div className="text-[11px] text-gray-400 uppercase font-mono">Benchmark Model</div>
                                            <div className="text-sm font-bold text-white">{currentSpec.name}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[11px] text-gray-400 uppercase font-mono">0-100 KM/H</div>
                                        <div className="text-sm font-black text-[#CFFF1A]">{currentSpec.accel}</div>
                                    </div>
                                </div>

                            </div>

                            {/* Telemetry Output HUD (Right 6 cols) */}
                            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                                
                                {/* Metric 1: CO2 Neutralized */}
                                <div className="p-6 rounded-2xl bg-gradient-to-br from-black/80 to-[#7CFF3C]/[0.08] border border-[#7CFF3C]/30 relative overflow-hidden group hover:border-[#7CFF3C] transition-all duration-300">
                                    <div className="w-10 h-10 rounded-xl bg-[#7CFF3C]/15 flex items-center justify-center mb-4">
                                        <Leaf className="w-5 h-5 text-[#7CFF3C]" />
                                    </div>
                                    <div className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight">
                                        {co2Saved} <span className="text-base text-[#7CFF3C]">KG</span>
                                    </div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-white mt-1">CO₂ Abated</div>
                                    <div className="text-[10px] text-gray-400 mt-1">Compared to internal combustion benchmark</div>
                                </div>

                                {/* Metric 2: Fuel Saved */}
                                <div className="p-6 rounded-2xl bg-gradient-to-br from-black/80 to-[#CFFF1A]/[0.08] border border-[#CFFF1A]/30 relative overflow-hidden group hover:border-[#CFFF1A] transition-all duration-300">
                                    <div className="w-10 h-10 rounded-xl bg-[#CFFF1A]/15 flex items-center justify-center mb-4">
                                        <Flame className="w-5 h-5 text-[#CFFF1A]" />
                                    </div>
                                    <div className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight">
                                        {fuelSaved} <span className="text-base text-[#CFFF1A]">L</span>
                                    </div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-white mt-1">Fossil Fuel Spared</div>
                                    <div className="text-[10px] text-gray-400 mt-1">Zero hydrocarbon combustion</div>
                                </div>

                                {/* Metric 3: KERS Energy */}
                                <div className="p-6 rounded-2xl bg-gradient-to-br from-black/80 to-[#7CFF3C]/[0.08] border border-[#7CFF3C]/30 relative overflow-hidden group hover:border-[#7CFF3C] transition-all duration-300">
                                    <div className="w-10 h-10 rounded-xl bg-[#7CFF3C]/15 flex items-center justify-center mb-4">
                                        <Battery className="w-5 h-5 text-[#7CFF3C]" />
                                    </div>
                                    <div className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight">
                                        {energyHarvested} <span className="text-base text-[#7CFF3C]">KWH</span>
                                    </div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-white mt-1">KERS Regen</div>
                                    <div className="text-[10px] text-gray-400 mt-1">Recuperated during kinetic braking</div>
                                </div>

                                {/* Metric 4: Trees Equivalent */}
                                <div className="p-6 rounded-2xl bg-gradient-to-br from-black/80 to-[#7CFF3C]/[0.08] border border-[#7CFF3C]/30 relative overflow-hidden group hover:border-[#7CFF3C] transition-all duration-300">
                                    <div className="w-10 h-10 rounded-xl bg-[#7CFF3C]/15 flex items-center justify-center mb-4">
                                        <TrendingUp className="w-5 h-5 text-[#7CFF3C]" />
                                    </div>
                                    <div className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight">
                                        ~{treesEquivalent} <span className="text-base text-[#7CFF3C]">TREES</span>
                                    </div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-white mt-1">Forest Equivalent</div>
                                    <div className="text-[10px] text-gray-400 mt-1">Annual carbon sequestration capacity</div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                04. THE 3-STEP SEAMLESS JOURNEY
            ══════════════════════════════════════════════════════════ */}
            <section className="relative py-28 px-6 md:px-16 lg:px-24 border-t border-white/[0.06]">
                <div className="max-w-7xl mx-auto">
                    
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 text-[#CFFF1A] font-mono text-xs font-bold tracking-[0.3em] uppercase mb-3">
                            <KeyRound className="w-4 h-4" /> FRICTIONLESS PROTOCOL
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
                            The 60-Second <span className="text-[#CFFF1A]">Departure</span>
                        </h2>
                        <p className="text-gray-400 text-xs sm:text-sm mt-3 font-light">
                            Zero paper contracts. Zero queuing at rental counters. Instant contactless smartphone verification and ignition.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {steps.map((st) => {
                            const Icon = st.icon;
                            return (
                                <div
                                    key={st.num}
                                    className="p-8 rounded-3xl border border-white/10 bg-[#09110D]/70 backdrop-blur-md relative overflow-hidden group hover:border-[#CFFF1A]/50 transition-all duration-300"
                                >
                                    <div className="text-5xl font-black font-mono text-white/5 group-hover:text-[#CFFF1A]/10 transition-colors absolute top-4 right-6">
                                        {st.num}
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-[#CFFF1A]/10 border border-[#CFFF1A]/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#CFFF1A] transition-all">
                                        <Icon className="w-6 h-6 text-[#CFFF1A] group-hover:text-black transition-colors" />
                                    </div>
                                    <h3 className="text-xl font-bold uppercase text-white tracking-tight mb-2 group-hover:text-[#CFFF1A] transition-colors">
                                        {st.title}
                                    </h3>
                                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                                        {st.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                05. FUTURISTIC TECH ARCHITECTURE MATRIX
            ══════════════════════════════════════════════════════════ */}
            <section className="relative py-28 px-6 md:px-16 lg:px-24 border-t border-white/[0.06] overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 text-[#CFFF1A] font-mono text-xs font-bold tracking-[0.3em] uppercase mb-3">
                            <Cpu className="w-4 h-4" /> SYSTEM ARCHITECTURE 2026
                        </div>
                        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight">
                            The Voltigo <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CFFF1A] via-[#7CFF3C] to-[#CFFF1A]">Eco-System</span>
                        </h2>
                        <p className="text-gray-400 text-sm sm:text-base mt-4 font-light">
                            Every machine in our fleet adheres to the highest aerospace-grade standards of electro-mobility: instantaneous charging, thermal pre-conditioning, and nationwide solar power integration.
                        </p>
                    </div>

                    {/* Interactive Tabbed Matrix */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        
                        {/* Tab Buttons (Left 4 cols) */}
                        <div className="lg:col-span-4 flex flex-col gap-3">
                            {techPillars.map((pillar, idx) => {
                                const Icon = pillar.icon;
                                const isActive = activeTechTab === idx;
                                return (
                                    <button
                                        key={pillar.id}
                                        onClick={() => setActiveTechTab(idx)}
                                        className={`group relative p-5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between ${
                                            isActive
                                                ? "bg-gradient-to-r from-[#CFFF1A]/20 to-transparent border-[#CFFF1A] shadow-[0_0_25px_rgba(207,255,26,0.15)]"
                                                : "bg-white/[0.02] border-white/10 hover:border-white/30 hover:bg-white/[0.05]"
                                        }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                                                isActive ? "bg-[#CFFF1A] text-black" : "bg-white/5 text-[#CFFF1A]"
                                            }`}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-mono text-[#CFFF1A] tracking-widest">{pillar.tag}</div>
                                                <div className="text-sm font-bold text-white uppercase">{pillar.title}</div>
                                            </div>
                                        </div>
                                        <ChevronRight className={`w-5 h-5 transition-transform ${isActive ? "text-[#CFFF1A] translate-x-1" : "text-gray-600"}`} />
                                    </button>
                                );
                            })}
                        </div>

                        {/* Active Pillar Screen (Right 8 cols) */}
                        <div className="lg:col-span-8 rounded-3xl border border-[#CFFF1A]/30 bg-[#0c1611] p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.7)]">
                            
                            {/* Futuristic Tech Grid Overlay inside card */}
                            <div className="absolute top-0 right-0 w-96 h-96 bg-[#CFFF1A]/5 rounded-full blur-[100px] pointer-events-none" />
                            <div className="absolute top-4 right-6 text-7xl font-black text-white/[0.03] select-none font-mono">
                                0{activeTechTab + 1}
                            </div>

                            <div className="relative z-10">
                                <div className="inline-block px-3 py-1 rounded-md bg-[#CFFF1A]/10 border border-[#CFFF1A]/30 text-[#CFFF1A] font-mono text-[10px] font-bold tracking-widest uppercase mb-4">
                                    {techPillars[activeTechTab].tag}
                                </div>
                                <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mb-4">
                                    {techPillars[activeTechTab].title}
                                </h3>
                                <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
                                    {techPillars[activeTechTab].desc}
                                </p>
                            </div>

                            {/* Pillar Metrics Badges */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10 relative z-10">
                                {techPillars[activeTechTab].stats.map((s, i) => (
                                    <div key={i} className="p-4 rounded-xl bg-black/50 border border-white/10 backdrop-blur-sm">
                                        <div className="text-[10px] font-mono text-[#CFFF1A] uppercase">{s.label}</div>
                                        <div className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">{s.val}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                06. SIX CORE INVIOLABLE PROTOCOLS
            ══════════════════════════════════════════════════════════ */}
            <section className="relative py-28 px-6 md:px-16 lg:px-24 border-t border-white/[0.06]">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Header */}
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 text-[#CFFF1A] font-mono text-xs font-bold tracking-[0.3em] uppercase mb-3">
                            <Shield className="w-4 h-4" /> VOLTIGO CHARTER
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
                            Six Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CFFF1A] to-[#7CFF3C]">Protocols</span>
                        </h2>
                        <p className="text-gray-400 text-xs sm:text-sm mt-3 font-light">
                            From absolute carbon transparency to zero hidden fees, our foundational principles establish a new standard for luxury mobility.
                        </p>
                    </div>

                    {/* 6 Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {coreProtocols.map((v) => {
                            const Icon = v.icon;
                            return (
                                <div
                                    key={v.code}
                                    className="group relative p-8 rounded-3xl border border-white/10 bg-[#09110D]/70 backdrop-blur-md hover:border-[#CFFF1A]/50 transition-all duration-500 overflow-hidden hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                                >
                                    {/* Top glow accent */}
                                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#CFFF1A]/10 rounded-full blur-[40px] group-hover:bg-[#CFFF1A]/20 transition-all" />

                                    {/* Code & Badge Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-[10px] font-mono text-[#CFFF1A] font-bold tracking-widest">
                                            // {v.code}
                                        </span>
                                        <span className="text-[9px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 uppercase">
                                            {v.badge}
                                        </span>
                                    </div>

                                    {/* Icon */}
                                    <div className="w-12 h-12 rounded-2xl bg-[#CFFF1A]/10 border border-[#CFFF1A]/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#CFFF1A] transition-all duration-300">
                                        <Icon className="w-6 h-6 text-[#CFFF1A] group-hover:text-black transition-colors" />
                                    </div>

                                    {/* Text */}
                                    <h3 className="text-lg font-bold text-white uppercase tracking-tight group-hover:text-[#CFFF1A] transition-colors">
                                        {v.title}
                                    </h3>
                                    <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mt-0.5 mb-3">
                                        {v.subtitle}
                                    </div>
                                    <p className="text-xs text-gray-400 leading-relaxed font-light">
                                        {v.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                07. VIP DRIVERS TESTIMONIALS
            ══════════════════════════════════════════════════════════ */}
            <section className="relative py-28 px-6 md:px-16 lg:px-24 border-t border-white/[0.06] overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 text-[#CFFF1A] font-mono text-xs font-bold tracking-[0.3em] uppercase mb-3">
                            <Star className="w-4 h-4 fill-[#CFFF1A]" /> VERIFIED VIP FEEDBACK
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
                            Tested by <span className="text-[#CFFF1A]">Pioneers</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {reviews.map((r, i) => (
                            <div
                                key={i}
                                className="p-8 rounded-3xl border border-white/10 bg-[#09110D]/60 backdrop-blur-md relative flex flex-col justify-between hover:border-[#CFFF1A]/30 transition-all duration-300"
                            >
                                <div>
                                    <div className="flex items-center gap-1 mb-4 text-[#CFFF1A]">
                                        {[...Array(r.rating)].map((_, idx) => (
                                            <Star key={idx} className="w-4 h-4 fill-[#CFFF1A]" />
                                        ))}
                                    </div>
                                    <blockquote className="text-sm text-gray-300 font-light leading-relaxed mb-6 italic">
                                        &ldquo;{r.text}&rdquo;
                                    </blockquote>
                                </div>

                                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                    <div>
                                        <div className="text-xs font-bold text-white uppercase">{r.name}</div>
                                        <div className="text-[10px] text-gray-500 font-mono">{r.city}, Morocco</div>
                                    </div>
                                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#CFFF1A]/10 text-[#CFFF1A] border border-[#CFFF1A]/20">
                                        {r.car}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                08. FINAL HIGH-TECH CTA (QUANTUM LAUNCH PORTAL)
            ══════════════════════════════════════════════════════════ */}
            <section className="relative py-32 px-6 md:px-16 lg:px-24 border-t border-white/[0.06] overflow-hidden">
                
                {/* Hyperdrive Warp Center Glow */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[600px] h-[600px] rounded-full bg-[#CFFF1A]/[0.08] blur-[170px] animate-pulse" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
                    
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#CFFF1A]/10 border border-[#CFFF1A]/30 text-[#CFFF1A] font-mono text-xs font-bold uppercase tracking-widest mb-6">
                        <Sparkles className="w-4 h-4" /> IMMEDIATE RESERVATION OPEN
                    </div>

                    <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-tight">
                        ZERO DIRECT EMISSIONS.
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CFFF1A] via-[#7CFF3C] to-[#CFFF1A] drop-shadow-[0_0_35px_rgba(207,255,26,0.5)]">
                            ZERO COMPROMISE.
                        </span>
                    </h2>

                    <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl font-light leading-relaxed mt-6 mb-10">
                        Join Morocco&#39;s luxury electro-mobility vanguard. Unlock an elite performance vehicle in under 60 seconds with complimentary nationwide charging.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <Link
                            href="/cars"
                            className="group relative overflow-hidden inline-flex items-center gap-3 bg-[#CFFF1A] text-black px-10 py-5 rounded-2xl font-black text-xs md:text-sm uppercase tracking-[0.2em] shadow-[0_0_35px_rgba(207,255,26,0.4)] hover:shadow-[0_0_70px_rgba(207,255,26,0.7)] transition-all duration-300 hover:scale-105"
                        >
                            <Car className="w-5 h-5 relative z-10" />
                            <span className="relative z-10">Deploy Fleet Machine</span>
                            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1.5 transition-transform" />
                            <span className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:translate-x-[150%] transition-transform duration-700 skew-x-[-20deg]" />
                        </Link>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-10">
                        <span>✓ Free 24h Cancellation</span>
                        <span>•</span>
                        <span>✓ Instant Biometric Mobile Key</span>
                        <span>•</span>
                        <span>✓ Complimentary Charging Included</span>
                    </div>

                </div>
            </section>

            {/* Global Brand Footer */}
            <Footer />

        </main>
    );
}