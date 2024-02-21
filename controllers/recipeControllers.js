import express from "express";
import mongoose from "mongoose";
import User from "../db/models/userModel.js";
import Recipe from "../db/models/recipeModel.js";
import Ingredient from "../db/models/ingredientsModel.js";

// Apply the authenticate middleware to all routes below
// const chickenEnchiladasRecipe = {
//   name: "Chicken Enchiladas",
//   ingredients: [
//     { name: "cooked chicken, shredded", amount: 2, unit: "cups" },
//     { name: "enchilada sauce", amount: 2, unit: "cups" },
//     { name: "monterey jack cheese, grated", amount: 2, unit: "cups" },
//     { name: "corn tortillas", amount: 12, unit: "pieces" },
//     { name: "olive oil", amount: 2, unit: "tablespoons" },
//     { name: "white onion, finely chopped", amount: 1, unit: "whole" },
//     { name: "garlic cloves, minced", amount: 2, unit: "cloves" },
//     { name: "chili powder", amount: 1, unit: "teaspoon" },
//     { name: "ground cumin", amount: 0.5, unit: "teaspoon" },
//     { name: "salt", amount: 0.5, unit: "teaspoon" },
//     { name: "fresh cilantro, chopped", amount: 0.25, unit: "cups" },
//     { name: "green chiles, chopped", amount: 4, unit: "ounces" },
//     { name: "sour cream (for serving)", amount: null, unit: "to taste" },
//     { name: "avocado (for serving)", amount: null, unit: "to taste" },
//   ],
//   instructions: `
//     1. Preheat your oven to 375°F (190°C).
//     2. In a large skillet, heat the olive oil over medium heat. Add the chopped onion and cook until it's translucent. Add the minced garlic, chili powder, cumin, and salt, and cook for about 2 minutes.
//     3. Stir in the shredded chicken, 1 cup of enchilada sauce, and 1 cup of cheese. Add the chopped green chiles and half of the cilantro, mixing until everything is well combined.
//     4. Wrap the corn tortillas in a damp cloth or paper towel and microwave on high for about 20-30 seconds to make them pliable.
//     5. Pour half of the remaining enchilada sauce into the bottom of a 9x13 inch baking dish.
//     6. Spoon the chicken mixture generously down the middle of each tortilla. Roll up the tortillas and place them seam side down in the baking dish.
//     7. Pour the remaining enchilada sauce over the top of the filled tortillas and sprinkle the remaining cheese over the sauce.
//     8. Bake in the preheated oven for about 20 minutes, or until the cheese is bubbly and slightly browned.
//     9. Garnish with the remaining cilantro before serving. Serve with sour cream and sliced avocado on the side.
//   `,
// };
// const classicDiziRecipe = {
//   name: "Classic Dizi (Abgoosht)",
//   culture: "Perisan",
//   ingredients: [
//     {
//       name: "lamb",
//       amount: 500,
//       unit: "grams",
//       technique: "cut into large pieces",
//     },
//     {
//       name: "chickpeas",
//       amount: 1,
//       unit: "cup",
//       technique: "soaked overnight",
//     },
//     {
//       name: "white beans",
//       amount: 1,
//       unit: "cup",
//       technique: "soaked overnight",
//     },
//     {
//       name: "onions",
//       amount: 2,
//       unit: "",
//       technique: "peeled",
//     },
//     {
//       name: "potatoes",
//       amount: 2,
//       unit: "",
//       technique: "peeled and halved",
//     },
//     {
//       name: "tomatoes",
//       amount: 2,
//       unit: "",
//       technique: "whole",
//     },
//     {
//       name: "dried limes",
//       amount: 2,
//       unit: "",
//       technique: "pierced",
//     },
//     {
//       name: "turmeric",
//       amount: 1,
//       unit: "teaspoon",
//       technique: "",
//     },
//     {
//       name: "salt",
//       amount: "to taste",
//       unit: "",
//       technique: "",
//     },
//     {
//       name: "black pepper",
//       amount: "to taste",
//       unit: "",
//       technique: "",
//     },
//     {
//       name: "water",
//       amount: 8,
//       unit: "cups",
//       technique: "",
//     },
//   ],
//   instructions: `
//     1. Rinse the pre-soaked chickpeas and white beans. Place the lamb, chickpeas, beans, and onions into a large pot.
//     2. Add water to the pot. The water should cover the ingredients by about 2 inches.
//     3. Bring the mixture to a boil, skimming off any foam that forms on the surface.
//     4. Add the turmeric, salt, and black pepper. Reduce the heat to low, cover the pot, and let it simmer for about 1.5 hours.
//     5. Add the potatoes, tomatoes, and dried limes to the pot. Continue simmering for another 1.5 hours or until the meat is tender and the beans are cooked.
//     6. Once cooked, remove the meat, potatoes, tomatoes, and onions. Mash them in a separate bowl (this is called "Goosht Koobideh").
//     7. The remaining liquid and chickpeas in the pot is the "Abgoosht" broth. It can be served in a bowl and eaten with bread.
//     8. Serve the mashed meat and vegetables alongside the broth. Diners can add broth to the mashed mixture as per their preference.
//   `,
// };
const pizza = {
  title: "Pumpkin Risotto",
  servings: 4,
  nutritionalInformation: {
    calories: 310,
    carbohydrates: "53g",
    fats: "7g",
    protein: "8g",
  },
  ingredients: [
    { name: "Arborio rice", amount: 1.5, unit: "cups", technique: "" },
    { name: "Pumpkin puree", amount: 1, unit: "cup", technique: "" },
    { name: "Vegetable broth", amount: 4, unit: "cups", technique: "heated" },
    { name: "Onion", amount: 1, unit: "small", technique: "finely chopped" },
    { name: "Garlic", amount: 2, unit: "cloves", technique: "minced" },
    { name: "White wine", amount: 1 / 2, unit: "cup", technique: "" },
    {
      name: "Parmesan cheese",
      amount: 1 / 2,
      unit: "cup",
      technique: "grated",
    },
    { name: "Butter", amount: 2, unit: "tablespoons", technique: "" },
    { name: "Sage", amount: 1, unit: "tablespoon", technique: "chopped" },
    { name: "Nutmeg", amount: 1 / 2, unit: "teaspoon", technique: "" },
    { name: "Salt and pepper", amount: 1, unit: "to taste", technique: "" },
  ],
  instructions: [
    "In a pan, heat half the butter over medium heat. Add the onion and garlic, cooking until soft.",
    "Stir in the Arborio rice, cooking until it's well-coated and translucent at the edges.",
    "Deglaze with white wine, allowing it to absorb completely.",
    "Gradually add the heated vegetable broth, one cup at a time, waiting for the liquid to be absorbed before adding more.",
    "Halfway through, incorporate the pumpkin puree, sage, and nutmeg. Continue adding broth and stirring until the rice is creamy and al dente.",
    "Remove from heat, stir in the Parmesan cheese and remaining butter. Season with salt and pepper to taste.",
    "Serve warm, garnished with additional sage or Parmesan if desired.",
  ],
  tags: ["Italian", "Risotto", "Pumpkin", "Vegetarian", "Autumn"],
};

async function findOrCreateIngredient(ingredientName, unit) {
  let ingredient = await Ingredient.findOne({
    name: { $regex: new RegExp("^" + ingredientName, "i") },
  });

  if (!ingredient) {
    ingredient = await Ingredient.create({ name: ingredientName, units: unit });
  }

  return ingredient;
}
async function saveRecipeManually() {
  try {
    console.log("saving recipe manuaaly");
    const recipeIngredients = await Promise.all(
      pizza.ingredients.map(async ({ name, amount, unit, technique }) => {
        const ingredient = await findOrCreateIngredient(name, unit);
        return {
          ingredient: ingredient._id,
          name,
          amount,
          technique,
          unit,
        };
      })
    );

    const theRecipeBeingSaved = new Recipe({
      ingredients: recipeIngredients,
      name: pizza.title,
      tags: pizza.tags,
      protein: pizza.nutritionalInformation.protein,
      fats: pizza.nutritionalInformation.fats,
      calories: pizza.nutritionalInformation.totalCalories,
      carbohydrates: pizza.nutritionalInformation.carbohydrates,
      instructions: pizza.instructions,
    });
    await theRecipeBeingSaved.save();
    console.log(`Recipe saved! ${theRecipeBeingSaved.name}`);
  } catch (error) {
    console.log(error);
  }
}
// saveRecipeManually();

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
  // try {
  //   const recipe = await Recipe.findOne({ name: req.query.name });

  //   if (recipe) {
  //     // If the recipe is found, send it back as a JSON response
  //     res.json(recipe);
  //   } else {
  //     // If the recipe is not found, send a 404 (Not Found) response
  //     res.status(404).send("Recipe not found");
  //   }
  // } catch (error) {
  //   res.status(500).send(error.message);
  // }

  try {
    const allRecipes = await Recipe.find({});

    res.status(200).json(allRecipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function getRecipeInfo(req, res) {}
export async function bookRecipes(req, res) {
  try {
    const userId = req.params.id;
    const scheduledRecipes = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    user.bookedRecipes.push(scheduledRecipes);
    // scheduledRecipes.forEach((newRecipe) => {
    //   const isDuplicate = user.bookedRecipes.some(
    //     (existingRecipe) =>
    //       existingRecipe.id === newRecipe.id &&
    //       existingRecipe.start === newRecipe.start &&
    //       existingRecipe.end === newRecipe.end
    //   );

    //   if (!isDuplicate) {
    //     user.bookedRecipes.push(newRecipe);
    //   }
    // });
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
