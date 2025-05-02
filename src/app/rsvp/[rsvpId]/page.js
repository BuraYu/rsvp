"use client";

import { useState, useEffect, useMemo } from "react";
import React from "react";

export default function RsvpPage({ params }) {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [event, setEvent] = useState("");

  const { rsvpId: eventId } = React.use(params);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await fetch(`/api/rsvp/${eventId}`);
        const data = await response.json();

        if (response.ok) {
          setEvent(data.event);
          console.log("event", event);
        } else {
          console.error("Error from API:", data.error);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    fetchEvent();
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !attendance) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: eventId,
          userId: name,
          status: attendance,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error submitting RSVP:", errorData.error);
        alert("Failed to submit RSVP. Please try again.");
        return;
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Network error:", error);
      alert("An error occurred. Please check your connection and try again.");
    }
  };

  const formattedDate = useMemo(() => {
    if (!event?.startDate) return "";
    const date = new Date(event.startDate);
    return date.toLocaleDateString("en-GB").replace(/\//g, ".");
  }, [event.startDate]);

  const time = useMemo(() => {
    if (!event?.startDate) return "";
    const date = new Date(event.startDate);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }, [event.startDate]);
  console.log(event);
  return (
    <div className="h-screen p-10 bg-gray-100 text-blue flex justify-center">
      <div className="w-[1440px] bg-gray-100 flex">
        <div className="w-[70%]">
          <div className="w-full p-4 flex flex-col gap-8">
            {/* Image */}
            <div className="w-full h-96 overflow-hidden rounded-lg shadow-md">
              <img
                src={event.image}
                alt="Event"
                className="w-full h-full object-cover"
              />
            </div>

            {/* About Section */}
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
                Message
              </h2>
              <p className="text-gray-600 leading-relaxed">{event.message}</p>
              <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
                About the Event
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Join us for an exciting day filled with sports, fun, and
                community spirit! Whether you're competing, cheering, or just
                enjoying the atmosphere, there’s something for everyone. Bring
                your friends and family, and let's make unforgettable memories
                together.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Date: {formattedDate}
              </p>
              <p className="text-gray-600 leading-relaxed">
                Starting Time: {time}{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="w-[30%]  gap-3 p-4">
          <div className="rounded-lg flex flex-col  gap-2 outline w-full outline-1 outline-neutral-300 p-6">
            <h2 className="font-bold text-xl">Event X</h2>
            <iframe
              title="map"
              className="w-full h-64 mt-2 outline outline-1 outline-neutral-300 shadow-md rounded-lg"
              src={`https://maps.google.com/maps?q=${event.latitude},${event.longitude}&hl=en&output=embed`}
            ></iframe>

            <h2 className="inline-flex items-center gap-2 text-sm text-gray-600">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M352 48H160a48 48 0 00-48 48v368l144-128 144 128V96a48 48 0 00-48-48z"
                ></path>
              </svg>
              {event.category}
            </h2>

            <h2 className="inline-flex items-center gap-2 text-sm text-gray-600">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="416"
                  height="384"
                  x="48"
                  y="80"
                  fill="none"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  rx="48"
                ></rect>
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M128 48v32m256-32v32m80 80H48"
                ></path>
              </svg>
              {formattedDate}, {time}
            </h2>

            <h2 className="inline-flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="32"
                  d="M256 48c-79.5 0-144 61.39-144 137 0 87 96 224.87 131.25 272.49a15.77 15.77 0 0025.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137z"
                ></path>
                <circle
                  cx="256"
                  cy="192"
                  r="48"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="32"
                ></circle>
              </svg>
              Milan Mela, Kolkata
            </h2>
          </div>
          <div className="rounded-lg flex flex-col gap-4 outline w-full outline-1 outline-neutral-300 p-6 mt-5">
            <h2 className="font-bold text-xl">RSVP</h2>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Name Input Field */}
                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Enter Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full mt-1 p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Selectable Text Options */}
                <div className="w-full">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Are you coming?
                  </label>
                  <div className="flex gap-4">
                    <div
                      className={`cursor-pointer flex-1 p-2 rounded-lg text-sm text-center ${
                        attendance === "Coming"
                          ? "bg-green-500 text-white"
                          : "bg-green-300 hover:bg-green-400 hover:text-white"
                      } transition ${
                        attendance === "Coming"
                          ? "bg-opacity-100"
                          : "bg-opacity-80"
                      }`}
                      onClick={() => setAttendance("attending")}
                    >
                      Coming
                    </div>

                    <div
                      className={`cursor-pointer flex-1 p-2 rounded-lg text-sm text-center ${
                        attendance === "Maybe"
                          ? "bg-orange-500 text-white"
                          : "bg-orange-300 hover:bg-orange-400 hover:text-white"
                      } transition ${
                        attendance === "Maybe"
                          ? "bg-opacity-100"
                          : "bg-opacity-80"
                      }`}
                      onClick={() => setAttendance("maybe")}
                    >
                      Maybe
                    </div>

                    <div
                      className={`cursor-pointer flex-1 p-2 rounded-lg text-sm text-center ${
                        attendance === "No"
                          ? "bg-red-500 text-white"
                          : "bg-red-300 hover:bg-red-400 hover:text-white"
                      } transition ${
                        attendance === "No" ? "bg-opacity-100" : "bg-opacity-80"
                      }`}
                      onClick={() => setAttendance("declined")}
                    >
                      No
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="primary-btn bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-500 transition"
                >
                  Submit
                </button>
              </form>
            ) : (
              <div className="text-green-600 font-semibold">
                <p>
                  Thank you, {name}! You have RSVP'd as: {attendance}.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
