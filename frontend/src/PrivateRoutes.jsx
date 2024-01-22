import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const PrivateRoute = ({ children, isLoggedIn }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const token = localStorage.getItem("token");
        // const decodedToken = jwtDecode(token);
        // setUserId(decodedToken.userId);
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
        console.error("failed fetching recipes");
      }
    };

    fetchRecipes();
  }, []);

  return isLoggedIn ? (
    React.cloneElement(children, { recipes })
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;
