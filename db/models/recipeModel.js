import mongoose from "mongoose";

const recipeIngredientSchema = new mongoose.Schema({
  ingredient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ingredient",
  },
  name: String,
  amount: Number,
  unit: String,
});

const recipeSchema = new mongoose.Schema({
  ingredients: [recipeIngredientSchema],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipeName: {
    type: String,
    required: true,
  },
  selectedFoodType: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL or path to the image
    required: true,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
