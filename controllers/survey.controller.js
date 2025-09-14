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

export async function getSurveyHistory(req, res) {
  try {
    const userId = req.user._id;

    const surveys = await SurveyModel.find({ userId })
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json(surveys);
  } catch (error) {
    console.error("Error fetching survey history:", error);
    res.status(500).json({ error: "Failed to fetch survey history" });
  }
}

export async function getSurveyById(req, res) {
  try {
    const surveyId = req.params.id;
    const userId = req.user._id;

    const survey = await SurveyModel.findOne({
      _id: surveyId,
      userId: userId,
    });

    if (!survey) {
      return res.status(404).json({ error: "Survey not found" });
    }

    res.status(200).json(survey);
  } catch (error) {
    console.error("Error fetching survey by id:", error);
    res.status(500).json({ error: "Failed to fetch survey" });
  }
}
