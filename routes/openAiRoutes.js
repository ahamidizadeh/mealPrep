import express from "express";
import { getAnswerFromAi } from "../controllers/openAiControllers.js";
const router = express.Router();

router.post("/answer-from-ai", getAnswerFromAi);
export { router };
