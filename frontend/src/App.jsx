import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import RecipeBuilder from "./components/RecipeBuilder.jsx";
import Lobby from "./components/Lobby";
import Navbar from "./components/Navbar";
import Contact from "./components/ContactUs";
import LandingPage from "./components/LandingPage";
import PrivateRoute from "./PrivateRoutes.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  const handleLogin = (username, userId) => {
    setIsLoggedIn(true);
    setUsername(username);
    setUserId(userId);
  };
  return (
    <>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage onLogin={handleLogin} />} />

        <Route
          path="/lobby"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Lobby
                onLogout={handleLogout}
                username={username}
                userId={userId}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/recipe-builder"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <RecipeBuilder />
            </PrivateRoute>
          }
        />
        <Route
          path="/contact-us"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Contact />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
