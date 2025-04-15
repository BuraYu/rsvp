"use client";

import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <div
      className="h-screen bg-black text-white flex flex-col"
      suppressHydrationWarning
    >
      <Navbar />
      <Hero />
    </div>
  );
}
