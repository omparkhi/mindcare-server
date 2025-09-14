import express from "express";
const router = express.Router();
import { getAnalytics } from "../controllers/analytics.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

// Route: GET /api/analytics
router.get("/", authMiddleware, getAnalytics);

export default router;
