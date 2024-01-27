import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 20,
  },
  password: { type: String, required: true, minlength: 8, maxlength: 255 },
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  bookedRecipes: [
    {
      recipeId: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
      id: String,
      title: String,
      start: String,
      end: String,
    },
  ],
  // Add other fields as needed
});

const User = mongoose.model("User", userSchema);

export default User;
