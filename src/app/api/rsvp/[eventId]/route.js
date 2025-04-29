import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Event from "@/models/Event";

export async function GET(request, context) {
  await connectToDatabase();

  const { eventId } = context.params;
  console.log("Event ID from params:", eventId);

  if (!eventId) {
    return NextResponse.json(
      { error: "Event ID is required." },
      { status: 400 }
    );
  }

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, event }, { status: 200 });
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
