// Modal.js
import React, { useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the root element for accessibility

export default function CustomModal({
  ingredient,
  isOpen,
  onRequestClose,
  onConfirm,
}) {
  const [amount, setAmount] = React.useState(0);
  const [unit, setUnit] = React.useState("");
  const [message, setMessage] = React.useState("");

  useEffect(() => {
    if (isOpen) {
      setAmount(0);
      setUnit("");
      setMessage("");
    }
  }, [isOpen]);

  const handleConfirm = () => {
    if (amount !== 0 && unit.trim() !== "") {
      onConfirm({ amount, unit });
      onRequestClose();
    } else {
      setMessage("Please Enter correct amount to continue.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Prompt"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          width: "220px",
          height: "220px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "20px",
          textAlign: "center",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#333" }}>
        {ingredient ? ingredient.name : null}
      </h2>
      <label style={{ display: "block", marginBottom: "10px", color: "#555" }}>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Enter amount"
        />
      </label>
      <label style={{ display: "block", marginBottom: "10px", color: "#555" }}>
        Unit:
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          style={{ overflowY: "scroll" }}
        >
          <option value="">Choose</option>
          <option value="cup">Cup</option>
          <option value="lbs">lbs</option>
          <option value="Liter">Liter</option>
          <option value="unit">unit</option>
          <option value="grams">Gram</option>
          <option value="ounces">Ounces</option>
          <option value="teaspoon">Teaspoon</option>
          <option value="tablespoon">Tablespoon</option>
        </select>
      </label>
      <br />
      <button
        style={{
          background: "#4CAF50",
          color: "white",
          padding: "10px 15px",
          width: "fit-content",
          height: "fit-content",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          marginRight: "10px",
        }}
        onClick={handleConfirm}
      >
        OK
      </button>
      <button
        style={{
          width: "fit-content",
          height: "fit-content",
          background: "tomato",
          color: "white",
          padding: "10px 15px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        }}
        onClick={onRequestClose}
      >
        Cancel
      </button>
      {message && (
        <div style={{ color: "red", marginTop: "15px", fontSize: "12px" }}>
          {message}
        </div>
      )}
    </Modal>
  );
}
