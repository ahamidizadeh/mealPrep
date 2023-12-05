import React, { useState, useEffect } from "react";
import "./styles/RecipeBuilder.css";
import axios from "axios";
export default function RecipeBuilder() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    axios
      .get("/api/ingredients")
      .then((res) => {
        setIngredients(res.data);
        console.log(ingredients);
      })
      .catch((error) => {
        console.error("Error Fetching ingredients", error);
      });
  }, []);

  // const imageUrl = "https://storage.googleapis.com/ingredients3/avacado.jpeg";
  return (
    <div id="container">
      <div id="leftColumn">
        <div id="searchBar">
          <input placeholder="search" id="search-input"></input>
        </div>
        <div id="fridge">
          <div id="meats">
            {ingredients ? (
              ingredients.map((ingredient) => (
                <img
                  key={ingredient._id}
                  src={ingredient.imageURL}
                  id="ingredient-image"
                />
              ))
            ) : (
              <p>pending...</p>
            )}
          </div>
          <div id="veggies">Veggies</div>
          <div id="carbs">Carbs</div>
        </div>
      </div>
      <div id="rightColumn">
        <div id="spices">
          <div className="spice-section salt" data-spice-name="Salt"></div>
          <div className="spice-section pepper" data-spice-name="pepper"></div>
          <div className="spice-section cumin" data-spice-name="Cumin"></div>
          <div
            className="spice-section paprika"
            data-spice-name="Paprika"
          ></div>
          <div
            className="spice-section cinnamon"
            data-spice-name="Cinnamon"
          ></div>
          <div
            className="spice-section tumeric"
            data-spice-name="Turmeric"
          ></div>
          <div
            className="spice-section oregano"
            data-spice-name="Oregano"
          ></div>
          <div
            className="spice-section parsley"
            data-spice-name="Parsley"
          ></div>
          <div className="spice-section thyme" data-spice-name="Thyme"></div>
          <div
            className="spice-section rosemary"
            data-spice-name="Rosemary"
          ></div>
          <div
            className="spice-section cayenne"
            data-spice-name="Cayenne"
          ></div>
          <div className="spice-section cloves" data-spice-name="Cloves"></div>
          <div className="spice-section nutmeg" data-spice-name="Nutmeg"></div>
          <div
            className="spice-section pumpkin_spice"
            data-spice-name="Pumpkin spice"
          ></div>
          <div
            className="spice-section chilli pepper"
            data-spice-name="Chilli pepper"
          ></div>
          <div className="spice-section zafron" data-spice-name="Zafron"></div>
        </div>
        <div id="dropZone">Drop Zone</div>
        <div id="ingredients">Ingredients</div>
        <div id="macros">macros</div>
      </div>
    </div>
  );
}
