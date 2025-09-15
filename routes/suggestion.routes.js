import express from "express";
import {
  generateMentalHealthReport,
  generateSuggestions,
} from "../controllers/suggestion.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/generate", authMiddleware, generateSuggestions);
router.post("/submit", authMiddleware, generateMentalHealthReport);

export default router;
