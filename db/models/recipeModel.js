import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" }],
  instructions: { type: String, required: true },
  // Add other fields as needed
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
