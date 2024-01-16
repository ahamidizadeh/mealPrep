import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecipeBuilder from "./components/RecipeBuilder.jsx";
import Lobby from "./components/Lobby";
import Navbar from "./components/Navbar";
import Contact from "./components/ContactUs";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <LandingPage />
    // <Router>
    //   <Navbar />
    //   <Routes>
    //     <Route path="/" element={<Lobby />} />
    //     <Route path="/recipe-builder" element={<RecipeBuilder />} />
    //     <Route path="/contact-us" element={<Contact />} />
    //   </Routes>
    // </Router>
  );
}

export default App;
