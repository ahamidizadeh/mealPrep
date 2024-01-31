import axios from "axios";
import OpenAI from "openai";

// const openAiURL = "	https://api.openai.com/v1/chat/completions";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
function parseRecipeFromText(text) {
  const recipe = {
    name: "", // Extract from text or use input recipe name
    servingSize: 0, // Extract from text or use input serving size
    ingredients: [], // Extract and parse from text
    instructions: "", // Extract from text
    pictureURL: "", // Add if you have a method to retrieve or generate pictures
    macros: {}, // Add if you have nutritional information
  };

  // Extract Ingredients
  const ingredientsStart = text.indexOf("Ingredients:");
  const ingredientsEnd = text.indexOf("Instructions:");
  if (ingredientsStart !== -1 && ingredientsEnd !== -1) {
    const ingredientsText = text
      .slice(ingredientsStart + "Ingredients:".length, ingredientsEnd)
      .trim();
    recipe.ingredients = ingredientsText.split("\n").map((line) => {
      const [quantity, ...nameParts] = line.trim().split(" ");
      return { name: nameParts.join(" "), quantity };
    });
  }

  // Extract Instructions
  if (ingredientsEnd !== -1) {
    const instructionsText = text
      .slice(ingredientsEnd + "Instructions:".length)
      .trim();
    recipe.instructions = instructionsText;
  }

  // Name, Serving Size, Picture URL, and Macros would require more specific parsing logic
  // based on the format of your text or additional data sources.

  return recipe;
}
export async function getAnswerFromAi(req, res) {
  const { recipeName, servingSize } = req.body;
  const prompt = `Provide a recipe for ${recipeName} 
    suitable for ${servingSize} servings including
   ingredients, instructions, and required quantities.`;

  const data = {
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4",
  };

  try {
    const response = await openai.chat.completions.create(data);
    const recipe = parseRecipeFromText(response.choices[0].message.content);

    console.log("built recipe: ", recipe);
    res.status(200).json(recipe);
  } catch (error) {
    console.log("cant get info from ai", error);
  }
}
