import "./App.css";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import RecipeBuilder from "./components/RecipeBuilder.jsx";
import Lobby from "./components/Lobby";
import Navbar from "./components/Navbar";
import Contact from "./components/ContactUs";
import LandingPage from "./components/LandingPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("logingout");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };
  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/lobby");
  };
  return (
    <>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage onLogin={handleLogin} />} />
        {isLoggedIn && (
          <>
            <Route path="/lobby" element={<Lobby onLogout={handleLogout} />} />
            <Route path="/recipe-builder" element={<RecipeBuilder />} />
            <Route path="/contact-us" element={<Contact />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
