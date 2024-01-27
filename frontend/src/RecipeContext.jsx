import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";

export const RecipeContext = createContext();
export const useRecipes = () => useContext(RecipeContext);

export const RecipeProvider = ({ children }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);

  const [bookedRecipes, setBookedRecipes] = useState([]);
  const { authToken, id } = useAuthContext();

  const fetchBookedRecipes = async () => {
    try {
      const response = await fetch(`/api/recipes/booked/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`, // Include the token in the Authorization header
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setBookedRecipes(data);
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.error("Could not parse JSON:", error);
      } else {
        console.error("Could not fetch booked recipes:", error);
      }
    }
  };

  const fetchIngredients = async () => {
    try {
      const response = await fetch(`/api/ingredients`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`, // Include the token in the Authorization header
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setIngredients(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (id) {
      fetchBookedRecipes();
      fetchIngredients();
    }
  }, [id]);
  return (
    <RecipeContext.Provider
      value={{
        selectedRecipe,
        setSelectedRecipe,
        ingredients,
        setIngredients,
        setBookedRecipes,
        bookedRecipes,
        setBookedRecipes,
        shoppingList,
        setShoppingList,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
