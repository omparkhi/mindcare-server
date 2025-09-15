import openai from "../config/openaiConfig.js";
import MentalHealthReport from "../models/report.model.js";

export async function generateSuggestions(req, res) {
  try {
    const { userInputs, riskLevel, probability } = req.body;

    if (!userInputs || !riskLevel || probability === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const prompt = `
You are a caring mental health assistant.

User input summary:
${JSON.stringify(userInputs, null, 2)}

The ML Model predicted a ${riskLevel} of depression with a probability of ${(
      probability * 100
    ).toFixed(1)}%.

Please provide 3 practical, empathetic, and actionable suggestions for the user.
`;
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You provide kind, practical mental health advice.",
        },
        {
          role: "user",
          content: `
      You are a caring mental health assistant.

      User input summary:
      ${JSON.stringify(userInputs, null, 2)}

      The ML Model predicted a ${riskLevel} of depression with a probability of ${(
            probability * 100
          ).toFixed(1)}%.

      Please provide 5 practical, empathetic, and actionable suggestions for the user.
    `,
        },
      ],
      max_tokens: 250,
      temperature: 0.7,
    });

    const text = response.choices[0].message.content;
    const suggestions = text
      .split(/\n|\d+\.\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 3);

    res.json({ suggestions });
  } catch (error) {
    console.error("Suggestion generation error:", error);
    res.status(500).json({ error: "Failed to generate suggestions" });
  }
}

// Controller: Generate Mental Health Report
export async function generateMentalHealthReport(req, res) {
  try {
    // 1. Extract inputs
    const { userId, userInputs } = req.body;

    if (!userInputs) {
      return res.status(400).json({ error: "Missing userInputs field" });
    }

    // 2. Build prompt for GPT
    const prompt = `
You are a caring mental health assistant.

User input summary:
${JSON.stringify(userInputs, null, 2)}

Based on these inputs, please provide:

1. Mental health scores (stress, anxiety, sleepQuality, emotionalWellBeing) as a JSON object, e.g.:
\`\`\`json
{
  "stress": 4,
  "anxiety": 3,
  "sleepQuality": 2,
  "emotionalWellBeing": 5
}
\`\`\`

2. A summary evaluation of the user’s overall mental health status.

3. 5 practical, empathetic, and actionable suggestions to support the user.

Format your response clearly with sections labeled: "Scores:", "Assessment:", and "Suggestions:".
`;

    // 3. Call OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You provide kind, practical mental health advice and assessments.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 400,
      temperature: 0.7,
    });

    // 4. Get raw response text
    const text = response.choices[0].message.content || "";

    // 5. Initialize parsed values
    let scores = {};
    let assessment = "";
    let suggestions = [];

    // ---- FIXED PARSING ----

    // Extract Scores JSON
    const scoresMatch = text.match(/```json\s*([\s\S]*?)\s*```/i);
    if (scoresMatch) {
      try {
        scores = JSON.parse(scoresMatch[1].trim());
      } catch (e) {
        console.error("Failed to parse scores JSON:", e);
      }
    }

    // Extract Assessment (after "Assessment:")
    const assessmentMatch = text.match(
      /Assessment:\s*([\s\S]*?)(?=Suggestions:|$)/i
    );
    if (assessmentMatch) {
      assessment = assessmentMatch[1].trim();
    }

    // Extract Suggestions (after "Suggestions:")
    const suggestionsMatch = text.match(/Suggestions:\s*([\s\S]*)/i);
    if (suggestionsMatch) {
      const rawSuggestions = suggestionsMatch[1].trim();
      suggestions = rawSuggestions
        .split(/\d+\.\s+/) // split on numbered list
        .map((s) => s.trim())
        .filter((s) => s.length > 3);
    }

    // Save to MongoDB
    const report = new MentalHealthReport({
      userId,
      userInputs,
      scores,
      assessment,
      suggestions,
    });

    await report.save();

    // Return parsed response
    res.json({
      scores,
      assessment,
      suggestions,
      raw: text,
    });
  } catch (error) {
    console.error("Mental health report generation error:", error);
    res.status(500).json({ error: "Failed to generate mental health report" });
  }
}
