import { connectToDatabase } from "@/lib/mongodb";
import Event from "@/models/Event";

export async function GET(req) {
  await connectToDatabase();
  try {
    const events = await Event.find(); 
    return new Response(JSON.stringify(events), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch events" }), {
      status: 500,
    });
  }
}
