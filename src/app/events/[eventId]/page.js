import { MongoClient, ObjectId } from "mongodb";
import { Calendar, Clock, MapPin, Users, Globe, Mic, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import EventInfo from "@/components/EventInfo";

export default async function EventPage({ params, isAuthenticated }) {
  const { eventId } = params;

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();
  const event = await db
    .collection("events")
    .findOne({ _id: new ObjectId(eventId) });
  client.close();

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-3xl font-semibold text-red-500">Event not found</h1>
      </div>
    );
  }

  const formattedDate = event?.startDate
    ? new Date(event.startDate).toLocaleDateString("en-GB").replace(/\//g, ".")
    : "";

  const time = event?.startDate
    ? new Date(event.startDate).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "";

  const attendees = event.attendees?.length ?? 0;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isAuthenticated={isAuthenticated}/>

      <div className="flex flex-col lg:flex-row gap-0 max-w-[1440px] mx-auto ">
        <div className="flex-1 px-4 py-8 bg-gray-100">
          <div className="max-w-3xl mx-auto overflow-hidden rounded-xl bg-grey-50 outline">
            <div className="relative h-64">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
              <Image
                src={event.image || "https://picsum.photos/800/400"}
                alt={event.title}
                width={800}
                height={400}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-3">
                  <Tag size={12} className="mr-1" />
                  {event.category}
                </span>
                <h1 className="text-3xl font-bold text-white">{event.title}</h1>
              </div>
            </div>

            {/* Content area */}
            <div className="p-6">
              {/* Key details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Date</div>
                    <div className="font-medium">{formattedDate}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Time</div>
                    <div className="font-medium">
                      {time} ({event.duration})
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Location</div>
                    <div className="font-medium">{event.location}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-500 mb-1">
                      Participants
                    </div>
                    <div className="font-medium">
                      {attendees} of {event.maxParticipants} spots filled
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full"
                        style={{
                          width: `${
                            (attendees / event.maxParticipants) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="flex items-center px-3 py-1 rounded-md bg-gray-100 text-gray-700 text-sm">
                  <Globe size={14} className="mr-1" />
                  {event.language}
                </span>
                <span className="flex items-center px-3 py-1 rounded-md bg-gray-100 text-gray-700 text-sm">
                  <Mic size={14} className="mr-1" />
                  {event.medium}
                </span>
              </div>

              {event.description && (
                <div className="mt-4">
                  <h2 className="text-lg font-medium text-gray-900 mb-2">
                    About this event
                  </h2>
                  <div className="text-gray-700 leading-relaxed">
                    <p>{event.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:w-1/3 w-full px-4 py-8">
          <aside className="w-full flex flex-col">
            <EventInfo
              event={event}
              formattedDate={formattedDate}
              time={time}
            />

            <div className="pt-6 border-t mt-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Share this event
              </h3>
              <div className="flex flex-wrap gap-4 text-sm">
                <Link
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    `Check out this event: ${event.title} in ${event.location}`
                  )}&url=${encodeURIComponent(
                    process.env.NEXT_PUBLIC_SITE_URL + "/events/" + event._id
                  )}`}
                  target="_blank"
                  className="text-blue-500 hover:text-blue-700"
                >
                  Twitter
                </Link>
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    process.env.NEXT_PUBLIC_SITE_URL + "/events/" + event._id
                  )}`}
                  target="_blank"
                  className="text-blue-700 hover:text-blue-900"
                >
                  Facebook
                </Link>
                <Link
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                    process.env.NEXT_PUBLIC_SITE_URL + "/events/" + event._id
                  )}&title=${encodeURIComponent(event.title)}`}
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800"
                >
                  LinkedIn
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
