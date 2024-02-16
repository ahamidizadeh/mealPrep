import React, { useState } from "react";
import "./styles/Calendar.css";
import { useAuthContext } from "../AuthContext.jsx";

const today = new Date().toISOString().split("T")[0];

export default function Calendar({ recipe }) {
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [selectedDate, setSelectedDate] = useState(today);
  const radius = 200; // Radius of the circle
  const diameter = radius * 2;

  // Function to calculate the position of each hour
  const calculatePosition = (hour, index, totalHours) => {
    const theta = ((2 * Math.PI) / totalHours) * index + Math.PI / 2; // Angle for the hour
    const x = radius + radius * Math.cos(theta);
    const y = radius + radius * Math.sin(theta);
    return { x, y };
  };

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
  const handleRecipeSave = (recipe) => {
    const startDate = combineDateTime(selectedDate, selectedTime);

    scheduleRecipes(
      {
        start: startDate,
        recipeId: recipe._id,
        title: recipe.name,
        id: generateUniqueId(),
      },
      id
    );
  };
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
          const { x, y } = calculatePosition(_, index, 24);
          return (
            <React.Fragment>
              <g
                className="circle-container"
                onClick={() =>
                  handleSelectTime(
                    `${index.toString().length === 2 ? index : "0" + index}:00`
                  )
                }
                key={index}
              >
                <circle className="circle-sm" cx={x} cy={y} r="20" />
                <text
                  key={index}
                  x={x}
                  y={y}
                  fontSize="14"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  style={{ cursor: "pointer" }}
                  className="clock-hours"
                >
                  {`${index}:00`}
                </text>
              </g>
            </React.Fragment>
          );
        })}
      </svg>
      <div className="info-container">
        <div>
          Date and Month:{" "}
          <input
            type="date"
            defaultValue={today}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <div>Selected Time: {to12HourFormat(selectedTime)}</div>
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
