import express from "express";
import mongoose from "mongoose";
import User from "../db/models/userModel.js";
import Recipe from "../db/models/recipeModel.js";
import Ingredient from "../db/models/ingredientsModel.js";

// Apply the authenticate middleware to all routes below

export async function saveRecipe(req, res) {
  try {
    const { recipeName, selectedFoodType, instructions } = req.body;

    const imagePath = req.file.path; // Path to the saved image file

    const ingredientsData = req.body.ingredients.map((jsonString) => {
      try {
        const ingredientObject = JSON.parse(jsonString);
        return {
          ingredient: new mongoose.Types.ObjectId(
            ingredientObject.ingredient._id
          ),
          name: ingredientObject.ingredient.name,
          amount: ingredientObject.amount,
          unit: ingredientObject.unit,
        };
      } catch (error) {
        console.error("JSON parsing error:", error, "in", jsonString);
        throw error;
      }
    });

    const recipe = new Recipe({
      userId: req.user.userId,
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
export async function bookRecipes(req, res) {
  try {
    const userId = req.params.id;
    const scheduledRecipes = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    scheduledRecipes.forEach((newRecipe) => {
      const isDuplicate = user.bookedRecipes.some(
        (existingRecipe) =>
          existingRecipe.id === newRecipe.id &&
          existingRecipe.start === newRecipe.start &&
          existingRecipe.end === newRecipe.end
      );

      if (!isDuplicate) {
        user.bookedRecipes.push(newRecipe);
      }
    });
    await user.save();
    console.log("recipe booked!");
    res.status(200).json({ message: "Booked recipes added successfully" });
  } catch (error) {
    console.error("cant book recipe:", error);
  }
}
export async function getBookedRecipes(req, res) {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(user.bookedRecipes);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
}
export async function deleteBookedRecipe(req, res) {
  try {
    const eventId = req.params.id;
    const userId = req.user.userId;

    const user = await User.findById(userId);

    const updatedEvents = user.bookedRecipes.filter(
      (recipe) => recipe.id !== eventId
    );

    user.bookedRecipes = updatedEvents;

    await user.save();

    res.status(200).json({ message: "booked recipe deleted successfully " });
  } catch (error) {
    console.error("Error deleting booked recipe:", error);
    res.status(500).json({ message: "Error deleting booked recipe" });
  }
}
