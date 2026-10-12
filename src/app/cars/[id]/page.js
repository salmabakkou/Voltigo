"use client";

import { useEffect, useState, use } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { 
    ArrowLeft, 
    Zap, 
    Gauge, 
    ShieldCheck, 
    CheckCircle2, 
    XCircle,
    Calendar,
    Sparkles
} from "lucide-react";
import { getCarById, getReservations } from "../../../services/api";

/* Lazy-load the modal — only fetched when user clicks "Book Now" */
const BookingModal = dynamic(() => import("../../../components/BookingModal"), {
    ssr: false,
    loading: () => null,
});

/* ─────────────────────────────────────────────
   Stat Row Component
───────────────────────────────────────────── */
function StatRow({ label, value, icon: Icon }) {
    if (!value) return null;
    return (
        <div className="flex items-center justify-between py-3 border-b border-white/[0.06] group">
            <span className="text-xs text-gray-400 font-medium flex items-center gap-2 group-hover:text-[#CFFF1A] transition-colors">
                {Icon && <Icon className="w-3.5 h-3.5 text-[#CFFF1A]/70" />}
                {label}
            </span>
            <span className="text-sm text-white font-bold tracking-wide">
                {value}
            </span>
        </div>
    );
}

/* ─────────────────────────────────────────────
   HUD Tag (brand / type badges)
───────────────────────────────────────────── */
function HudTag({ label, value, accent }) {
    if (!value) return null;
    return (
        <div className="flex flex-col gap-1">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                {label}
            </span>
            {accent ? (
                <div className="flex items-center gap-2 bg-[#CFFF1A]/10 border border-[#CFFF1A]/30 rounded-xl px-4 py-2 w-max">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CFFF1A] opacity-60"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#CFFF1A]"></span>
                    </span>
                    <span className="text-[#CFFF1A] text-xs font-bold uppercase tracking-wider">{value}</span>
                </div>
            ) : (
                <div className="border-l-2 border-[#CFFF1A] pl-3 py-1 bg-white/[0.02] w-max">
                    <span className="text-white text-lg font-bold tracking-wide">{value}</span>
                </div>
            )}
        </div>
    );
}

/* ─────────────────────────────────────────────
   Main page
───────────────────────────────────────────── */
export default function CarDetailsPage({ params }) {
    const { id } = use(params);

    const [car, setCar]         = useState(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [pickupDate, setPickupDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [modalOpen, setModalOpen]   = useState(false);

    const today     = new Date().toISOString().split("T")[0];
    const days      = pickupDate && returnDate
        ? Math.max(1, Math.ceil((new Date(returnDate) - new Date(pickupDate)) / 86_400_000))
        : 0;
    const pricePerDay = car?.price_per_day || Number(car?.price?.toString().replace(/[^0-9.]/g, "")) || 0;
    const estimated   = days > 0 ? days * pricePerDay : null;

    const [isBooked, setIsBooked] = useState(false);

    useEffect(() => {
        setMounted(true);
        (async () => {
            try {
                const [carData, allReservations] = await Promise.all([
                    getCarById(id),
                    getReservations().catch(() => [])
                ]);

                setCar(carData);

                // Check if car has an active reservation or booked status
                const hasReservation = allReservations?.some(r => String(r.carId) === String(id));
                const locallyBooked = typeof window !== "undefined" 
                    ? JSON.parse(localStorage.getItem("voltigo_booked_cars") || "[]").includes(String(id))
                    : false;

                const isUnavailableStatus = carData?.status === "unavailable" || 
                                           carData?.status === "booked" || 
                                           carData?.isAvailable === false || 
                                           carData?.available === false;

                if (hasReservation || locallyBooked || isUnavailableStatus) {
                    setIsBooked(true);
                } else {
                    setIsBooked(false);
                }
            } catch (err) {
                console.error("Failed to load car details:", err);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    const isAvailable = car && !isBooked;

    /* ── Loading ── */
    if (loading) return (
        <div className="min-h-[100dvh] bg-[#0A100E] flex flex-col items-center justify-center gap-4">
            <span className="w-2 h-2 rounded-full bg-[#CFFF1A] animate-ping shadow-[0_0_20px_6px_rgba(207,255,26,0.6)]"></span>
            <p className="text-xs text-[#CFFF1A] uppercase tracking-[0.4em] font-bold">Loading vehicle…</p>
        </div>
    );

    /* ── Not found ── */
    if (!car) return (
        <div className="min-h-[100dvh] bg-[#0A100E] flex flex-col items-center justify-center gap-6">
            <span className="text-5xl text-gray-700">⊘</span>
            <p className="text-gray-400 text-sm">Vehicle not found.</p>
            <Link href="/cars" className="inline-flex items-center gap-2 text-xs text-[#CFFF1A] uppercase tracking-[0.2em] font-bold border border-[#CFFF1A]/30 px-5 py-2.5 rounded-full hover:bg-[#CFFF1A]/10 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Return to Fleet
            </Link>
        </div>
    );

    /* ── Main ── */
    return (
        <div className="min-h-[100dvh] w-full bg-[#0A100E] text-white font-sans overflow-x-hidden relative flex flex-col">

            {/* ── Fixed ambient glows ── */}
            <div className="pointer-events-none fixed inset-0 z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#CFFF1A]/8 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-[-15%] left-[-10%] w-[700px] h-[700px] bg-[#CFFF1A]/5 rounded-full blur-[180px]"></div>
            </div>

            {/* ── Ghost car-name typography ── */}
            <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
                <span
                    className="text-[20vw] font-black uppercase tracking-tighter select-none whitespace-nowrap opacity-30"
                    style={{
                        WebkitTextStroke: "1px rgba(207,255,26,0.08)",
                        color: "transparent",
                        lineHeight: 1,
                    }}
                >
                    {car.name}
                </span>
            </div>

            {/* ── Top Bar: Back to Cars & Status ── */}
            <div className="relative z-30 flex items-center justify-between px-6 md:px-14 pt-[100px] pb-4 shrink-0">
                {/* Back Arrow Button */}
                <Link
                    href="/cars"
                    className="inline-flex items-center gap-2.5 text-xs text-white/90 hover:text-[#CFFF1A] uppercase tracking-[0.2em] font-bold bg-white/5 hover:bg-[#CFFF1A]/10 border border-white/10 hover:border-[#CFFF1A]/40 px-4 py-2.5 rounded-full transition-all group shadow-sm"
                >
                    <ArrowLeft className="w-4 h-4 text-[#CFFF1A] group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Fleet</span>
                </Link>

                {/* Availability status badge */}
                {isAvailable ? (
                    <div className="flex items-center gap-2 bg-[#CFFF1A]/10 border border-[#CFFF1A]/30 px-4 py-2 rounded-full shadow-[0_0_15px_rgba(207,255,26,0.15)]">
                        <span className="w-2 h-2 rounded-full bg-[#CFFF1A] animate-pulse"></span>
                        <span className="text-xs text-[#CFFF1A] uppercase tracking-wider font-bold">Available Now</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-4 py-2 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.15)]">
                        <XCircle className="w-3.5 h-3.5 text-red-400" />
                        <span className="text-xs text-red-400 uppercase tracking-wider font-bold">Booked / Unavailable</span>
                    </div>
                )}
            </div>

            {/* ══════════════════════════════════════
                MAIN 3-COLUMN LAYOUT
            ══════════════════════════════════════ */}
            <div className="relative z-20 flex-1 flex flex-col lg:flex-row items-center lg:items-stretch gap-8 px-6 md:px-14 pb-12 pt-4">

                {/* ────────────────────────────────
                    LEFT — Brand & Details
                ──────────────────────────────── */}
                <aside className={`
                    w-full lg:w-[26%] flex flex-col justify-center gap-6
                    transition-all duration-700 ease-out
                    ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}
                `}>
                    {/* Identity HUD */}
                    <div className="flex flex-col gap-4">
                        <HudTag label="Manufacturer" value={car.brand} accent={false} />
                        <HudTag label="Category" value={car.type} accent={true} />
                    </div>

                    <div className="w-12 h-px bg-[#CFFF1A]/30"></div>

                    {/* Features & Specs Card */}
                    <div className="flex flex-col bg-[#0c1410]/80 border border-white/10 rounded-2xl p-5 shadow-lg">
                        <span className="text-xs text-[#CFFF1A] uppercase tracking-wider font-bold mb-3 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#CFFF1A]" /> Vehicle Overview
                        </span>
                        
                        {car.range && <StatRow label="Autonomie / Range" value={car.range} icon={Zap} />}
                        {car.acceleration && <StatRow label="Acceleration" value={car.acceleration} icon={Gauge} />}
                        {car.top_speed && <StatRow label="Top Speed" value={car.top_speed} icon={Gauge} />}
                        {car.seats && <StatRow label="Capacity" value={`${car.seats} Passengers`} />}
                        {car.transmission && <StatRow label="Transmission" value={car.transmission} />}
                        {car.fuel_type && <StatRow label="Engine Type" value={car.fuel_type} />}
                        
                        {/* Universal Features included */}
                        <StatRow label="Zero Emissions" value="100% Eco" icon={CheckCircle2} />
                        <StatRow label="Fast Charging" value="Supercharger Ready" icon={Zap} />
                        <StatRow label="Insurance" value="Comprehensive Included" icon={ShieldCheck} />
                    </div>
                </aside>

                {/* ────────────────────────────────
                    CENTER — Car visual
                ──────────────────────────────── */}
                <section className={`
                    flex-1 flex flex-col items-center justify-center relative min-h-[340px]
                    transition-all duration-700 ease-out
                    ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                `}>
                    {/* Futuristic Podiums / Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] md:w-[480px] h-[340px] md:h-[480px] bg-[#CFFF1A]/10 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="absolute top-[65%] left-1/2 -translate-x-1/2 w-[300px] md:w-[420px] h-[60px] rounded-[100%] border border-[#CFFF1A]/30 bg-gradient-to-b from-[#CFFF1A]/15 to-transparent blur-[1px] shadow-[0_0_35px_rgba(207,255,26,0.25)] pointer-events-none"></div>

                    {/* Car Image */}
                    <img
                        src={car.image || "/hero.png"}
                        alt={car.name}
                        className="relative z-10 w-full max-w-[580px] h-auto object-contain
                                   drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]
                                   hover:scale-105 transition-transform duration-700"
                    />

                    {/* Car Brand & Name Title */}
                    <div className="relative z-10 mt-6 text-center">
                        <span className="text-xs text-[#CFFF1A] uppercase tracking-[0.3em] font-bold block mb-1">
                            {car.brand}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-none">
                            {car.name}
                        </h1>
                    </div>
                </section>

                {/* ────────────────────────────────
                    RIGHT — Booking card
                ──────────────────────────────── */}
                <aside className={`
                    w-full lg:w-[28%] flex flex-col justify-center
                    transition-all duration-700 ease-out delay-100
                    ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
                `}>
                    <div className="bg-[#0b1210]/90 backdrop-blur-2xl border border-[#CFFF1A]/20
                                    rounded-3xl p-7 relative overflow-hidden
                                    shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(207,255,26,0.1)]">

                        <div className="relative z-10 flex flex-col gap-6">

                            {/* Price from MockAPI */}
                            <div>
                                <span className="text-xs text-[#CFFF1A] uppercase tracking-wider font-semibold block mb-1">Rental Tariff</span>
                                <div className="flex items-end gap-2">
                                    <span className="text-4xl md:text-5xl font-black text-white leading-none">${pricePerDay}</span>
                                    <span className="text-gray-400 text-xs uppercase tracking-wider font-medium mb-1">/ day</span>
                                </div>
                            </div>

                            <div className="w-full h-px bg-white/10"></div>

                            {/* Date Picker & Action */}
                            <div className="flex flex-col gap-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <label className="flex flex-col gap-1.5">
                                        <span className="text-xs text-gray-400 font-semibold">Pick-up Date</span>
                                        <input
                                            type="date"
                                            min={today}
                                            disabled={!isAvailable}
                                            value={pickupDate}
                                            onChange={e => setPickupDate(e.target.value)}
                                            className="w-full bg-[#050907] border border-white/15 focus:border-[#CFFF1A] disabled:opacity-40 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none transition-all [color-scheme:dark]"
                                        />
                                    </label>
                                    <label className="flex flex-col gap-1.5">
                                        <span className="text-xs text-gray-400 font-semibold">Return Date</span>
                                        <input
                                            type="date"
                                            min={pickupDate || today}
                                            disabled={!isAvailable}
                                            value={returnDate}
                                            onChange={e => setReturnDate(e.target.value)}
                                            className="w-full bg-[#050907] border border-white/15 focus:border-[#CFFF1A] disabled:opacity-40 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none transition-all [color-scheme:dark]"
                                        />
                                    </label>
                                </div>

                                {/* Estimated calculation */}
                                {estimated !== null && (
                                    <div className="flex items-center justify-between bg-[#CFFF1A]/10 border border-[#CFFF1A]/20 rounded-xl px-4 py-3">
                                        <span className="text-xs text-gray-300 font-medium">Estimated ({days} day{days > 1 ? "s" : ""})</span>
                                        <span className="text-[#CFFF1A] font-bold text-base">${estimated}</span>
                                    </div>
                                )}

                                {/* Booking CTA Button */}
                                {isAvailable ? (
                                    <button
                                        type="button"
                                        disabled={!pickupDate || !returnDate}
                                        onClick={() => setModalOpen(true)}
                                        className="w-full py-3.5 mt-1 rounded-xl font-bold text-xs tracking-wider uppercase
                                                   bg-[#CFFF1A] text-black hover:bg-[#b8e617]
                                                   shadow-[0_0_20px_rgba(207,255,26,0.3)]
                                                   disabled:opacity-40 disabled:cursor-not-allowed
                                                   transition-all duration-300 cursor-pointer"
                                    >
                                        {pickupDate && returnDate ? "Book Now →" : "Select Dates to Book"}
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        disabled={true}
                                        className="w-full py-3.5 mt-1 rounded-xl font-bold text-xs tracking-wider uppercase
                                                   bg-white/10 text-gray-400 border border-white/10
                                                   cursor-not-allowed opacity-60"
                                    >
                                        Vehicle Currently Unavailable
                                    </button>
                                )}
                            </div>

                            <p className="text-center text-[10px] text-gray-400 uppercase tracking-wider font-medium">
                                Free cancellation · 24/7 Assistance · Eco Fleet
                            </p>
                        </div>
                    </div>
                </aside>

            </div>

            {/* ── Booking Modal (lazy) ── */}
            {modalOpen && (
                <BookingModal
                    car={car}
                    pickupDate={pickupDate}
                    returnDate={returnDate}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </div>
    );
}
