import React from "react";
import "./styles/Market.css";
import { useRecipes } from "../RecipeContext";
import IngredientItem from "./IngredientItem.jsx";
/*<div className="category-food">
<section>
<div className="header-recipe-row">
  <h1>Italian</h1>
</div>
<div className="recipes-lobby">
  {listItalian.map((group, i) => (
    <ul className="list-recipe" key={i}>
      {group.map((recipe, i) => (
        <li
          onMouseEnter={() => handleHover(recipe)}
          onMouseLeave={handleMouseLeave}
          key={i}
        >
          <RecipeItem hoverTime={hoverTimeOut} recipe={recipe} />
        </li>
      ))}
    </ul>
  ))}
</div>
</section>
</div>*/
export default function Market({ onHover, onShopping }) {
  const { ingredients } = useRecipes();
  console.log("market", typeof onShopping);
  const chunkArray = (arr, chunkSize) => {
    let result = [];

    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }

    return result;
  };

  const fruitsAndVegetables = chunkArray(
    ingredients.filter((ing) => ing.category === "Fruits and vegetables"),
    5
  );

  const meats = chunkArray(
    ingredients.filter((ing) => ing.category === "Meats"),
    5
  );
  const handleHoveringIngredient = () => {};
  return (
    <div className="market-container">
      <div className="market-row">
        <section className="market-section">
          <div className="market-items">
            {fruitsAndVegetables.map((group, i) => (
              <ul className="market-items-list" key={i}>
                {group.map((ing, i) => (
                  <li
                    onMouseEnter={() => onHover(ing)}
                    onMouseLeave={() => onHover(null)}
                    key={i}
                  >
                    <IngredientItem
                      ingredient={ing}
                      onShoppingData={onShopping}
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </section>
      </div>
      <div className="market-row">
        <section className="market-section">
          <div className="market-items">
            {meats.map((group, i) => (
              <ul className="market-items-list" key={i}>
                {group.map((ing, i) => (
                  <li
                    onMouseEnter={() => onHover(ing)}
                    onMouseLeave={() => onHover(null)}
                    key={i}
                  >
                    <IngredientItem
                      ingredient={ing}
                      onShoppingData={onShopping}
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
