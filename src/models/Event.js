import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    privacy: { type: String, enum: ["Public", "Private"], required: true },
    medium: { type: String, enum: ["Online", "In Person"], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    duration: { type: String },
    language: { type: String },
    maxParticipants: { type: Number },
    category: { type: String, required: true },
    terms: { type: String },
    location: { type: String },
    latitude: { type: String },
    longitude: { type: String },
    image: { type: String },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
