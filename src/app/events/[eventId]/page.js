import { MongoClient, ObjectId } from "mongodb";
import Image from "next/image";
import Link from "next/link";

export default async function EventPage({ params }) {
  const { eventId } = params;

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();

  const event = await db
    .collection("events")
    .findOne({ _id: new ObjectId(eventId) });

  client.close();

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-semibold text-red-500">Event not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-yellow-100 flex items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left side: Event Details */}
        <div className="md:w-2/3 relative">
          <Link
            href="/events"
            className=" 
        absolute top-4 left-4 inline-flex items-center border border-indigo-300 px-3 py-1.5 rounded-md text-indigo-500 hover:bg-indigo-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              ></path>
            </svg>
            <span class="ml-1 font-bold text-lg">Back</span>
          </Link>

          <Image
            src="https://picsum.photos/350/250"
            alt={event.name}
            className="w-full h-64 object-cover"
          />

          <div className="p-6 space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {event.name}
            </h1>

            <div className="text-gray-600 space-y-1">
              <p>
                <span className="font-semibold">Category:</span>{" "}
                {event.category}
              </p>
              <p>
                <span className="font-semibold">Location:</span>{" "}
                {event.location}
              </p>
              <p>
                <span className="font-semibold">Date & Time:</span>{" "}
                {new Date(event.dateTime).toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Cost:</span> ${event.cost}
              </p>
            </div>

            <p className="text-lg text-gray-700">{event.about}</p>

            <div className="border-t pt-4 text-sm text-gray-500">
              <p>
                <span className="font-semibold">Terms:</span>{" "}
                {event.termsAndConditions}
              </p>
            </div>
          </div>
        </div>

        {/* Right side: Google Map */}
        <div className="md:w-1/3 h-64 md:h-auto">
          <iframe
            title="Event Location"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              event.location
            )}&output=embed`}
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
