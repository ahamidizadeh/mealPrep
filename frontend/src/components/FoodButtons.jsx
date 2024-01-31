import React, { useState } from "react";
import "./styles/RecipeBuilder.css";
const cultures = [
  "Mexican",
  "Chinese",
  "Korean",
  "Jamaican",
  "Italian",
  "French",
  "Caribbean",
  "Spanish",
  "Indian",
  "Persian",
];
const foods = {
  mexican: [
    "Tacos",
    "Enchiladas",
    "Guacamole",
    "Tamales",
    "Pazole",
    "Mole",
    "Chorrus",
    "Elote",
    "Ceviche",
  ],

  italian: [
    "Pizza",
    "Pasta",
    "Risotto",
    "Tiramisu",
    "Gelato",
    "Lasagna",
    "Osso Buco",
    "Carbonara",
    "Minestrone",
    "Caprese Salad",
  ],

  chinese: [
    "Dim Sum",
    "Peking Duck",
    "Hot Pot",
    "Kung Pao Chicken",
    "Mapo Tofu",
    "Chow Mein",
    "Spring Rolls",
    "Sweet and Sour Pork",
    "Dumplings",
    "Egg Fried Rice",
  ],
  french: [
    "Coq au Vin",
    "Bouilabaisse",
    "Ratatouille",
    "Quiche Lorraine",
    "Beuf Bourguignon",
    "Foi Gras",
    "Crossants",
    "Tarte Tatin",
    "Nicoise Salad",
    "Crème Brûlée",
  ],
  korean: [
    "Kimchi",
    "Bulgogi",
    "Bibimbap",
    "Japchae",
    "Samgyeopsal",
    "Tteokbokki",
    "Kimbap",
    "Haemul Pajeon",
    "Sundubu-jigae",
    "Galbi",
  ],
  caribean: [
    "Jerk Chicken",
    "Roti",
    "Curry Goat",
    "Cou-Cou and Flying Fish",
    "Pepperpot",
    "Conch Fritters",
    "Callaloo",
    "Rice and Peas",
    "Ackee and Saltfish",
    "Johhny Cakes",
  ],
  persian: [
    "Ghormeh Sabzi",
    "Fesenjan",
    "Tahdig",
    "Zereshk Polo",
    "Baghali Polo",
    "Kebab",
    "Ash Reshteh",
    "Tahchin",
    "Khoresh Bademjan",
    "Dizi",
  ],
  jamaican: [
    "Jerk Chicken",
    "Ackee and Saltfish",
    "Curry Goat",
    "Jamaican Patty",
    "Oxtail",
    "Rice and Peas",
    "Callaloo",
    "Escovitch Fish",
    "Bammy",
    "Festival",
  ],
  indian: [
    "Butter Chicken",
    "Biryani",
    "Dosa",
    "Palak Paneer",
    "Chole (Chickpea Curry)",
    "Rogan Josh",
    "Masala Chai",
    "Samosas",
    "Naan",
    "Rasgulla",
  ],
  spanish: [
    "Paella",
    "Gazpacho",
    "Tortilla Española",
    "Pisto",
    "Croquetas",
    "Gambas al ajillo",
    "Patatas bravas",
    "Churros",
    "Fabada Asturiana",
    "Jamón ibérico",
  ],
};

export default function FoodButtons() {
  const [buttonsState, setButtonsState] = useState(cultures);

  const handleClick = (e) => {
    const selectedFood = foods[e.target.value.toLowerCase()];
    setButtonsState(selectedFood);
  };
  const handleGoBack = (e) => {
    setButtonsState(cultures);
  };
  return (
    <div className="food-container">
      <div className="food-buttons">
        {buttonsState.map((culture, i) => (
          <button onClick={handleClick} value={culture} key={i}>
            {culture}
          </button>
        ))}
      </div>
      {buttonsState === cultures ? null : (
        <button className="back-button" onClick={handleGoBack}>
          go back
        </button>
      )}
    </div>
  );
}
