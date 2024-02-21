import React, { useEffect, useState } from "react";
import "./styles/Calendar.css";
import { useAuthContext } from "../AuthContext.jsx";
import { useRecipes } from "../RecipeContext.jsx";
import { useNavigate } from "react-router-dom";
const today = new Date().toISOString().split("T")[0];

export default function Calendar({ recipe, onClose }) {
  const [selectedTime, setSelectedTime] = useState("");

  const [selectedDate, setSelectedDate] = useState(today);
  const [bookedTimes, setBookedTimes] = useState({});
  const [hoveredBookedRecipe, setHoveredBookedRecipe] = useState("");
  const { bookedRecipes, refreshRecipes } = useRecipes();
  const navigate = useNavigate();
  const radius = 230;
  const diameter = radius * 2;

  // Function to calculate the position of each hour
  const calculatePosition = (hour, index, totalHours) => {
    const theta = ((2 * Math.PI) / totalHours) * index + Math.PI / 2;
    const x = radius + radius * Math.cos(theta);
    const y = radius + radius * Math.sin(theta);
    return { x, y };
  };

  useEffect(() => {
    const slots = bookedRecipes.reduce((acc, rec) => {
      const date = rec.start.split("T")[0];
      const time = rec.start.split("T")[1].substring(0, 5);
      const title = rec.title;
      const bookingInfo = { time, title };

      if (!acc[date]) {
        acc[date] = [bookingInfo];
      } else {
        acc[date].push(bookingInfo);
      }
      return acc;
    }, {});

    setBookedTimes(slots);
  }, [bookedRecipes]);

  const handleSelectTime = (time) => {
    setSelectedTime(time);
  };
  function to12HourFormat(time) {
    const [hours24, minutes] = time.split(":");

    const hours24Num = parseInt(hours24, 10);
    const minutesNum = parseInt(minutes, 10);

    const period = hours24Num >= 12 ? "PM" : "AM";

    const hours12Num = hours24Num % 12 || 12;

    const hours12 = hours12Num.toString().padStart(2, "0");
    const formattedMinutes = minutesNum.toString().padStart(2, "0");

    return `${hours12}:${formattedMinutes} ${period}`;
  }
  const { id } = useAuthContext();

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
  const generateUniqueId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  };
  function combineDateTime(date, time) {
    return `${date}T${time}:00.000Z`;
  }

  const handleRecipeSave = async (recipe) => {
    const newTime = { ...bookedTimes, [selectedDate]: selectedTime };
    setBookedTimes(newTime);

    const startDate = combineDateTime(selectedDate, selectedTime);

    try {
      await scheduleRecipes(
        {
          start: startDate,
          recipeId: recipe._id,
          title: recipe.name,
          id: generateUniqueId(),
        },
        id
      );
      // Refresh after the save is successful
      refreshRecipes();
    } catch (error) {
      console.error("Error saving the recipe:", error);
    }

    onClose();
  };
  console.log("booked", bookedRecipes);
  return (
    <div className="calendar-clock-container">
      <svg
        width={diameter}
        height={diameter}
        className="svg-bg"
        viewBox={`-50 -50 ${diameter + 100} ${diameter + 100}`}
      >
        {[...Array(24)].map((_, index) => {
          // For 24 hours
          const timeString = `${
            index.toString().length === 2 ? index : "0" + index
          }:00`;

          // Determine if this specific time is booked
          const isBooked =
            Array.isArray(bookedTimes[selectedDate]) &&
            bookedTimes[selectedDate].find(
              (booking) => booking.time === timeString
            );

          const booking =
            Array.isArray(bookedTimes[selectedDate]) &&
            bookedTimes[selectedDate]?.find(
              (booking) => booking.time === timeString
            );

          const { x, y } = calculatePosition(_, index, 24);
          return (
            <React.Fragment key={index}>
              <g
                className="circle-container"
                onMouseEnter={() =>
                  setHoveredBookedRecipe(booking ? booking.title : null)
                }
                onMouseLeave={() => setHoveredBookedRecipe(null)}
                onClick={() =>
                  handleSelectTime(
                    `${index.toString().length === 2 ? index : "0" + index}:00`
                  )
                }
              >
                <circle
                  className={`circle-sm ${isBooked ? "booked" : ""} ${
                    selectedTime === timeString ? "selected" : ""
                  }`}
                  cx={x}
                  cy={y}
                  r="20"
                />
                <text
                  x={x}
                  y={y}
                  fontSize="12"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  style={{
                    cursor: "pointer",
                    strokeWidth: 1,
                    fill: `${isBooked ? "black" : "white"}`,
                  }}
                  className="clock-hours"
                >
                  {`${index}:00`}
                </text>
              </g>
            </React.Fragment>
          );
        })}
      </svg>
      {hoveredBookedRecipe && (
        <div className="recipe-image-container">
          <img
            src={`/images/${hoveredBookedRecipe}.jpeg`}
            alt={hoveredBookedRecipe}
          />
        </div>
      )}
      <div className="info-container">
        <div>
          <input
            type="date"
            className="date-picker"
            defaultValue={today}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <div>
          <h4>
            Selected Time: {selectedTime ? to12HourFormat(selectedTime) : null}
          </h4>
        </div>
      </div>
      <button
        className="save-modal-btn"
        onClick={() => handleRecipeSave(recipe)}
      >
        Save
      </button>
    </div>
  );
}
