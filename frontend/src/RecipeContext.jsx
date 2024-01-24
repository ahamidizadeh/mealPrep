import React, { createContext, useContext, useState } from "react";

export const RecipeContext = createContext();
export const useRecipes = () => useContext(RecipeContext);

export const IngredientContext = createContext();
export const useIngredients = () => useContext(IngredientContext);

export const RecipeProvider = ({ children }) => {
  //   const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  // ... recipe related logic

  return (
    <RecipeContext.Provider value={{ selectedRecipe, setSelectedRecipe }}>
      <IngredientContext.Provider value={{ ingredients, setIngredients }}>
        {children}
      </IngredientContext.Provider>
    </RecipeContext.Provider>
  );
};
