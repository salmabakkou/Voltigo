"use client";

import { useState } from "react";
import axios from "axios";
import { addCar } from "../../../../services/api";

export default function AddCarForm() {
    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        type: "Electric",
        price_per_day: "",
        range: "",
    });
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        let val = e.target.value;
        if (e.target.name === "price_per_day" && val < 0) val = 0;
        setFormData({ ...formData, [e.target.name]: val });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus("");

        try {
            let imageUrl = "";

            if (imageFile) {
                const uploadData = new FormData();
                uploadData.append("file", imageFile);
                uploadData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET);

                const uploadRes = await axios.post(
                    process.env.NEXT_PUBLIC_CLOUDINARY_URL,
                    uploadData
                );
                imageUrl = uploadRes.data.secure_url;
            }

            const newCar = {
                ...formData,
                price_per_day: Number(formData.price_per_day),
                image: imageUrl || "/hero.png",
            };

            await addCar(newCar);
            setStatus("success");
            setFormData({ name: "", brand: "", type: "Electric", price_per_day: "", range: "" });
            setImageFile(null);
            setPreview(null);

            setTimeout(() => setStatus(""), 4000);
        } catch (error) {
            console.error(error);
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#0A100E] text-white p-4 md:p-8 font-sans w-full relative flex items-center justify-center">

            {/* Background Soft Glow to make it distinctly 'Moderne' */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-[#CFFF1A]/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

            <div className="max-w-3xl w-full relative z-10 transition-all">

                <div className="mb-6 border-b border-white/5 pb-5">
                    <h1 className="text-3xl font-black uppercase tracking-widest text-[#CFFF1A] mb-1 flex items-center gap-3">
                        <span className="w-2 h-8 bg-[#CFFF1A] rounded-full inline-block shadow-[0_0_15px_rgba(207,255,26,0.5)]"></span>
                        <span className="text-white mt-1">Deploy Asset</span>
                    </h1>
                    <p className="text-gray-400 text-[10px] tracking-widest uppercase ml-5 mt-2">
                        Initialize new fleet configuration.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[2rem] p-6 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] flex flex-col gap-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="flex flex-col gap-1.5 group">
                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-2 group-focus-within:text-[#CFFF1A] transition-colors">Model Name</label>
                            <input
                                type="text" name="name" value={formData.name} onChange={handleChange} required
                                className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-3.5 text-[15px] text-white focus:outline-none focus:border-[#CFFF1A]/50 focus:ring-1 focus:ring-[#CFFF1A]/20 transition-all placeholder-gray-700 shadow-inner"
                                placeholder="e.g. Performante GT"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5 group">
                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-2 group-focus-within:text-[#CFFF1A] transition-colors">Brand</label>
                            <input
                                type="text" name="brand" value={formData.brand} onChange={handleChange} required
                                className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-3.5 text-[15px] text-white focus:outline-none focus:border-[#CFFF1A]/50 focus:ring-1 focus:ring-[#CFFF1A]/20 transition-all placeholder-gray-700 shadow-inner"
                                placeholder="e.g. Voltigo"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5 group">
                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-2 group-focus-within:text-[#CFFF1A] transition-colors">Powertrain</label>
                            <div className="relative">
                                <select
                                    name="type" value={formData.type} onChange={handleChange}
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-3.5 text-[15px] text-[#CFFF1A] focus:outline-none focus:border-[#CFFF1A]/50 focus:ring-1 focus:ring-[#CFFF1A]/20 transition-all appearance-none cursor-pointer shadow-inner font-bold tracking-widest uppercase"
                                >
                                    <option value="Electric" className="bg-[#0b120f]">Electric</option>
                                    <option value="Hybrid" className="bg-[#0b120f]">Hybrid</option>
                                    <option value="Hypercar" className="bg-[#0b120f]">Hypercar</option>
                                </select>
                                <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none">
                                    <svg className="w-4 h-4 text-[#CFFF1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5 group">
                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-2 group-focus-within:text-[#CFFF1A] transition-colors">Range</label>
                            <input
                                type="text" name="range" value={formData.range} onChange={handleChange} required
                                className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-3.5 text-[15px] text-white focus:outline-none focus:border-[#CFFF1A]/50 focus:ring-1 focus:ring-[#CFFF1A]/20 transition-all placeholder-gray-700 shadow-inner"
                                placeholder="e.g. 600 km"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5 group">
                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-2 group-focus-within:text-[#CFFF1A] transition-colors">Price / Day ($)</label>
                            <input
                                type="number" name="price_per_day" value={formData.price_per_day} onChange={handleChange} required min="0" step="1"
                                className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-3.5 text-[15px] text-white focus:outline-none focus:border-[#CFFF1A]/50 focus:ring-1 focus:ring-[#CFFF1A]/20 transition-all placeholder-gray-700 shadow-inner"
                                placeholder="e.g. 200"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5 group">
                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-2 group-hover:text-[#CFFF1A] transition-colors">Asset Image</label>
                            <div className="relative w-full h-[54px] bg-black/40 border border-dashed border-gray-600 hover:border-[#CFFF1A]/50 rounded-2xl flex items-center justify-between px-5 transition-all cursor-pointer overflow-hidden group/upload shadow-inner">
                                {preview ? (
                                    <div className="flex items-center gap-3">
                                        <img src={preview} className="h-8 object-contain filter drop-shadow-[0_0_5px_rgba(207,255,26,0.3)]" alt="Preview" />
                                        <span className="text-[#CFFF1A] text-[10px] font-bold uppercase tracking-widest">Image Loaded</span>
                                    </div>
                                ) : (
                                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] group-hover/upload:text-[#CFFF1A] transition-colors">
                                        Click to upload
                                    </span>
                                )}
                                <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" required />
                            </div>
                        </div>

                    </div>

                    <div className="mt-4 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">

                        <div className="h-4 flex items-center order-2 md:order-1">
                            {status === "success" && <p className="text-[#CFFF1A] text-[10px] font-bold tracking-[0.2em] uppercase">✓ Deployed Successfully</p>}
                            {status === "error" && <p className="text-[#EB2411] text-[10px] font-bold tracking-[0.2em] uppercase">✕ Upload Failed</p>}
                        </div>

                        <button
                            type="submit" disabled={loading}
                            className="w-full md:w-auto bg-[#CFFF1A] text-black px-12 py-3.5 font-black text-[11px] tracking-[0.2em] uppercase rounded-full hover:shadow-[0_0_20px_rgba(207,255,26,0.4)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 order-1 md:order-2 flex items-center justify-center gap-2"
                        >
                            {loading ? "PROCESSING..." : "REGISTER ASSET"}
                        </button>

                    </div>

                </form>
            </div>

        </main>
    );
}
