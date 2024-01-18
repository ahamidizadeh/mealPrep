import React from "react";
import "./styles/UserRecipes.css";

export default function UserRecipes({ userRecipes }) {
  return (
    <div className="user-recipes">
      {userRecipes.map((recipe) => (
        <div key={recipe._id} className="recipe-card">
          <div
            className="recipe-image"
            style={{
              backgroundImage: `url(http://localhost:1234/${recipe.image})`,
            }}
          ></div>
          <div className="recipe-info">
            <h4 className="recipe-name">{recipe.recipeName}</h4>
          </div>
        </div>
      ))}
    </div>
  );
}
