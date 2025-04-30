import connectToDatabase from "@/lib/mongodb";
import Event from "@/models/Event";

export async function POST(req) {
  await connectToDatabase();

  try {
    const { eventId, userId, status } = await req.json();

    if (!eventId || !userId || !status) {
      return new Response(
        JSON.stringify({ error: "eventId, userId, and status are required." }),
        { status: 400 }
      );
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return new Response(
        JSON.stringify({ error: "Event not found." }),
        { status: 404 }
      );
    }
    //for dupes  
    event.attendees = event.attendees.filter((id) => id !== userId);
    event.declined = event.declined.filter((id) => id !== userId);
    event.maybes = event.maybes.filter((id) => id !== userId);

    if (status === "attending") {
      event.attendees.push(userId);
    } else if (status === "declined") {
      event.declined.push(userId);
    } else if (status === "maybe") {
      event.maybes.push(userId);
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid status. Use 'attending', 'declined', or 'maybe'." }),
        { status: 400 }
      );
    }

    await event.save();

    return new Response(
      JSON.stringify({
        message: "RSVP updated successfully!",
        attendees: event.attendees,
        declined: event.declined,
        maybes: event.maybes,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating RSVP:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update RSVP." }),
      { status: 500 }
    );
  }
}