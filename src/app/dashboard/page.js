"use client";

import { useContext } from "react";
import { AuthContext } from "@/lib/AuthContext";
import Sidebar from "@/components/Sidebar";

export default function Dashboard() {
  const { isAuthenticated } = useContext(AuthContext);

  const data = [
    { label: "Total Events Added", value: 1, filter: "total" },
    { label: "Private Events Added", value: 0, filter: "private" },
    { label: "Public Events Added", value: 1, filter: "public" },
    { label: "Offline Events Added", value: 1, filter: "offline" },
    { label: "Online Events Added", value: 0, filter: "online" },
  ];

  return isAuthenticated ? (
    <div className="flex bg-gray-100 h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Dashboard
        </h2>

        {/* Event Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {data.map((item) => (
            <div
              key={item.filter}
              className="flex flex-col items-center justify-center text-lg p-4 text-center group"
            >
              <h2 className="font-bold text-6xl text-black mb-3">
                {item.value}
              </h2>
              <p className="text-neutral-600 text-sm font-poppins mb-3">
                {item.label}
              </p>

              {/* See All Link */}
              <a
                href={`/dashboard/events?filter=${item.filter}`}
                className="sidebar-link font-sans -translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all"
              >
                See all
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <h2 className="text-center text-xl mt-10">Please login to access</h2>
  );
}
