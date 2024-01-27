import React, { useState, useEffect } from "react";
import "./styles/RecipeBuilder.css";
import axios from "axios";
import Fridge from "./Fridge.jsx";
import Spices from "./Spices.jsx";
import Dropzone from "./Dropzone.jsx";
import Ingredients from "./Ingredients.jsx";
import Macros from "./Macros.jsx";
import Navbar from "./Navbar";
import { useRecipes } from "../RecipeContext.jsx";

export default function RecipeBuilder() {
  const [droppedItems, setDroppedItems] = useState([]);
  const [formData, setFormData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const { ingredients } = useRecipes();

  const handleFormChange = (newFormData) => {
    setFormData({ ...formData, ...newFormData });
  };

  const handleDrop = (item) => {
    setDroppedItems((prevItems) => [...prevItems, item]);
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...droppedItems];

    updatedIngredients.splice(index, 1);

    setDroppedItems(updatedIngredients);
  };
  // const filteredIngredients = ingredients.filter((ingredient) =>
  //   ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );
  // const imageUrl = "https://storage.googleapis.com/ingredients3/avacado.jpeg";
  return (
    <>
      <Navbar />
      <div id="container">
        <div id="leftColumn">
          <div id="searchBar">
            <input
              placeholder="search"
              id="search-input"
              value={searchQuery}
              onChange={handleSearchChange}
            ></input>
          </div>
          <Fridge ingredients={ingredients} searchedItem={searchQuery} />
        </div>
        <div id="rightColumn">
          <Spices />
          <Dropzone onDrop={handleDrop} onFormChange={handleFormChange} />
          <Ingredients
            droppedItems={droppedItems}
            onRemoveIngredient={handleRemoveIngredient}
          />
          <Macros droppedItems={droppedItems} recipeData={formData} />
        </div>
      </div>
    </>
  );
}
