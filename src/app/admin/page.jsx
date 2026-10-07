"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCars } from "../../services/api";

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({
        totalCars: 0,
        activeBookings: 24,
        revenue: "$12,450",
        systemHealth: "100%"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const cars = await getCars();
                setStats(prev => ({ ...prev, totalCars: cars.length }));
            } catch (err) {
                console.error("Failed to fetch Data_Lake stats.", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

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
                        <p className="text-[#CFFF1A] text-[10px] lg:text-xs tracking-[0.3em] uppercase font-bold drop-shadow-[0_0_10px_rgba(207,255,26,0.4)]">
                            Voltigo Central Command
                        </p>
                    </div>
                    <div className="flex items-center gap-3 bg-[#111a15] border border-white/5 px-5 py-2.5 rounded-full shadow-inner">
                        <span className="w-2 h-2 rounded-full bg-[#CFFF1A] animate-pulse shadow-[0_0_10px_rgba(207,255,26,1)]"></span>
                        <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-400">Network Sync: Online</span>
                    </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    
                    {/* Metric Card 1 */}
                    <div className="bg-[#0e1612] border border-[#1a2620] hover:border-[#CFFF1A]/40 transition-colors duration-500 rounded-3xl p-6 shadow-lg group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-[#CFFF1A]/10 rounded-full blur-[40px] pointer-events-none z-0 group-hover:bg-[#CFFF1A]/20 transition-all"></div>
                        <div className="relative z-10 flex flex-col">
                            <span className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold mb-2">Total Assets</span>
                            <div className="flex items-end justify-between">
                                <span className="text-4xl font-black text-white group-hover:text-[#CFFF1A] transition-colors">{loading ? "-" : stats.totalCars}</span>
                                <span className="text-[10px] text-gray-600 font-bold uppercase">Vehicles</span>
                            </div>
                        </div>
                    </div>

                    {/* Metric Card 2 */}
                    <div className="bg-[#0e1612] border border-[#1a2620] hover:border-[#CFFF1A]/40 transition-colors duration-500 rounded-3xl p-6 shadow-lg group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-[#CFFF1A]/10 rounded-full blur-[40px] pointer-events-none z-0 group-hover:bg-[#CFFF1A]/20 transition-all"></div>
                        <div className="relative z-10 flex flex-col">
                            <span className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold mb-2">Active Bookings</span>
                            <div className="flex items-end justify-between">
                                <span className="text-4xl font-black text-white group-hover:text-[#CFFF1A] transition-colors">{stats.activeBookings}</span>
                                <span className="text-[10px] text-gray-600 font-bold uppercase">Ongoing</span>
                            </div>
                        </div>
                    </div>

                    {/* Metric Card 3 */}
                    <div className="bg-[#0e1612] border border-[#1a2620] hover:border-[#CFFF1A]/40 transition-colors duration-500 rounded-3xl p-6 shadow-lg group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-[#CFFF1A]/10 rounded-full blur-[40px] pointer-events-none z-0 group-hover:bg-[#CFFF1A]/20 transition-all"></div>
                        <div className="relative z-10 flex flex-col">
                            <span className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold mb-2">Revenue (30d)</span>
                            <div className="flex items-end justify-between">
                                <span className="text-4xl font-black text-white group-hover:text-[#CFFF1A] transition-colors">{stats.revenue}</span>
                                <span className="text-[10px] text-gray-600 font-bold uppercase">USD</span>
                            </div>
                        </div>
                    </div>

                    {/* Metric Card 4 */}
                    <div className="bg-[#0e1612] border border-[#1a2620] hover:border-[#CFFF1A]/40 transition-colors duration-500 rounded-3xl p-6 shadow-lg group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-[#CFFF1A]/10 rounded-full blur-[40px] pointer-events-none z-0 group-hover:bg-[#CFFF1A]/20 transition-all"></div>
                        <div className="relative z-10 flex flex-col">
                            <span className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold mb-2">System Health</span>
                            <div className="flex items-end justify-between">
                                <span className="text-4xl font-black text-[#CFFF1A] drop-shadow-[0_0_10px_rgba(207,255,26,0.3)]">{stats.systemHealth}</span>
                                <span className="text-[10px] text-gray-600 font-bold uppercase">Optimal</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Lower Section Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Live Telemetry / Recent Activity */}
                    <div className="lg:col-span-2 bg-[#0c130f] border border-[#1a2620] rounded-[2rem] p-8 shadow-[inset_0_2px_15px_rgba(0,0,0,0.4)] relative">
                        <div className="flex items-center justify-between mb-8 border-b border-[#1a2620] pb-4">
                            <h3 className="text-white text-lg uppercase tracking-widest font-black">Live Telemetry</h3>
                            <button className="text-[9px] text-[#CFFF1A] uppercase tracking-[0.2em] font-bold hover:underline">View All</button>
                        </div>
                        
                        <div className="flex flex-col gap-4">
                            {/* Simulated Feed Items */}
                            <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#CFFF1A]/10 flex items-center justify-center border border-[#CFFF1A]/30">
                                        <span className="text-[#CFFF1A] text-[10px] font-bold">BK</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white text-xs font-bold uppercase tracking-widest">New Booking Created</span>
                                        <span className="text-gray-500 text-[9px] uppercase tracking-widest">Asset #8294 • Client: John D.</span>
                                    </div>
                                </div>
                                <span className="text-gray-600 text-[9px] font-bold uppercase">Just now</span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/30">
                                        <span className="text-blue-500 text-[10px] font-bold">SY</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white text-xs font-bold uppercase tracking-widest">Data_Lake Synced</span>
                                        <span className="text-gray-500 text-[9px] uppercase tracking-widest">Registry updated via external API</span>
                                    </div>
                                </div>
                                <span className="text-gray-600 text-[9px] font-bold uppercase">12 mins ago</span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                        <span className="text-white text-[10px] font-bold">RT</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white text-xs font-bold uppercase tracking-widest">Asset Returned</span>
                                        <span className="text-gray-500 text-[9px] uppercase tracking-widest">Voltigo Concept • Status: Charging</span>
                                    </div>
                                </div>
                                <span className="text-gray-600 text-[9px] font-bold uppercase">1 hour ago</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions Panel */}
                    <div className="lg:col-span-1 flex flex-col gap-4">
                        <div className="bg-[#0A100E] border border-[#1a2620] rounded-[2rem] p-8 h-full shadow-lg">
                            <h3 className="text-white text-lg uppercase tracking-widest font-black mb-8 border-b border-[#1a2620] pb-4">Command Center</h3>
                            
                            <div className="flex flex-col gap-4">
                                <Link href="/admin/cars/add" className="w-full flex items-center justify-between p-5 bg-[#CFFF1A]/10 border border-[#CFFF1A]/30 rounded-2xl group hover:bg-[#CFFF1A] transition-all duration-300">
                                    <div className="flex flex-col">
                                        <span className="text-[#CFFF1A] group-hover:text-black text-xs font-black uppercase tracking-widest transition-colors">Deploy Asset</span>
                                        <span className="text-[#CFFF1A]/60 group-hover:text-black/60 text-[9px] uppercase tracking-widest font-bold transition-colors">Add to fleet</span>
                                    </div>
                                    <span className="text-[#CFFF1A] group-hover:text-black text-xl transition-colors">＋</span>
                                </Link>

                                <Link href="/admin/cars" className="w-full flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 hover:border-[#CFFF1A]/40 transition-all duration-300">
                                    <div className="flex flex-col">
                                        <span className="text-white text-xs font-black uppercase tracking-widest transition-colors">Fleet Config</span>
                                        <span className="text-gray-500 text-[9px] uppercase tracking-widest font-bold transition-colors">Manage registry</span>
                                    </div>
                                    <span className="text-gray-500 group-hover:text-[#CFFF1A] text-xl transition-colors">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </main>
    );
}
