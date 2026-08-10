"use client";
import { useState } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button 
        onClick={() => setOpen(!open)} 
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-royalblack text-white rounded-lg"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-royalblack text-white p-4 z-40
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0
      `}>
        <h1 className="text-xl font-bold text-yellow-400 mb-6">PriyaVRana-AI</h1>
        
        <nav className="flex flex-col gap-3">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/chat" onClick={() => setOpen(false)}>AI Chat</Link>
          <Link href="/image" onClick={() => setOpen(false)}>Image AI</Link>
          <Link href="/shayari" onClick={() => setOpen(false)}>Shayari AI</Link>
        </nav>
      </aside>

      {/* Overlay - mobile pe band karne ke liye */}
      {open && <div onClick={() => setOpen(false)} className="md:hidden fixed inset-0 bg-black/50 z-30"></div>}
    </>
  );
}