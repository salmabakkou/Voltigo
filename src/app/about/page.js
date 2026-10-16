"use client";

import Image from "next/image";
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
    CheckCircle2,
    Activity,
    Compass,
    Cpu,
    Radio,
    ChevronDown,
    ChevronRight,
    Clock,
    Award
} from "lucide-react";
import Footer from "../../components/Footer";

export default function AboutPage() {
    const [mounted, setMounted] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [openFaq, setOpenFaq] = useState(null);

    // Track mouse for ambient spotlight glow
    useEffect(() => {
        setMounted(true);
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const highlights = [
        { icon: Leaf, label: "100% Electric Fleet" },
        { icon: Shield, label: "All-Risk Protection" },
        { icon: Sparkles, label: "First in Morocco" },
        { icon: Globe, label: "Zero Direct Emission" },
    ];

    const values = [
        {
            code: "VAL-01",
            icon: Leaf,
            title: "Eco By Design",
            subtitle: "Absolute Sustainability",
            text: "Every vehicle is 100% electric or hybrid high-performance. Clean mobility is not an option — it is our non-negotiable benchmark.",
        },
        {
            code: "VAL-02",
            icon: Zap,
            title: "Instant Raw Torque",
            subtitle: "Unmatched Acceleration",
            text: "Instant permanent-magnet motor torque delivers adrenaline-pumping 0-100 km/h in absolute, serene silence. Driving reimagined.",
        },
        {
            code: "VAL-03",
            icon: Shield,
            title: "Quantum Security",
            subtitle: "Comprehensive Coverage",
            text: "Full all-risk insurance coverage, 24/7 dedicated satellite breakdown assistance, and complete price transparency. Zero hidden surcharges.",
        },
        {
            code: "VAL-04",
            icon: Globe,
            title: "Net Zero Footprint",
            subtitle: "Carbon Offsetting",
            text: "We offset 100% of our operations. Partnered exclusively with certified green solar energy suppliers throughout Morocco.",
        },
        {
            code: "VAL-05",
            icon: Battery,
            title: "Ultra-Fast Charging",
            subtitle: "Voltigo Pass Network",
            text: "Unrestricted high-speed charging pass included with every rental across 350+ certified solar charging stations nationwide.",
        },
        {
            code: "VAL-06",
            icon: Car,
            title: "Curated Hyper Fleet",
            subtitle: "Precision Engineering",
            text: "Porsche Taycan, Tesla Plaid, BMW i-Series, Audi RS e-tron GT. We acquire and maintain solely world-class electric machinery.",
        },
    ];

    const commitments = [
        "First 100% all-electric luxury rental platform in the Kingdom of Morocco",
        "Zero direct grams of CO₂ emissions across every single rental kilometer",
        "Comprehensive all-risk insurance policy included standard on all bookings",
        "Dedicated 24/7 bilingual mechanical & roadside satellite concierge",
        "100% frictionless contactless reservation and digital mobile key handover",
        "Rigorous 40-point technical inspection and 100% battery charge before dispatch",
        "Complimentary booking cancellation up to 24 hours prior to departure",
        "Exclusive access to Morocco's rapidly expanding 350+ solar charging hubs",
    ];

    const roadmap = [
        {
            year: "2024",
            title: "The Electric Genesis",
            desc: "Inception of Voltigo. Launch of the initial high-voltage fleet operating seamlessly across Casablanca and Marrakech.",
            status: "Completed"
        },
        {
            year: "2025",
            title: "Nationwide Grid Deployment",
            desc: "Expansion into Tangier, Rabat, and Agadir with dedicated fast-charging corridors along Morocco's principal highways.",
            status: "Active"
        },
        {
            year: "2026",
            title: "Autonomous Fleet Telemetry",
            desc: "Integration of AI satellite cockpit diagnostics, predictive battery thermal conditioning, and biometric vehicle access.",
            status: "In Progress"
        },
        {
            year: "2028",
            title: "Carbon-Negative Ecosystem",
            desc: "1 million cumulative zero-emission kilometers achieved with excess solar generation returned to local Moroccan power grids.",
            status: "Vision 2028"
        }
    ];

    const faqs = [
        {
            q: "How does charging work with a Voltigo vehicle in Morocco?",
            a: "Every Voltigo vehicle is equipped with a complimentary Voltigo Universal Supercharger Pass. This card unlocks high-speed charging stations across major Moroccan cities without additional cost. The on-board navigation automatically routes you to the optimal station."
        },
        {
            q: "What is the verified real-world range of your fleet?",
            a: "Our vehicles boast certified real-world ranges between 480 km and 630 km per full charge. Even on expressways at 120 km/h with full climate control, routes like Casablanca to Marrakech are comfortably completed on a single charge."
        },
        {
            q: "Is comprehensive insurance included in the quoted price?",
            a: "Yes. Total price transparency is our core standard: all-risk insurance coverage, 24/7 zero-kilometer roadside rescue, and an additional driver are included standard on every booking."
        },
        {
            q: "Can I receive vehicle delivery directly at an airport or luxury hotel?",
            a: "Absolutely. Our VIP Valet Concierge delivers your vehicle fully detailed and charged to 100% at Mohammed V (CMN), Marrakech Menara (RAK), Tangier Ibn Battouta (TNG), or your private residence."
        }
    ];

    return (
        <main className="min-h-screen bg-[#0A100E] text-white font-sans selection:bg-[#7CFF3C] selection:text-black overflow-x-hidden relative">
            
            {/* ══════════════════════════════════════════════════════════
                FUTURISTIC AMBIENCE & MOUSE SPOTLIGHT
            ══════════════════════════════════════════════════════════ */}
            <div
                className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 opacity-40 hidden lg:block"
                style={{
                    background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(207, 255, 26, 0.06), transparent 60%)`
                }}
            />

            {/* Subtle Matrix Grid */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.035] bg-[linear-gradient(to_right,#7CFF3C_1px,transparent_1px),linear-gradient(to_bottom,#7CFF3C_1px,transparent_1px)] bg-[size:4rem_4rem]" />

            {/* Glowing Corner Accents */}
            <div className="fixed top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#CFFF1A]/[0.04] rounded-full blur-[180px] pointer-events-none z-0 animate-pulse" />
            <div className="fixed bottom-[-15%] left-[-15%] w-[700px] h-[700px] bg-[#7CFF3C]/[0.03] rounded-full blur-[200px] pointer-events-none z-0" />

            {/* ══════════════════════════════════════════════════════════
                HERO SECTION — CINEMATIC ABOUTHERO BACKGROUND
            ══════════════════════════════════════════════════════════ */}
            <section className="relative w-full min-h-[100dvh] flex items-end overflow-hidden pb-16 pt-36">
                
                {/* Background Image with Cinematic Scale */}
                <div className={`absolute inset-0 z-0 transition-transform duration-[3500ms] ease-out ${mounted ? 'scale-100' : 'scale-105'}`}>
                    <Image
                        src="/abouthero.jpg"
                        alt="Voltigo Electric Hypercar"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-center brightness-[0.72] contrast-[1.15]"
                    />
                    {/* Atmospheric Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A100E] via-[#0A100E]/70 to-[#0A100E]/40" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0A100E] via-[#0A100E]/80 to-transparent w-full lg:w-4/5" />
                    
                    {/* High-Tech Scanline */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
                        <div className="voltigo-scanline absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#CFFF1A] to-transparent shadow-[0_0_15px_#CFFF1A]" />
                    </div>
                </div>

                {/* Top-Right HUD Badge */}
                <div className={`absolute top-28 right-6 md:right-16 z-20 hidden md:flex flex-col items-end gap-2 text-right transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
                    <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/60 border border-[#CFFF1A]/30 backdrop-blur-md shadow-[0_0_15px_rgba(207,255,26,0.15)]">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CFFF1A] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#CFFF1A]"></span>
                        </span>
                        <span className="text-[10px] font-mono tracking-widest text-[#CFFF1A] uppercase font-bold">
                            VOLTIGO ARCHIVE // ABOUT ECO-SYSTEM
                        </span>
                    </div>
                    <div className="text-[9px] font-mono text-gray-400 tracking-wider">
                        MOROCCO ELECTRIC CORRIDOR • ZERO CO₂ DIRECT
                    </div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
                    
                    {/* Subtitle tag */}
                    <div className={`inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#CFFF1A]/10 border border-[#CFFF1A]/30 backdrop-blur-md mb-6 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        <div className="w-2 h-2 rounded-full bg-[#CFFF1A] animate-pulse" />
                        <span className="text-[10px] md:text-xs font-mono font-bold tracking-[0.3em] uppercase text-[#CFFF1A]">
                            The Voltigo Genesis
                        </span>
                    </div>

                    {/* Massive Typography */}
                    <h1 className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.88] transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <span className="text-white drop-shadow-2xl">MOBILITY</span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CFFF1A] via-[#7CFF3C] to-[#CFFF1A] drop-shadow-[0_0_35px_rgba(207,255,26,0.4)]">
                            REINVENTED.
                        </span>
                    </h1>

                    {/* Mission Paragraph */}
                    <p className={`text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mt-8 font-light border-l-2 border-[#CFFF1A]/50 pl-5 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        Voltigo is the pioneering luxury vehicle rental platform <span className="text-[#CFFF1A] font-semibold">100% electric in Morocco</span>. Unrivaled dynamics, breathtaking performance, and ecological stewardship — with zero compromise.
                    </p>

                    {/* Highlight Pills */}
                    <div className={`flex flex-wrap gap-3 mt-8 transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {highlights.map((h, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md hover:border-[#CFFF1A]/40 transition-colors"
                            >
                                <h.icon className="w-3.5 h-3.5 text-[#CFFF1A]" />
                                <span className="text-xs font-mono font-bold tracking-wider uppercase text-gray-200">
                                    {h.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className={`flex flex-wrap items-center gap-4 mt-10 transition-all duration-1000 delay-900 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <Link
                            href="/cars"
                            className="group relative overflow-hidden inline-flex items-center gap-3 bg-[#CFFF1A] text-black px-8 py-4 rounded-xl font-black text-xs md:text-sm tracking-[0.2em] uppercase shadow-[0_0_30px_rgba(207,255,26,0.35)] hover:shadow-[0_0_55px_rgba(207,255,26,0.6)] transition-all duration-300 hover:scale-[1.02]"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Discover Fleet <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                            </span>
                            <span className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/60 to-transparent group-hover:translate-x-[150%] transition-transform duration-700 skew-x-[-20deg]" />
                        </Link>

                        <a
                            href="#mission"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md text-white font-bold text-xs md:text-sm tracking-[0.2em] uppercase hover:border-[#CFFF1A]/60 hover:text-[#CFFF1A] transition-all duration-300"
                        >
                            Our Mission <ChevronDown className="w-4 h-4" />
                        </a>
                    </div>

                </div>

                {/* Bottom Scroll Cue */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
                    <span className="text-[8px] font-mono uppercase tracking-[0.4em] text-gray-500">SCROLL DOWN</span>
                    <div className="w-[1px] h-8 bg-gradient-to-b from-[#CFFF1A] via-[#CFFF1A]/30 to-transparent animate-pulse" />
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                MISSION — SPLIT WITH GLOWING GYRO / HOLOGRAPHIC CORE
            ══════════════════════════════════════════════════════════ */}
            <section id="mission" className="relative py-28 px-6 md:px-16 lg:px-24 border-t border-white/[0.06] overflow-hidden">
                
                {/* Ambient glow */}
                <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-[#CFFF1A]/[0.04] rounded-full blur-[180px] pointer-events-none" />

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left Text */}
                    <div>
                        <div className="inline-flex items-center gap-2 text-[#CFFF1A] font-mono text-xs font-bold tracking-[0.3em] uppercase mb-4">
                            <Activity className="w-4 h-4" /> OUR PURPOSE & CORE MISSION
                        </div>
                        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight mb-6">
                            Making Clean Mobility <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CFFF1A] to-[#7CFF3C]">Effortlessly Accessible</span>
                        </h2>
                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 font-light">
                            At Voltigo, we believe the transition to a sustainable future happens on the open road. We have established Morocco&#39;s premier zero-emission fleet — accessible across major metropolitan and coastal gateways — allowing you to travel with complete freedom while leaving zero footprint behind.
                        </p>
                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light">
                            From executive business commutes in Casablanca Finance City to serene long-range expeditions across the Atlas to Marrakech and Tangier, our digital platform caters to discerning travelers with <span className="text-white font-semibold">uncompromising performance</span>.
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
                            <div>
                                <div className="text-2xl sm:text-3xl font-black font-mono text-[#CFFF1A]">100%</div>
                                <div className="text-[10px] text-gray-400 font-mono uppercase tracking-wider mt-1">Zero Emission Fleet</div>
                            </div>
                            <div>
                                <div className="text-2xl sm:text-3xl font-black font-mono text-[#CFFF1A]">350+</div>
                                <div className="text-[10px] text-gray-400 font-mono uppercase tracking-wider mt-1">Supercharger Hubs</div>
                            </div>
                            <div>
                                <div className="text-2xl sm:text-3xl font-black font-mono text-[#CFFF1A]">24/7</div>
                                <div className="text-[10px] text-gray-400 font-mono uppercase tracking-wider mt-1">Satellite Support</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Rotating Holographic Core */}
                    <div className="relative flex items-center justify-center py-12">
                        {/* Concentric Rotating Tech Rings */}
                        <div className="absolute w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] rounded-full border border-[#CFFF1A]/15 animate-spin-slow pointer-events-none" />
                        <div className="absolute w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] rounded-full border border-dashed border-[#7CFF3C]/20 animate-spin-reverse pointer-events-none" />
                        <div className="absolute w-[160px] h-[160px] rounded-full bg-[#CFFF1A]/[0.08] blur-[50px] pointer-events-none" />

                        {/* Central Power Core Badge */}
                        <div className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-[#0c1611] border-2 border-[#CFFF1A]/30 flex flex-col items-center justify-center gap-3 shadow-[0_0_60px_rgba(207,255,26,0.15)] group hover:border-[#CFFF1A] transition-colors duration-500">
                            <Leaf className="w-12 h-12 text-[#CFFF1A] drop-shadow-[0_0_15px_rgba(207,255,26,0.6)] group-hover:scale-110 transition-transform" />
                            <span className="text-4xl font-black text-white font-mono tracking-tight">100%</span>
                            <span className="text-[10px] text-[#CFFF1A] uppercase tracking-[0.3em] font-mono font-bold">Electric Pure</span>
                        </div>
                    </div>

                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                CORE VALUES — 6 RICH CYBERNETIC CARDS
            ══════════════════════════════════════════════════════════ */}
            <section className="relative py-28 px-6 md:px-16 lg:px-24 border-t border-white/[0.06]">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Header */}
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 text-[#CFFF1A] font-mono text-xs font-bold tracking-[0.3em] uppercase mb-3">
                            <Shield className="w-4 h-4" /> FOUNDATIONAL ETHOS
                        </div>
                        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight">
                            What <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CFFF1A] to-[#7CFF3C]">Defines Us</span>
                        </h2>
                        <p className="text-gray-400 text-xs sm:text-sm mt-3 font-light">
                            Six fundamental pillars that govern every vehicle curated into our fleet, every partner we ally with, and every customer interaction.
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {values.map((v) => {
                            const Icon = v.icon;
                            return (
                                <div
                                    key={v.code}
                                    className="group relative p-8 rounded-3xl border border-white/10 bg-[#09110D]/70 backdrop-blur-md hover:border-[#CFFF1A]/50 transition-all duration-500 overflow-hidden hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                                >
                                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#CFFF1A]/10 rounded-full blur-[40px] group-hover:bg-[#CFFF1A]/20 transition-all" />

                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-[10px] font-mono text-[#CFFF1A] font-bold tracking-widest">
                                            // {v.code}
                                        </span>
                                        <span className="text-[9px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 uppercase">
                                            {v.subtitle}
                                        </span>
                                    </div>

                                    <div className="w-12 h-12 rounded-2xl bg-[#CFFF1A]/10 border border-[#CFFF1A]/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#CFFF1A] transition-all duration-300">
                                        <Icon className="w-6 h-6 text-[#CFFF1A] group-hover:text-black transition-colors" />
                                    </div>

                                    <h3 className="text-lg font-bold text-white uppercase tracking-tight group-hover:text-[#CFFF1A] transition-colors mb-2">
                                        {v.title}
                                    </h3>
                                    <p className="text-xs text-gray-400 leading-relaxed font-light">
                                        {v.text}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                COMMITMENTS CHECKLIST — WHY CHOOSE VOLTIGO
            ══════════════════════════════════════════════════════════ */}
            <section className="relative py-28 px-6 md:px-16 lg:px-24 border-t border-white/[0.06]">
                <div className="max-w-7xl mx-auto">
                    
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 text-[#CFFF1A] font-mono text-xs font-bold tracking-[0.3em] uppercase mb-3">
                            <CheckCircle2 className="w-4 h-4" /> GUARANTEED QUALITY
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
                            Our Core <span className="text-[#CFFF1A]">Commitments</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {commitments.map((c, i) => (
                            <div
                                key={i}
                                className="group flex items-start gap-4 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-[#CFFF1A]/30 hover:bg-[#CFFF1A]/[0.02] transition-all duration-300"
                            >
                                <div className="w-6 h-6 rounded-full bg-[#CFFF1A]/10 border border-[#CFFF1A]/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#CFFF1A] transition-colors">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#CFFF1A] group-hover:text-black transition-colors" />
                                </div>
                                <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors leading-relaxed">
                                    {c}
                                </span>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                STRATEGIC ROADMAP (THE ROAD TO 2030)
            ══════════════════════════════════════════════════════════ */}
            <section className="relative py-28 px-6 md:px-16 lg:px-24 border-t border-white/[0.06] overflow-hidden">
                <div className="max-w-5xl mx-auto">
                    
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <div className="inline-flex items-center gap-2 text-[#CFFF1A] font-mono text-xs font-bold tracking-[0.3em] uppercase mb-3">
                            <Clock className="w-4 h-4" /> TIMELINE & EVOLUTION
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
                            Trajectory to <span className="text-[#CFFF1A]">2030</span>
                        </h2>
                    </div>

                    <div className="relative border-l border-[#CFFF1A]/30 ml-4 md:ml-32 space-y-12">
                        {roadmap.map((step) => (
                            <div key={step.year} className="relative pl-8 md:pl-12 group">
                                
                                {/* Pulse Node */}
                                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#0A100E] border-2 border-[#CFFF1A] flex items-center justify-center group-hover:scale-125 transition-transform shadow-[0_0_12px_#CFFF1A]">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#CFFF1A] animate-ping" />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 mb-2">
                                    <span className="text-2xl sm:text-3xl font-black font-mono text-[#CFFF1A]">
                                        {step.year}
                                    </span>
                                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white group-hover:text-[#CFFF1A] transition-colors">
                                        {step.title}
                                    </h3>
                                    <span className="inline-block text-[9px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#CFFF1A]/10 text-[#CFFF1A] border border-[#CFFF1A]/30 w-fit">
                                        {step.status}
                                    </span>
                                </div>

                                <p className="text-xs sm:text-sm text-gray-400 font-light max-w-xl leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                MANIFESTO FULL BLEED QUOTE
            ══════════════════════════════════════════════════════════ */}
            <section className="relative py-28 px-6 border-y border-white/[0.06] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                    <span className="text-[20vw] font-black uppercase tracking-tighter whitespace-nowrap opacity-[0.02]"
                        style={{ WebkitTextStroke: "1px rgba(207,255,26,0.15)", color: "transparent" }}>
                        CLEAN DRIVE
                    </span>
                </div>
                <div className="absolute inset-0 bg-[#CFFF1A]/[0.015]" />

                <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
                    <Sparkles className="w-7 h-7 text-[#CFFF1A]/60" />
                    <blockquote className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                        &ldquo;The car of tomorrow <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CFFF1A] to-[#7CFF3C]">should never cost our planet&#39;s future</span> — it must actively build it.&rdquo;
                    </blockquote>
                    <p className="text-gray-400 text-xs sm:text-sm max-w-lg leading-relaxed font-light">
                        Every single kilometer driven with Voltigo directly contributes to a cleaner, quieter, and ecologically resilient Morocco.
                    </p>
                    <div className="h-px w-20 bg-[#CFFF1A]/30 mt-2" />
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                FAQ & PROTOCOLS ACCORDION
            ══════════════════════════════════════════════════════════ */}
            <section className="relative py-28 px-6 md:px-16 lg:px-24 border-t border-white/[0.06]">
                <div className="max-w-4xl mx-auto">
                    
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 text-[#CFFF1A] font-mono text-xs font-bold tracking-[0.3em] uppercase mb-3">
                            <Radio className="w-4 h-4" /> FAQ & PROTOCOLS
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
                            Frequently Asked <span className="text-[#CFFF1A]">Questions</span>
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div
                                    key={idx}
                                    className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-[#CFFF1A]/40"
                                >
                                    <button
                                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                                        className="w-full p-6 text-left flex items-center justify-between gap-4"
                                    >
                                        <span className="font-bold text-sm sm:text-base text-white uppercase tracking-wide">
                                            {faq.q}
                                        </span>
                                        <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? "rotate-90 border-[#CFFF1A] text-[#CFFF1A]" : "text-gray-400"}`}>
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </button>

                                    {isOpen && (
                                        <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-gray-300 font-light leading-relaxed border-t border-white/5 animate-fadeIn">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                FINAL HIGH-TECH CTA
            ══════════════════════════════════════════════════════════ */}
            <section className="relative py-32 px-6 md:px-16 lg:px-24 border-t border-white/[0.06] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[600px] h-[600px] rounded-full bg-[#CFFF1A]/[0.08] blur-[170px] animate-pulse" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#CFFF1A]/10 border border-[#CFFF1A]/30 text-[#CFFF1A] font-mono text-xs font-bold uppercase tracking-widest mb-6">
                        <Sparkles className="w-4 h-4" /> EXPEDITION READY
                    </div>

                    <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-tight">
                        ZERO DIRECT EMISSIONS.
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CFFF1A] via-[#7CFF3C] to-[#CFFF1A] drop-shadow-[0_0_35px_rgba(207,255,26,0.5)]">
                            ZERO LIMITS.
                        </span>
                    </h2>

                    <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl font-light leading-relaxed mt-6 mb-10">
                        Reserve an elite electric vehicle in under 60 seconds. Zero paperwork. Zero carbon emissions. Pure open road.
                    </p>

                    <Link
                        href="/cars"
                        className="group relative overflow-hidden inline-flex items-center gap-3 bg-[#CFFF1A] text-black px-10 py-5 rounded-2xl font-black text-xs md:text-sm uppercase tracking-[0.2em] shadow-[0_0_35px_rgba(207,255,26,0.4)] hover:shadow-[0_0_70px_rgba(207,255,26,0.7)] transition-all duration-300 hover:scale-105"
                    >
                        <Car className="w-5 h-5 relative z-10" />
                        <span className="relative z-10">Discover The Fleet</span>
                        <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1.5 transition-transform" />
                        <span className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:translate-x-[150%] transition-transform duration-700 skew-x-[-20deg]" />
                    </Link>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-10">
                        <span>✓ Complimentary Cancellation</span>
                        <span>•</span>
                        <span>✓ Instant Digital Confirmation</span>
                        <span>•</span>
                        <span>✓ 24/7 Satellite Support</span>
                    </div>
                </div>
            </section>

            {/* Global Footer */}
            <Footer />

            {/* Custom Animations */}
            <style jsx global>{`
                @keyframes scanlineMove {
                    0% {
                        top: -10%;
                    }
                    100% {
                        top: 110%;
                    }
                }
                .voltigo-scanline {
                    animation: scanlineMove 6s linear infinite;
                }
                @keyframes spinSlow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes spinReverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                .animate-spin-slow {
                    animation: spinSlow 30s linear infinite;
                }
                .animate-spin-reverse {
                    animation: spinReverse 20s linear infinite;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-4px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }
            `}</style>

        </main>
    );
}
