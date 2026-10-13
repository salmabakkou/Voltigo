"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SideBar from "../../components/SideBar";

export default function AdminLayout({ children }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // Client-side instant check
        const role = localStorage.getItem("voltigo_user_role");
        const hasAuthCookie = document.cookie.includes("voltigo_admin_auth=true");

        if (role !== "admin" && !hasAuthCookie) {
            router.replace("/login");
        } else {
            setAuthorized(true);
        }
    }, [router]);

    // Prevent rendering admin interface until auth check passes
    if (!authorized) {
        return (
            <div className="min-h-[100dvh] bg-[#0A100E] flex flex-col items-center justify-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#CFFF1A] animate-ping shadow-[0_0_15px_rgba(207,255,26,1)]"></span>
                <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#CFFF1A]/70">
                    Verifying Credentials...
                </span>
            </div>
        );
    }

    return (
        <div className="flex min-h-[100dvh] bg-[#0A100E] w-full overflow-hidden">
            <SideBar />

            {/* Pushes child components to the right of the sidebar on desktop */}
            <div className="flex-1 w-full lg:ml-72 transition-all duration-500 relative">
                {children}
            </div>
        </div>
    );
}
