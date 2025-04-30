import { MongoClient, ObjectId } from "mongodb";

export default async function EventDetail({ params }) {
  const { eventId } = params;

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();

  const event = await db
    .collection("events")
    .findOne({ _id: new ObjectId(eventId) });

  client.close();

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-8">
      <div className="max-w-screen-xl mx-auto bg-white p-10 rounded-xl shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <div className="space-y-2 sm:space-y-0 sm:w-3/4">
            <h1 className="text-4xl font-extrabold text-gray-800">
              {event.title}
            </h1>
            <div className="text-lg text-gray-600">{event.createdBy}</div>
          </div>
          <div className="sm:w-1/4 text-sm text-gray-500 flex justify-center sm:justify-end items-center mt-6 sm:mt-0">
            <p className="inline-flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full font-medium">
              {event.privacy}
            </p>
          </div>
        </div>

        <p className="text-xl text-gray-700 mb-6">{event.description}</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              Event Details
            </h3>
            <div className="text-gray-600 space-y-2">
              <p>
                <strong>Medium:</strong> {event.medium}
              </p>
              <p>
                <strong>Category:</strong> {event.category}
              </p>
              <p>
                <strong>Language:</strong> {event.language || "N/A"}
              </p>
              <p>
                <strong>Duration:</strong> {event.duration || "N/A"}
              </p>
              <p>
                <strong>Max Participants:</strong>{" "}
                {event.maxParticipants || "N/A"}
              </p>
              <p>
                <strong>Location:</strong> {event.location || "Online"}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="text-gray-600">
                <strong>Start Date:</strong>{" "}
                {new Date(event.startDate).toLocaleDateString("en-GB")}
              </div>
              <div className="text-gray-600">
                <strong>End Date:</strong>{" "}
                {event.endDate
                  ? new Date(event.endDate).toLocaleDateString("en-GB")
                  : "N/A"}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              Event Terms
            </h3>
            <p className="text-gray-600">
              {event.terms || "No terms specified."}
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              Event Image
            </h3>
            {event.image ? (
              <img
                src={event.image}
                alt="Event Image"
                className="w-full h-auto rounded-xl shadow-lg transform transition-transform hover:scale-105 duration-300"
              />
            ) : (
              <div className="text-center text-gray-600 italic">
                No image provided.
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Attendees
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="text-xl font-semibold text-gray-700">Attendees</h4>
              <ul className="space-y-1">
                {event.attendees.length > 0 ? (
                  event.attendees.map((attendee, index) => (
                    <li key={index} className="text-gray-600">
                      {attendee}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-600">No attendees yet.</li>
                )}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-semibold text-gray-700">Declined</h4>
              <ul className="space-y-1">
                {event.declined.length > 0 ? (
                  event.declined.map((decline, index) => (
                    <li key={index} className="text-gray-600">
                      {decline}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-600">No one has declined.</li>
                )}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-semibold text-gray-700">Maybe</h4>
              <ul className="space-y-1">
                {event.maybes.length > 0 ? (
                  event.maybes.map((maybe, index) => (
                    <li key={index} className="text-gray-600">
                      {maybe}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-600">No maybes yet.</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Message</h3>
          <p className="text-xl text-gray-600">
            {event.message || "No message provided."}
          </p>
        </div>
      </div>
    </div>
  );
}
