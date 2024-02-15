import mongoose from "mongoose";

const recipeIngredientSchema = new mongoose.Schema({
  ingredient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ingredient",
  },
  name: String,
  amount: Number,
  technique: String,
  unit: String,
});

const recipeSchema = new mongoose.Schema({
  ingredients: [recipeIngredientSchema],
  name: {
    type: String,
    required: true,
  },
  tags: [],
  servings: Number,
  calories: String,
  protein: String,
  carbohydrates: String,
  fats: String,
  instructions: [],
  image: String,
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
