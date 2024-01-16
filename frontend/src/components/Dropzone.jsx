import React, { useState } from "react";
import CustomModal from "./modal/ModalAmount.jsx";

export default function Dropzone({ onDrop, onFormChange }) {
  const [ingredient, setIngredient] = useState(null);
  const [image, setImage] = useState(null);
  const [selectedFoodType, setSelectedFoodType] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageChange = (event) => {
    const uploadedImage = event.target.files[0];
    setImage(uploadedImage);
    onFormChange({ image: uploadedImage, recipeName });
  };

  const handleRecipeNameChange = (event) => {
    setRecipeName(event.target.value);

    onFormChange({ image, recipeName: event.target.value });
  };
  const handleInstructionsChange = (event) => {
    setInstructions(event.target.value);
    onFormChange({ image, recipeName, instructions: event.target.value });
  };
  const handleFoodTypeChange = (event) => {
    const selectedType = event.target.value;
    setSelectedFoodType(selectedType);
    onFormChange({
      image,
      recipeName,
      instructions,
      selectedFoodType: selectedType,
    });
  };

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
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleImageChange}
        ></input>
        <input
          placeholder="Recipe Name"
          onChange={handleRecipeNameChange}
        ></input>
        <select
          onChange={handleFoodTypeChange}
          value={selectedFoodType}
          style={{ height: "20px", overflowY: "scroll" }}
        >
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
      <div className="recipe-instructions">
        <textarea
          placeholder="instructions"
          onChange={handleInstructionsChange}
        ></textarea>
      </div>
    </div>
  );
}
