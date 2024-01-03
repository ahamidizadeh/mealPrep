import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  units: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  macros: {
    fat: {
      type: Number,
      required: true,
    },
    protein: {
      type: Number,
      required: true,
    },
    carbs: {
      type: Number,
      required: true,
    },
  },
});
const Ingredient = mongoose.model("Ingredients", ingredientSchema);

export default Ingredient;
