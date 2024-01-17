import React from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "./Calendar";
import "./styles/Lobby.css";

export default function Lobby({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div className="lobby-container">
      {" "}
      <div className="profile">
        <h1>welcome user</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
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
