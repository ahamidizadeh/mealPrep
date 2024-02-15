import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AllRecipes from "./AllRecipes.jsx";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { debounce } from "lodash";
import "./styles/UserRecipes.css";
import "./styles/Calendar.css";
import PersonIcon from "@mui/icons-material/Person";
import "./styles/Lobby.css";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { useAuthContext } from "../AuthContext.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRecipes } from "../RecipeContext";
import Recipes from "./Recipes.jsx";
import UserRecipes from "./UserRecipes.jsx";
import ShoppingList from "./ShoppingList.jsx";
import FoodButtons from "./FoodButtons.jsx";
import Profile from "./Profile.jsx";
import RecipeDetails from "./RecipeDetails.jsx";

export default function Lobby({ recipes }) {
  const { setSelectedRecipe, bookedRecipes, setShoppingList } = useRecipes();
  const [scheduledRecipes, setScheduledRecipes] = useState([]);
  const [hoverDelay, setHoverDelay] = useState(null);
  const [hoveredRecipe, setHoveredRecipe] = useState(null);
  const { logout, id, username } = useAuthContext();

  const navigate = useNavigate();

  const scheduleRecipes = async (data, userId) => {
    try {
      if (userId) {
        const token = localStorage.getItem("token");
        console.log("scheduling for user", userId);
        const response = await fetch(`/api/recipes/book/${userId}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleHover = (recipe) => {
    setHoveredRecipe(recipe);
  };

  const debouncedSaveData = debounce(() => {
    scheduleRecipes(scheduledRecipes, id);
  }, 4000);

  // useEffect(() => {
  //   debouncedSaveData();

  //   // Cleanup
  //   return () => {
  //     debouncedSaveData.cancel();
  //   };
  // }, []);

  // useEffect(() => {
  //   setScheduledRecipes(bookedRecipes);
  // }, [bookedRecipes]);

  // const filteredByUserRecipes = recipes.filter(
  //   (recipe) => recipe.userId === id
  // );

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  };
  const eventAlreadyExists = (eventId) => {
    return scheduledRecipes.some((event) => event.id === eventId);
  };
  const handleSelectingRecipe = (id) => {
    const recipe = recipes.find((recipe) => recipe._id === id);
    setSelectedRecipe(recipe);
    navigate(`/recipes/${id}`);
  };

  const handleDrop = (info) => {};

  const handleDateClick = () => {};
  const handleEventDragStop = (info) => {
    const id = info.event.id;
    // Get the event and its location
    const event = info.event;
    const jsEvent = info.jsEvent;

    const trashCan = document.getElementById("external-delete-zone");
    const trashCanRect = trashCan.getBoundingClientRect();
    // Check if the event's final drop location overlaps with the delete zone
    if (
      jsEvent.clientX >= trashCanRect.left &&
      jsEvent.clientX <= trashCanRect.right &&
      jsEvent.clientY >= trashCanRect.top &&
      jsEvent.clientY <= trashCanRect.bottom
    ) {
      // Event was dropped inside the delete zone, remove it
      event.remove();
      const updateEvents = scheduledRecipes.filter(
        (recipe) => recipe.id !== id
      );
      setScheduledRecipes(updateEvents);
      deleteRecipeBooked(id);
    }
  };
  const deleteRecipeBooked = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      fetch(`/api/recipes/delete/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleEventReceive = (info) => {
    // console.log("event recieved", info.event.extendedProps.ingredients);
    const uniqueId = generateUniqueId();
    const endTime = new Date(info.event.start);
    endTime.setMinutes(endTime.getMinutes() + 30);

    const newEvent = {
      id: uniqueId,
      recipeId: info.event.extendedProps.recipeId,
      title: info.event.title,
      start: info.event.start,
      end: endTime,
    };

    if (!eventAlreadyExists(uniqueId)) {
      setScheduledRecipes([...scheduledRecipes, newEvent]);
    }
  };
  const handleEventChange = (event) => {
    const newStartTime = event.event.start;
    const eventId = event.oldEvent.id;

    setScheduledRecipes(
      scheduledRecipes.map((r) =>
        r.id === eventId ? { ...r, start: newStartTime } : r
      )
    );
  };
  const getRecipeById = (recipeId) => {
    return recipes.find((recipe) => recipe._id === recipeId);
  };

  const handleSelectRange = async (info) => {
    const { start, end } = info;
    const eventsInRange = scheduledRecipes.filter((e) => {
      const eventStart = new Date(e.start);
      const eventEnd = new Date(e.end);
      return eventStart >= start && eventEnd <= end;
    });
    // find recipes ids that are in range
    const recipeIds = eventsInRange.map((e) => e.recipeId);

    //fetch all the recipes based on those recipe ids when they are ready
    const fetchRecipesByIds = async (ids) => {
      try {
        const recipePromises = ids.map((id) => getRecipeById(id)); // Replace fetchRecipeById with your actual data fetching function
        const recipes = await Promise.all(recipePromises);
        return recipes;
      } catch (error) {
        console.error("Error fetching recipes:", error);
        throw error;
      }
    };

    const fetchedRecipes = await fetchRecipesByIds(recipeIds);
    // make a map to that adds the amount based on the name of ingredients
    const consolidateIngredients = async (recipes) => {
      const ingredientMap = new Map();

      recipes.forEach((recipe) => {
        recipe.ingredients.forEach(({ name, amount, unit }) => {
          const key = `${name.toLowerCase()}-${unit.toLowerCase()}`;
          if (ingredientMap.has(key)) {
            ingredientMap.get(key).amount += amount; // Add to existing amount
          } else {
            ingredientMap.set(key, { name, amount, unit }); // Add new ingredient
          }
        });
      });

      return Array.from(ingredientMap.values());
    };

    const finalIngredients = await consolidateIngredients(fetchedRecipes);
    //set context to pass to shoppingList.jsx
    setShoppingList(finalIngredients);
  };

  return (
    <div className="lobby-cnt">
      <header>
        <div className="header-content">
          <div className="spacer-25"></div>
          <div>MaMani's Kitchen</div>
          <div className="spacer-48"></div>
          <div className="input-container">
            <div className="spacer-18"></div>
            <div className="search-icon">
              <ManageSearchIcon style={{ fontSize: "20px" }} />
            </div>
            <input
              className="input-search"
              placeholder="search for recipes"
            ></input>
            <div className="spacer-35"></div>
          </div>
          <div className="spacer-48"></div>
          <div className="header-btns">
            <a className="login-link">
              <PersonIcon />
              <div className="spacer-4"></div>
              Login
            </a>

            <a className="login-link">
              <div>Sign up</div>
            </a>
          </div>
        </div>
      </header>
      <main className="main-content">
        <div className="filter-search">
          <div className="filter-buttons">
            <button className="button-filter">
              <img
                className="logo-filter"
                src="../../public/images/chinese.webp"
              ></img>
            </button>
            <button className="button-filter">Italian</button>
            <button className="button-filter">Easy Recipes</button>
          </div>
          <div className="filter-prefrence">
            <button className="button-filter">Vegan</button>
            <button className="button-filter">nut free</button>
            <button className="button-filter">under 30mins</button>
          </div>
        </div>
        <div className="recipes-display">
          <Recipes onHover={handleHover} recipes={recipes} />
          <RecipeDetails recipe={hoveredRecipe} />
        </div>
      </main>
    </div>
    // <div className="lobby-container">
    //   <div className="leftSide">
    //     <FoodButtons />
    //   </div>
    //   <div className="middle">
    //     <UserRecipes
    //       onRecipeSelect={handleSelectingRecipe}
    //       userRecipes={filteredByUserRecipes}
    //     />
    //     <FullCalendar
    //       headerToolbar={{
    //         left: "prev,next today",
    //         center: "title",
    //         right: "dayGridMonth,timeGridWeek,timeGridDay",
    //       }}
    //       dateClick={handleDateClick}
    //       plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin]}
    //       initialView="dayGridMonth"
    //       droppable={true}
    //       editable={true}
    //       selectable={true}
    //       select={handleSelectRange}
    //       eventChange={handleEventChange}
    //       events={scheduledRecipes}
    //       drop={handleDrop}
    //       eventDragStop={handleEventDragStop}
    //       eventReceive={handleEventReceive}
    //     />
    //     <DeleteIcon
    //       style={{
    //         color: "black",
    //         fontSize: 35,
    //         marginLeft: 35,
    //         marginTop: 250,
    //       }}
    //       id="external-delete-zone"
    //     />
    //   </div>
    //   <div className="rightSide">
    //     <ShoppingList />
    //   </div>
    // </div>
  );
}
