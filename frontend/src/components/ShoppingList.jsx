import React from "react";
import { useRecipes } from "../RecipeContext";

export default function ShoppingList() {
  const { shoppingList } = useRecipes();

  console.log("shopping list:", shoppingList);
  return (
    <div className="ingredients-shopping-list">
      <h2 className="list-heading">shopping list</h2>
      <div className="shopping-ingredients">
        {shoppingList.map((item) => (
          <li>
            {item.name}: {item.amount} {item.unit}
          </li>
        ))}
      </div>
    </div>
  );
}
