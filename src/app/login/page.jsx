"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ShieldAlert, ArrowRight, UserCheck, ShieldCheck } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@voltigo.com";
        const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

        setTimeout(() => {
            if (email.trim().toLowerCase() === adminEmail.toLowerCase() && password === adminPass) {
                // Admin Authenticated
                localStorage.setItem("voltigo_user_role", "admin");
                localStorage.setItem("voltigo_user_email", email);
                document.cookie = "voltigo_admin_auth=true; path=/; max-age=86400; SameSite=Lax";
                router.push("/admin");
            } else {
                // Regular Client
                localStorage.setItem("voltigo_user_role", "client");
                localStorage.setItem("voltigo_user_email", email);
                document.cookie = "voltigo_admin_auth=; path=/; max-age=0;";
                router.push("/cars");
            }
            setLoading(false);
        }, 600);
    };

    return (
        <main className="min-h-[100dvh] bg-[#0A100E] text-white flex items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-[#CFFF1A]/10 rounded-full blur-[140px] pointer-events-none"></div>
            <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-[#CFFF1A]/5 rounded-full blur-[160px] pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-md bg-[#0c1410] border border-[#CFFF1A]/20 rounded-3xl p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(207,255,26,0.1)]">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block mb-3">
                        <span className="text-3xl font-serif italic text-white tracking-widest hover:text-[#CFFF1A] transition-colors">
                            Voltigo
                        </span>
                    </Link>
                    <h1 className="text-xl font-bold uppercase tracking-wider text-white">Sign In</h1>
                    <p className="text-xs text-gray-400 mt-1">Access your dashboard or customer space</p>
                </div>

                {error && (
                    <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-xs text-red-400">
                        <ShieldAlert className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-[#CFFF1A] uppercase tracking-wider font-semibold">Email Address</label>
                        <div className="relative flex items-center">
                            <Mail className="w-4 h-4 text-[#CFFF1A]/70 absolute left-3.5 pointer-events-none" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="w-full bg-[#070e0a] border border-[#CFFF1A]/20 focus:border-[#CFFF1A] focus:ring-1 focus:ring-[#CFFF1A]/30 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-[#CFFF1A] uppercase tracking-wider font-semibold">Password</label>
                        <div className="relative flex items-center">
                            <Lock className="w-4 h-4 text-[#CFFF1A]/70 absolute left-3.5 pointer-events-none" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-[#070e0a] border border-[#CFFF1A]/20 focus:border-[#CFFF1A] focus:ring-1 focus:ring-[#CFFF1A]/30 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-3 w-full py-3.5 bg-[#CFFF1A] text-black font-bold text-sm uppercase tracking-wider rounded-xl hover:bg-[#b8e617] shadow-[0_0_20px_rgba(207,255,26,0.3)] transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                    >
                        <span>{loading ? "Authenticating..." : "Connect"}</span>
                        {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />}
                    </button>
                </form>

                {/* Footer Info Hint */}
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
                    <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#CFFF1A]" /> Admin & Client Access
                    </span>
                    <Link href="/cars" className="text-gray-400 hover:text-[#CFFF1A] transition-colors">
                        Explore Cars →
                    </Link>
                </div>
            </div>
        </main>
    );
}
