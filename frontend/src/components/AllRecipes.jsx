import React from "react";
import "./styles/AllRecipes.css";

export default function AllRecipes({ recipes }) {
  //   console.log("all recipes: ", recipes);
  return (
    <>
      <h4 className="allrecipes-heading">All recipes</h4>
      <div className="all-recipes">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <div
              className="recipe-image"
              style={{
                backgroundImage: `url(http://localhost:1234/${recipe.image})`,
              }}
            ></div>
            <div className="recipe-info">
              <h4>{recipe.recipeName}</h4>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
