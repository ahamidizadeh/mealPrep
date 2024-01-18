import express from "express";
import cors from "cors";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Ingredient from "./db/models/ingredientsModel.js";
import { router as authRoutes } from "./routes/authRoutes.js";
import { router as recipeRoutes } from "./routes/recipesRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 1234;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
app.get("/", () => {
  console.log("server is getting something");
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
// app.use("/", console.log("reaching out"));
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
