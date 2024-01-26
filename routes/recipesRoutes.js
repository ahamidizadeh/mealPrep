import express from "express";
const router = express.Router();
import {
  saveRecipe,
  getRecipes,
  bookRecipes,
  getBookedRecipes,
  deleteBookedRecipe,
} from "../controllers/recipeControllers.js";
import upload from "../middlewares/uploadMiddleware.js";
import authenticate from "../middlewares/authMiddleware.js";

router.use(authenticate);
router.post("/", upload.single("image"), saveRecipe);
router.get("/", getRecipes);
router.get("/booked/:id", getBookedRecipes);
router.post("/book/:id", bookRecipes);
router.delete("/delete/:id", deleteBookedRecipe);
export { router };
