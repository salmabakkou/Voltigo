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
    DollarSign
} from "lucide-react";

export default function AdminBookingsPage() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterMode, setFilterMode] = useState("all");

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
        
        if (filterMode === "agency") return matchesSearch && res.pickupMode === "agency";
        if (filterMode === "delivery") return matchesSearch && res.pickupMode === "delivery";
        return matchesSearch;
    });

    const totalRevenue = reservations.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);

    return (
        <main className="min-h-[100dvh] bg-[#0A100E] text-white p-6 md:p-10 lg:p-16 font-sans w-full relative overflow-hidden">
            
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#CFFF1A]/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#CFFF1A]/5 rounded-full blur-[180px] pointer-events-none z-0"></div>

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
                            <div className="w-px h-8 bg-white/10 mx-2"></div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-400">Revenue</span>
                                <span className="text-lg font-bold text-[#CFFF1A]">${totalRevenue.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters & Search Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                    {/* Search */}
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

                    {/* Filter Tabs */}
                    <div className="flex items-center gap-2 bg-[#0e1612] border border-white/10 p-1 rounded-xl w-full md:w-auto">
                        <button
                            onClick={() => setFilterMode("all")}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filterMode === "all" ? "bg-[#CFFF1A] text-black" : "text-gray-400 hover:text-white"}`}
                        >
                            All ({reservations.length})
                        </button>
                        <button
                            onClick={() => setFilterMode("agency")}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filterMode === "agency" ? "bg-[#CFFF1A] text-black" : "text-gray-400 hover:text-white"}`}
                        >
                            Agency Pickup
                        </button>
                        <button
                            onClick={() => setFilterMode("delivery")}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filterMode === "delivery" ? "bg-[#CFFF1A] text-black" : "text-gray-400 hover:text-white"}`}
                        >
                            Home Delivery
                        </button>
                    </div>
                </div>

                {/* Bookings List / Table */}
                {loading ? (
                    <div className="py-20 text-center text-gray-400 text-sm">Loading reservations...</div>
                ) : filteredReservations.length === 0 ? (
                    <div className="py-20 bg-[#0c130f] border border-[#1a2620] rounded-3xl text-center flex flex-col items-center justify-center gap-3">
                        <CalendarCheck className="w-12 h-12 text-gray-600 mb-2" />
                        <span className="text-white font-bold text-base">No reservations found</span>
                        <p className="text-gray-400 text-xs">When users book a car, their reservations will appear here.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {filteredReservations.map((res, i) => (
                            <div key={res.id || i} className="bg-[#0c130f] border border-[#1a2620] hover:border-[#CFFF1A]/40 transition-all rounded-2xl p-6 flex flex-col gap-4 shadow-lg">
                                
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
                                            <User className="w-3.5 h-3.5 text-[#CFFF1A]" /> Customer Info
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
                                    </div>

                                    {/* Rental Period */}
                                    <div className="flex flex-col gap-1.5 bg-white/5 border border-white/5 p-4 rounded-xl">
                                        <span className="text-xs text-[#CFFF1A] font-bold uppercase tracking-wider flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5 text-[#CFFF1A]" /> Rental Period
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
                                            <CreditCard className="w-3.5 h-3.5 text-[#CFFF1A]" /> Pickup & Payment
                                        </span>
                                        <div className="flex items-center gap-1.5 text-xs text-white font-semibold">
                                            {res.pickupMode === "agency" ? (
                                                <>
                                                    <Building2 className="w-3.5 h-3.5 text-[#CFFF1A]" />
                                                    <span>{res.pickupAgency || "Agency Pickup"}</span>
                                                : </>
                                            ) : (
                                                <>
                                                    <Home className="w-3.5 h-3.5 text-[#CFFF1A]" />
                                                    <span>Delivery ({res.deliveryCity || "Address"})</span>
                                                </>
                                            )}
                                        </div>
                                        <div className="text-xs text-gray-300">
                                            Payment: <span className="text-white font-semibold">{res.payMode === "online" ? "Online Card" : "On Pickup"}</span>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        ))}
                    </div>
                )}

            </div>
        </main>
    );
}
