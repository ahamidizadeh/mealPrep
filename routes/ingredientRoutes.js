import express from "express";
const router = express.Router();
import { getAllIngredients } from "../controllers/ingredientControllers.js";
import authenticate from "../middlewares/authMiddleware.js";

router.get("/", getAllIngredients);

export { router };
