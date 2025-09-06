import express from "express";
import { getPrediction } from "../controllers/prediction.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, getPrediction);

export default router;
