import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/UserRecipes.css";
import "./styles/Calendar.css";
import PersonIcon from "@mui/icons-material/Person";
import "./styles/Lobby.css";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { useAuthContext } from "../AuthContext.jsx";
import PlaylistAddCheckCircleSharpIcon from "@mui/icons-material/PlaylistAddCheckCircleSharp";
import LandingPage from "./LandingPage.jsx";
import Market from "./Market.jsx";
import IngredientDetails from "./IngredientDetails.jsx";

export default function Groceries() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [hoveredIngredient, setHoveredIngredient] = useState(null);
  const [shoppingList, setShoppingList] = useState([]);
  const { logout, authToken } = useAuthContext();

  const handleHoveredIngredient = (ing) => {
    setHoveredIngredient(ing);
  };
  const handleShopping = (item) => {
    setShoppingList((prevItems) => [...prevItems, item]);
  };
  const handleItemDelete = (index) => {
    const updatedList = shoppingList.toSpliced(index, 1);

    setShoppingList(updatedList);
  };
  console.log(shoppingList);
  return (
    <div className="lobby-cnt">
      <header>
        <div className="header-content">
          <div className="spacer-25"></div>
          <div>MaMani's Kitchen</div>
          <div className="spacer-48"></div>
          {/* <div className="input-container">
            <div className="spacer-18"></div>
            <div className="search-icon">
              <ManageSearchIcon />
            </div>
            <input
              className="input-search"
              placeholder="search for recipes"
            ></input>
            <div className="spacer-35"></div>
          </div> */}
          <div className="spacer-48"></div>
          <div className="header-btns">
            {authToken ? (
              <div className="container-navbar-header">
                <div className="groccery-icon-container active">
                  <PlaylistAddCheckCircleSharpIcon
                    style={{ fontSize: "2.5rem" }}
                    className="shopping-list"
                  />
                  <div className="spacer-3"></div>
                  <div className="tooltip">Groceries</div>
                </div>
                <div className="kitchen-icon-container">
                  <LocalFireDepartmentRoundedIcon
                    style={{ fontSize: "2.5rem" }}
                    className="fire-icon"
                  />
                  <div className="tooltip">Kitchen</div>
                </div>

                <button onClick={() => logout()} className="logout-btn">
                  Log out
                </button>
              </div>
            ) : (
              <>
                <a className="login-link" onClick={() => setIsLoginOpen(true)}>
                  <PersonIcon />
                  <div className="spacer-4"></div>
                  Login
                </a>

                <a className="login-link" onClick={() => setIsLoginOpen(true)}>
                  <div>Sign up</div>
                </a>
              </>
            )}
          </div>
          <LandingPage
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
          />
        </div>
      </header>
      <main className="main-content">
        <div className="recipes-display">
          <div className="filter-prefrence">
            <button className="button-filter">Fruits</button>
            <button className="button-filter">Vegetables</button>
            <button className="button-filter">Grains and breads</button>
            <button className="button-filter">nutz</button>
            <button className="button-filter">Meats</button>
            <button className="button-filter">Oils and fats</button>
            <button className="button-filter">Vegan Meats</button>
          </div>
          <Market
            onHover={handleHoveredIngredient}
            onShopping={handleShopping}
          />
          <IngredientDetails
            ingredient={hoveredIngredient}
            list={shoppingList}
            onDeleteItem={handleItemDelete}
          />
        </div>
      </main>
    </div>
  );
}
