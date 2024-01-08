import React from "react";

export default function Macros({ droppedItems }) {
  console.log("drop", droppedItems);
  return (
    <>
      <div id="macros">
        <div className="circle">fats</div>
        <div className="circle">carbs</div>
        <div className="circle">protein</div>
      </div>
      <button className="submit">submit</button>
    </>
  );
}
