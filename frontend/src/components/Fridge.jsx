import React, { useState } from "react";
import FruitsandVeggetables from "./FruitsandVeggetables";
import Meats from "./Meats";
import "./styles/Fridge.css";

export default function Fridge({ ingredients, searchedItem }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const displayedIngredients = ingredients
    ? ingredients.slice(startIndex, endIndex)
    : [];

  const fruitsandVegetables = ingredients.filter(
    (ingredient) => ingredient.category === "Fruits and vegetables"
  );
  const meats = ingredients.filter(
    (ingredient) => ingredient.category === "Meats"
  );

  return (
    <div id="fridge">
      <Meats data={meats} searchedItem={searchedItem} />
      <FruitsandVeggetables
        data={fruitsandVegetables}
        searchedItem={searchedItem}
      />
      <div id="carbs">
        {" "}
        {displayedIngredients.length > 0 ? (
          displayedIngredients.map((ingredient) => (
            <img
              key={ingredient._id}
              src={ingredient.imageURL}
              id="ingredient-image"
            />
          ))
        ) : (
          <p>pending...</p>
        )}
        <div id="pagination">
          <button
            onClick={() =>
              setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
            }
            disabled={currentPage === 1}
          >
            prev
          </button>
          <span>{currentPage}</span>
          <button
            onClick={() =>
              setCurrentPage((prevPage) =>
                Math.min(prevPage + 1, Math.ceil(ingredients.length / pageSize))
              )
            }
            disabled={currentPage === Math.ceil(ingredients.length / pageSize)}
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
}
