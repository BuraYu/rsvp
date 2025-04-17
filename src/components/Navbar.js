import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="h-[80px] w-full flex justify-between items-center px-[96px] bg-gray-900">
      {/* Logo */}
      <div className="flex items-center space-x-2 text-xl font-bold gap-2">
        <span className="text-white">logo</span>
        <span className="text-white">Text</span>
      </div>

      {/* Hamburger Menu Button */}
      <button
        className="text-white md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>

      {/* Full-Screen Menu */}
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
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <a
          href=""
          className="hover:text-gray-400 text-white text-2xl transition"
        >
          Find Event
        </a>
        <a
          href=""
          className="hover:text-gray-400 text-white text-2xl transition"
        >
          Dashboard
        </a>
        <a
          href=""
          className="hover:text-gray-400 text-white text-2xl transition"
        >
          Logout
        </a>
      </div>

      {/* Links for Larger Screens */}
      {isLoggedIn ? (
        <ul className="hidden md:flex space-x-6 gap-5">
          <li>
            <a
              href="/events"
              className="hover:text-gray-400  text-white transition"
            >
              Find Event
            </a>
          </li>
          <li>
            <a href="" className="hover:text-gray-400 text-white transition">
              Dashboard
            </a>
          </li>
          <li>
            <a href="" className="hover:text-gray-400 text-white transition">
              Logout
            </a>
          </li>
        </ul>
      ) : (
        <ul className="hidden md:flex space-x-6 gap-5">
          <li>
            <a
              href="/events"
              className="hover:text-gray-400 text-white transition"
            >
              Find Events
            </a>
          </li>
          <li>
            <a href="" className="hover:text-gray-400  text-white transition">
              Sign Up
            </a>
          </li>
          <li>
            <a href="" className="hover:text-gray-400  text-white transition">
              Login
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
}
