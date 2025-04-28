import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Event from "@/models/Event"; 

export async function POST(request) {
  await connectToDatabase(); 

  try {
    const body = await request.json();
    const { eventId, message } = body;

    if (!eventId || !message) {
      return NextResponse.json(
        { error: "Event ID and message are required." },
        { status: 400 }
      );
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { message },
      { new: true }
    );

    if (!updatedEvent) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, event: updatedEvent },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating event message:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
