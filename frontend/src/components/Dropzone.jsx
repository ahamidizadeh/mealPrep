import React, { useState } from "react";
import CustomModal from "./modal/ModalAmount.jsx";

export default function Dropzone({ onDrop }) {
  const [ingredient, setIngredient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedItemJson = e.dataTransfer.getData("application/JSON");
    if (draggedItemJson.trim() !== "") {
      const draggedIngredient = JSON.parse(draggedItemJson);

      setIngredient(draggedIngredient);
    }

    setIsModalOpen(true);
  };
  const handleModalConfirm = ({ amount, unit }) => {
    onDrop({ ingredient, amount, unit });
    setIsModalOpen(false);
  };
  return (
    <div id="dropZone">
      <div
        className="drop-area"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <p>|Drag & Drop|</p>
        <CustomModal
          ingredient={ingredient}
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onConfirm={handleModalConfirm}
        />
      </div>
      <div className="recipe-inputs">
        <input placeholder="Recipe Name"></input>
        <select style={{ height: "20px", overflowY: "scroll" }}>
          <option>select food type</option>
          <option>Breakfast</option>
          <option>Suplement</option>
          <option>Appetizer</option>
          <option>Soup</option>
          <option>Lunch</option>
          <option>Salad</option>
          <option>Dinner</option>
          <option>Shake</option>
          <option>Desert</option>
        </select>
      </div>
    </div>
  );
}
