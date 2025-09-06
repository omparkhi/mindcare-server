import mongoose from "mongoose";

const SurveySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  survey: {
    gender: String,
    age: Number,
    role: String,
    academic_pressure: Number,
    work_pressure: Number,
    cgpa: Number,
    study_satisfaction: Number,
    job_satisfaction: Number,
    sleep_duration: String,
    dietary_habits: String,
    work_study_hours: Number,
    financial_stress: Number,
    family_history: String,
    suicidal_thoughts: String,
  },
  prediction: {
    label: Number,
    probability: Number,
    risk_level: String,
  },
  suggestions: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

const SurveyModel = mongoose.model("Survey", SurveySchema);

export default SurveyModel;
