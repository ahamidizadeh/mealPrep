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
import DeleteIcon from "@mui/icons-material/Delete";
import { useRecipes } from "../RecipeContext";
import UserRecipes from "./UserRecipes.jsx";

export default function Lobby({ recipes }) {
  const { setSelectedRecipe, bookedRecipes } = useRecipes();
  const [scheduledRecipes, setScheduledRecipes] = useState([]);
  console.log("booked:", bookedRecipes, "state:", scheduledRecipes);
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
  }, []);

  useEffect(() => {
    setScheduledRecipes(bookedRecipes);
  }, [bookedRecipes]);

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
  const handleEventDragStop = (info) => {
    console.log("dargging stop");
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
  console.log("state recipes:", scheduledRecipes);
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
          eventDragStop={handleEventDragStop}
          eventReceive={handleEventReceive}
        />
      </div>
      <DeleteIcon
        style={{ color: "black", fontSize: 35, marginLeft: 35, marginTop: 250 }}
        id="external-delete-zone"
      />
    </div>
  );
}
