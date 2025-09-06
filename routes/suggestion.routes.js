import express from "express";
import { generateSuggestions } from "../controllers/suggestion.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/generate", authMiddleware, generateSuggestions);

export default router;
