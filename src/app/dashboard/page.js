"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/lib/AuthContext";
import Sidebar from "@/components/Sidebar";

export default function Dashboard() {
  const { isAuthenticated } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        const username = localStorage.getItem("username");

        const userEvents = data.filter((event) => event.createdBy === username);

        setEvents(userEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const totalEvents = events.length;
  const privateEvents = events.filter(
    (event) => event.privacy === "Private"
  ).length;
  const publicEvents = events.filter(
    (event) => event.privacy === "Public"
  ).length;
  const offlineEvents = events.filter(
    (event) => event.medium === "Offline"
  ).length;
  const onlineEvents = events.filter(
    (event) => event.medium === "Online"
  ).length;

  const data = [
    { filter: "total", value: totalEvents, label: "Total Events Added" },
    { filter: "private", value: privateEvents, label: "Private Events Added" },
    { filter: "public", value: publicEvents, label: "Public Events Added" },
    { filter: "offline", value: offlineEvents, label: "Offline Events Added" },
    { filter: "online", value: onlineEvents, label: "Online Events Added" },
  ];

  return isAuthenticated ? (
    <div className="flex bg-gray-100 h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Dashboard
        </h2>

        {loading ? (
          <div className="text-center text-xl text-gray-600">Loading...</div>
        ) : (
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

                <a
                  href={`/dashboard/events?filter=${item.filter}`}
                  className="sidebar-link font-sans -translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all"
                >
                  See all
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  ) : (
    <h2 className="text-center text-xl mt-10">Please login to access</h2>
  );
}
