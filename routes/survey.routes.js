import express from "express";
import { saveSurvey } from "../controllers/survey.controller.js";
// Assume you have authentication middleware that populates req.user
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, saveSurvey);

export default router;
