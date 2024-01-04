import React, { useState } from "react";

export default function Meats({ data, searchedItem }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const displayedIngredients = data ? data.slice(startIndex, endIndex) : [];

  const handleDragStart = (e, ingredient) => {
    e.dataTransfer.setData("text/plain", ingredient.name); // Adjust the data you want to transfer
  };
  const filteredMeats = displayedIngredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchedItem.toLowerCase())
  );
  console.log("filteredMeats", filteredMeats);
  return (
    <div id="meats">
      {
        filteredMeats.length
          ? filteredMeats.map((ingredient) => (
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
            ))
        // <p>No matching ingredients in Meats</p>
      }
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
              Math.min(prevPage + 1, Math.ceil(data.length / pageSize))
            )
          }
          disabled={currentPage === Math.ceil(data.length / pageSize)}
        >
          next
        </button>
      </div>
    </div>
  );
}
