"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import clsx from "clsx";

export default function RSVPPage() {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [message, setMessage] = useState("");
  const [linkCreated, setLinkCreated] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [toastVisible, setToastVisible] = useState();

  const events = ["Event 1", "Event 2", "Event 3", "Event 4"];

  const handleCreateLink = () => {
    if (!selectedEvent) {
      alert("Please select an event.");
      return;
    }

    const generatedLink = `https://example.com/rsvp?event=${encodeURIComponent(
      selectedEvent
    )}&message=${encodeURIComponent(message)}`;
    setShareLink(generatedLink);
    setLinkCreated(true);
    console.log(shareLink);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
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

  return (
    <div className="flex bg-gray-100 h-screen">
      <Sidebar />
      <div className="p-4 w-full overflow-y-auto">
        {toastVisible && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-md shadow-md">
            Link copied!
          </div>
        )}
        <h2 className="text-2xl font-bold">RSVP Page</h2>
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
            className="p-4 text-white text-center text-lg rounded-[18px] bg-black w-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 my-8"
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
                className="p-2 border border-neutral-300 rounded-[18px] w-full bg-gray-100"
              />
              <button
                onClick={handleCopyLink}
                className="p-2 bg-black text-white rounded-[18px] hover:bg-gray-800 transition-all"
              >
                Copy
              </button>
            </div>
          </div>
        )}
        {/* sharing options */}
        {linkCreated && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Share Your RSVP Link</h3>
            <div className="flex flex-wrap gap-4">
              {shareOptions.map((option) => (
                <a
                  key={option.name}
                  href={option.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-[18px] border bg-white text-black hover:bg-neutral-100 transition-all"
                >
                  {option.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
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
        className="p-2 px-1 border border-neutral-300 bg-transparent w-full rounded-[18px] font-poppins focus:outline-none"
      >
        <option value="" disabled>
          Select an event
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

// TextareaField Component
function TextareaField({ label, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm mb-2 text-neutral-500">{label}</label>
      <div className="p-2 px-1 border border-neutral-300 bg-transparent w-full rounded-[18px] font-poppins">
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
