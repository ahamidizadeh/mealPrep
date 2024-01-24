import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const PrivateRoute = ({ children, isLoggedIn }) => {
  const { authToken } = useContext(AuthContext);
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

  return authToken ? (
    React.cloneElement(children, { recipes })
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;
