import express from "express";
import cors from "cors";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Ingredient from "./db/models/ingredientsModel.js";
import { router as orderRoutes } from "./routes/orderRoutes.js";
import { router as authRoutes } from "./routes/authRoutes.js";
import { router as recipeRoutes } from "./routes/recipesRoutes.js";
import { router as ingredientRoutes } from "./routes/ingredientRoutes.js";
import { router as openAiRoutes } from "./routes/openAiRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 1234;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use("/api/ingredients", ingredientRoutes);
// app.get("/api/ingredients", async (req, res) => {
//
// });
app.use(express.text());
app.use(express.json());
app.use(cors());
app.post("/api", () => {
  console.log("frontend is connected");
});
app.get("/", () => {
  console.log("server is getting something");
});
app.use("/api/ai", openAiRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/services", orderRoutes);
// app.use("/", console.log("reaching out"));
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
