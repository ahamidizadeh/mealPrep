import React from "react";

export default function Spices() {
  const spices = [
    "Salt",
    "Pepper",
    "Cumin",
    "Paprika",
    "Cinnamon",
    "Turmeric",
    "Oregano",
    "Parsley",
    "Thyme",
    "Rosemary",
    "Cayenne",
    "Cloves",
    "Nutmeg",
    "Pumpkin spice",
    "Chilli pepper",
    "Zafron",
  ];

  const handleDragStart = (e) => {
    const spiceName = e.target.getAttribute("data-spice-name");
    e.dataTransfer.setData("text/plain", spiceName);
  };
  return (
    <div id="spices">
      {spices.map((spice, index) => (
        <div
          key={index}
          className={`spice-section ${spice.toLowerCase().replace(" ", "-")}`}
          data-spice-name={spice}
          draggable
          onDragStart={(e) => handleDragStart(e, spice)}
        ></div>
      ))}
    </div>
  );
}
