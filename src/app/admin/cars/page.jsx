"use client";

import { useEffect, useState } from "react";
import { getCars, deleteCar } from "../../../services/api";
import Link from "next/link";

export default function FleetConfigPage() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    // Custom Modal States
    const [carToDelete, setCarToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchCars = async () => {
        try {
            setLoading(true);
            const data = await getCars();
            setCars(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    const confirmDelete = async () => {
        if (!carToDelete) return;

        try {
            setIsDeleting(true);
            await deleteCar(carToDelete.id);
            setCars(cars.filter(car => car.id !== carToDelete.id));
            setCarToDelete(null); // Clos modal on success
        } catch (err) {
            console.error(err);
            alert("Failed to delete the vehicle. Check connection.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <main className="min-h-[100dvh] bg-[#0A100E] text-white p-4 md:p-8 lg:p-12 font-sans w-full relative">
            <div className="max-w-5xl mx-auto w-full relative z-10">

                {/* Dashboard Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between border-b border-[#1a2620] pb-6 gap-6">
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-black uppercase tracking-widest text-[#CFFF1A] mb-2">
                            Fleet Config
                        </h1>
                        <p className="text-gray-400 text-[10px] lg:text-xs tracking-widest uppercase">
                            Manage the registry of all active deployed assets.
                        </p>
                    </div>
                    <Link
                        href="/admin/cars/add"
                        className="bg-[#CFFF1A] text-black px-6 py-3.5 font-black text-[10px] tracking-[0.2em] uppercase rounded-xl hover:shadow-[0_0_20px_rgba(207,255,26,0.3)] transition-all flex items-center justify-center max-w-fit shadow-md shrink-0"
                    >
                        + Deploy New Asset
                    </Link>
                </div>

                {/* Database List rendering */}
                <div className="flex flex-col gap-5">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-32 border border-[#1a2620] border-dashed rounded-3xl bg-[#0e1612]/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#CFFF1A] animate-ping mb-4 shadow-[0_0_10px_rgba(207,255,26,1)]"></span>
                            <span className="text-[#CFFF1A] text-[10px] uppercase tracking-[0.3em] font-bold">
                                Syncing Data_Lake...
                            </span>
                        </div>
                    ) : cars.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 border border-[#1a2620] border-dashed rounded-3xl bg-[#0e1612]/30">
                            <span className="text-gray-500 text-4xl mb-4 opacity-50">⊘</span>
                            <span className="text-gray-500 text-xs uppercase tracking-[0.2em] font-bold">
                                No active assets found in the registry.
                            </span>
                        </div>
                    ) : (
                        cars.map((car) => (
                            <div key={car.id} className="flex flex-col md:flex-row items-center gap-6 bg-[#0e1612] border border-[#1a2620] rounded-[1.5rem] p-5 hover:border-[#CFFF1A]/40 transition-all hover:bg-[#111a15] shadow-lg">

                                {/* Image Thumbnail */}
                                <div className="w-full md:w-56 h-32 bg-[#0A100E] rounded-xl flex items-center justify-center p-3 shrink-0 shadow-inner overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                    <img src={car.image || "/hero.png"} alt={car.name} className="h-full w-full object-contain filter drop-shadow-2xl relative z-10" />
                                </div>

                                {/* Core Info */}
                                <div className="flex flex-col justify-center flex-1 w-full pt-2 md:pt-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="px-2 py-0.5 bg-white/5 rounded text-[8px] text-[#CFFF1A] font-bold uppercase tracking-widest border border-white/5">
                                            UID: {car.id}
                                        </span>
                                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                                            {car.brand}
                                        </span>
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest mb-2 text-white">
                                        {car.name}
                                    </h2>
                                    <div className="flex flex-wrap items-center gap-4 text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                        <span className="bg-[#1a2620]/50 px-3 py-1 rounded-md">Type: <span className="text-white ml-1">{car.type}</span></span>
                                        <span className="bg-[#1a2620]/50 px-3 py-1 rounded-md">Range: <span className="text-white ml-1">{car.range}</span></span>
                                    </div>
                                </div>

                                {/* Price & Actions */}
                                <div className="flex w-full md:w-auto items-center justify-between md:flex-col md:justify-center gap-4 shrink-0 border-t md:border-t-0 md:border-l border-[#1a2620] pt-5 md:pt-0 md:pl-8">
                                    <div className="flex flex-col items-start md:items-end w-full">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-widest font-bold">Tariff / Day</span>
                                        <span className="text-[#CFFF1A] text-xl lg:text-2xl font-black leading-none mt-1">${car.price_per_day}</span>
                                    </div>

                                    <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                                        <button
                                            onClick={() => alert(`Redirecting to update configuration panel for ${car.name}... (Future Implementation)`)}
                                            className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-[9px] text-white uppercase font-bold tracking-widest hover:bg-white/10 hover:border-[#CFFF1A]/50 hover:text-[#CFFF1A] transition-all"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => setCarToDelete(car)}
                                            className="px-4 py-2.5 bg-[#EB2411]/10 border border-[#EB2411]/30 rounded-lg text-[9px] text-[#EB2411] uppercase font-bold tracking-widest hover:bg-[#EB2411] hover:text-white hover:shadow-[0_0_15px_rgba(235,36,17,0.4)] transition-all flex items-center justify-center min-w-[70px]"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>

            {/* --- CUSTOM DELETE MODAL POPUP --- */}
            {carToDelete && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Dark blur backdrop */}
                    <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity"
                        onClick={() => !isDeleting && setCarToDelete(null)}
                    ></div>

                    {/* Modal Card */}
                    <div className="relative bg-[#0A100E] border border-[#1a2620] rounded-3xl p-8 w-full max-w-md shadow-[0_30px_60px_rgba(0,0,0,0.9)] overflow-hidden scale-100 transition-all">

                        {/* Red Top Glow Engine */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[250px] h-[50px] bg-[#EB2411]/20 rounded-full blur-[40px] pointer-events-none"></div>

                        <div className="flex flex-col items-center text-center relative z-10">
                            {/* Warning Icon */}
                            <div className="w-16 h-16 rounded-full bg-[#EB2411]/10 border border-[#EB2411]/30 flex items-center justify-center mb-6 shadow-inner">
                                <svg className="w-8 h-8 text-[#EB2411]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                </svg>
                            </div>

                            <h2 className="text-2xl font-black uppercase tracking-widest text-white mb-2">Delete Asset?</h2>
                            <p className="text-gray-400 text-[10px] tracking-widest uppercase mb-2">
                                You are about to permanently delete:
                            </p>

                            {/* Target Vehicle Info */}
                            <div className="bg-[#111a15] border border-white/5 py-3 px-6 rounded-xl w-full mb-8">
                                <p className="text-[#CFFF1A] text-[11px] font-bold uppercase tracking-widest">
                                    <span className="text-gray-500 mr-2">#{carToDelete.id}</span>
                                    {carToDelete.brand} {carToDelete.name}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                                <button
                                    onClick={() => setCarToDelete(null)}
                                    disabled={isDeleting}
                                    className="w-full sm:w-1/2 px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] uppercase font-bold tracking-widest hover:bg-white/10 transition-colors disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    disabled={isDeleting}
                                    className="w-full sm:w-1/2 px-6 py-4 bg-[#EB2411]/10 border border-[#EB2411]/30 rounded-xl text-[10px] text-[#EB2411] uppercase font-black tracking-widest hover:bg-[#EB2411] hover:text-white hover:shadow-[0_0_20px_rgba(235,36,17,0.4)] transition-all flex items-center justify-center disabled:opacity-50"
                                >
                                    {isDeleting ? "PROCESSING..." : "CONFIRM DROP"}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}

        </main>
    );
}
