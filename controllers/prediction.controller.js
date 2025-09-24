import axios from "axios";

export async function getPrediction(req, res) {
  try {
    const surveyData = req.body;

    // Call your Flask ML API
    const response = await axios.post(
      "http://127.0.0.1:5000/predict",
      surveyData
    );

    res.json(response.data);
  } catch (error) {
    console.error("Prediction error:", error);
    res.status(500).json({ error: "Failed to get prediction" });
  }
}
