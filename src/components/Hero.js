import Link from "next/link";

export default function Hero() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center bg-gray-900 text-white text-center p-4 gap-5">
      <h1 className="text-7xl font-bold mb-4">
        Create and find Unforgettable Events
      </h1>
      <p className="text-lg mb-6">RSVP and Management App</p>
      <div className="flex justify-center items-center">
        <Link
          href="/dashboard"
          className="inline-block bg-amber-300 text-gray-900 font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition mr-[10px]"
        >
          Go to Dashboard
        </Link>
        <Link
          href="/events"
          className="inline-block bg-white text-gray-900 font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition"
        >
          Explore events
        </Link>
      </div>
    </div>
  );
}
