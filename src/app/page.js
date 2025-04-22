"use client";

import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { useContext } from "react";
import { AuthContext } from "@/lib/AuthContext";

export default function HomePage() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div
      className="h-screen bg-black text-white flex flex-col"
      suppressHydrationWarning
    >
      <Navbar isAuthenticated={isAuthenticated} />
      <Hero />
    </div>
  );
}
