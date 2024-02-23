import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Autocomplete, LoadScript } from "@react-google-maps/api";
import "../styles/ModalShopping.css";

Modal.setAppElement("#root");
const libraries = ["places"];
export default function CustomShoppingModal({
  ingredient,
  isOpen,
  onRequestClose,
  onConfirm,
}) {
  const [address, setAddress] = useState("");
  const [autocomplete, setAutocomplete] = useState(null);
  //   const [address, setAddress] = useState("");

  const googleScriptUrl = `https://maps.googleapis.com/maps/api/js?key=${
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  }&libraries=places`;
  //

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      setAddress(autocomplete.getPlace().formatted_address);
      console.log(autocomplete.getPlace());
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const handleConfirm = () => {
    onConfirm();
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Prompt"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "400px",
            height: "400px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            textAlign: "center",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <div className="modal-input-delivery">
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <input
              placeholder="please enter delivery address"
              value={address}
              onChange={handleAddressChange}
            ></input>
          </Autocomplete>
        </div>
        {/* <div className="date-time-container">
        <label type="date">pick a date</label>
        <input></input>
        <label>pick a time</label>
        <input type="time"></input>
      </div> */}
        <div className="delivery-label">
          <label>delivery instructions:</label>{" "}
        </div>
        <textarea></textarea>
        <div className="modal-buttons">
          <button
            style={{
              width: "fit-content",
              height: "fit-content",
              padding: "10px 15px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={handleConfirm}
          >
            place order
          </button>
          <button
            style={{
              width: "fit-content",
              height: "fit-content",
              padding: "10px 15px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={onRequestClose}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </LoadScript>
  );
}
