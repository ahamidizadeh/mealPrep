import React, { useState } from "react";
import CustomModal from "./modal/ModalAmount.jsx";

export default function Dropzone({ onDrop }) {
  const [item, setItem] = useState("drag ingredient here");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedItem = e.dataTransfer.getData("text/plain");
    setItem(droppedItem);
    setIsModalOpen(true);
  };
  const handleModalConfirm = ({ amount, unit }) => {
    onDrop({ item, amount, unit });
    setIsModalOpen(false);
  };
  return (
    <div id="dropZone" onDragOver={handleDragOver} onDrop={handleDrop}>
      {item}
      <CustomModal
        ingredient={item}
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
      />
    </div>
  );
}
