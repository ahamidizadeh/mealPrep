import React from "react";
import "./styles/Fridge.css";

export default function Ingredients({ droppedItems, onRemoveIngredient }) {
  return (
    <div id="ingredients">
      {droppedItems.map((ingredient, index) => (
        <button className="dropped-item">
          {ingredient.droppedItem}
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
