import React from "react";
import "./styles/Fridge.css";

export default function Ingredients({ droppedItems, onRemoveIngredient }) {
  console.log("dropping", droppedItems);
  const categoryColors = {
    Meats: "tomato",
    "Fruits and vegetables": "green",
    Spices: "orange",
  };
  return (
    <div id="ingredients">
      {droppedItems.map((ingredient, index) => (
        <button
          className="dropped-item"
          key={index}
          style={{
            backgroundColor: categoryColors[ingredient.ingredient.category],
            color: "white",
          }}
        >
          {ingredient.ingredient.name}
          <span
            className="cancel-item"
            onClick={() => onRemoveIngredient(index)}
          >
            x
          </span>
        </button>
      ))}
    </div>
  );
}
