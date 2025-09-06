import openai from "../config/openaiConfig.js";

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
