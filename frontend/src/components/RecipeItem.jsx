import React, { useState, useEffect } from "react";
import CustomCalendarModal from "./modal/ModalCalendar";

export default function RecipeItem({ recipe }) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [hoverTimeoutId, setHoverTimeoutId] = useState(null);

  // Clear the timeout if component unmounts while hover is delayed
  useEffect(() => {
    return () => {
      if (hoverTimeoutId) clearTimeout(hoverTimeoutId);
    };
  }, [hoverTimeoutId]);

  const handleMouseEnter = () => {
    // Clear existing timeout to reset the timer if mouse re-enters quickly
    if (hoverTimeoutId) clearTimeout(hoverTimeoutId);
    const timeoutId = setTimeout(() => {
      setIsHovered(true);
    }, 500); // Delay in milliseconds
    setHoverTimeoutId(timeoutId);
  };

  const handleMouseLeave = () => {
    // Clear the timeout to prevent setIsHovered(true) if mouse leaves before delay
    if (hoverTimeoutId) clearTimeout(hoverTimeoutId);
    setIsHovered(false);
  };

  const handleOpen = (recipe) => {
    setSelectedRecipe(recipe);
    setIsCalendarOpen(true);
  };
  const handleClose = () => {
    setIsCalendarOpen(false);
  };
  return (
    <div
      className="item-bg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered ? (
        <div className="button-display">
          <button onClick={() => handleOpen(recipe)}>Add Calendar</button>
          <button>Shop ingredients</button>
        </div>
      ) : (
        <div>
          <div className="card-name">{recipe.name}</div>
          <div>
            <img
              className="image-recipe"
              src={`../../public/images/${recipe.name}.jpeg`}
            ></img>
          </div>
        </div>
      )}
      <CustomCalendarModal
        recipe={selectedRecipe}
        onRequestClose={handleClose}
        isOpen={isCalendarOpen}
      />
    </div>
  );
}
