import React, { useEffect } from "react";
import "./styles/UserRecipes.css";
import { Draggable } from "@fullcalendar/interaction";

export default function UserRecipes({ userRecipes }) {
  useEffect(() => {
    let draggableEl = document.getElementById("draggable-recipes");
    new Draggable(draggableEl, {
      itemSelector: ".recipe-card",
      eventData: function (eventEl) {
        let title = eventEl.getAttribute("title");
        return { title: title };
      },
    });
  }, [userRecipes]);
  return (
    <>
      <h4 className="userrecipes-heading">Your recipes</h4>
      <div className="user-recipes" id="draggable-recipes">
        {userRecipes.map((recipe) => (
          <div
            key={recipe._id}
            title={recipe.recipeName}
            className="recipe-card"
          >
            <div
              className="recipe-image"
              style={{
                backgroundImage: `url(http://localhost:1234/${recipe.image})`,
              }}
            ></div>
            <div className="recipe-info">
              <h4 className="recipe-name">{recipe.recipeName}</h4>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
