import SurveyModel from "../models/survey.model.js";

export async function saveSurvey(req, res) {
  try {
    const userId = req.user?._id;

    const { survey, prediction, suggestions } = req.body;

    if (!survey || !prediction || !suggestions) {
      return res
        .status(400)
        .json({ error: "Missing survey, prediction, or suggestions" });
    }

    const newSurvey = new SurveyModel({
      userId,
      survey,
      prediction,
      suggestions,
    });

    const savedSurvey = await newSurvey.save();

    res.status(201).json(savedSurvey);
  } catch (error) {
    console.error("Error saving survey:", error);
    res.status(500).json({ error: "Failed to save survey" });
  }
}
