"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function SideBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Overview", path: "/admin", icon: "❖" },
    { name: "Fleet Config", path: "/admin/cars", icon: "▤" },
    { name: "Deploy Vehicle", path: "/admin/cars/add", icon: "＋" },
    { name: "Bookings", path: "/admin/bookings", icon: "◎" },
    { name: "System Settings", path: "/admin/settings", icon: "⚙" },
  ];

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 right-6 w-12 h-12 bg-[#0A100E] border border-[#CFFF1A]/30 rounded-full flex items-center justify-center z-[60] shadow-[0_0_20px_rgba(207,255,26,0.15)] transition-transform"
      >
        <span className="text-[#CFFF1A] text-xl font-black mt-[-2px]">{isOpen ? '✕' : '☰'}</span>
      </button>

      <aside className={`fixed top-0 left-0 bottom-0 w-72 bg-[#0A100E] border-r border-[#1a2620] z-50 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        
        {/* Voltigo Navbar Style Logo */}
        <div className="h-32 flex flex-col justify-center px-10 border-b border-[#1a2620] bg-[#0A100E]">
           <Link href="/">
              <span className="text-[1.8rem] font-serif italic text-white tracking-[0.15em] hover:text-[#CFFF1A] transition-colors cursor-pointer drop-shadow-md">
                Voltigo
              </span>
           </Link>
           <span className="text-[#CFFF1A] text-[9px] tracking-[0.3em] font-black uppercase mt-1 relative left-1 opacity-80">Admin Portal</span>
        </div>

        {/* Dynamic Navigation Options */}
        <nav className="flex flex-col gap-2 flex-1 px-5 py-8 overflow-y-auto scrollbar-hide">
          <p className="text-gray-600 text-[9px] font-bold tracking-[0.3em] uppercase mb-4 px-3">Main Menu</p>
          
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            
            return (
              <Link 
                key={item.name} 
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  isActive 
                    ? 'bg-[#CFFF1A]/10 border border-[#CFFF1A]/20' 
                    : 'hover:bg-white/[0.02] border border-transparent'
                }`}
              >
                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-[#CFFF1A] shadow-[0_0_10px_rgba(207,255,26,0.8)] rounded-r"></div>}
                
                <span className={`text-[18px] transition-colors ${isActive ? 'text-[#CFFF1A]' : 'text-gray-500 group-hover:text-[#CFFF1A]'}`}>
                   {item.icon}
                </span>
                
                <span className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-colors ${isActive ? 'text-[#CFFF1A]' : 'text-gray-400 group-hover:text-white'}`}>
                   {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Ultra Premium Restyled Disconnect Footer */}
        <div className="p-6 mt-2">
           <button 
             className="flex items-center justify-between w-full px-5 py-4 rounded-2xl bg-[#0c120e] border border-[#1a2620] hover:border-[#EB2411]/50 hover:bg-[#EB2411]/10 transition-all duration-300 group shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] overflow-hidden relative cursor-pointer"
             onClick={() => {
                // Example auth kill logic that redirects to home
                window.location.href = '/';
             }}
           >
              {/* Subtle Red glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#EB2411]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex items-center gap-4 relative z-10 w-full">
                 <div className="w-8 h-8 rounded-[0.6rem] bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-[#EB2411] group-hover:border-[#EB2411] group-hover:shadow-[0_0_15px_rgba(235,36,17,0.6)] transition-all shadow-inner shrink-0">
                    <svg className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                 </div>
                 <div className="flex flex-col items-start gap-1">
                   <span className="text-[10px] uppercase tracking-[0.25em] font-black text-gray-500 group-hover:text-white transition-colors leading-none">Disconnect</span>
                   <span className="text-[7px] uppercase tracking-[0.2em] font-bold text-gray-600 transition-colors leading-none">End Session safely</span>
                 </div>
              </div>
           </button>
        </div>

      </aside>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
