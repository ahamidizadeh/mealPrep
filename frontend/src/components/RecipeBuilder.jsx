import React, { useState, useEffect } from "react";
import "./styles/RecipeBuilder.css";
import axios from "axios";
import Fridge from "./Fridge.jsx";
import Spices from "./Spices.jsx";
import Dropzone from "./Dropzone.jsx";
import Ingredients from "./Ingredients.jsx";
export default function RecipeBuilder() {
  const [ingredients, setIngredients] = useState([]);
  const [droppedItems, setDroppedItems] = useState([]);

  useEffect(() => {
    // setDroppedItems([]);
    axios
      .get("/api/ingredients")
      .then((res) => {
        setIngredients(res.data);
      })
      .catch((error) => {
        console.error("Error Fetching ingredients", error);
      });
  }, []);

  const handleDrop = (item) => {
    setDroppedItems((prevItems) => [...prevItems, item]);
  };
  // const imageUrl = "https://storage.googleapis.com/ingredients3/avacado.jpeg";
  return (
    <div id="container">
      <div id="leftColumn">
        <div id="searchBar">
          <input placeholder="search" id="search-input"></input>
        </div>
        <Fridge ingredients={ingredients} />
      </div>
      <div id="rightColumn">
        <Spices />
        <Dropzone onDrop={handleDrop} />
        <Ingredients droppedItems={droppedItems} />
        <div id="macros">macros</div>
      </div>
    </div>
  );
}
