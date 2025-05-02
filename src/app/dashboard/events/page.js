"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/lib/AuthContext";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

export default function Events() {
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

  return isAuthenticated ? (
    <div className="flex bg-gray-100 h-screen overflow-hidden">
      <Sidebar />
      <div className="p-6 w-full overflow-hidden">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">My Events</h2>
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : events.length === 0 ? (
          <p className="text-gray-500">No events found.</p>
        ) : (
          <div className="flex justify-center items-start h-[90vh] bg-gray-100 px-4 overflow-hidden">
            <div
              className={`grid gap-6 mt-4 ${
                events.length <= 3 ? "justify-center" : "w-full max-w-screen-xl"
              }`}
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                overflowY: "auto",
                maxHeight: "calc(90vh - 20px)",
                padding: "10px",
                boxSizing: "border-box",
              }}
            >
              {events.map((event, index) => (
                <Link href={`/dashboard/events/${event._id}`}>
                  <div
                    key={event._id}
                    className="cursor-pointer bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl shadow-lg p-5 flex flex-col justify-between min-h-[230px] max-h-[270px] transform transition-transform hover:scale-[1.02] duration-300"
                  >
                    <div>
                      <h3 className="font-bold text-xl mb-2 line-clamp-1">
                        {event.title}
                      </h3>
                      <p className="text-sm text-white/90 mb-3 line-clamp-3">
                        {event.description}
                      </p>
                    </div>
                    <div className="flex justify-between items-end mt-auto text-sm text-white/80">
                      <div className="space-y-1">
                        <p className="italic">
                          {new Date(event.startDate).toLocaleDateString(
                            "en-GB"
                          )}
                        </p>
                        <span className="inline-block px-2 py-1 text-xs bg-white/20 rounded-full">
                          {event.medium}
                        </span>
                      </div>
                      <div
                        className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm"
                        title={event.createdBy}
                      >
                        {event.createdBy?.charAt(0).toUpperCase()}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <h2>Please login to access</h2>
  );
}
