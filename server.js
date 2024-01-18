import express from "express";
import cors from "cors";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import Ingredient from "./db/models/ingredientsModel.js";
import { router as authRoutes } from "./routes/authRoutes.js";
import { router as recipeRoutes } from "./routes/recipesRoutes.js";

dotenv.config();
connectDB();

// const firstIngredient = new Ingredient({
//   name: "turkey",
//   category: "Meats",
//   units: "100g",
//   calories: 189,
//   imageURL: "https://storage.googleapis.com/ingredients3/turkey.jpeg",
//   macros: {
//     fat: 7,
//     protein: 29,
//     carbs: 0,
//   },
// });
// Ingredient.find({})
//   .then((ingredients) => {
//     ingredients.forEach((ingredient) => {
//       ingredient.category = "Fruits and vegetables";
//       ingredient.save();
//     });
//     console.log(`${ingredients.length} documents updated`);
//   })
//   .catch((error) => {
//     console.error("Error updating documents:", error);
//   });

// firstIngredient
//   .save()
//   .then((savedIngredient) => {
//     console.log("Ingredient saved:", savedIngredient.name);
//   })
//   .catch((error) => {
//     console.error("Error saving ingredient:", error);
//   })
//   .finally(() => {
//     console.log("YAY");
//   });

const app = express();
const PORT = process.env.PORT || 1234;
app.get("/api/ingredients", async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.use(express.json());
app.use(cors());
app.post("/api", () => {
  console.log("frontend is connected");
});
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
