import React, { useState } from "react";
import CustomModal from "./modal/ModalAmount.jsx";

export default function Dropzone({ onDrop }) {
  const [droppedItem, setDroppedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedItem = e.dataTransfer.getData("text/plain");
    setDroppedItem(droppedItem);
    setIsModalOpen(true);
  };
  const handleModalConfirm = ({ amount, unit }) => {
    onDrop({ droppedItem, amount, unit });
    setIsModalOpen(false);
  };
  return (
    <button id="dropZone" onDragOver={handleDragOver} onDrop={handleDrop}>
      <p>Drag and drop desired ingredient here to build your recipe.</p>

      <CustomModal
        ingredient={droppedItem}
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
      />
    </button>
  );
}
