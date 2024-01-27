import Ingredient from "../db/models/ingredientsModel.js";
import mongoose from "mongoose";

export async function getAllIngredients(req, res) {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
