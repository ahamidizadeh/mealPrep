import React, { useState } from "react";
import CustomModal from "./modal/ModalAmount";
import "./styles/Ingredient.css";

export default function IngredientItem({ ingredient, onShoppingData }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAmountOpen, setIsAmountOpen] = useState(false);
  //   console.log("onshopping", onModalConfirmation);
  const handleAddIngredient = () => {
    setIsAmountOpen(true);
    console.log("adding");
  };
  const handleModalClose = () => {
    setIsAmountOpen(false);
  };

  const handleConfirmation = ({ amount, unit }) => {
    const newItem = { name: ingredient.name, amount: amount, unit: unit };
    onShoppingData(newItem);
  };

  return (
    <div
      className="ingredient-container-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isAmountOpen ? (
        <CustomModal
          ingredient={ingredient}
          isOpen={isAmountOpen}
          onRequestClose={handleModalClose}
          onConfirm={handleConfirmation}
        />
      ) : null}
      {isHovered ? (
        <div className="button-display">
          <button onClick={handleAddIngredient}>Add</button>
        </div>
      ) : (
        <div>
          <h1>{ingredient.name}</h1>
          <img src={ingredient.imageURL} className="img-ingredient"></img>
        </div>
      )}
    </div>
  );
}
