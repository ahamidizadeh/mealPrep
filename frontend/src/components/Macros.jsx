import React, { useState, useEffect } from "react";

const unitConversions = {
  grams: 1,
  lbs: 453.592, // 1 lb is approximately 453.592 grams
  ounces: 28.3495,
};

export default function Macros({ droppedItems, formData }) {
  const [fats, setFats] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [protein, setProtein] = useState(0);

  useEffect(() => {
    // Calculate total grams of each acro from dropped items
    const totalFatsGrams = droppedItems.reduce(
      (total, item) =>
        total +
        (item.amount *
          unitConversions[item.unit] *
          item.ingredient.macros.fat) /
          100,
      0
    );

    const totalCarbsGrams = droppedItems.reduce(
      (total, item) =>
        total +
        (item.amount *
          unitConversions[item.unit] *
          item.ingredient.macros.carbs) /
          100,
      0
    );

    const totalProteinGrams = droppedItems.reduce(
      (total, item) =>
        total +
        (item.amount *
          unitConversions[item.unit] *
          item.ingredient.macros.protein) /
          100,
      0
    );
    console.log("total fats", totalFatsGrams);
    // Update state with calculated values
    setFats(totalFatsGrams);
    setCarbs(totalCarbsGrams);
    setProtein(totalProteinGrams);
  }, [droppedItems]);
  const handleRecipeSubmit = () => {
    if (formData.image && formData.recipeName && formData.selectedFoodType) {
    }
  };

  console.log("formdata", formData);
  return (
    <>
      <div id="macros">
        <div className="macro-container">
          <label>Fats</label>
          <div className="circle">{fats.toFixed(1)} g</div>
        </div>
        <div className="macro-container">
          <label>Carbs</label>
          <div className="circle">{carbs.toFixed(1)} g</div>
        </div>
        <div className="macro-container">
          <label>Protein</label>
          <div className="circle">{protein.toFixed(1)} g</div>
        </div>
      </div>
      <div className="centered">
        <button className="submit" onClick={handleRecipeSubmit}>
          Submit
        </button>
      </div>
    </>
  );
}
