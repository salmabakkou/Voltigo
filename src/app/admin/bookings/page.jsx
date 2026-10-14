"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getReservations } from "../../../services/api";
import {
    CalendarCheck,
    User,
    Clock,
    MapPin,
    CreditCard,
    CheckCircle,
    Building2,
    Home,
    Search,
    ArrowLeft,
    Phone,
    Mail,
    FileText,
    ShieldCheck,
    Download,
    Eye,
    FolderOpen,
    ChevronDown,
    ChevronUp,
    ImageIcon,
} from "lucide-react";

/* ── Document Card ──────────────────────────────── */
function DocCard({ label, url }) {
    if (!url) return (
        <div className="flex flex-col items-center justify-center gap-2 bg-white/[0.03] border border-white/10 border-dashed rounded-xl p-4 min-h-[110px]">
            <FileText className="w-6 h-6 text-gray-600" />
            <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold text-center">{label}</span>
            <span className="text-[10px] text-gray-600 italic">Not uploaded</span>
        </div>
    );

    const isImage = /\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(url);

    return (
        <div className="flex flex-col gap-2 bg-[#0a130e] border border-[#CFFF1A]/20 rounded-xl overflow-hidden group hover:border-[#CFFF1A]/50 transition-all">
            {/* Preview area */}
            <div className="relative w-full h-[110px] overflow-hidden bg-black/30 flex items-center justify-center">
                {isImage ? (
                    <img
                        src={url}
                        alt={label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="flex flex-col items-center gap-2">
                        <FileText className="w-9 h-9 text-[#CFFF1A]/60" />
                        <span className="text-[10px] text-gray-400 font-medium">PDF Document</span>
                    </div>
                )}
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Preview"
                        className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                    >
                        <Eye className="w-4 h-4 text-white" />
                    </a>
                    <a
                        href={url}
                        download
                        title="Download"
                        className="w-9 h-9 rounded-full bg-[#CFFF1A]/80 hover:bg-[#CFFF1A] flex items-center justify-center transition-colors"
                    >
                        <Download className="w-4 h-4 text-black" />
                    </a>
                </div>
            </div>

            {/* Label + actions bar */}
            <div className="px-3 pb-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                    <ImageIcon className="w-3.5 h-3.5 text-[#CFFF1A]/70 shrink-0" />
                    <span className="text-[10px] text-[#CFFF1A] uppercase tracking-wider font-bold truncate">{label}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] text-gray-300 hover:text-white font-semibold transition-colors"
                    >
                        <Eye className="w-3 h-3" /> View
                    </a>
                    <span className="text-gray-600">|</span>
                    <a
                        href={url}
                        download
                        className="inline-flex items-center gap-1 text-[10px] text-[#CFFF1A] hover:text-white font-semibold transition-colors"
                    >
                        <Download className="w-3 h-3" /> Save
                    </a>
                </div>
            </div>
        </div>
    );
}

/* ── Main Page ──────────────────────────────────── */
export default function AdminBookingsPage() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterMode, setFilterMode] = useState("all");
    const [expandedDocs, setExpandedDocs] = useState({});

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await getReservations();
                setReservations(data);
            } catch (err) {
                console.error("Failed to load reservations", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const formatDate = (isoStr) => {
        if (!isoStr) return "—";
        try {
            return new Date(isoStr).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
        } catch {
            return isoStr;
        }
    };

    const filteredReservations = reservations.filter(res => {
        const matchesSearch =
            res.carName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            res.customer?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            res.customer?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            res.customer?.email?.toLowerCase().includes(searchTerm.toLowerCase());

        if (filterMode === "agency")   return matchesSearch && res.pickupMode === "agency";
        if (filterMode === "delivery") return matchesSearch && res.pickupMode === "delivery";
        return matchesSearch;
    });

    const totalRevenue = reservations.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);

    const toggleDocs = (id) =>
        setExpandedDocs(prev => ({ ...prev, [id]: !prev[id] }));

    const hasDocuments = (res) =>
        res?.documents?.licenseFront || res?.documents?.licenseBack || res?.documents?.idDocument;

    return (
        <main className="min-h-[100dvh] bg-[#0A100E] text-white p-6 md:p-10 lg:p-16 font-sans w-full relative overflow-hidden">

            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#CFFF1A]/5 rounded-full blur-[150px] pointer-events-none z-0" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#CFFF1A]/5 rounded-full blur-[180px] pointer-events-none z-0" />

            <div className="max-w-6xl mx-auto w-full relative z-10">

                {/* Back Link & Header */}
                <div className="mb-8">
                    <Link href="/admin" className="inline-flex items-center gap-2 text-xs text-[#CFFF1A] uppercase tracking-wider font-semibold hover:underline mb-4">
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1a2620] pb-6">
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/20 mb-2">
                                Fleet Bookings
                            </h1>
                            <p className="text-[#CFFF1A] text-xs tracking-[0.3em] uppercase font-bold drop-shadow-[0_0_10px_rgba(207,255,26,0.4)]">
                                Manage & Track Reservations
                            </p>
                        </div>
                        <div className="flex items-center gap-4 bg-[#111a15] border border-white/10 px-5 py-3 rounded-2xl">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-400">Total Bookings</span>
                                <span className="text-lg font-bold text-white">{reservations.length}</span>
                            </div>
                            <div className="w-px h-8 bg-white/10 mx-2" />
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-400">Revenue</span>
                                <span className="text-lg font-bold text-[#CFFF1A]">${totalRevenue.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters & Search Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                    <div className="relative w-full md:w-96">
                        <Search className="w-4 h-4 text-[#CFFF1A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search by car, client name or email..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full bg-[#0e1612] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#CFFF1A] transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-2 bg-[#0e1612] border border-white/10 p-1 rounded-xl w-full md:w-auto">
                        <button onClick={() => setFilterMode("all")}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filterMode === "all" ? "bg-[#CFFF1A] text-black" : "text-gray-400 hover:text-white"}`}>
                            All ({reservations.length})
                        </button>
                        <button onClick={() => setFilterMode("agency")}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filterMode === "agency" ? "bg-[#CFFF1A] text-black" : "text-gray-400 hover:text-white"}`}>
                            Agency Pickup
                        </button>
                        <button onClick={() => setFilterMode("delivery")}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filterMode === "delivery" ? "bg-[#CFFF1A] text-black" : "text-gray-400 hover:text-white"}`}>
                            Home Delivery
                        </button>
                    </div>
                </div>

                {/* Bookings List */}
                {loading ? (
                    <div className="py-20 text-center">
                        <span className="w-2 h-2 rounded-full bg-[#CFFF1A] animate-ping inline-block shadow-[0_0_15px_rgba(207,255,26,0.8)]" />
                        <p className="text-gray-400 text-xs uppercase tracking-wider mt-4 font-semibold">Loading reservations…</p>
                    </div>
                ) : filteredReservations.length === 0 ? (
                    <div className="py-20 bg-[#0c130f] border border-[#1a2620] rounded-3xl text-center flex flex-col items-center justify-center gap-3">
                        <CalendarCheck className="w-12 h-12 text-gray-600 mb-2" />
                        <span className="text-white font-bold text-base">No reservations found</span>
                        <p className="text-gray-400 text-xs">When users book a car, their reservations will appear here.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-5">
                        {filteredReservations.map((res, i) => (
                            <div key={res.id || i}
                                className="bg-[#0c130f] border border-[#1a2620] hover:border-[#CFFF1A]/30 transition-all rounded-2xl shadow-lg overflow-hidden">

                                {/* ── Card Body ── */}
                                <div className="p-6 flex flex-col gap-4">

                                    {/* Row 1: Header */}
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-[#CFFF1A]/10 border border-[#CFFF1A]/30 flex items-center justify-center">
                                                <CalendarCheck className="w-5 h-5 text-[#CFFF1A]" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-white">{res.carName || `Car #${res.carId}`}</h3>
                                                <span className="text-xs text-gray-400 font-medium">Booked on {formatDate(res.createdAt)}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#CFFF1A] bg-[#CFFF1A]/10 border border-[#CFFF1A]/30 px-3 py-1 rounded-full">
                                                <CheckCircle className="w-3.5 h-3.5" /> Confirmed
                                            </span>
                                            <div className="text-right border-l border-white/10 pl-4">
                                                <span className="text-xs text-gray-400 block font-medium">Total Amount</span>
                                                <span className="text-xl font-bold text-[#CFFF1A]">${res.totalPrice}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Row 2: Customer & Booking Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">

                                        {/* Customer Info */}
                                        <div className="flex flex-col gap-1.5 bg-white/5 border border-white/5 p-4 rounded-xl">
                                            <span className="text-xs text-[#CFFF1A] font-bold uppercase tracking-wider flex items-center gap-1.5">
                                                <User className="w-3.5 h-3.5" /> Customer Info
                                            </span>
                                            <span className="text-white font-bold text-sm">
                                                {res.customer?.firstName} {res.customer?.lastName}
                                            </span>
                                            <div className="flex items-center gap-1.5 text-xs text-gray-300">
                                                <Mail className="w-3 h-3 text-gray-400" /> {res.customer?.email || "—"}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs text-gray-300">
                                                <Phone className="w-3 h-3 text-gray-400" /> {res.customer?.phone || "—"}
                                            </div>
                                            {res.customer?.idNo && (
                                                <div className="flex items-center gap-1.5 text-xs text-gray-300 mt-1">
                                                    <ShieldCheck className="w-3 h-3 text-gray-400" />
                                                    ID: <span className="text-white font-semibold">{res.customer.idNo}</span>
                                                </div>
                                            )}
                                            {res.customer?.licenseNo && (
                                                <div className="flex items-center gap-1.5 text-xs text-gray-300">
                                                    <FileText className="w-3 h-3 text-gray-400" />
                                                    License: <span className="text-white font-semibold">{res.customer.licenseNo}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Rental Period */}
                                        <div className="flex flex-col gap-1.5 bg-white/5 border border-white/5 p-4 rounded-xl">
                                            <span className="text-xs text-[#CFFF1A] font-bold uppercase tracking-wider flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5" /> Rental Period
                                            </span>
                                            <div className="text-xs text-white font-semibold">
                                                {formatDate(res.pickupDate)} → {formatDate(res.returnDate)}
                                            </div>
                                            <span className="text-xs text-gray-400 font-medium">
                                                Duration: <strong className="text-white">{res.days} Day{res.days > 1 ? "s" : ""}</strong>
                                            </span>
                                        </div>

                                        {/* Pickup & Payment Details */}
                                        <div className="flex flex-col gap-1.5 bg-white/5 border border-white/5 p-4 rounded-xl">
                                            <span className="text-xs text-[#CFFF1A] font-bold uppercase tracking-wider flex items-center gap-1.5">
                                                <CreditCard className="w-3.5 h-3.5" /> Pickup & Payment
                                            </span>
                                            <div className="flex items-center gap-1.5 text-xs text-white font-semibold">
                                                {res.pickupMode === "agency" ? (
                                                    <><Building2 className="w-3.5 h-3.5 text-[#CFFF1A]" /><span>{res.pickupAgency || "Agency Pickup"}</span></>
                                                ) : (
                                                    <><Home className="w-3.5 h-3.5 text-[#CFFF1A]" /><span>Delivery ({res.deliveryCity || "Address"})</span></>
                                                )}
                                            </div>
                                            <div className="text-xs text-gray-300">
                                                Payment: <span className="text-white font-semibold">{res.payMode === "online" ? "Online Card" : "On Pickup"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ── Documents Section ── */}
                                <div className="border-t border-white/10">
                                    <button
                                        onClick={() => toggleDocs(res.id || i)}
                                        className="w-full flex items-center justify-between px-6 py-3.5 hover:bg-white/[0.03] transition-colors group"
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <FolderOpen className="w-4 h-4 text-[#CFFF1A]" />
                                            <span className="text-xs text-[#CFFF1A] uppercase tracking-widest font-bold">
                                                Client Documents
                                            </span>
                                            {hasDocuments(res) ? (
                                                <span className="text-[10px] bg-[#CFFF1A]/15 border border-[#CFFF1A]/30 text-[#CFFF1A] px-2 py-0.5 rounded-full font-bold">
                                                    3 files
                                                </span>
                                            ) : (
                                                <span className="text-[10px] bg-white/5 border border-white/10 text-gray-500 px-2 py-0.5 rounded-full font-bold">
                                                    No documents
                                                </span>
                                            )}
                                        </div>
                                        {expandedDocs[res.id || i]
                                            ? <ChevronUp className="w-4 h-4 text-gray-400 group-hover:text-[#CFFF1A] transition-colors" />
                                            : <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#CFFF1A] transition-colors" />
                                        }
                                    </button>

                                    {/* Expandable docs grid */}
                                    {expandedDocs[res.id || i] && (
                                        <div className="px-6 pb-6">
                                            {hasDocuments(res) ? (
                                                <>
                                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                                                        <DocCard
                                                            label="License Front"
                                                            url={res.documents?.licenseFront}
                                                        />
                                                        <DocCard
                                                            label="License Back"
                                                            url={res.documents?.licenseBack}
                                                        />
                                                        <DocCard
                                                            label="ID / Passport"
                                                            url={res.documents?.idDocument}
                                                        />
                                                    </div>
                                                    {/* Download All */}
                                                    <div className="mt-4 flex justify-end">
                                                        <div className="flex items-center gap-3">
                                                            {[
                                                                { label: "License Front", url: res.documents?.licenseFront },
                                                                { label: "License Back",  url: res.documents?.licenseBack },
                                                                { label: "ID / Passport", url: res.documents?.idDocument },
                                                            ].filter(d => d.url).map(d => (
                                                                <a
                                                                    key={d.label}
                                                                    href={d.url}
                                                                    download
                                                                    className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-black bg-[#CFFF1A] hover:bg-[#b8e617] px-3 py-1.5 rounded-lg transition-colors shadow-[0_0_10px_rgba(207,255,26,0.2)]"
                                                                >
                                                                    <Download className="w-3 h-3" /> {d.label}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="mt-3 py-8 flex flex-col items-center justify-center gap-2 border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
                                                    <FileText className="w-8 h-8 text-gray-600" />
                                                    <p className="text-gray-500 text-xs font-medium">No documents were uploaded for this reservation.</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                            </div>
                        ))}
                    </div>
                )}

            </div>
        </main>
    );
}
