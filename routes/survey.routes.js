import express from "express";
import {
  getSurveyHistory,
  saveSurvey,
} from "../controllers/survey.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, saveSurvey);
router.get("/history", authMiddleware, getSurveyHistory);

export default router;
