import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecipeBuilder from "./components/RecipeBuilder.jsx";
import Lobby from "./components/Lobby";
import Navbar from "./components/Navbar";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/recipe-builder" element={<RecipeBuilder />} />
      </Routes>
    </Router>
  );
}

export default App;
