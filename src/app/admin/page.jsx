"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCars, getReservations } from "../../services/api";
import { 
    Car, 
    CalendarCheck, 
    DollarSign, 
    Activity, 
    Plus, 
    Settings, 
    User, 
    Clock, 
    MapPin, 
    CreditCard, 
    CheckCircle,
    Building2,
    Home
} from "lucide-react";

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({
        totalCars: 0,
        activeBookings: 0,
        revenue: "$0",
        systemHealth: "100%"
    });
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [cars, resData] = await Promise.all([
                    getCars().catch(() => []),
                    getReservations().catch(() => [])
                ]);

                const totalRev = resData.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);

                setReservations(resData);
                setStats({
                    totalCars: cars.length,
                    activeBookings: resData.length,
                    revenue: `$${totalRev.toLocaleString()}`,
                    systemHealth: "100%"
                });
            } catch (err) {
                console.error("Failed to fetch dashboard data.", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const formatDate = (isoStr) => {
        if (!isoStr) return "—";
        try {
            return new Date(isoStr).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
        } catch {
            return isoStr;
        }
    };

    return (
        <main className="min-h-[100dvh] bg-[#0A100E] text-white p-6 md:p-10 lg:p-16 font-sans w-full relative overflow-hidden">
            
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#CFFF1A]/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#CFFF1A]/5 rounded-full blur-[180px] pointer-events-none z-0"></div>

            <div className="max-w-6xl mx-auto w-full relative z-10">

                {/* Dashboard Header */}
                <div className="mb-12 border-b border-[#1a2620] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/20 mb-2">
                            System Overview
                        </h1>
                        <p className="text-[#CFFF1A] text-xs tracking-[0.3em] uppercase font-bold drop-shadow-[0_0_10px_rgba(207,255,26,0.4)]">
                            Voltigo Central Command
                        </p>
                    </div>
                    <div className="flex items-center gap-3 bg-[#111a15] border border-white/5 px-5 py-2.5 rounded-full shadow-inner">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#CFFF1A] animate-pulse shadow-[0_0_10px_rgba(207,255,26,1)]"></span>
                        <span className="text-xs uppercase tracking-wider font-bold text-gray-400">Network Sync: Online</span>
                    </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    
                    {/* Metric Card 1 */}
                    <div className="bg-[#0e1612] border border-[#1a2620] hover:border-[#CFFF1A]/40 transition-colors duration-500 rounded-3xl p-6 shadow-lg group relative overflow-hidden">
                        <div className="relative z-10 flex flex-col">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Total Assets</span>
                                <Car className="w-5 h-5 text-[#CFFF1A]/70" />
                            </div>
                            <div className="flex items-end justify-between">
                                <span className="text-4xl font-bold text-white group-hover:text-[#CFFF1A] transition-colors">{loading ? "-" : stats.totalCars}</span>
                                <span className="text-xs text-gray-500 font-semibold uppercase">Vehicles</span>
                            </div>
                        </div>
                    </div>

                    {/* Metric Card 2 */}
                    <div className="bg-[#0e1612] border border-[#1a2620] hover:border-[#CFFF1A]/40 transition-colors duration-500 rounded-3xl p-6 shadow-lg group relative overflow-hidden">
                        <div className="relative z-10 flex flex-col">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Reservations</span>
                                <CalendarCheck className="w-5 h-5 text-[#CFFF1A]" />
                            </div>
                            <div className="flex items-end justify-between">
                                <span className="text-4xl font-bold text-white group-hover:text-[#CFFF1A] transition-colors">{loading ? "-" : stats.activeBookings}</span>
                                <span className="text-xs text-gray-500 font-semibold uppercase">Total</span>
                            </div>
                        </div>
                    </div>

                    {/* Metric Card 3 */}
                    <div className="bg-[#0e1612] border border-[#1a2620] hover:border-[#CFFF1A]/40 transition-colors duration-500 rounded-3xl p-6 shadow-lg group relative overflow-hidden">
                        <div className="relative z-10 flex flex-col">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Revenue</span>
                                <DollarSign className="w-5 h-5 text-[#CFFF1A]/70" />
                            </div>
                            <div className="flex items-end justify-between">
                                <span className="text-3xl font-bold text-white group-hover:text-[#CFFF1A] transition-colors">{loading ? "-" : stats.revenue}</span>
                                <span className="text-xs text-gray-500 font-semibold uppercase">USD</span>
                            </div>
                        </div>
                    </div>

                    {/* Metric Card 4 */}
                    <div className="bg-[#0e1612] border border-[#1a2620] hover:border-[#CFFF1A]/40 transition-colors duration-500 rounded-3xl p-6 shadow-lg group relative overflow-hidden">
                        <div className="relative z-10 flex flex-col">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">System Status</span>
                                <Activity className="w-5 h-5 text-[#CFFF1A]" />
                            </div>
                            <div className="flex items-end justify-between">
                                <span className="text-4xl font-bold text-[#CFFF1A]">{stats.systemHealth}</span>
                                <span className="text-xs text-gray-500 font-semibold uppercase">Optimal</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Reservations List */}
                    <div className="lg:col-span-2 bg-[#0c130f] border border-[#1a2620] rounded-3xl p-6 shadow-lg relative">
                        <div className="flex items-center justify-between mb-6 border-b border-[#1a2620] pb-4">
                            <div className="flex items-center gap-2">
                                <CalendarCheck className="w-5 h-5 text-[#CFFF1A]" />
                                <h3 className="text-white text-lg uppercase tracking-wider font-bold">Recent Reservations</h3>
                            </div>
                            <span className="text-xs text-[#CFFF1A] bg-[#CFFF1A]/10 border border-[#CFFF1A]/30 px-3 py-1 rounded-full font-bold">
                                {reservations.length} total
                            </span>
                        </div>
                        
                        {loading ? (
                            <div className="py-12 text-center text-gray-500 text-sm">Loading reservations...</div>
                        ) : reservations.length === 0 ? (
                            <div className="py-12 text-center text-gray-500 text-sm flex flex-col items-center gap-2">
                                <CalendarCheck className="w-10 h-10 text-gray-600 mb-1" />
                                <span>No reservations recorded yet.</span>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#CFFF1A]/30">
                                {reservations.map((res, index) => (
                                    <div key={res.id || index} className="p-5 bg-white/[0.02] border border-white/10 rounded-2xl hover:border-[#CFFF1A]/40 transition-all flex flex-col gap-3">
                                        
                                        {/* Top Info */}
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <span className="text-sm font-bold text-white block">{res.carName || `Car #${res.carId}`}</span>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <User className="w-3.5 h-3.5 text-[#CFFF1A]" />
                                                    <span className="text-xs text-gray-300 font-semibold">
                                                        {res.customer?.firstName} {res.customer?.lastName}
                                                    </span>
                                                    <span className="text-xs text-gray-500">({res.customer?.email})</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-base font-bold text-[#CFFF1A]">${res.totalPrice}</span>
                                                <span className="block text-[11px] text-gray-400 font-medium">{res.days} day{res.days > 1 ? "s" : ""}</span>
                                            </div>
                                        </div>

                                        {/* Middle Dates & Pickup */}
                                        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5 text-xs text-gray-300">
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5 text-[#CFFF1A]" />
                                                <span>{formatDate(res.pickupDate)} → {formatDate(res.returnDate)}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 justify-end">
                                                {res.pickupMode === "agency" ? (
                                                    <>
                                                        <Building2 className="w-3.5 h-3.5 text-[#CFFF1A]" />
                                                        <span className="truncate">{res.pickupAgency || "Agency Pickup"}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Home className="w-3.5 h-3.5 text-[#CFFF1A]" />
                                                        <span className="truncate">{res.deliveryCity || "Home Delivery"}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Status & Payment Tag */}
                                        <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#CFFF1A] bg-[#CFFF1A]/10 border border-[#CFFF1A]/30 px-2.5 py-0.5 rounded-md">
                                                <CheckCircle className="w-3 h-3" /> Confirmed
                                            </span>
                                            <span className="text-[11px] text-gray-400 flex items-center gap-1">
                                                <CreditCard className="w-3 h-3 text-[#CFFF1A]" /> {res.payMode === "online" ? "Paid Online" : "Pay on Pickup"}
                                            </span>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Command Center */}
                    <div className="lg:col-span-1 flex flex-col gap-4">
                        <div className="bg-[#0A100E] border border-[#1a2620] rounded-3xl p-6 shadow-lg h-full">
                            <h3 className="text-white text-lg uppercase tracking-wider font-bold mb-6 border-b border-[#1a2620] pb-4 flex items-center gap-2">
                                <Settings className="w-5 h-5 text-[#CFFF1A]" /> Command Center
                            </h3>
                            
                            <div className="flex flex-col gap-4">
                                <Link href="/admin/cars/add" className="w-full flex items-center justify-between p-5 bg-[#CFFF1A]/10 border border-[#CFFF1A]/30 rounded-2xl group hover:bg-[#CFFF1A] transition-all duration-300">
                                    <div className="flex flex-col">
                                        <span className="text-[#CFFF1A] group-hover:text-black text-xs font-bold uppercase tracking-wider transition-colors">Deploy Asset</span>
                                        <span className="text-[#CFFF1A]/70 group-hover:text-black/70 text-[11px] font-medium transition-colors">Add vehicle to fleet</span>
                                    </div>
                                    <Plus className="w-5 h-5 text-[#CFFF1A] group-hover:text-black transition-colors" />
                                </Link>

                                <Link href="/admin/bookings" className="w-full flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 hover:border-[#CFFF1A]/40 transition-all duration-300">
                                    <div className="flex flex-col">
                                        <span className="text-white text-xs font-bold uppercase tracking-wider transition-colors">Bookings Manager</span>
                                        <span className="text-gray-400 text-[11px] font-medium transition-colors">View all reservations</span>
                                    </div>
                                    <CalendarCheck className="w-5 h-5 text-gray-400 group-hover:text-[#CFFF1A] transition-colors" />
                                </Link>

                                <Link href="/admin/cars" className="w-full flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 hover:border-[#CFFF1A]/40 transition-all duration-300">
                                    <div className="flex flex-col">
                                        <span className="text-white text-xs font-bold uppercase tracking-wider transition-colors">Fleet Config</span>
                                        <span className="text-gray-400 text-[11px] font-medium transition-colors">Manage cars list</span>
                                    </div>
                                    <Car className="w-5 h-5 text-gray-400 group-hover:text-[#CFFF1A] transition-colors" />
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </main>
    );
}
