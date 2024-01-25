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
import "./styles/Lobby.css";
import { useAuthContext } from "../AuthContext.jsx";
import { useRecipes } from "../RecipeContext";
import UserRecipes from "./UserRecipes.jsx";

export default function Lobby({ recipes }) {
  const { setSelectedRecipe, bookedRecipes } = useRecipes();
  const [scheduledRecipes, setScheduledRecipes] = useState(bookedRecipes);

  const { logout, id, username } = useAuthContext();

  const navigate = useNavigate();
  const scheduleRecipes = async (data, id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/recipes/book/${id}`, {
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
      console.log("Success:", result.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const debouncedSaveData = debounce(() => {
    scheduleRecipes(scheduledRecipes, id);
  }, 6000);

  useEffect(() => {
    debouncedSaveData();

    // Cleanup
    return () => {
      debouncedSaveData.cancel();
    };
  }, [scheduledRecipes]);

  const filteredByUserRecipes = recipes.filter(
    (recipe) => recipe.userId === id
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
    logout();
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
