import mongoose from "mongoose";

export const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: { type: String },
  category: { type: String },
  tags: [{ type: String }],
  visibility: { type: String, enum: ['public', 'private'], default: 'public' },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model.Events || mongoose.model("Event", EventSchema);
