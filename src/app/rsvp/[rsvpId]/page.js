"use client";

import { useState, useEffect, useMemo } from "react";
import React from "react";
import EventInfo from "@/components/EventInfo";
import Image from "next/image";

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
  return (
    <div className="min-h-screen md:p-10 bg-gray-100 text-blue flex justify-center">
      <div className="w-full max-w-[1440px] h-full bg-gray-100 flex flex-col lg:flex-row">
        <div className="w-full lg:w-[70%] flex flex-col mb-10 lg:mb-0">
          <div className="w-full p-4 flex flex-col gap-8">
            {/* Image */}
            <div className="w-full h-96 overflow-hidden rounded-lg shadow-md">
              {event.image ? (
                <Image
                  src={event.image}
                  alt="Event image"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              ) : null}
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
        <div className="w-full lg:w-[30%] flex flex-col gap-3 px-6 py-5">
          <EventInfo event={event} formattedDate={formattedDate} time={time} />

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
