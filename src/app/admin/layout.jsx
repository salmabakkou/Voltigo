"use client";

import SideBar from "../../components/SideBar";

export default function AdminLayout({ children }) {
    return (
        <div className="flex min-h-[100dvh] bg-[#0A100E] w-full overflow-hidden">
            <SideBar />

            {/* Pushes child components perfectly to the center of the remaining layout when sidebar is wide on large screens */}
            <div className="flex-1 w-full lg:ml-72 transition-all duration-500 relative">
                {children}
            </div>
        </div>
    );
}
