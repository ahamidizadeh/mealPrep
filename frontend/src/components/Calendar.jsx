// Calendar.jsx
import React from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "./styles/Calendar.css";

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const events = [
    // Your events data goes here
  ];

  const onEventDrop = (event) => {
    // Handle event drop, update your data or make API calls here
    console.log("Event dropped:", event);
  };
  //   const customCalendarStyles = {
  //     width: "500px",
  //     color: "#7a3d1f",
  //     border: "none",
  //   };

  return (
    <div className="calendar-container">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        resizable
        // style={customCalendarStyles}
        onEventDrop={onEventDrop}
      />
    </div>
  );
};

export default Calendar;
