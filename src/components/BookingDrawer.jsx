"use client";

import { useState, useRef, useEffect } from "react";

/* ─── Data ──────────────────────────────────── */
const AGENCIES    = ["Casablanca — Maarif", "Rabat — Agdal", "Marrakech — Gueliz", "Fès — Centre"];
const CITIES      = ["Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Agadir"];
const SLOTS       = ["08:00 – 10:00", "10:00 – 12:00", "12:00 – 14:00", "14:00 – 16:00", "16:00 – 18:00"];
const COUNTRIES   = ["Morocco", "France", "Spain", "Germany", "United Kingdom", "USA", "Other"];
const RETURN_OPTS = ["Same agency", "Different agency", "Home delivery"];

/* ─── Field atoms ───────────────────────────── */
function Field({ label, error, icon, ...props }) {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <span className="text-[8px] font-black uppercase tracking-[0.35em] text-gray-500">{label}</span>
            )}
            <div className="relative">
                {icon && <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 text-sm">{icon}</span>}
                <input
                    {...props}
                    className={`w-full bg-[#0d1a12] border rounded-2xl py-3.5 text-[12px] text-white
                                placeholder:text-gray-700 focus:outline-none transition-all duration-300 [color-scheme:dark]
                                ${icon ? "pl-10 pr-4" : "px-4"}
                                ${error
                                    ? "border-red-500/40 focus:border-red-400/60 bg-red-500/[0.04]"
                                    : "border-white/[0.07] focus:border-[#CFFF1A]/60 focus:bg-[#CFFF1A]/[0.03] focus:shadow-[0_0_0_3px_rgba(207,255,26,0.07)]"
                                }`}
                />
            </div>
            {error && <p className="text-red-400 text-[9px] font-bold mt-0.5 flex items-center gap-1"><span>⚠</span>{error}</p>}
        </div>
    );
}

function Dropdown({ label, error, children, ...props }) {
    return (
        <div className="flex flex-col gap-1">
            {label && <span className="text-[8px] font-black uppercase tracking-[0.35em] text-gray-500">{label}</span>}
            <div className="relative">
                <select
                    {...props}
                    className={`w-full bg-[#0d1a12] border rounded-2xl px-4 py-3.5 text-[12px] text-white
                                focus:outline-none transition-all duration-300 appearance-none cursor-pointer
                                ${error
                                    ? "border-red-500/40"
                                    : "border-white/[0.07] focus:border-[#CFFF1A]/60 focus:shadow-[0_0_0_3px_rgba(207,255,26,0.07)]"
                                }`}
                >
                    {children}
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 text-[10px]">▾</span>
            </div>
            {error && <p className="text-red-400 text-[9px] font-bold mt-0.5 flex items-center gap-1"><span>⚠</span>{error}</p>}
        </div>
    );
}

function OptionCard({ checked, onClick, icon, title, subtitle }) {
    return (
        <button type="button" onClick={onClick}
            className={`relative flex flex-col items-start gap-2 p-4 rounded-2xl border text-left transition-all duration-300 overflow-hidden group
                        ${checked
                            ? "border-[#CFFF1A]/50 bg-gradient-to-br from-[#CFFF1A]/10 to-[#CFFF1A]/5 shadow-[0_0_20px_rgba(207,255,26,0.08)]"
                            : "border-white/[0.06] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                        }`}
        >
            {checked && <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#CFFF1A] shadow-[0_0_6px_rgba(207,255,26,0.8)]"></div>}
            <span className="text-2xl">{icon}</span>
            <div>
                <p className={`text-[11px] font-black uppercase tracking-wider ${checked ? "text-[#CFFF1A]" : "text-white"}`}>{title}</p>
                {subtitle && <p className="text-[9px] text-gray-600 mt-0.5">{subtitle}</p>}
            </div>
        </button>
    );
}

function UploadZone({ label, file, onFile }) {
    const ref = useRef();
    return (
        <div className="flex flex-col gap-1">
            <span className="text-[8px] font-black uppercase tracking-[0.35em] text-gray-500">{label}</span>
            <div
                onClick={() => ref.current?.click()}
                className="relative border border-dashed border-white/10 hover:border-[#CFFF1A]/30 rounded-2xl
                           flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300
                           bg-[#0d1a12]/60 hover:bg-[#CFFF1A]/[0.03] min-h-[80px] overflow-hidden group"
            >
                <input ref={ref} type="file" accept="image/*,.pdf" className="hidden"
                    onChange={e => {
                        const f = e.target.files?.[0];
                        if (f && f.size <= 5 * 1024 * 1024) onFile(f);
                    }}
                />
                {file ? (
                    file.type?.startsWith("image/") ? (
                        <img src={URL.createObjectURL(file)} className="max-h-16 rounded-xl object-contain" alt="preview" />
                    ) : (
                        <div className="flex items-center gap-2 px-4">
                            <span className="text-xl">📄</span>
                            <span className="text-[10px] text-[#CFFF1A] font-bold truncate">{file.name}</span>
                        </div>
                    )
                ) : (
                    <>
                        <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#CFFF1A]/10 flex items-center justify-center transition-all">
                            <svg className="w-4 h-4 text-gray-600 group-hover:text-[#CFFF1A] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                            </svg>
                        </div>
                        <p className="text-[9px] text-gray-600 text-center px-4">Click to upload<br/><span className="text-gray-700">JPG · PNG · PDF · max 5MB</span></p>
                    </>
                )}
            </div>
        </div>
    );
}

/* ─── Step progress bar ──────────────────────── */
const STEPS = [
    { label: "Pickup", icon: "⚡" },
    { label: "Details", icon: "👤" },
    { label: "Payment", icon: "💳" },
];

function StepBar({ current }) {
    return (
        <div className="flex items-center">
            {STEPS.map((s, i) => {
                const done = i < current, active = i === current;
                return (
                    <div key={s.label} className="flex items-center flex-1 last:flex-none">
                        <div className="flex flex-col items-center gap-1.5">
                            <div className={`relative w-9 h-9 rounded-2xl flex items-center justify-center text-sm font-black transition-all duration-500
                                ${done   ? "bg-[#CFFF1A] text-black shadow-[0_0_16px_rgba(207,255,26,0.5)]"
                                         : active ? "bg-[#CFFF1A]/15 border border-[#CFFF1A]/60 text-[#CFFF1A]"
                                                  : "bg-white/[0.04] border border-white/10 text-gray-700"}`}>
                                {done ? "✓" : s.icon}
                            </div>
                            <span className={`text-[7px] uppercase tracking-[0.2em] font-black
                                ${active ? "text-[#CFFF1A]" : done ? "text-white/40" : "text-gray-700"}`}>
                                {s.label}
                            </span>
                        </div>
                        {i < STEPS.length - 1 && (
                            <div className="flex-1 mx-2 mb-5 relative">
                                <div className="h-px bg-white/[0.06] w-full"></div>
                                {done && <div className="absolute inset-0 h-px bg-gradient-to-r from-[#CFFF1A]/60 to-[#CFFF1A]/20 animate-[grow_0.5s_ease-out]"></div>}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

/* ══════════════════════════════════════════════
   BOOKING DRAWER
══════════════════════════════════════════════ */
export default function BookingDrawer({ car, pickupDate, returnDate, onClose }) {
    const [open, setOpen]      = useState(false);
    const [step, setStep]      = useState(0);
    const [done, setDone]      = useState(false);

    useEffect(() => { requestAnimationFrame(() => setOpen(true)); }, []);

    /* pricing */
    const pd   = pickupDate ? new Date(pickupDate) : null;
    const rd   = returnDate ? new Date(returnDate) : null;
    const days = pd && rd ? Math.max(1, Math.ceil((rd - pd) / 86_400_000)) : 1;
    const base = (car.price_per_day || 0) * days;
    const fmt  = d => d?.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }) ?? "—";

    /* step 1 */
    const [pickupMode, setPickupMode]   = useState("agency");
    const [agency,     setAgency]       = useState("");
    const [dAddr,      setDAddr]        = useState("");
    const [dCity,      setDCity]        = useState("");
    const [dSlot,      setDSlot]        = useState("");
    const [dNote,      setDNote]        = useState("");
    const [returnMode, setReturnMode]   = useState("Same agency");
    const [e1, setE1] = useState({});

    /* step 2 */
    const [fname,   setFname]   = useState("");
    const [lname,   setLname]   = useState("");
    const [email,   setEmail]   = useState("");
    const [phone,   setPhone]   = useState("");
    const [licNo,   setLicNo]   = useState("");
    const [licDt,   setLicDt]   = useState("");
    const [country, setCountry] = useState("");
    const [idNo,    setIdNo]    = useState("");
    const [fLicF,   setFLicF]   = useState(null);
    const [fLicB,   setFLicB]   = useState(null);
    const [fId,     setFId]     = useState(null);
    const [e2, setE2] = useState({});

    /* step 3 */
    const [payMode,  setPay]    = useState("online");
    const [deposit,  setDep]    = useState("preauth");
    const [agreed,   setAgreed] = useState(false);
    const [e3, setE3] = useState({});

    const deliveryFee = pickupMode === "delivery" ? 150 : 0;
    const total       = base + deliveryFee;

    const v1 = () => {
        const e = {};
        if (pickupMode === "agency"   && !agency) e.agency = "Please select an agency.";
        if (pickupMode === "delivery" && !dAddr)  e.dAddr  = "Address is required.";
        if (pickupMode === "delivery" && !dCity)  e.dCity  = "City is required.";
        if (pickupMode === "delivery" && !dSlot)  e.dSlot  = "Time slot is required.";
        setE1(e); return !Object.keys(e).length;
    };
    const v2 = () => {
        const e = {};
        if (!fname.trim()) e.fname = "Required";
        if (!lname.trim()) e.lname = "Required";
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
        if (!phone.trim()) e.phone = "Required";
        if (!licNo.trim()) e.licNo = "Required";
        if (!licDt)        e.licDt = "Required";
        if (!country)      e.country = "Required";
        if (!idNo.trim())  e.idNo  = "Required";
        if (!fLicF)        e.fLicF = "Upload required";
        if (!fLicB)        e.fLicB = "Upload required";
        if (!fId)          e.fId   = "Upload required";
        setE2(e); return !Object.keys(e).length;
    };
    const v3 = () => {
        const e = {};
        if (!agreed) e.agreed = "You must accept the terms.";
        setE3(e); return !Object.keys(e).length;
    };

    const next = () => {
        if (step === 0 && !v1()) return;
        if (step === 1 && !v2()) return;
        setStep(s => s + 1);
    };

    const confirm = () => { if (v3()) setDone(true); };

    const handleClose = () => {
        setOpen(false);
        setTimeout(onClose, 400);
    };

    return (
        <div
            className={`fixed inset-0 z-[100] transition-all duration-400
                        ${open ? "bg-black/70 backdrop-blur-[6px]" : "bg-transparent pointer-events-none"}`}
            onClick={handleClose}
        >
            {/* ── DRAWER PANEL ── */}
            <aside
                className={`absolute top-0 right-0 h-full w-full max-w-[500px] flex flex-col
                            bg-gradient-to-b from-[#080f0b] to-[#060c09]
                            border-l border-white/[0.06]
                            shadow-[-50px_0_100px_rgba(0,0,0,0.9)]
                            transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                            ${open ? "translate-x-0" : "translate-x-full"}`}
                onClick={e => e.stopPropagation()}
            >
                {/* Ambient glow inside panel */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-none">
                    <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-[#CFFF1A]/6 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#CFFF1A]/4 rounded-full blur-[100px]"></div>
                </div>

                {/* ── HEADER ── */}
                <header className="relative z-10 shrink-0">
                    {/* Top bar */}
                    <div className="flex items-center justify-between px-7 pt-7 pb-5">
                        <div className="flex flex-col">
                            <span className="text-[7px] font-black uppercase tracking-[0.5em] text-[#CFFF1A]/70 mb-1">Reservation</span>
                            <h2 className="text-[1.1rem] font-black uppercase tracking-tight text-white leading-none">
                                {car.brand} <span className="text-[#CFFF1A] drop-shadow-[0_0_12px_rgba(207,255,26,0.5)]">{car.name}</span>
                            </h2>
                        </div>
                        <button
                            onClick={handleClose}
                            className="w-9 h-9 rounded-2xl border border-white/10 hover:border-red-500/40 hover:bg-red-500/10
                                       flex items-center justify-center transition-all duration-300 group"
                        >
                            <svg className="w-3.5 h-3.5 text-gray-600 group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>

                    {/* Summary strip */}
                    <div className="mx-7 mb-5 flex items-center gap-0 bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
                        <div className="flex-1 flex flex-col items-center py-3 border-r border-white/[0.06]">
                            <span className="text-[7px] text-gray-600 uppercase tracking-widest font-black mb-1">Pick-up</span>
                            <span className="text-[12px] text-white font-bold">{fmt(pd)}</span>
                        </div>
                        <div className="px-3 text-[#CFFF1A]/40 text-xs">→</div>
                        <div className="flex-1 flex flex-col items-center py-3 border-r border-white/[0.06]">
                            <span className="text-[7px] text-gray-600 uppercase tracking-widest font-black mb-1">Return</span>
                            <span className="text-[12px] text-white font-bold">{fmt(rd)}</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center py-3 border-r border-white/[0.06]">
                            <span className="text-[7px] text-gray-600 uppercase tracking-widest font-black mb-1">Days</span>
                            <span className="text-[12px] text-white font-bold">{days}</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center py-3">
                            <span className="text-[7px] text-gray-600 uppercase tracking-widest font-black mb-1">Total</span>
                            <span className="text-[12px] text-[#CFFF1A] font-black">${total}</span>
                        </div>
                    </div>

                    {/* Steps */}
                    {!done && (
                        <div className="px-7 pb-5 border-b border-white/[0.05]">
                            <StepBar current={step} />
                        </div>
                    )}
                </header>

                {/* ── SCROLLABLE BODY ── */}
                <div className="relative z-10 flex-1 overflow-y-auto px-7 py-6 space-y-5
                                scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">

                    {/* ───── SUCCESS ───── */}
                    {done && (
                        <div className="flex flex-col items-center justify-center h-full gap-6 text-center py-8">
                            <div className="relative">
                                <div className="w-20 h-20 rounded-full bg-[#CFFF1A]/15 border border-[#CFFF1A]/30 flex items-center justify-center">
                                    <svg className="w-9 h-9 text-[#CFFF1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                                    </svg>
                                </div>
                                <div className="absolute inset-0 w-20 h-20 rounded-full bg-[#CFFF1A]/20 blur-2xl animate-pulse"></div>
                            </div>
                            <div>
                                <p className="text-[8px] text-[#CFFF1A] uppercase tracking-[0.4em] font-black mb-2">Booking Confirmed</p>
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-1">You're all set!</h3>
                                <p className="text-gray-500 text-[12px]">Confirmation sent to<br/><span className="text-white font-bold">{email}</span></p>
                            </div>
                            <div className="w-full border border-white/[0.07] rounded-2xl divide-y divide-white/[0.05] overflow-hidden">
                                {[
                                    ["Vehicle",  `${car.brand} ${car.name}`],
                                    ["Period",   `${fmt(pd)} → ${fmt(rd)}`],
                                    ["Pickup",   pickupMode === "agency" ? agency : `Home · ${dCity}`],
                                    ["Payment",  payMode === "online" ? "Card — Online" : "On-site"],
                                ].map(([k, v]) => (
                                    <div key={k} className="flex justify-between items-center px-5 py-3">
                                        <span className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">{k}</span>
                                        <span className="text-[11px] text-white font-bold">{v}</span>
                                    </div>
                                ))}
                                <div className="flex justify-between items-center px-5 py-3.5 bg-[#CFFF1A]/8">
                                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Total Charged</span>
                                    <span className="text-lg text-[#CFFF1A] font-black">${total}</span>
                                </div>
                            </div>
                            <button onClick={handleClose}
                                className="w-full py-4 bg-[#CFFF1A] text-black font-black text-[10px] uppercase tracking-[0.3em]
                                           rounded-2xl hover:shadow-[0_0_30px_rgba(207,255,26,0.4)] transition-all">
                                Done ✓
                            </button>
                        </div>
                    )}

                    {/* ───── STEP 1 ───── */}
                    {!done && step === 0 && (
                        <>
                            <div>
                                <p className="text-[8px] font-black uppercase tracking-[0.4em] text-[#CFFF1A]/80 mb-3">Pickup Method</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <OptionCard checked={pickupMode === "agency"} onClick={() => setPickupMode("agency")}
                                        icon="🏢" title="Agency Pickup" subtitle="Choose your branch"/>
                                    <OptionCard checked={pickupMode === "delivery"} onClick={() => setPickupMode("delivery")}
                                        icon="🏠" title="Home Delivery" subtitle="+$150 delivery fee"/>
                                </div>
                            </div>

                            {pickupMode === "agency" && (
                                <Dropdown label="Agency Location" value={agency} onChange={e => setAgency(e.target.value)} error={e1.agency}>
                                    <option value="">Select agency…</option>
                                    {AGENCIES.map(a => <option key={a}>{a}</option>)}
                                </Dropdown>
                            )}

                            {pickupMode === "delivery" && (
                                <div className="space-y-4 p-5 rounded-2xl bg-[#CFFF1A]/5 border border-[#CFFF1A]/10">
                                    <p className="text-[8px] font-black uppercase tracking-[0.4em] text-[#CFFF1A]/70">Delivery Details</p>
                                    <Field label="Street Address" placeholder="123 Avenue Hassan II…" icon="📍"
                                        value={dAddr} onChange={e => setDAddr(e.target.value)} error={e1.dAddr}/>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Dropdown label="City / Zone" value={dCity} onChange={e => setDCity(e.target.value)} error={e1.dCity}>
                                            <option value="">Select city…</option>
                                            {CITIES.map(c => <option key={c}>{c}</option>)}
                                        </Dropdown>
                                        <Dropdown label="Time Slot" value={dSlot} onChange={e => setDSlot(e.target.value)} error={e1.dSlot}>
                                            <option value="">Select time…</option>
                                            {SLOTS.map(s => <option key={s}>{s}</option>)}
                                        </Dropdown>
                                    </div>
                                    <Field label="Landmark / Notes" placeholder="Near the blue gate, 2nd floor…"
                                        value={dNote} onChange={e => setDNote(e.target.value)}/>
                                </div>
                            )}

                            <Dropdown label="Return Method" value={returnMode} onChange={e => setReturnMode(e.target.value)}>
                                {RETURN_OPTS.map(o => <option key={o}>{o}</option>)}
                            </Dropdown>
                        </>
                    )}

                    {/* ───── STEP 2 ───── */}
                    {!done && step === 1 && (
                        <>
                            <p className="text-[8px] font-black uppercase tracking-[0.4em] text-[#CFFF1A]/80">Personal Information</p>
                            <div className="grid grid-cols-2 gap-3">
                                <Field label="First Name" placeholder="John" icon="👤"
                                    value={fname} onChange={e => setFname(e.target.value)} error={e2.fname}/>
                                <Field label="Last Name" placeholder="Doe"
                                    value={lname} onChange={e => setLname(e.target.value)} error={e2.lname}/>
                            </div>
                            <Field label="Email Address" type="email" placeholder="john@example.com" icon="✉️"
                                value={email} onChange={e => setEmail(e.target.value)} error={e2.email}/>
                            <Field label="Phone (WhatsApp)" type="tel" placeholder="+212 6 00 00 00 00" icon="📱"
                                value={phone} onChange={e => setPhone(e.target.value)} error={e2.phone}/>

                            <div className="border-t border-white/[0.05] pt-4">
                                <p className="text-[8px] font-black uppercase tracking-[0.4em] text-[#CFFF1A]/80 mb-4">License & Identity</p>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <Field label="License No." placeholder="B-123456" icon="🪪"
                                            value={licNo} onChange={e => setLicNo(e.target.value)} error={e2.licNo}/>
                                        <Field label="Issue Date" type="date"
                                            value={licDt} onChange={e => setLicDt(e.target.value)} error={e2.licDt}/>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Dropdown label="Country" value={country} onChange={e => setCountry(e.target.value)} error={e2.country}>
                                            <option value="">Select…</option>
                                            {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                                        </Dropdown>
                                        <Field label="ID / Passport" placeholder="AB123456"
                                            value={idNo} onChange={e => setIdNo(e.target.value)} error={e2.idNo}/>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-white/[0.05] pt-4">
                                <p className="text-[8px] font-black uppercase tracking-[0.4em] text-[#CFFF1A]/80 mb-4">Document Upload</p>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div><UploadZone label="License — Front" file={fLicF} onFile={setFLicF}/>
                                            {e2.fLicF && <p className="text-red-400 text-[9px] font-bold mt-1">⚠ {e2.fLicF}</p>}</div>
                                        <div><UploadZone label="License — Back" file={fLicB} onFile={setFLicB}/>
                                            {e2.fLicB && <p className="text-red-400 text-[9px] font-bold mt-1">⚠ {e2.fLicB}</p>}</div>
                                    </div>
                                    <UploadZone label="ID / Passport Document" file={fId} onFile={setFId}/>
                                    {e2.fId && <p className="text-red-400 text-[9px] font-bold">⚠ {e2.fId}</p>}
                                </div>
                            </div>
                        </>
                    )}

                    {/* ───── STEP 3 ───── */}
                    {!done && step === 2 && (
                        <>
                            <p className="text-[8px] font-black uppercase tracking-[0.4em] text-[#CFFF1A]/80">Payment Method</p>
                            <div className="space-y-2">
                                <OptionCard checked={payMode === "online"} onClick={() => setPay("online")}
                                    icon="💳" title="Online — Card" subtitle="Secure immediate payment"/>
                                <OptionCard checked={payMode === "onsite"} onClick={() => setPay("onsite")}
                                    icon="🏪" title="On-site" subtitle="Pay at delivery or agency"/>
                            </div>

                            <div className="border-t border-white/[0.05] pt-4">
                                <p className="text-[8px] font-black uppercase tracking-[0.4em] text-[#CFFF1A]/80 mb-3">Security Deposit</p>
                                <div className="space-y-2">
                                    <OptionCard checked={deposit === "preauth"} onClick={() => setDep("preauth")}
                                        icon="🔒" title="Card Pre-authorization" subtitle="Hold released after return"/>
                                    <OptionCard checked={deposit === "cheque"} onClick={() => setDep("cheque")}
                                        icon="📝" title="Guarantee Check" subtitle="Returned upon vehicle return"/>
                                </div>
                            </div>

                            {/* Cost breakdown */}
                            <div className="border border-white/[0.07] rounded-2xl overflow-hidden">
                                <div className="flex justify-between items-center px-5 py-3.5 border-b border-white/[0.05]">
                                    <span className="text-[11px] text-gray-400">Rental <span className="text-gray-600">({days}d × ${car.price_per_day}/day)</span></span>
                                    <span className="text-[12px] text-white font-bold">${base}</span>
                                </div>
                                {deliveryFee > 0 && (
                                    <div className="flex justify-between items-center px-5 py-3.5 border-b border-white/[0.05]">
                                        <span className="text-[11px] text-gray-400">Home Delivery Fee</span>
                                        <span className="text-[12px] text-white font-bold">${deliveryFee}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center px-5 py-4 bg-gradient-to-r from-[#CFFF1A]/10 to-[#CFFF1A]/5">
                                    <span className="text-[11px] font-black text-white uppercase tracking-widest">Total</span>
                                    <span className="text-xl font-black text-[#CFFF1A] drop-shadow-[0_0_10px_rgba(207,255,26,0.4)]">${total}</span>
                                </div>
                            </div>

                            {/* Terms */}
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <div onClick={() => setAgreed(a => !a)}
                                    className={`mt-0.5 w-5 h-5 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all duration-300
                                                ${agreed ? "border-[#CFFF1A] bg-[#CFFF1A] shadow-[0_0_10px_rgba(207,255,26,0.4)]" : "border-white/20 hover:border-[#CFFF1A]/40"}`}>
                                    {agreed && <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>}
                                </div>
                                <span className="text-[11px] text-gray-500 leading-relaxed">
                                    I accept the <span className="text-[#CFFF1A] cursor-pointer hover:underline">General Rental Terms & Conditions</span> and the <span className="text-[#CFFF1A] cursor-pointer hover:underline">Battery Policy</span>.
                                </span>
                            </label>
                            {e3.agreed && <p className="text-red-400 text-[9px] font-bold flex items-center gap-1"><span>⚠</span>{e3.agreed}</p>}
                        </>
                    )}
                </div>

                {/* ── FOOTER ── */}
                {!done && (
                    <footer className="relative z-10 shrink-0 px-7 py-5 border-t border-white/[0.05] bg-[#060c09]">
                        <div className="flex items-center justify-between gap-4">
                            {step > 0 ? (
                                <button onClick={() => setStep(s => s - 1)}
                                    className="flex items-center gap-2 text-[9px] text-gray-600 hover:text-white uppercase tracking-[0.25em] font-black transition-colors">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/>
                                    </svg>
                                    Back
                                </button>
                            ) : (
                                <span className="text-[8px] text-gray-700 uppercase tracking-widest font-bold">Step {step + 1} of 3</span>
                            )}

                            {step < 2 ? (
                                <button onClick={next}
                                    className="flex-1 max-w-[200px] py-3.5 bg-[#CFFF1A] text-black font-black text-[10px] uppercase tracking-[0.35em]
                                               rounded-2xl hover:shadow-[0_0_25px_rgba(207,255,26,0.5)] transition-all duration-300
                                               relative overflow-hidden group ml-auto">
                                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-700 skew-x-[-20deg]"></div>
                                    <span className="relative z-10">Continue →</span>
                                </button>
                            ) : (
                                <button onClick={confirm}
                                    className="flex-1 max-w-[220px] py-3.5 bg-[#CFFF1A] text-black font-black text-[10px] uppercase tracking-[0.3em]
                                               rounded-2xl hover:shadow-[0_0_30px_rgba(207,255,26,0.6)] transition-all duration-300
                                               relative overflow-hidden group ml-auto">
                                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-700 skew-x-[-20deg]"></div>
                                    <span className="relative z-10">✓ Confirm Booking</span>
                                </button>
                            )}
                        </div>
                    </footer>
                )}
            </aside>
        </div>
    );
}
