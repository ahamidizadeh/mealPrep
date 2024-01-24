import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AllRecipes from "./AllRecipes.jsx";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./styles/UserRecipes.css";
import "./styles/Calendar.css";
import "./styles/Lobby.css";
import { useRecipes } from "../RecipeContext";
import UserRecipes from "./UserRecipes.jsx";

export default function Lobby({ onLogout, username, recipes, userId }) {
  const [scheduledRecipes, setScheduledRecipes] = useState([
    { title: "meow", date: "2024-01-12" },
  ]);
  const { selectedRecipe, setSelectedRecipe } = useRecipes();

  const navigate = useNavigate();

  const filteredByUserRecipes = recipes.filter(
    (recipe) => recipe.userId === userId
  );
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

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };
  const handleDrop = (info) => {
    console.log(info);
    const uniqueId = generateUniqueId();
    const endTime = new Date(info.date);
    endTime.setMinutes(endTime.getMinutes() + 30);

    const newEvent = {
      id: uniqueId,
      title: info.draggedEl.innerText,
      start: info.date,
      end: endTime,
    };

    if (!eventAlreadyExists(uniqueId)) {
      setScheduledRecipes([...scheduledRecipes, newEvent]);
    }
  };

  const handleDateClick = () => {};
  const handleEventReceive = (info) => {};
  const handleEventChange = (event) => {
    const newStartTime = event.event.start;
    const eventId = event.oldEvent.id;

    setScheduledRecipes(
      scheduledRecipes.map((r) =>
        r.id === eventId ? { ...r, start: newStartTime } : r
      )
    );
  };
  console.log("upgraded version", scheduledRecipes);

  return (
    <div className="lobby-container">
      {" "}
      <div className="profile">
        <h3>welcome back, {username}! 🎉</h3>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="recipe-section">
        <UserRecipes
          onRecipeSelect={handleSelectingRecipe}
          userRecipes={filteredByUserRecipes}
        />
        <AllRecipes recipes={recipes} />
      </div>
      <div className="calendar-container">
        <FullCalendar
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          dateClick={handleDateClick}
          plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          droppable={true}
          editable={true}
          selectable={true}
          eventChange={handleEventChange}
          events={scheduledRecipes}
          drop={handleDrop}
          eventReceive={handleEventReceive}
        />
      </div>
    </div>
  );
}
