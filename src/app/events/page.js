"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function Events() {
  const [activeButton, setActiveButton] = useState("All");

  const handleButtonClick = (category) => {
    setActiveButton(category);
  };

  const eventTypes = [
    "All",
    "Music",
    "Games",
    "Sports",
    "Film",
    "Literature",
    "Technology",
  ];

  return (
    <>
      <Navbar />
      <div className="container py-6 px-5 mx-auto min-h-screen bg-gray-100 w-full">
        <div className="flex flex-col">
          <h1 className="text-5xl font-bold mb-6 py-5">
            Explore events near your area
          </h1>
          <div className="flex gap-4 mb-8 items-center overflow-auto text-neutral-500">
            {eventTypes.map((category) => (
              <button
                key={category}
                onClick={() => handleButtonClick(category)}
                className={` cursor-pointer text-sm ${
                  activeButton === category ? "text-red-500" : "text-zinc-400"
                } rounded hover:text-red-500`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
