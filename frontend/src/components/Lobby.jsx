import React from "react";
import Calendar from "./Calendar";
import "./styles/Lobby.css";

export default function Lobby({ onLogout }) {
  const handleLogout = () => {
    onLogout();
  };
  return (
    <div className="lobby-container">
      {" "}
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
      <div className="recipe-section">
        <div className="user-recipes">user recipes</div>
        <div className="all-recipes">All Recpes</div>
      </div>
      <Calendar />
    </div>
  );
}
