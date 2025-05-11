"use client";

import { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/lib/AuthContext";

import Sidebar from "@/components/Sidebar";

export default function RSVPPage() {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [message, setMessage] = useState("");
  const [linkCreated, setLinkCreated] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [toastVisible, setToastVisible] = useState();
  const [events, setEvents] = useState([]);

  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error("API did not return an array:", data);
          setEvents([]);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      }
    };

    fetchEvents();
  }, []);

  const handleCreateLink = async () => {
    if (!selectedEvent) {
      alert("Please select an event.");
      return;
    }

    await saveMessage();

    const generatedLink = `https://example.com/rsvp?event=${encodeURIComponent(
      selectedEvent
    )}&message=${encodeURIComponent(message)}`;
    setShareLink(generatedLink);
    setLinkCreated(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  const saveMessage = async () => {
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: selectedEvent,
          message,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Message saved successfully:", data);
      } else {
        console.error("Error saving message:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const shareOptions = [
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareLink
      )}`,
    },
    {
      name: "WhatsApp",
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        shareLink
      )}`,
    },
    {
      name: "Telegram",
      url: `https://t.me/share/url?url=${encodeURIComponent(shareLink)}`,
    },
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shareLink
      )}`,
    },
    {
      name: "Email",
      url: `mailto:?subject=RSVP Invitation&body=${encodeURIComponent(
        shareLink
      )}`,
    },
  ];

  return isAuthenticated ? (
    <div className="flex bg-gray-100 h-screen">
      <Sidebar />
      <div className="p-4 w-full overflow-y-auto">
        {toastVisible && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
            Link copied!
          </div>
        )}
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          RSVP Page
        </h2>
        <form className="flex flex-col gap-6 pt-8 pb-5">
          {/* Dropdown Menu */}
          <DropdownField
            label="Select Event"
            options={events}
            value={selectedEvent}
            onChange={setSelectedEvent}
          />

          {/* message textfield */}
          <TextareaField
            label="Message"
            placeholder="Write a message (optional)"
            value={message}
            onChange={setMessage}
          />

          {/* create Link Button */}
          <button
            type="button"
            onClick={handleCreateLink}
            className="p-4 text-white text-center text-lg rounded-[18px] bg-blue-600 w-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 my-8"
          >
            Create Link
          </button>
        </form>

        {/* RSVP copy link */}
        {linkCreated && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Your RSVP Link</h3>
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="p-2 border border-neutral-300 rounded-[18px] w-full bg-blue-50"
              />
              <button
                onClick={handleCopyLink}
                className="px-5 py-2 bg-blue-600 text-white rounded-[18px] hover:bg-gray-800 transition-all"
              >
                Copy
              </button>
            </div>
          </div>
        )}
        {/* sharing options */}
        {/* TODO add icons here. */}
        {linkCreated && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Share Your RSVP Link</h3>
            <div className="flex flex-wrap gap-4">
              {shareOptions.map((option) => (
                <a
                  key={option._id}
                  href={option.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-[30px] border bg-white text-black hover:bg-neutral-100 transition-all"
                >
                  {option.name}
                </a>
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

// DropdownField Component
function DropdownField({ label, options, value, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm mb-2 text-neutral-500">
        {label}
        <span className="text-red-600">*</span>
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 px-3 border border-neutral-300 bg-white w-full rounded-[18px] font-poppins focus:outline-none"
      >
        <option value="" disabled>
          Select an event
        </option>
        {options.map((option) =>
          option.createdBy === localStorage.getItem("username") ? (
            <option key={option._id} value={option._id}>
              {option.title}
            </option>
          ) : null
        )}
      </select>
    </div>
  );
}

// TextareaField Component
function TextareaField({ label, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm mb-2 text-neutral-500">{label}</label>
      <div className="p-2 px-1 border border-neutral-300 bg-white w-full rounded-[18px] font-poppins">
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="p-2 w-full bg-transparent focus:outline-none"
        />
      </div>
    </div>
  );
}
