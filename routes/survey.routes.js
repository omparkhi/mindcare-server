import express from "express";
import {
  getSurveyById,
  getSurveyHistory,
  saveSurvey,
} from "../controllers/survey.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, saveSurvey);
router.get("/history", authMiddleware, getSurveyHistory);
router.get("/history/:id", authMiddleware, getSurveyById);

export default router;
