import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import RecipeBuilder from "./components/RecipeBuilder.jsx";
import Lobby from "./components/Lobby";
import Navbar from "./components/Navbar";
import Contact from "./components/ContactUs";
import LandingPage from "./components/LandingPage";
import PrivateRoute from "./PrivateRoutes.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  const handleLogin = () => {
    setIsLoggedIn(true);
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
              <Lobby onLogout={handleLogout} />
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
