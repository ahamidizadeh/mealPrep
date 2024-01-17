import React from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "./Calendar";
import "./styles/Lobby.css";

export default function Lobby({ onLogout, username }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div className="lobby-container">
      {" "}
      <div className="profile">
        <h3>welcome back, {username}! 🎉</h3>
        <button className="logout-btn" onClick={handleLogout}>
          Logouth
        </button>
      </div>
      <div className="recipe-section">
        <div className="user-recipes">user recipes</div>
        <div className="all-recipes">All Recpes</div>
      </div>
      <Calendar />
    </div>
  );
}
