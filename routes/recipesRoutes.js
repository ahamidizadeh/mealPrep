import express from "express";
const router = express.Router();
import { saveRecipe, getRecipes } from "../controllers/recipeControllers.js";
import upload from "../middlewares/uploadMiddleware.js";
import authenticate from "../middlewares/authMiddleware.js";

router.use(authenticate);
router.post("/", upload.single("image"), saveRecipe);
router.get("/", getRecipes);

export { router };
