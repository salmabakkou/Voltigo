"use client";

import { useEffect, useState, use } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { getCarById } from "../../../services/api";

/* Lazy-load the drawer — only fetched when user clicks "Book Now" */
const BookingModal = dynamic(() => import("../../../components/BookingModal"), {
    ssr: false,
    loading: () => null,
});

/* ─────────────────────────────────────────────
   Small reusable Stat pill  (left column)
───────────────────────────────────────────── */
function StatRow({ label, value }) {
    return (
        <div className="flex items-center justify-between py-3 border-b border-white/[0.06] group">
            <span className="text-[9px] text-gray-500 uppercase tracking-[0.3em] font-black group-hover:text-[#CFFF1A] transition-colors duration-300">
                {label}
            </span>
            <span className="text-sm text-white font-black uppercase tracking-widest">
                {value}
            </span>
        </div>
    );
}

/* ─────────────────────────────────────────────
   HUD Tag (brand / type badges)
───────────────────────────────────────────── */
function HudTag({ label, value, accent }) {
    return (
        <div className="flex flex-col gap-1.5">
            <span className="flex items-center gap-2 text-[8px] text-gray-600 uppercase tracking-[0.35em] font-black">
                <span className="w-4 h-px bg-gray-700"></span>
                {label}
            </span>
            {accent ? (
                <div className="flex items-center gap-2.5 bg-[#CFFF1A]/10 border border-[#CFFF1A]/25 rounded-full px-4 py-2 w-max">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CFFF1A] opacity-60"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#CFFF1A]"></span>
                    </span>
                    <span className="text-[#CFFF1A] text-xs font-black uppercase tracking-[0.25em]">{value}</span>
                </div>
            ) : (
                <div className="border-l-[3px] border-[#CFFF1A] px-4 py-2.5 bg-white/[0.02] backdrop-blur-md w-max">
                    <span className="text-white text-lg font-black uppercase tracking-[0.25em]">{value}</span>
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
    const estimated = days > 0 ? days * (car?.price_per_day || 0) : null;

    useEffect(() => {
        setMounted(true);
        (async () => {
            try {
                const data = await getCarById(id);
                setCar(data);
            } catch (err) {
                console.error("Failed to load car:", err);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    /* ── Loading ── */
    if (loading) return (
        <div className="min-h-[100dvh] bg-[#0A100E] flex flex-col items-center justify-center gap-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CFFF1A] animate-ping shadow-[0_0_20px_6px_rgba(207,255,26,0.6)]"></span>
            <p className="text-[8px] text-[#CFFF1A]/40 uppercase tracking-[0.6em] font-black">Loading asset…</p>
        </div>
    );

    /* ── Not found ── */
    if (!car) return (
        <div className="min-h-[100dvh] bg-[#0A100E] flex flex-col items-center justify-center gap-6">
            <span className="text-5xl text-gray-700">⊘</span>
            <Link href="/cars" className="text-[9px] text-[#CFFF1A] uppercase tracking-[0.3em] font-black border-b border-[#CFFF1A]/30 pb-0.5">
                Return to fleet
            </Link>
        </div>
    );

    /* ── Main ── */
    return (
        <div className="h-[100dvh] w-full bg-[#0A100E] text-white font-sans overflow-hidden relative flex flex-col">

            {/* ── Fixed ambient glows ── */}
            <div className="pointer-events-none fixed inset-0 z-0">
                <div className="absolute top-[-15%] right-[-10%] w-[700px] h-[700px] bg-[#CFFF1A]/8 rounded-full blur-[160px]"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#CFFF1A]/5 rounded-full blur-[200px]"></div>
            </div>

            {/* ── Ghost car-name typography ── */}
            <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
                <span
                    className="text-[22vw] font-black uppercase tracking-tighter select-none whitespace-nowrap"
                    style={{
                        WebkitTextStroke: "1px rgba(207,255,26,0.06)",
                        color: "transparent",
                        lineHeight: 1,
                    }}
                >
                    {car.name}
                </span>
            </div>

            {/* Available badge — top right corner, sits below the global Navbar */}
            <div className="relative z-30 flex justify-end px-8 md:px-14 pt-[90px] md:pt-[100px] shrink-0">
                <div className="flex items-center gap-2.5 bg-white/[0.03] border border-white/[0.06] px-4 py-2 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CFFF1A] animate-pulse shadow-[0_0_8px_2px_rgba(207,255,26,0.8)]"></span>
                    <span className="text-[8px] text-gray-500 uppercase tracking-[0.25em] font-black">Available</span>
                </div>
            </div>

            {/* ══════════════════════════════════════
                MAIN 3-COLUMN LAYOUT
            ══════════════════════════════════════ */}
            <div className="relative z-20 flex-1 flex flex-col lg:flex-row items-stretch gap-0 px-8 md:px-14 pb-8 pt-4 overflow-hidden">

                {/* ────────────────────────────────
                    LEFT — Brand / Specs
                ──────────────────────────────── */}
                <aside className={`
                    w-full lg:w-[22%] flex flex-col justify-center gap-8
                    transition-all duration-[1200ms] ease-out
                    ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}
                `}>
                    {/* Identity HUD */}
                    <div className="flex flex-col gap-5">
                        <HudTag label="Manufacturer" value={car.brand} accent={false} />
                        <HudTag label="Classification" value={car.type} accent={true} />
                    </div>

                    {/* Divider */}
                    <div className="w-8 h-px bg-[#CFFF1A]/30"></div>

                    {/* Specs list */}
                    <div className="flex flex-col">
                        <StatRow label="Range"       value={car.range  || "—"} />
                        <StatRow label="0 – 100 km/h" value="3.2 s"   />
                        <StatRow label="Top Speed"    value="250 km/h" />
                        <StatRow label="Seats"        value="5"        />
                        <StatRow label="Drive"        value="AWD"      />
                    </div>
                </aside>

                {/* ────────────────────────────────
                    CENTER — Car visual
                ──────────────────────────────── */}
                <section className={`
                    flex-1 flex flex-col items-center justify-center relative
                    transition-all duration-[1500ms] ease-[cubic-bezier(.2,.8,.2,1)]
                    ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"}
                `}>
                    {/* Spotlight */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[50%] bg-[#CFFF1A]/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[25%] bg-[#CFFF1A]/35 rounded-full blur-[80px] mix-blend-screen pointer-events-none animate-pulse"></div>

                    {/* Car image */}
                    <img
                        src={car.image || "/hero.png"}
                        alt={car.name}
                        className="relative z-10 w-full max-w-[620px] h-auto object-contain
                                   drop-shadow-[0_30px_60px_rgba(0,0,0,0.95)]
                                   hover:scale-105 transition-transform duration-700 cursor-crosshair"
                    />

                    {/* Car name below image */}
                    <div className="relative z-10 mt-4 text-center">
                        <p className="text-[8px] text-[#CFFF1A] uppercase tracking-[0.5em] font-black mb-1 drop-shadow-[0_0_10px_rgba(207,255,26,0.5)]">
                            {car.brand}
                        </p>
                        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white leading-none">
                            {car.name}
                        </h1>
                    </div>
                </section>

                {/* ────────────────────────────────
                    RIGHT — Booking card
                ──────────────────────────────── */}
                <aside className={`
                    w-full lg:w-[26%] flex flex-col justify-center
                    transition-all duration-[1200ms] ease-out delay-150
                    ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
                `}>
                    <div className="bg-[#0b1210]/80 backdrop-blur-2xl border border-[#CFFF1A]/15
                                    rounded-[2rem] p-7 relative overflow-hidden
                                    shadow-[0_0_60px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(207,255,26,0.08)]">

                        {/* Card inner glow */}
                        <div className="pointer-events-none absolute -top-24 -right-24 w-[280px] h-[280px] bg-[#CFFF1A]/10 rounded-full blur-[80px]"></div>
                        <div className="pointer-events-none absolute -bottom-20 -left-10 w-[200px] h-[200px] bg-[#CFFF1A]/6 rounded-full blur-[70px]"></div>

                        <div className="relative z-10 flex flex-col gap-6">

                            {/* Price */}
                            <div>
                                <p className="text-[8px] text-[#CFFF1A] uppercase tracking-[0.4em] font-black mb-2">Daily Tariff</p>
                                <div className="flex items-end gap-2">
                                    <span className="text-5xl font-black text-white leading-none">${car.price_per_day}</span>
                                    <span className="text-gray-500 text-[9px] uppercase tracking-widest font-bold mb-1">/ day</span>
                                </div>
                            </div>

                            {/* Separator */}
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#CFFF1A]/20 to-transparent"></div>

                            {/* Dates + CTA (opens modal) */}
                            <div className="flex flex-col gap-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <label className="flex flex-col gap-1.5">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-[0.3em] font-black">Pick-up</span>
                                        <input
                                            type="date" min={today}
                                            value={pickupDate}
                                            onChange={e => setPickupDate(e.target.value)}
                                            className="w-full bg-black/50 border border-white/[0.07] rounded-xl px-3 py-3
                                                       text-[11px] text-white focus:outline-none focus:border-[#CFFF1A]/50
                                                       focus:ring-1 focus:ring-[#CFFF1A]/20 transition-all [color-scheme:dark]"
                                        />
                                    </label>
                                    <label className="flex flex-col gap-1.5">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-[0.3em] font-black">Return</span>
                                        <input
                                            type="date" min={pickupDate || today}
                                            value={returnDate}
                                            onChange={e => setReturnDate(e.target.value)}
                                            className="w-full bg-black/50 border border-white/[0.07] rounded-xl px-3 py-3
                                                       text-[11px] text-white focus:outline-none focus:border-[#CFFF1A]/50
                                                       focus:ring-1 focus:ring-[#CFFF1A]/20 transition-all [color-scheme:dark]"
                                        />
                                    </label>
                                </div>

                                {/* Estimated total */}
                                {estimated !== null && (
                                    <div className="flex items-center justify-between bg-[#CFFF1A]/8 border border-[#CFFF1A]/15 rounded-xl px-4 py-2.5">
                                        <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">{days}d estimate</span>
                                        <span className="text-[#CFFF1A] font-black text-sm">${estimated}</span>
                                    </div>
                                )}

                                {/* Open modal CTA */}
                                <button
                                    type="button"
                                    disabled={!pickupDate || !returnDate}
                                    onClick={() => setModalOpen(true)}
                                    className="relative w-full py-4 mt-1 rounded-2xl overflow-hidden
                                               font-black text-[10px] tracking-[0.35em] uppercase
                                               flex items-center justify-center gap-2
                                               bg-[#CFFF1A] text-black
                                               shadow-[0_8px_30px_rgba(207,255,26,0.25)]
                                               hover:shadow-[0_12px_40px_rgba(207,255,26,0.45)]
                                               disabled:opacity-30 disabled:cursor-not-allowed
                                               transition-all duration-500 group"
                                >
                                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-700 skew-x-[-15deg]"></div>
                                    <span className="relative z-10">
                                        {pickupDate && returnDate ? "Book Now →" : "Select Dates First"}
                                    </span>
                                </button>
                            </div>

                            {/* Trust line */}
                            <p className="text-center text-[8px] text-gray-600 uppercase tracking-[0.25em] font-bold">
                                Free cancellation · 24/7 support
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
