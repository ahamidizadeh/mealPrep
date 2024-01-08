import React, { useState } from "react";
import FruitsandVeggetables from "./FruitsandVeggetables";
import Meats from "./Meats";
import FatsCarbs from "./FatsCarbs";
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
      <FatsCarbs />
    </div>
  );
}
