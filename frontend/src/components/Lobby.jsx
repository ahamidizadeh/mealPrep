import React from "react";
import Calendar from "./Calendar";
import "./styles/Lobby.css";

export default function Lobby() {
  return (
    <div className="lobby-container">
      {" "}
      <div className="recipe-section">
        <div className="user-recipes">user recipes</div>
        <div className="all-recipes">All Recpes</div>
      </div>
      <Calendar />
    </div>
  );
}
