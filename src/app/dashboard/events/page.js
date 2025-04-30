"use client";

import { useContext } from "react";
import { AuthContext } from "@/lib/AuthContext";
import Sidebar from "@/components/Sidebar";

export default function Events() {
  const { isAuthenticated } = useContext(AuthContext);
  const number = 12;

  const gridColumns = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
  };

  const eventBoxes = [
    {
      name: "Event name 1",
      className: "bg-blue-500 min-h-[200px] max-h-[250px]",
    },
    {
      name: "Event name 2",
      className: "bg-pink-400 min-h-[200px] max-h-[250px]",
    },
    {
      name: "Event name 3",
      className: "bg-green-400 min-h-[200px] max-h-[250px]",
    },
    {
      name: "Event name 4",
      className: "bg-purple-500 min-h-[200px] max-h-[250px]",
    },
    {
      name: "Event name 5",
      className: "bg-yellow-400 min-h-[200px] max-h-[250px]",
    },
    {
      name: "Event name 6",
      className: "bg-teal-400 min-h-[200px] max-h-[250px]",
    },
    {
      name: "Event name 7",
      className: "bg-orange-400 min-h-[200px] max-h-[250px]",
    },
    {
      name: "Event name 9",
      className: "bg-red-400 min-h-[200px] max-h-[250px]",
    },
    {
      name: "Event name 10",
      className: "bg-indigo-400 min-h-[200px] max-h-[250px]",
    },
    {
      name: "Event name 11",
      className: "bg-gray-700 min-h-[200px] max-h-[250px]",
    },
    {
      name: "Event name 12",
      className: "bg-blue-700 min-h-[200px] max-h-[250px]",
    },
  ];

  return isAuthenticated ? (
    <div className="flex bg-gray-100 h-screen overflow-hidden">
      <Sidebar />
      <div className="p-4 w-full overflow-hidden">
        <h2 className="text-2xl font-bold">Events</h2>
        <div className="flex justify-center items-center h-[90vh] bg-gray-100 px-4 overflow-hidden">
          <div
            className={`grid gap-4 mt-6 ${
              number <= 3
                ? `${gridColumns[number]} justify-center`
                : "w-full max-w-screen-xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            }`}
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              overflowY: "auto",
              maxHeight: "calc(90vh - 20px)",
              padding: "10px",
              boxSizing: "border-box",
            }}
          >
            {eventBoxes.slice(0, number).map((event, index) => (
              <div
                key={index}
                className={`${event.className} text-white rounded-2xl p-4 flex items-center justify-center`}
                style={{ minWidth: "280px" }}
              >
                {event.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h2>Please login to access</h2>
  );
}
