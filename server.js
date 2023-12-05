import express from "express";
import cors from "cors";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import Ingredient from "./db/models/ingredientsModel.js";
dotenv.config();
connectDB();

// const firstIngredient = new Ingredient({
//   name: "Carrot",
//   units: "1 medium",
//   calories: 25,
//   imageURL: "https://storage.googleapis.com/ingredients3/carrots.jpeg",
//   macros: {
//     fat: 1.2,
//     protein: 2,
//     carbs: 18,
//   },
// });

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

app.use(cors());
app.get("/api", () => {
  console.log("frontend is connected");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
