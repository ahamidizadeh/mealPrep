import express from "express";
import mongoose from "mongoose";
import User from "../db/models/userModel.js";
import Recipe from "../db/models/recipeModel.js";

// Apply the authenticate middleware to all routes below

export async function saveRecipe(req, res) {
  try {
    const {
      recipeName,
      selectedFoodType,
      instructions,
      // Note: No need to extract 'ingredients' here as we'll handle it separately
    } = req.body;

    const imagePath = req.file.path; // Path to the saved image file

    // Parse each ingredient JSON string into an object
    const ingredientsData = req.body.ingredients.map((jsonString) => {
      try {
        const ingredientObject = JSON.parse(jsonString);
        return {
          ingredient: new mongoose.Types.ObjectId(
            ingredientObject.ingredient._id
          ),
          amount: ingredientObject.amount,
          unit: ingredientObject.unit,
        };
      } catch (error) {
        console.error("JSON parsing error:", error, "in", jsonString);
        throw error; // You can handle this more gracefully if needed
      }
    });

    // Create a new recipe with the parsed ingredients
    const recipe = new Recipe({
      userId: req.user.userId, // Set the userId from the authenticate middleware
      recipeName,
      selectedFoodType,
      instructions,
      image: imagePath,
      ingredients: ingredientsData,
    });

    // Save the recipe
    const savedRecipe = await recipe.save();

    await User.findByIdAndUpdate(req.user.userId, {
      $push: { recipes: savedRecipe._id },
    });
    // Send the saved recipe as the response
    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function getRecipes(req, res) {
  try {
    const allRecipes = await Recipe.find({});

    res.status(200).json(allRecipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
