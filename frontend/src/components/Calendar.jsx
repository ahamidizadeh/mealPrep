import React, { useState } from "react";
import "./styles/Calendar.css";
export default function Calendar() {
  const [selectedTime, setSelectedTime] = useState("");
  const radius = 300; // Radius of the circle
  const diameter = radius * 2;
  const circumference = diameter * Math.PI;

  // Function to calculate the position of each hour
  const calculatePosition = (hour, index, totalHours) => {
    const theta = ((2 * Math.PI) / totalHours) * index; // Angle for the hour
    const x = radius + radius * Math.cos(theta);
    const y = radius + radius * Math.sin(theta);
    return { x, y };
  };

  // Function to handle time selection
  const handleSelectTime = (time) => {
    setSelectedTime(time);
  };

  return (
    <div className="calendar-clock-container">
      <svg
        width={diameter}
        height={diameter}
        className="svg-bg"
        viewBox={`-10 -10 ${diameter + 30} ${diameter + 30}`}
      >
        {[...Array(24)].map((_, index) => {
          // For 24 hours
          const { x, y } = calculatePosition(_, index, 24);
          return (
            <text
              key={index}
              x={x}
              y={y}
              fontSize="16"
              textAnchor="middle"
              alignmentBaseline="middle"
              style={{ cursor: "pointer" }}
              className="clock-hours"
              onClick={() => handleSelectTime(`${index}:00`)}
            >
              {`${index}:00`}
            </text>
          );
        })}
      </svg>
      <div className="info-container">
        <div>
          Date and Month:{" "}
          <input type="date" onChange={(e) => console.log(e.target.value)} />
        </div>
        <div>Selected Time: {selectedTime}</div>
      </div>
    </div>
  );
}
