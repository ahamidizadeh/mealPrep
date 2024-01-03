import React, { useState } from "react";

export default function Dropzone() {
  const [item, setItem] = useState("drag ingredient here");

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedItem = e.dataTransfer.getData("text/plain");
    console.log("this", droppedItem);
  };

  return (
    <div id="dropZone" onDragOver={handleDragOver} onDrop={handleDrop}>
      {item}
    </div>
  );
}
