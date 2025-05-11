import Link from "next/link";

export default function Hero({ isAuthenticated }) {
  return (
    <div className="relative flex-1 flex flex-col justify-center items-center text-white text-center p-4 gap-5">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-10 filter blur-sm"
        src="/assets/event.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      >
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10">
        <h1
          className="text-3xl md:text-6xl font-bold mb-4 text-shadow-pink"
          style={{ textShadow: "2px 1px 1px black" }}
        >
          Flock Together. Wherever You Roam.
        </h1>
        <p
          className="md:text-lg text-accent mb-6 drop-shadow-xl"
          style={{ textShadow: "2px 1px 1px black" }}
        >
          Create and find Unforgettable Events
        </p>
        <div className="flex justify-center items-center">
          {isAuthenticated ? (
            <Link
              href="/dashboard"
              className="inline-block bg-amber-300 text-gray-700 font-bold lg:text-lg text-xs py-3 px-5 rounded-full hover:bg-gray-200 transition mr-[10px]"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              href="/signup"
              className="inline-block bg-amber-300 text-gray-700 font-bold lg:text-lg text-xs py-3 px-5 rounded-full hover:bg-gray-200 transition mr-[10px]"
            >
              Get started here
            </Link>
          )}

          <Link
            href="/events"
            className="inline-block bg-white text-gray-900 font-bold md:text-lg text-xs py-3 px-5 rounded-full hover:bg-gray-200 transition"
          >
            Explore events
          </Link>
        </div>
      </div>
    </div>
  );
}
