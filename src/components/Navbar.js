"use client";

import Link from "next/link";
import { useState } from "react";
import { logout } from "@/lib/logout";
import Image from "next/image";
import { useAuth } from "@/lib/AuthContext";

export default function Navbar() {
  const { isAuthenticated, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  if (loading) return null;

  return (
    <nav className="h-[80px] w-full flex justify-between items-center md:px-[96px] px-[20px] bg-gray-900 font-sans z-50 relative">
      {/* Logo */}
      <div className="flex items-center space-x-2 text-xl font-bold gap-2">
        <Image
          src="/assets/flockr_logo.png"
          width={75}
          height={75}
          alt="logo of flockr"
        />
      </div>

      {/* Mobile menu toggle */}
      <button
        className="text-white md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-gray-900 text-white flex flex-col items-center justify-center space-y-6 transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <button
          className="absolute top-4 right-4 text-white"
          onClick={() => setIsOpen(false)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <Link href="/events" className="text-2xl hover:text-gray-400">
          Find Event
        </Link>
        {isAuthenticated ? (
          <>
            <Link href="/dashboard" className="text-2xl hover:text-gray-400">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-2xl hover:text-gray-400"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/signup" className="text-2xl hover:text-gray-400">
              Sign Up
            </Link>
            <Link href="/login" className="text-2xl hover:text-gray-400">
              Login
            </Link>
          </>
        )}
      </div>

      {/* Desktop Nav */}
      <ul className="hidden md:flex space-x-6 gap-5 text-white">
        <li>
          <Link href="/events" className="hover:text-gray-400">
            Find Event
          </Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <Link href="/dashboard" className="hover:text-gray-400">
                Dashboard
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="hover:text-gray-400">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/signup" className="hover:text-gray-400">
                Sign Up
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-gray-400">
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
