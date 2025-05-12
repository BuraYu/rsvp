"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/lib/AuthContext";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { Mic, Search } from "lucide-react";

export default function Events() {
  const { isAuthenticated } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return isAuthenticated ? (
    <div className="flex bg-gray-100 h-screen overflow-hidden">
      <Sidebar />
      <div className="p-6 w-full overflow-hidden">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          My Events
        </h2>

        {/* Search Bar */}
        <div className="relative mb-4 flex justify-center">
          <div className="relative w-[30%]">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-2 pl-10 pr-4 border border-neutral-300 focus-within:border-neutral-400 bg-white w-full inline-flex rounded-[18px] font-poppins"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
              size={20}
              strokeWidth={1.5}
            />
          </div>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : filteredEvents.length === 0 ? (
          <p className="text-gray-500">No events found.</p>
        ) : (
          <div className="flex justify-center items-start h-[90vh] bg-gray-100 px-4 overflow-hidden">
            <div
              className={`grid gap-6 mt-4 ${
                filteredEvents.length <= 3
                  ? "justify-center"
                  : "w-full max-w-screen-xl"
              }`}
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                overflowY: "auto",
                maxHeight: "calc(90vh - 20px)",
                padding: "10px",
                boxSizing: "border-box",
              }}
            >
              {filteredEvents.map((event, index) => (
                <Link href={`/dashboard/events/${event._id}`} key={event._id}>
                  <div className="cursor-pointer bg-white text-black rounded-2xl shadow-sm p-5 flex flex-col justify-between min-h-[230px] max-h-[270px] transform transition-transform hover:scale-[1.02] duration-300">
                    <div>
                      <h3 className="font-bold text-xl mb-2 line-clamp-1">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3 line-clamp-3">
                        {event.description}
                      </p>
                    </div>
                    <div className="flex justify-between items-end mt-auto text-sm text-gray-500">
                      <div className="space-y-1">
                        <p className="italic">
                          {new Date(event.startDate).toLocaleDateString(
                            "en-GB"
                          )}
                        </p>
                        <span className="inline-block">
                          <TagPill
                            icon={<Mic size={14} />}
                            text={event.medium}
                          />
                        </span>
                      </div>
                      <div
                        className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm"
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

const TagPill = ({ icon, text }) => (
  <span className="flex items-center px-3 py-1 rounded-md bg-gray-100 text-gray-700 text-sm">
    {icon && <span className="mr-1">{icon}</span>}
    {text}
  </span>
);
