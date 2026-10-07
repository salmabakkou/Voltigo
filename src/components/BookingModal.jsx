"use client";

import { useState, useRef } from "react";
import { createReservation } from "../services/api";
import { 
    Building2, 
    Home, 
    Calendar, 
    Clock, 
    MapPin, 
    User, 
    Mail, 
    Phone, 
    FileText, 
    CreditCard, 
    ShieldCheck, 
    Upload, 
    CheckCircle2, 
    X, 
    ChevronRight, 
    ArrowLeft,
    Check
} from "lucide-react";

/* ─── Constants ─────────────────────────────── */
const AGENCIES = ["Casablanca – Maarif", "Rabat – Agdal", "Marrakech – Gueliz", "Fès – Centre"];
const CITIES   = ["Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Agadir"];
const SLOTS    = ["08:00 – 10:00", "10:00 – 12:00", "12:00 – 14:00", "14:00 – 16:00", "16:00 – 18:00"];
const COUNTRIES = ["Morocco", "France", "Spain", "Germany", "United Kingdom", "USA", "Other"];
const RETURN_OPTS = ["Same agency", "Different agency", "Home delivery"];
const STEPS = ["Pickup & Options", "Info & Documents", "Payment & Deposit"];

/* ─── UI Helpers ──────────────────────────── */
function Label({ children }) {
    return <span className="text-xs text-[#CFFF1A] uppercase tracking-wider font-semibold mb-1.5 flex items-center gap-1.5">{children}</span>;
}

function ErrorMsg({ msg }) {
    return msg ? <span className="text-red-400 text-xs font-medium mt-1">{msg}</span> : null;
}

function Input({ label, icon: Icon, error, ...props }) {
    return (
        <div className="flex flex-col">
            {label && <Label>{label}</Label>}
            <div className="relative flex items-center">
                {Icon && (
                    <div className="absolute left-3.5 text-[#CFFF1A]/60 flex items-center justify-center pointer-events-none">
                        <Icon className="w-4 h-4" />
                    </div>
                )}
                <input
                    {...props}
                    className={`w-full bg-[#0a130e]/90 border rounded-xl py-3 text-sm text-white placeholder:text-gray-500
                                focus:outline-none transition-all [color-scheme:dark]
                                ${Icon ? "pl-10 pr-4" : "px-4"}
                                ${error ? "border-red-500/60 focus:border-red-400" : "border-[#CFFF1A]/20 focus:border-[#CFFF1A] focus:ring-1 focus:ring-[#CFFF1A]/30"}`}
                />
            </div>
            <ErrorMsg msg={error} />
        </div>
    );
}

function Select({ label, icon: Icon, error, children, ...props }) {
    return (
        <div className="flex flex-col">
            {label && <Label>{label}</Label>}
            <div className="relative flex items-center">
                {Icon && (
                    <div className="absolute left-3.5 text-[#CFFF1A]/60 flex items-center justify-center pointer-events-none z-10">
                        <Icon className="w-4 h-4" />
                    </div>
                )}
                <select
                    {...props}
                    className={`w-full bg-[#0a130e]/90 border rounded-xl py-3 text-sm text-white
                                focus:outline-none transition-all cursor-pointer appearance-none
                                ${Icon ? "pl-10 pr-4" : "px-4"}
                                ${error ? "border-red-500/60 focus:border-red-400" : "border-[#CFFF1A]/20 focus:border-[#CFFF1A] focus:ring-1 focus:ring-[#CFFF1A]/30"}`}
                >
                    {children}
                </select>
                <div className="absolute right-3.5 pointer-events-none text-gray-400 text-xs">▼</div>
            </div>
            <ErrorMsg msg={error} />
        </div>
    );
}

function Radio({ name, value, checked, onChange, label, icon: Icon }) {
    return (
        <label className="flex items-center gap-3 cursor-pointer group py-1.5">
            <div
                onClick={() => onChange(value)}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 shrink-0
                            ${checked ? "border-[#CFFF1A] bg-[#CFFF1A]/20 shadow-[0_0_10px_rgba(207,255,26,0.3)]" : "border-white/20 bg-transparent group-hover:border-[#CFFF1A]/50"}`}
            >
                {checked && <div className="w-2 h-2 rounded-full bg-[#CFFF1A]"></div>}
            </div>
            {Icon && <Icon className="w-4 h-4 text-[#CFFF1A]/70 group-hover:text-[#CFFF1A] transition-colors" />}
            <span className="text-sm text-white font-medium">{label}</span>
        </label>
    );
}

/* ─── File Upload ─────────────────────── */
function FileUpload({ label, accept = "image/*,.pdf", maxMb = 5, onFile, preview }) {
    const ref = useRef();
    const handle = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > maxMb * 1024 * 1024) return alert(`Max ${maxMb}MB`);
        onFile(file);
    };
    return (
        <div className="flex flex-col">
            <Label>{label}</Label>
            <div
                onClick={() => ref.current.click()}
                className="relative border border-dashed border-[#CFFF1A]/30 hover:border-[#CFFF1A] bg-[#CFFF1A]/5 hover:bg-[#CFFF1A]/10 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 group min-h-[100px]"
            >
                <input ref={ref} type="file" accept={accept} className="hidden" onChange={handle} />
                {preview ? (
                    preview.type.startsWith("image/") ? (
                        <img src={URL.createObjectURL(preview)} alt="preview" className="max-h-20 rounded-lg object-contain border border-[#CFFF1A]/40" />
                    ) : (
                        <div className="flex flex-col items-center gap-1.5">
                            <FileText className="w-8 h-8 text-[#CFFF1A]" />
                            <span className="text-xs text-[#CFFF1A] font-medium truncate max-w-[160px]">{preview.name}</span>
                        </div>
                    )
                ) : (
                    <>
                        <div className="w-10 h-10 rounded-full bg-[#CFFF1A]/10 border border-[#CFFF1A]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Upload className="w-5 h-5 text-[#CFFF1A]" />
                        </div>
                        <span className="text-xs text-gray-300 text-center">Click to upload (JPG, PNG, PDF · max {maxMb}MB)</span>
                    </>
                )}
            </div>
        </div>
    );
}

/* ─── Step bar ─────────────────────────── */
function StepBar({ current }) {
    return (
        <div className="flex items-center gap-2 mb-6">
            {STEPS.map((s, i) => {
                const done   = i < current;
                const active = i === current;
                return (
                    <div key={s} className="flex items-center flex-1 last:flex-none">
                        <div className="flex flex-col items-center gap-1.5">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                                            ${done   ? "bg-[#CFFF1A] text-black shadow-[0_0_15px_rgba(207,255,26,0.4)]"
                                                     : active ? "bg-[#CFFF1A]/20 border-2 border-[#CFFF1A] text-[#CFFF1A] shadow-[0_0_10px_rgba(207,255,26,0.2)]"
                                                              : "bg-white/5 border border-white/20 text-gray-400"}`}>
                                {done ? <Check className="w-4 h-4 text-black stroke-[3]" /> : i + 1}
                            </div>
                            <span className={`text-xs font-semibold whitespace-nowrap ${active ? "text-[#CFFF1A]" : done ? "text-white" : "text-gray-400"}`}>
                                {s}
                            </span>
                        </div>
                        {i < STEPS.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-3 mt-[-14px] transition-all duration-500 ${done ? "bg-[#CFFF1A]" : "bg-white/10"}`}></div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

/* ══════════════════════════════════════════════
   MAIN MODAL COMPONENT
══════════════════════════════════════════════ */
export default function BookingModal({ car, pickupDate, returnDate, onClose }) {

    /* ── Dates & pricing ── */
    const pd = pickupDate ? new Date(pickupDate) : null;
    const rd = returnDate ? new Date(returnDate)  : null;
    const days = pd && rd ? Math.max(1, Math.ceil((rd - pd) / 86_400_000)) : 1;
    const basePrice  = (car.price_per_day || 0) * days;
    const [step, setStep] = useState(0);

    /* ── Step 1 state ── */
    const [pickupMode, setPickupMode]   = useState("agency");
    const [pickupAgency, setPickupAgency] = useState("");
    const [deliveryAddr, setDeliveryAddr] = useState("");
    const [deliveryCity, setDeliveryCity] = useState("");
    const [deliverySlot, setDeliverySlot] = useState("");
    const [deliveryNote, setDeliveryNote] = useState("");
    const [returnMode, setReturnMode]   = useState("Same agency");
    const [errs1, setErrs1] = useState({});

    /* ── Step 2 state ── */
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName]   = useState("");
    const [email, setEmail]         = useState("");
    const [phone, setPhone]         = useState("");
    const [licenseNo, setLicenseNo] = useState("");
    const [licenseDate, setLicenseDate] = useState("");
    const [country, setCountry]     = useState("");
    const [idNo, setIdNo]           = useState("");
    const [fileLicF, setFileLicF]   = useState(null);
    const [fileLicB, setFileLicB]   = useState(null);
    const [fileId, setFileId]       = useState(null);
    const [errs2, setErrs2] = useState({});

    /* ── Step 3 state ── */
    const [payMode, setPayMode]     = useState("online");
    const [depositMode, setDeposit] = useState("preauth");
    const [agreed, setAgreed]       = useState(false);
    const [errs3, setErrs3] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const deliveryFee = pickupMode === "delivery" ? 150 : 0;
    const totalPrice  = basePrice + deliveryFee;

    /* ── Validate step 1 ── */
    const validateStep1 = () => {
        const e = {};
        if (pickupMode === "agency"   && !pickupAgency) e.pickupAgency = "Please select an agency.";
        if (pickupMode === "delivery" && !deliveryAddr) e.deliveryAddr = "Delivery address is required.";
        if (pickupMode === "delivery" && !deliveryCity) e.deliveryCity = "Please select a city.";
        if (pickupMode === "delivery" && !deliverySlot) e.deliverySlot = "Please select a time slot.";
        setErrs1(e);
        return !Object.keys(e).length;
    };

    /* ── Validate step 2 ── */
    const validateStep2 = () => {
        const e = {};
        if (!firstName.trim()) e.firstName = "First name is required.";
        if (!lastName.trim())  e.lastName  = "Last name is required.";
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email is required.";
        if (!phone.trim())     e.phone     = "Phone number is required.";
        if (!licenseNo.trim()) e.licenseNo = "License number is required.";
        if (!licenseDate)      e.licenseDate = "Issue date is required.";
        if (!country)          e.country   = "Please select country.";
        if (!idNo.trim())      e.idNo      = "ID / Passport number is required.";
        if (!fileLicF)         e.fileLicF  = "Please upload front side of license.";
        if (!fileLicB)         e.fileLicB  = "Please upload back side of license.";
        if (!fileId)           e.fileId    = "Please upload your ID document.";
        setErrs2(e);
        return !Object.keys(e).length;
    };

    /* ── Validate step 3 ── */
    const validateStep3 = () => {
        const e = {};
        if (!agreed) e.agreed = "You must accept the terms & conditions.";
        setErrs3(e);
        return !Object.keys(e).length;
    };

    const next = () => {
        if (step === 0 && !validateStep1()) return;
        if (step === 1 && !validateStep2()) return;
        setStep(s => s + 1);
    };
    const prev = () => setStep(s => s - 1);

    const [submitting, setSubmitting] = useState(false);

    const handleConfirm = async () => {
        if (!validateStep3()) return;
        setSubmitting(true);
        
        const reservationData = {
            id: Date.now().toString(),
            carId: car.id,
            carName: `${car.brand} ${car.name}`,
            pickupDate: pd?.toISOString(),
            returnDate: rd?.toISOString(),
            days,
            basePrice,
            deliveryFee,
            totalPrice,
            pickupMode,
            pickupAgency,
            deliveryAddr,
            deliveryCity,
            deliverySlot,
            deliveryNote,
            returnMode,
            customer: {
                firstName,
                lastName,
                email,
                phone,
                licenseNo,
                licenseDate,
                country,
                idNo,
            },
            payMode,
            depositMode,
            status: "confirmed",
            createdAt: new Date().toISOString(),
        };

        try {
            await createReservation(reservationData);
        } catch (err) {
            console.warn("MockAPI POST /reservations failed or endpoint does not exist yet. Saving locally to localStorage...", err);
            const existing = JSON.parse(localStorage.getItem("voltigo_reservations") || "[]");
            existing.push(reservationData);
            localStorage.setItem("voltigo_reservations", JSON.stringify(existing));
        } finally {
            setSubmitting(false);
            setSubmitted(true);
        }
    };

    const handleClose = () => {
        const dirty = firstName || lastName || email || phone || licenseNo || deliveryAddr;
        if (dirty) {
            if (!confirm("You have unsaved information. Are you sure you want to close?")) return;
        }
        onClose();
    };

    const fmtDate = (d) => d ? d.toLocaleDateString("en-GB", { day:"2-digit", month:"short", year:"numeric" }) : "—";

    return (
        /* Backdrop */
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md" onClick={handleClose}>
            
            {/* Modal container */}
            <div
                className="relative w-full max-w-2xl max-h-[92dvh] flex flex-col bg-[#050B08] border border-[#CFFF1A]/30
                           rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(207,255,26,0.15)]
                           overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                {/* ── Background Glow Effect ── */}
                <div className="pointer-events-none absolute top-0 right-0 w-[350px] h-[350px] bg-[#CFFF1A]/10 rounded-full blur-[110px]"></div>

                {/* ══ HEADER ══ */}
                <div className="relative z-10 px-6 pt-6 pb-2 shrink-0">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <span className="text-xs text-[#CFFF1A] uppercase tracking-widest font-semibold flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-[#CFFF1A]" /> Reservation
                            </span>
                            <h2 className="text-2xl font-bold text-white tracking-tight">
                                {car.brand} {car.name}
                            </h2>
                        </div>
                        <button onClick={handleClose} className="w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:border-red-500/50 hover:bg-red-500/10 flex items-center justify-center transition-all duration-300 group">
                            <X className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
                        </button>
                    </div>

                    {/* Summary banner */}
                    <div className="flex items-center justify-between bg-[#0e1a13] border border-[#CFFF1A]/20 rounded-2xl px-5 py-3 mb-6 flex-wrap gap-3">
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-[#CFFF1A]" />
                            <div className="flex items-center gap-2">
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400 font-medium">Pickup</span>
                                    <span className="text-sm text-white font-semibold">{fmtDate(pd)}</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-[#CFFF1A]" />
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400 font-medium">Return</span>
                                    <span className="text-sm text-white font-semibold">{fmtDate(rd)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="flex flex-col items-end">
                                <span className="text-xs text-gray-400 font-medium">Duration</span>
                                <span className="text-sm text-white font-semibold">{days} day{days > 1 ? "s" : ""}</span>
                            </div>
                            <div className="flex flex-col items-end border-l border-white/10 pl-5">
                                <span className="text-xs text-gray-400 font-medium">Total Price</span>
                                <span className="text-lg text-[#CFFF1A] font-bold">${totalPrice}</span>
                            </div>
                        </div>
                    </div>

                    {/* Step bar */}
                    {!submitted && <StepBar current={step} />}
                </div>

                {/* ══ SCROLLABLE BODY ══ */}
                <div className="relative z-10 flex-1 overflow-y-auto px-6 pb-6 scrollbar-thin scrollbar-thumb-[#CFFF1A]/30 scrollbar-track-transparent">

                    {/* ──────────── SUCCESS ──────────── */}
                    {submitted && (
                        <div className="flex flex-col items-center justify-center py-12 gap-5 text-center">
                            <div className="w-20 h-20 rounded-full bg-[#CFFF1A]/20 border-2 border-[#CFFF1A] flex items-center justify-center shadow-[0_0_30px_rgba(207,255,26,0.3)]">
                                <CheckCircle2 className="w-10 h-10 text-[#CFFF1A]" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h3>
                                <p className="text-gray-300 text-sm">We have sent a confirmation email to <span className="text-[#CFFF1A] font-semibold">{email}</span></p>
                            </div>
                            <div className="bg-[#0e1a13] border border-[#CFFF1A]/20 rounded-2xl p-5 text-left w-full max-w-md flex flex-col gap-2.5">
                                <div className="flex justify-between">
                                    <span className="text-gray-400 text-sm">Vehicle</span>
                                    <span className="text-white text-sm font-semibold">{car.brand} {car.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400 text-sm">Dates</span>
                                    <span className="text-white text-sm font-semibold">{fmtDate(pd)} – {fmtDate(rd)}</span>
                                </div>
                                <div className="flex justify-between border-t border-white/10 pt-2.5 mt-1">
                                    <span className="text-gray-400 text-sm font-medium">Total Estimated</span>
                                    <span className="text-[#CFFF1A] text-base font-bold">${totalPrice}</span>
                                </div>
                            </div>
                            <button onClick={onClose} className="mt-2 px-8 py-3 bg-[#CFFF1A] text-black font-bold text-sm rounded-xl hover:bg-[#b8e617] shadow-[0_0_20px_rgba(207,255,26,0.3)] transition-all">
                                Close Window
                            </button>
                        </div>
                    )}

                    {/* ──────────── STEP 1 ──────────── */}
                    {!submitted && step === 0 && (
                        <div className="flex flex-col gap-5">
                            {/* Pickup mode */}
                            <div className="flex flex-col gap-2">
                                <Label>Pickup Method</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button type="button"
                                        onClick={() => setPickupMode("agency")}
                                        className={`flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 text-left
                                                    ${pickupMode === "agency"
                                                        ? "border-[#CFFF1A] bg-[#CFFF1A]/10 text-white shadow-[0_0_15px_rgba(207,255,26,0.15)]"
                                                        : "border-white/10 bg-white/5 text-gray-300 hover:border-white/30"}`}
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-[#CFFF1A]/10 border border-[#CFFF1A]/30 flex items-center justify-center shrink-0">
                                            <Building2 className="w-5 h-5 text-[#CFFF1A]" />
                                        </div>
                                        <div>
                                            <span className="text-sm font-bold block">Agency Pickup</span>
                                            <span className="text-xs text-gray-400">Collect from branch</span>
                                        </div>
                                    </button>

                                    <button type="button"
                                        onClick={() => setPickupMode("delivery")}
                                        className={`flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 text-left
                                                    ${pickupMode === "delivery"
                                                        ? "border-[#CFFF1A] bg-[#CFFF1A]/10 text-white shadow-[0_0_15px_rgba(207,255,26,0.15)]"
                                                        : "border-white/10 bg-white/5 text-gray-300 hover:border-white/30"}`}
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-[#CFFF1A]/10 border border-[#CFFF1A]/30 flex items-center justify-center shrink-0">
                                            <Home className="w-5 h-5 text-[#CFFF1A]" />
                                        </div>
                                        <div>
                                            <span className="text-sm font-bold block">Home Delivery</span>
                                            <span className="text-xs text-gray-400">Delivered to location</span>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* Agency dropdown */}
                            {pickupMode === "agency" && (
                                <Select label="Select Pickup Agency" icon={Building2} value={pickupAgency} onChange={e => setPickupAgency(e.target.value)} error={errs1.pickupAgency}>
                                    <option value="">Choose an agency…</option>
                                    {AGENCIES.map(a => <option key={a} value={a}>{a}</option>)}
                                </Select>
                            )}

                            {/* Delivery fields */}
                            {pickupMode === "delivery" && (
                                <div className="flex flex-col gap-4 p-5 bg-[#0e1a13] border border-[#CFFF1A]/20 rounded-2xl">
                                    <span className="text-xs font-bold text-[#CFFF1A] uppercase tracking-wider flex items-center gap-1.5">
                                        <Home className="w-4 h-4 text-[#CFFF1A]" /> Delivery Information
                                    </span>
                                    <Input label="Exact Address" icon={MapPin} placeholder="Street name, building number..."
                                        value={deliveryAddr} onChange={e => setDeliveryAddr(e.target.value)} error={errs1.deliveryAddr}/>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Select label="City" icon={Building2} value={deliveryCity} onChange={e => setDeliveryCity(e.target.value)} error={errs1.deliveryCity}>
                                            <option value="">Select city…</option>
                                            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                                        </Select>
                                        <Select label="Time Slot" icon={Clock} value={deliverySlot} onChange={e => setDeliverySlot(e.target.value)} error={errs1.deliverySlot}>
                                            <option value="">Select time slot…</option>
                                            {SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
                                        </Select>
                                    </div>
                                    <Input label="Landmark / Instructions" icon={FileText} placeholder="Near central park, 3rd entrance..."
                                        value={deliveryNote} onChange={e => setDeliveryNote(e.target.value)}/>
                                </div>
                            )}

                            {/* Return method */}
                            <Select label="Return Method" icon={MapPin} value={returnMode} onChange={e => setReturnMode(e.target.value)}>
                                {RETURN_OPTS.map(o => <option key={o} value={o}>{o}</option>)}
                            </Select>
                        </div>
                    )}

                    {/* ──────────── STEP 2 ──────────── */}
                    {!submitted && step === 1 && (
                        <div className="flex flex-col gap-5">
                            {/* Personal info */}
                            <div className="flex flex-col gap-4">
                                <span className="text-xs font-bold text-[#CFFF1A] uppercase tracking-wider flex items-center gap-1.5">
                                    <User className="w-4 h-4 text-[#CFFF1A]" /> Personal Information
                                </span>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="First Name" icon={User} placeholder="Alex" value={firstName} onChange={e => setFirstName(e.target.value)} error={errs2.firstName}/>
                                    <Input label="Last Name" icon={User} placeholder="Morgan" value={lastName} onChange={e => setLastName(e.target.value)} error={errs2.lastName}/>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="Email Address" type="email" icon={Mail} placeholder="alex@example.com" value={email} onChange={e => setEmail(e.target.value)} error={errs2.email}/>
                                    <Input label="Phone Number" type="tel" icon={Phone} placeholder="+212 6 00 00 00 00" value={phone} onChange={e => setPhone(e.target.value)} error={errs2.phone}/>
                                </div>
                            </div>

                            {/* Driving licence */}
                            <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
                                <span className="text-xs font-bold text-[#CFFF1A] uppercase tracking-wider flex items-center gap-1.5">
                                    <FileText className="w-4 h-4 text-[#CFFF1A]" /> License & Identification
                                </span>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="License Number" icon={FileText} placeholder="DL-987654" value={licenseNo} onChange={e => setLicenseNo(e.target.value)} error={errs2.licenseNo}/>
                                    <Input label="Issue Date" type="date" icon={Calendar} value={licenseDate} onChange={e => setLicenseDate(e.target.value)} error={errs2.licenseDate}/>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Select label="Country of Issue" icon={Building2} value={country} onChange={e => setCountry(e.target.value)} error={errs2.country}>
                                        <option value="">Select country…</option>
                                        {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </Select>
                                    <Input label="ID / Passport Number" icon={FileText} placeholder="ID-123456" value={idNo} onChange={e => setIdNo(e.target.value)} error={errs2.idNo}/>
                                </div>
                            </div>

                            {/* Documents upload */}
                            <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
                                <span className="text-xs font-bold text-[#CFFF1A] uppercase tracking-wider flex items-center gap-1.5">
                                    <Upload className="w-4 h-4 text-[#CFFF1A]" /> Upload Documents
                                </span>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <FileUpload label="Driver License (Front)" onFile={setFileLicF} preview={fileLicF}/>
                                        <ErrorMsg msg={errs2.fileLicF}/>
                                    </div>
                                    <div>
                                        <FileUpload label="Driver License (Back)" onFile={setFileLicB} preview={fileLicB}/>
                                        <ErrorMsg msg={errs2.fileLicB}/>
                                    </div>
                                </div>
                                <div>
                                    <FileUpload label="ID / Passport Document" accept="image/*,.pdf" onFile={setFileId} preview={fileId}/>
                                    <ErrorMsg msg={errs2.fileId}/>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ──────────── STEP 3 ──────────── */}
                    {!submitted && step === 2 && (
                        <div className="flex flex-col gap-6">
                            {/* Payment */}
                            <div className="flex flex-col gap-3">
                                <span className="text-xs font-bold text-[#CFFF1A] uppercase tracking-wider flex items-center gap-1.5">
                                    <CreditCard className="w-4 h-4 text-[#CFFF1A]" /> Payment Method
                                </span>
                                <div className="flex flex-col gap-2 p-4 bg-white/5 border border-white/10 rounded-2xl">
                                    <Radio name="pay" value="online" checked={payMode === "online"} onChange={setPayMode} label="Online Payment (Credit Card)" icon={CreditCard}/>
                                    <Radio name="pay" value="onsite" checked={payMode === "onsite"} onChange={setPayMode} label="Pay on Pickup / Delivery (Card or Cash)" icon={Building2}/>
                                </div>
                            </div>

                            {/* Deposit */}
                            <div className="flex flex-col gap-3">
                                <span className="text-xs font-bold text-[#CFFF1A] uppercase tracking-wider flex items-center gap-1.5">
                                    <ShieldCheck className="w-4 h-4 text-[#CFFF1A]" /> Security Deposit
                                </span>
                                <div className="flex flex-col gap-2 p-4 bg-white/5 border border-white/10 rounded-2xl">
                                    <Radio name="dep" value="preauth" checked={depositMode === "preauth"} onChange={setDeposit} label="Credit Card Pre-authorization (Hold)" icon={CreditCard}/>
                                    <Radio name="dep" value="cheque"  checked={depositMode === "cheque"}  onChange={setDeposit} label="Guarantee Check" icon={FileText}/>
                                </div>
                            </div>

                            {/* Cost breakdown */}
                            <div className="flex flex-col bg-[#0a130e] border border-[#CFFF1A]/20 rounded-2xl overflow-hidden">
                                <div className="px-5 py-3.5 border-b border-white/10 flex justify-between items-center text-sm">
                                    <span className="text-gray-300">Vehicle Rental ({days} day{days > 1 ? "s" : ""} × ${car.price_per_day})</span>
                                    <span className="text-white font-semibold">${basePrice}</span>
                                </div>
                                {deliveryFee > 0 && (
                                    <div className="px-5 py-3.5 border-b border-white/10 flex justify-between items-center text-sm">
                                        <span className="text-gray-300">Home Delivery Fee</span>
                                        <span className="text-white font-semibold">${deliveryFee}</span>
                                    </div>
                                )}
                                <div className="px-5 py-4 bg-[#CFFF1A]/10 flex justify-between items-center text-base">
                                    <span className="text-white font-bold">Total Price</span>
                                    <span className="text-xl text-[#CFFF1A] font-bold">${totalPrice}</span>
                                </div>
                            </div>

                            {/* Terms checkbox */}
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <div
                                    onClick={() => setAgreed(a => !a)}
                                    className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all duration-300
                                                ${agreed ? "border-[#CFFF1A] bg-[#CFFF1A]" : "border-white/30 bg-transparent group-hover:border-[#CFFF1A]"}`}
                                >
                                    {agreed && <Check className="w-3.5 h-3.5 text-black stroke-[3]" />}
                                </div>
                                <span className="text-sm text-gray-300 leading-relaxed">
                                    I agree to the <span className="text-[#CFFF1A] font-semibold underline">Terms & Conditions</span> and <span className="text-[#CFFF1A] font-semibold underline">Rental Policy</span>.
                                </span>
                            </label>
                            {errs3.agreed && <ErrorMsg msg={errs3.agreed}/>}
                        </div>
                    )}
                </div>

                {/* ══ FOOTER ACTIONS ══ */}
                {!submitted && (
                    <div className="relative z-10 px-6 py-4 border-t border-white/10 flex items-center justify-between gap-4 shrink-0 bg-[#050B08]">
                        {step > 0 ? (
                            <button onClick={prev} className="px-6 py-3 border border-white/20 rounded-xl text-sm text-gray-300 font-semibold hover:border-white hover:text-white transition-all flex items-center gap-2">
                                <ArrowLeft className="w-4 h-4 text-[#CFFF1A]" /> Back
                            </button>
                        ) : <div/>}

                        {step < 2 ? (
                            <button onClick={next} className="px-8 py-3 bg-[#CFFF1A] text-black font-bold text-sm rounded-xl hover:bg-[#b8e617] shadow-[0_0_20px_rgba(207,255,26,0.3)] transition-all flex items-center gap-2">
                                Continue <ChevronRight className="w-4 h-4 stroke-[3]" />
                            </button>
                        ) : (
                            <button onClick={handleConfirm} disabled={submitting} className="px-8 py-3 bg-[#CFFF1A] text-black font-bold text-sm rounded-xl hover:bg-[#b8e617] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_25px_rgba(207,255,26,0.4)] transition-all flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 stroke-[3]" /> {submitting ? "Saving..." : "Confirm Booking"}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
