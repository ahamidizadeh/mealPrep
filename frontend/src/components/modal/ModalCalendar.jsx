import React, { useEffect } from "react";
import Modal from "react-modal";
import "../styles/ModalCalendar.css";
import Calendar from "../Calendar.jsx";
import CloseIcon from "@mui/icons-material/Close";

Modal.setAppElement("#root");

export default function CustomCalendarModal({
  isOpen,
  onRequestClose,
  recipe,
}) {
  const handleConfirmation = (date, time) => {
    console.log("date:", date, " time", time);
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="my-modal-overlay-class"
      className="my-calendar"
    >
      <>
        <CloseIcon className="cancel-btn" onClick={onRequestClose} />
        {recipe ? (
          <div className="recipe-card-sm">
            <img
              src={`../../public/images/${recipe.name}.jpeg`}
              alt="recipe"
            ></img>
            <h4>{recipe.name}</h4>
          </div>
        ) : null}
        <div className="calendar-container">
          <Calendar recipe={recipe} onConfirm={handleConfirmation} />
        </div>
      </>
    </Modal>
  );
}
