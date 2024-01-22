// // Calendar.jsx
// import React, { useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import "./styles/Calendar.css";

// const AppCalendar = ({ droppedRecipes, onRecipeRecieve }) => {
//   // const handleDrop = (dropInfo) => {
//   //   console.log("dropped");
//   //   console.log("dropped item:", dropInfo.event);
//   // };
//   const handleEventReceive = (info) => {
//     console.log("Received event:", info.event);

//     // const receivedEvent = {
//     //   title: info.draggedEl.title,
//     //   start: info.start,
//     //   end: info.end,
//     // };
//     // // ... other properties
//     // onRecipeRecieve(receivedEvent);
//   };

//   // const handleDateClick = () => {
//   //   console.log("clicking dates");
//   // };

//   // return (
//   //   <div className="calendar-container">
//   //     <FullCalendar
//   //       headerToolbar={{
//   //         left: "prev,next today",
//   //         center: "title",
//   //         right: "dayGridMonth,timeGridWeek,timeGridDay",
//   //       }}
//   //       dateClick={handleDateClick}
//   //       plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin]}
//   //       initialView="dayGridMonth"
//   //       droppable={true}
//   //       editable={true}
//   //       selectable={true}
//   //       selectMirror={true}
//   //       events={droppedRecipes}
//   //       drop={() => {
//   //         console.log("dropping");
//   //       }}
//   //       eventReceive={() => handleEventReceive()}
//   //     />
//   //   </div>
// //   );
// // };

// export default AppCalendar;
