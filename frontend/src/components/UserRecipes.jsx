import React, { useEffect, useRef, useState } from "react";
import "./styles/UserRecipes.css";
import { Draggable } from "@fullcalendar/interaction";

export default function UserRecipes({ userRecipes, onRecipeSelect }) {
  const scrollContentRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (scrollContentRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContentRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

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
  const scrollLeft = () => {
    if (scrollContentRef.current) {
      scrollContentRef.current.scrollLeft -=
        scrollContentRef.current.clientWidth;
      checkScrollPosition();
    }
  };

  const scrollRight = () => {
    console.log("going right");
    if (scrollContentRef.current) {
      scrollContentRef.current.scrollLeft +=
        scrollContentRef.current.clientWidth;
      checkScrollPosition();
    }
  };

  useEffect(() => {
    checkScrollPosition();

    const handleResize = () => {
      checkScrollPosition();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const handleRecipeClick = (id) => {
  //   console.log("recipe id", id);
  // };

  return (
    <>
      <h4 className="userrecipes-heading">Your recipes</h4>
      <div className="user-recipes" id="draggable-recipes">
        {canScrollLeft && (
          <div className="scroll-pointer left-pointer" onClick={scrollLeft}>
            &#9664;
          </div>
        )}
        <div
          className="scrollable-content"
          ref={scrollContentRef}
          onScroll={checkScrollPosition}
        >
          {userRecipes.map((recipe) => (
            <div
              key={recipe._id}
              title={recipe.recipeName}
              className="recipe-card"
              onClick={() => onRecipeSelect(recipe._id)}
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
        {canScrollRight && (
          <div className="scroll-pointer right-pointer" onClick={scrollRight}>
            &#9654;
          </div>
        )}
      </div>
    </>
  );
}
