import express from "express";
const router = express.Router();
import { saveRecipe } from "../controllers/recipeControllers.js";
import upload from "../middlewares/uploadMiddleware.js";
import authenticate from "../middlewares/authMiddleware.js";

router.use(authenticate);
router.post("/", upload.single("image"), saveRecipe);

export { router };
