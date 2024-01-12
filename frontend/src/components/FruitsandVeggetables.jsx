import React, { useState } from "react";

export default function FruitsandVeggetables({ data, searchedItem }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const displayedIngredients = data ? data.slice(startIndex, endIndex) : [];

  const handleDragStart = (e, ingredient) => {
    e.dataTransfer.setData("application/JSON", JSON.stringify(ingredient));
  };

  const filteredFruitsandVeggetables = displayedIngredients.filter(
    (ingredient) =>
      ingredient.name.toLowerCase().includes(searchedItem.toLowerCase())
  );
  return (
    <div id="veggies">
      {filteredFruitsandVeggetables.length
        ? filteredFruitsandVeggetables.map((ingredient) => (
            <img
              key={ingredient._id}
              src={ingredient.imageURL}
              id="ingredient-image"
              draggable
              onDragStart={(e) => handleDragStart(e, ingredient)}
            />
          ))
        : displayedIngredients.map((ingredient) => (
            <img
              key={ingredient._id}
              src={ingredient.imageURL}
              id="ingredient-image"
              draggable
              onDragStart={(e) => handleDragStart(e, ingredient)}
            />
          ))}
      <div id="pagination">
        <button
          className="pagination-button"
          onClick={() =>
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
          }
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        <span>{currentPage}</span>
        <button
          className="pagination-button"
          onClick={() =>
            setCurrentPage((prevPage) =>
              Math.min(prevPage + 1, Math.ceil(data.length / pageSize))
            )
          }
          disabled={currentPage === Math.ceil(data.length / pageSize)}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
