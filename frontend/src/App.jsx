import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import RecipeBuilder from "./components/RecipeBuilder.jsx";
import Lobby from "./components/Lobby";
import Navbar from "./components/Navbar";
import Contact from "./components/ContactUs";
import LandingPage from "./components/LandingPage";
import PrivateRoute from "./PrivateRoutes.jsx";
import RecipeDetails from "./components/RecipeDetails";
import Groceries from "./components/Groceries.jsx";
import { useAuthContext } from "./AuthContext.jsx";

function App() {
  const { authToken } = useAuthContext();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Lobby />
            </PrivateRoute>
          }
        />
        <Route
          path="/recipe-builder"
          element={
            <PrivateRoute>
              <RecipeBuilder />
            </PrivateRoute>
          }
        />
        <Route
          path="/contact-us"
          element={
            <PrivateRoute>
              <Contact />
            </PrivateRoute>
          }
        />
        <Route
          path="/groceries"
          element={
            <PrivateRoute>
              <Groceries />
            </PrivateRoute>
          }
        />
        <Route
          path="/recipes/:id"
          element={
            <PrivateRoute>
              <RecipeDetails />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
