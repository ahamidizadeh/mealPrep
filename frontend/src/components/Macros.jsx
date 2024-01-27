import { drop } from "lodash";
import React, { useState, useEffect } from "react";

const unitConversions = {
  grams: 1,
  lbs: 453.592, // 1 lb is approximately 453.592 grams
  ounces: 28.3495,
};

export default function Macros({ droppedItems, recipeData }) {
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

    setFats(totalFatsGrams);
    setCarbs(totalCarbsGrams);
    setProtein(totalProteinGrams);
  }, [droppedItems]);

  const handleRecipeSubmit = async () => {
    // check form data is not empty
    const isFormDataValid =
      Object.values(recipeData).every((value) => value) &&
      droppedItems.length > 0;

    if (isFormDataValid) {
      try {
        console.log("sending");
        const token = localStorage.getItem("token");
        const formData = new FormData();

        formData.append("recipeName", recipeData.recipeName);
        formData.append("instructions", recipeData.instructions);
        formData.append("selectedFoodType", recipeData.selectedFoodType);
        formData.append("image", recipeData.image);
        droppedItems.forEach((item, index) => {
          formData.append(`ingredients[${index}]`, JSON.stringify(item));
        });
        const fetchOptions = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Replace with actual token from state or storage
          },
          body: formData, // Sending the FormData object
        };
        console.log("sending this form:", formData);
        const response = await fetch("/api/recipes", fetchOptions);

        if (response.ok) {
          const data = await response.json();
          console.log("Success:", data);
          // Handle success (e.g., redirect, show success message)
        } else {
          console.error("Error:", response.statusText);
          // Handle errors (e.g., show error message)
        }
      } catch (error) {
        console.error("Error during recipe submission:", error);
      }
    } else {
      console.error("Please fill all the required fields.");
    }
  };

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
