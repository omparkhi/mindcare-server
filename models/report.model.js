import mongoose from "mongoose";

const MentalHealthReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userInputs: {
    type: Object,
    required: true,
  },
  scores: {
    stress: Number,
    anxiety: Number,
    sleepQuality: Number,
    emotionalWellBeing: Number,
  },
  assessment: { type: String, required: true },
  suggestions: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

const MentalHealthReport = mongoose.model(
  "MentalHealthReport",
  MentalHealthReportSchema
);

export default MentalHealthReport;
