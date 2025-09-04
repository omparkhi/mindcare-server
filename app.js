import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// Create app
const app = express();
const PORT = process.env.PORT || 4000;

import connectDB from "./db/db.js";

import userRoutes from "./routes/user.routes.js";

// Middleware
app.use(cors());
app.use(bodyParser.json());

connectDB();

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Mental Health Node.js API is running 🚀" });
});

//routes
app.use("/api/users", userRoutes);

// Placeholder: Suggestions route (will call AI API later)
app.post("/suggestions", async (req, res) => {
  try {
    const { risk_level, probability, inputs } = req.body;

    // For now, just echo back data
    res.json({
      message: "Suggestion route works ✅ (AI integration pending)",
      risk_level,
      probability,
      inputs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
