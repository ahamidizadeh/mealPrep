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
  const [aiResponse, setAiResponse] = useState("");
  const [droppedItems, setDroppedItems] = useState([]);
  const [formData, setFormData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [aiSearch, setAiSearch] = useState("");
  const { ingredients } = useRecipes();

  const typeOutMessage = (fullMessage, index) => {
    if (index < fullMessage.length) {
      setAiResponse((prev) => prev + fullMessage.charAt(index));

      setTimeout(() => typeOutMessage(fullMessage, index + 1), 200); // Adjust the interval to control typing speed
    }
  };

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
  const handleAiClick = async () => {
    try {
      let data = aiSearch;
      console.log("sendin this data: ", typeof data);
      const response = await fetch("/api/ai/answer-from-ai", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "text/plain",
        },
        body: data,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const dataFromAi = await response.json();
      setAiResponse(""); // Reset message
      // Reset index
      typeOutMessage(dataFromAi.content, 0);
      console.log("there you go", dataFromAi);
    } catch (error) {
      console.log("error getting data from ai", error);
    }
  };
  const handleAiSearchChange = (e) => {
    setAiSearch(e.target.value);
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
      <div className="ai-chat-container">
        <input
          placeholder="what ingredients do you have?"
          onChange={handleAiSearchChange}
          value={aiSearch}
        ></input>
        <button className="open-ai-btn" onClick={handleAiClick}>
          ask
        </button>
        <textarea className="ai-answer" value={aiResponse} readOnly />
      </div>
    </>
  );
}
