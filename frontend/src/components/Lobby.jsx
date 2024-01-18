import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "./Calendar";
import UserRecipes from "./UserRecipes.jsx";
import AllRecipes from "./AllRecipes.jsx";
import { jwtDecode } from "jwt-decode";
import "./styles/Lobby.css";

export default function Lobby({ onLogout, username }) {
  const [recipes, setRecipes] = useState([]);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);

        setUserId(decodedToken.userId);

        const response = await fetch("/api/recipes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("failed to fetch recipes");
      }
    };

    fetchRecipes();
  }, []);

  const userRecipes = recipes.filter((recipe) => recipe.userId === userId);

  console.log("user recipes: ", userRecipes);

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
          Logout
        </button>
      </div>
      <div className="recipe-section">
        <UserRecipes userRecipes={userRecipes} />
        <AllRecipes recipes={recipes} />
      </div>
      <Calendar />
    </div>
  );
}
