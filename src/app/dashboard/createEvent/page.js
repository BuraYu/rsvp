"use client";

import { useContext, useState } from "react";
import { AuthContext } from "@/lib/AuthContext";
import Sidebar from "@/components/Sidebar";
import clsx from "clsx";
import { get } from "mongoose";

export default function CreateEvent() {
  const { isAuthenticated } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState("Public");
  const [medium, setMedium] = useState("Online");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [duration, setDuration] = useState("");
  const [language, setLanguage] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [category, setCategory] = useState("");
  const [terms, setTerms] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [image, setImage] = useState("");

  const categories = [
    "Music",
    "Games",
    "Sports",
    "Arts",
    "Film",
    "Literature",
    "Technology",
    "Culture",
    "Lifestyle",
    "Charity",
    "Fashion",
    "Kids",
    "Other",
  ];

  const handleSubmit = async (e) => {

    e.preventDefault();

    const eventData = {
      title,
      description,
      privacy,
      medium,
      startDate,
      endDate,
      duration,
      language,
      maxParticipants,
      category,
      terms,
      location,
      latitude,
      longitude,
      image,
      createdBy: localStorage.getItem("username"),
    };

    try {
      const response = await fetch("/api/createEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Event created successfully!");
        console.log(result);
      } else {
        const errorResult = await response.json();
        alert("Error creating event: " + errorResult.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the event.");
    }
    console.log("eventDat", eventData);
  };

  return isAuthenticated ? (
    <div className="flex bg-gray-100 h-screen">
      <Sidebar />
      <div className="p-4 w-full overflow-y-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Create Event
        </h2>
        <form className="flex flex-col gap-6 pt-8 pb-5" onSubmit={handleSubmit}>
          {/* Title */}
          <InputField
            label="Title"
            required
            placeholder="Please provide a title for your event."
            value={title}
            onChange={setTitle}
          />

          {/* Description */}
          <TextareaField
            label="Description"
            required
            placeholder="Please provide a description of your event."
            value={description}
            onChange={setDescription}
          />

          {/* Privacy */}
          <ButtonGroup
            label="Privacy"
            required
            options={["Public", "Private"]}
            selected={privacy}
            onChange={setPrivacy}
          />

          {/* Medium */}
          <ButtonGroup
            label="Medium"
            required
            options={["Online", "In Person"]}
            selected={medium}
            onChange={setMedium}
          />

          {/* Start Date */}
          <InputField
            label="Start Date-Time"
            required
            type="datetime-local"
            placeholder="Please provide a start date."
            value={startDate}
            onChange={setStartDate}
          />

          {/* End Date */}
          <InputField
            label="End Date-Time"
            type="datetime-local"
            placeholder="Please provide an end date."
            value={endDate}
            onChange={setEndDate}
          />

          {/* Duration */}
          <InputField
            label="Duration"
            placeholder="Please provide a duration (hh:mm)."
            value={duration}
            onChange={setDuration}
          />

          {/* Language */}
          <InputField
            label="Language"
            placeholder="Please provide a language."
            value={language}
            onChange={setLanguage}
          />

          {/* Max Participants */}
          <InputField
            label="Max Participants (i.e. RSVPs)"
            type="number"
            placeholder="Max participants"
            value={maxParticipants}
            onChange={setMaxParticipants}
          />

          {/* Category */}
          <ButtonGroup
            label="Category"
            required
            options={categories}
            selected={category}
            onChange={setCategory}
          />

          {/* Terms */}
          <TextareaField
            label="Terms and Conditions"
            placeholder="Enter terms and conditions..."
            value={terms}
            onChange={setTerms}
          />

          {/* Location */}
          <InputField
            label="Location Name"
            required
            placeholder="Please provide a location."
            value={location}
            onChange={setLocation}
          />

          {/* Latitude */}
          <InputField
            label="Latitude"
            required
            placeholder="Please provide a latitude."
            value={latitude}
            onChange={setLatitude}
          />

          {/* Longitude */}
          <InputField
            label="Longitude"
            required
            placeholder="Please provide a longitude."
            value={longitude}
            onChange={setLongitude}
          />

          {/* Image Link */}
          <InputField
            label="Image Link"
            placeholder="Paste an image URL (e.g., https://example.com/image.jpg)"
            value={image}
            onChange={setImage}
          />

          {/* Submit */}
          <button
            type="submit"
            className="p-4 text-white text-center text-lg rounded-[18px] bg-black w-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 my-8"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  ) : (
    <h2>Please login to access</h2>
  );
}

// InputField
function InputField({
  label,
  required,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm mb-2 text-neutral-500">
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      <div className="p-2 px-1 border border-neutral-300 focus-within:border-neutral-400 bg-transparent w-full inline-flex rounded-[18px] font-poppins">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="p-2 w-full bg-transparent focus:outline-none disabled:text-neutral-500"
        />
      </div>
    </div>
  );
}

// TextareaField
function TextareaField({ label, required, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm mb-2 text-neutral-500">
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      <div className="p-2 px-1 border border-neutral-300 focus-within:border-neutral-400 bg-transparent w-full inline-flex rounded-[18px] font-poppins">
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

// ButtonGroup
function ButtonGroup({ label, required, options, selected, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm mb-2 text-neutral-500">
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      <div className="inline-flex gap-2 flex-wrap">
        {options.map((option) => (
          <button
            type="button"
            key={option}
            onClick={() => onChange(option)}
            className={clsx(
              "p-2 rounded-[18px] border transition-all",
              selected === option
                ? "bg-black text-white border-black"
                : "bg-white text-black border-neutral-300 hover:bg-neutral-100"
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
