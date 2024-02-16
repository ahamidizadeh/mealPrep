import React, { useState } from "react";
import { useRecipes } from "../RecipeContext";
import "./styles/RecipeDetails.css";
export default function RecipeDetails({ recipe }) {
  const [servings, setServings] = useState(1);
  const { selectedRecipe, ingredients } = useRecipes();

  const handleServingChange = (event) => {
    setServings(event.target.value);
  };

  // const resolvedIngredients = selectedRecipe.ingredients.map((ing) => ({
  //   ...ing,
  //   name:
  //     ingredients.find((i) => i._id === ing.ingredient)?.name ||
  //     "Unknown Ingredient",
  //   imageURL: ingredients.find((i) => i._id === ing.ingredient)?.imageURL,
  // }));
  // console.log("resolved:", resolvedIngredients);
  console.log("recipe:", recipe);
  return recipe ? (
    <div className="details-container">
      <div className="recipe-image-bg">
        <img src={`../../public/images/${recipe.name}.jpeg`}></img>
      </div>
      <div className="recipe-info-bg">
        <div>
          <h1>{recipe.name}</h1>
        </div>
        <div className="ingredients-details-bg">
          {recipe.ingredients.map((ing, i) => (
            <li key={i}>
              {ing.name}
              {"-"}
              {ing.amount} {ing.unit}
            </li>
          ))}
        </div>
        <div className="instructions-bg">
          <h1 style={{ marginLeft: "30px" }}>Instructions</h1>
          {recipe.instructions.map((step, i) => (
            <li key={i}>
              {i + 1} - {step}
            </li>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="default-image">
      <img src="../../public/images/background-mamani.jpeg"></img>
    </div>
  );
  // <div className="recipe-details-container">
  //   <div className="recipe-image-container">
  //     <img
  //       src={`http://localhost:1234/${selectedRecipe.image}`} // Adjust the URL as needed
  //       alt={selectedRecipe.recipeName}
  //       className="recipe-img"
  //     />
  //   </div>
  //   <div className="recipe-content">
  //     <h1 className="recipe-title">{selectedRecipe.recipeName}</h1>
  //     <div className="recipe-meta">
  //       <span className="food-type">{selectedRecipe.selectedFoodType}</span>
  //       {/* Other meta info like user, etc. */}
  //     </div>
  //     <div className="recipe-ingredients">
  //       <div className="servings-slider-container">
  //         <input
  //           type="range"
  //           min={1}
  //           max={25}
  //           value={servings}
  //           onChange={handleServingChange}
  //           className="servings-slider"
  //         />
  //         <div>{servings} Servings</div>
  //       </div>
  //       <h2>Ingredients</h2>
  //       <ul>
  //         {resolvedIngredients.map((ingredient) => (
  //           <li key={ingredient._id}>
  //             {ingredient.amount} {ingredient.unit} {ingredient.name}{" "}
  //             <img
  //               className="tiny-ingredient-img"
  //               key={ingredient._id}
  //               src={ingredient.imageURL}
  //             />
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //     <div className="recipe-instructions2">
  //       <h2>Instructions</h2>
  //       <p>{selectedRecipe.instructions}</p>
  //     </div>
  //   </div>
  // </div>
}
