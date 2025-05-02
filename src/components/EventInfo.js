import React from "react";

export default function EventInfo({ event, formattedDate, time }) {
  return (
    <div className="w-full gap-3 ">
      <div className="rounded-lg flex flex-col gap-2 outline w-full outline-1 outline-neutral-300 p-6 ">
        <h2 className="font-bold text-xl">{event.title}</h2>
        <iframe
          title="map"
          className="w-full h-64 mt-2 outline outline-1 outline-neutral-300 shadow-md rounded-lg"
          src={`https://maps.google.com/maps?q=${event.latitude},${event.longitude}&hl=en&output=embed`}
        ></iframe>

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
            strokeWidth="0"
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
              d="M256 48c-79.5 0-144 61.39-144 137 0 87 96 224.87 131.25 272.49a15.77 15.77 0 0025.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137z"
            ></path>
            <circle
              cx="256"
              cy="192"
              r="48"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
            ></circle>
          </svg>
          {event.location}
        </h2>
      </div>
    </div>
  );
}
