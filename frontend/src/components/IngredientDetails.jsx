import React from "react";
import "./styles/IngredientsDetails.css";
import List from "./List.jsx";

export default function IngredientDetails({ ingredient, list, onDeleteItem }) {
  return (
    <div className="ing-details-container">
      <div
        className="display-ing"
        style={{
          display: "flex",
          borderRadius: "10px",
          backgroundImage: `url(${ingredient ? ingredient.imageURL : null})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        {ingredient ? (
          <div className="display-container">
            <div>
              {ingredient.units} {ingredient.name}
            </div>
            <div>
              <span className="detail-label">Calories:</span>
              <span className="detail-value">{ingredient.calories}</span>
            </div>
            <div>
              <span className="detail-label">Fats: </span>
              <span className="detail-value">
                {JSON.stringify(ingredient.macros["fat"])}g
              </span>
            </div>
            <div>
              <span className="detail-label">Protein: </span>
              <span className="detail-value">
                {JSON.stringify(ingredient.macros["protein"])}g
              </span>
            </div>
            <div>
              <span className="detail-label">Carbs: </span>
              <span className="detail-value">
                {JSON.stringify(ingredient.macros["carbs"])}g
              </span>
            </div>
          </div>
        ) : (
          "select you ingredients"
        )}
      </div>
      <List deleteItem={onDeleteItem} list={list} />
    </div>
  );
}
