import React, { useState, useEffect } from "react";
import "./styles/IngredientsDetails.css";
import RemoveCircleOutlineSharpIcon from "@mui/icons-material/RemoveCircleOutlineSharp";
import CustomShoppingModal from "./modal/ModalShopping";
import CustomCalendarModal from "./modal/ModalCalendar";

export default function List({ deleteItem, list }) {
  const [items, setItems] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setItems(list);
  }, [list]);
  const handleDelete = (index) => {
    deleteItem(index);
  };
  const handleDecreaseAmount = (index) => {
    setItems((items) =>
      items.map((item) =>
        items.indexOf(item) === index
          ? { ...item, amount: Math.max(0, item.amount - 1) }
          : item
      )
    );
  };

  const handleIncreaseAmount = (index) => {
    setItems((items) =>
      items.map((item) =>
        items.indexOf(item) === index
          ? { ...item, amount: item.amount + 1 }
          : item
      )
    );
  };
  const handleShopping = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleGettingDoordash = () => {
    console.log("getting door dash");
  };
  return (
    <div className="shopping-list-container">
      <h1>shopping list</h1>
      <ul className="item-wrapper">
        {items
          ? items.map((item, i) => (
              <li className="item-list" key={i}>
                <div>{item.name}</div>
                <div className="item-amount-container">
                  <button onClick={() => handleDecreaseAmount(i)}>-</button>
                  <div>
                    {item.amount}-{item.unit}
                  </div>
                  <button onClick={() => handleIncreaseAmount(i)}>+</button>
                </div>
                <RemoveCircleOutlineSharpIcon
                  className="delete-icon"
                  style={{ color: "red" }}
                  onClick={() => handleDelete(i)}
                />
              </li>
            ))
          : null}
      </ul>
      <button className="save-shopping-btn" onClick={handleShopping}>
        shop
      </button>
      {modalOpen ? (
        <CustomShoppingModal
          isOpen={modalOpen}
          onRequestClose={handleModalClose}
          onConfirm={handleGettingDoordash}
        />
      ) : null}
    </div>
  );
}
