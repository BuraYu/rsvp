import connectToDatabase from "@/lib/mongodb";
import Event from "@/models/Event";

export async function POST(req) {
  await connectToDatabase();

  try {
    const eventData = await req.json();

    const newEvent = new Event(eventData);

    await newEvent.save();

    return new Response(
      JSON.stringify({
        message: "Event created successfully!",
        eventId: newEvent._id,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error inserting event:", error);
    return new Response(JSON.stringify({ error: "Failed to create event" }), {
      status: 500,
    });
  }
}
