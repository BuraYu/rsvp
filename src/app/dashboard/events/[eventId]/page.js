import { MongoClient, ObjectId } from "mongodb";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Calendar, Clock, MapPin, Users, Globe, Mic, Tag } from "lucide-react";

export default async function EventDetail({ params }) {
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

  const formattedDate = event.startDate
    ? new Date(event.startDate).toLocaleDateString("en-GB").replace(/\//g, ".")
    : "";

  const time = event.startDate
    ? new Date(event.startDate).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "";

  const attendees = event.attendees?.length ?? 0;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex flex-col lg:flex-row gap-0 max-w-[1440px] mx-auto">
        {/* Left side (main content) */}
        <div className="flex-1 px-4 py-8">
          <div className="max-w-3xl mx-auto overflow-hidden rounded-xl bg-white shadow">
            {/* Hero image */}
            <div className="relative h-64">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
              <Image
                src={event.image}
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

            {/* Event info */}
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <InfoRow
                  icon={<Calendar />}
                  label="Date"
                  value={formattedDate}
                />
                <InfoRow
                  icon={<Clock />}
                  label="Time"
                  value={`${time} (${event.duration})`}
                />
                <InfoRow
                  icon={<MapPin />}
                  label="Location"
                  value={event.location}
                />
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
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <TagPill icon={<Globe size={14} />} text={event.language} />
                <TagPill icon={<Mic size={14} />} text={event.medium} />
                <TagPill text={`Privacy: ${event.privacy}`} />
                <TagPill text={`Created by: ${event.createdBy}`} />
              </div>

              {/* Description */}
              {event.description && (
                <Section title="About this event">
                  <p className="text-gray-700 leading-relaxed">
                    {event.description}
                  </p>
                </Section>
              )}

              {/* Terms */}
              <Section title="Terms">
                <p className="text-gray-700 leading-relaxed">
                  {event.terms || "No terms specified."}
                </p>
              </Section>

              {/* Message */}
              <Section title="Message">
                <p className="text-gray-700 leading-relaxed">
                  {event.message || "No message provided."}
                </p>
              </Section>

              {/* Attendees */}
              <Section title="Attendees">
                <AttendeeList title="Attending" list={event.attendees} />
                <AttendeeList title="Declined" list={event.declined} />
                <AttendeeList title="Maybe" list={event.maybes} />
              </Section>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Reusable components
const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start space-x-3">
    <div className="text-blue-600 mt-0.5">{icon}</div>
    <div>
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  </div>
);

const Section = ({ title, children }) => (
  <div className="mt-8">
    <h2 className="text-lg font-semibold text-gray-900 mb-3">{title}</h2>
    {children}
  </div>
);

const TagPill = ({ icon, text }) => (
  <span className="flex items-center px-3 py-1 rounded-md bg-gray-100 text-gray-700 text-sm">
    {icon && <span className="mr-1">{icon}</span>}
    {text}
  </span>
);

const AttendeeList = ({ title, list = [] }) => (
  <div className="mb-6">
    <h4 className="text-md font-medium text-gray-800">{title}</h4>
    {list.length > 0 ? (
      <ul className="list-disc list-inside text-gray-600">
        {list.map((name, idx) => (
          <li key={idx}>{name}</li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500 italic">No entries</p>
    )}
  </div>
);
