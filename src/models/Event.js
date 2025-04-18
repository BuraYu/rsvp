import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true }, 
  category: { type: String, required: true }, 
  cost: { type: Number, required: true }, 
  dateTime: { type: Date, required: true }, 
  location: { type: String, required: true }, 
  about: { type: String, required: true }, 
  termsAndConditions: { type: String, required: true }, 
  price: { type: Number, required: true }, 
}, { timestamps: true }); 

export default mongoose.models.Event || mongoose.model("Event", EventSchema);