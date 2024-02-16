import React, { useState } from "react";
import RecipeItem from "./RecipeItem";
export default function Recipes({ recipes, onHover }) {
  const [hoverTimeOut, setHoverTimeout] = useState(null);
  const italianFoods = recipes.filter((r) => r.tags.includes("Italian"));

  const chunkArray = (arr, chunkSize) => {
    let result = [];

    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }

    return result;
  };
  const listItalian = chunkArray(italianFoods, 4);
  const handleHover = (recipe) => {
    if (hoverTimeOut) clearTimeout(hoverTimeOut);

    const newTimeout = setTimeout(() => {
      onHover(recipe);
    }, 500);

    setHoverTimeout(newTimeout);
  };

  const handleMouseLeave = () => {
    // Clear the timeout when the mouse leaves to prevent the delayed action from firing
    if (hoverTimeOut) clearTimeout(hoverTimeOut);
  };
  return (
    <div className="main-recipes">
      <div className="category-food">
        <section>
          <div className="header-recipe-row">
            <h1>Italian</h1>
          </div>
          <div className="recipes-lobby">
            {listItalian.map((group, i) => (
              <ul className="list-recipe" key={i}>
                {group.map((recipe, i) => (
                  <li
                    onMouseEnter={() => handleHover(recipe)}
                    onMouseLeave={handleMouseLeave}
                    key={i}
                  >
                    <RecipeItem hoverTime={hoverTimeOut} recipe={recipe} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </section>
      </div>
      <div className="category-food">
        <section>
          <div className="header-recipe-row">
            <h1>Italian</h1>
          </div>
          <div className="recipes-lobby">
            {listItalian.map((group, i) => (
              <ul className="list-recipe" key={i}>
                {group.map((recipe, i) => (
                  <li
                    onMouseEnter={() => handleHover(recipe)}
                    onMouseLeave={handleMouseLeave}
                    key={i}
                  >
                    <RecipeItem hoverTime={hoverTimeOut} recipe={recipe} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </section>
      </div>
      <div className="category-food">
        <section>
          <div className="header-recipe-row">
            <h1>Italian</h1>
          </div>
          <div className="recipes-lobby">
            {listItalian.map((group, i) => (
              <ul className="list-recipe" key={i}>
                {group.map((recipe, i) => (
                  <li
                    onMouseEnter={() => handleHover(recipe)}
                    onMouseLeave={handleMouseLeave}
                    key={i}
                  >
                    <RecipeItem hoverTime={hoverTimeOut} recipe={recipe} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </section>
      </div>
      {/* <div className="category-food">
        <section>
          <div>
            <h1>medicinal foods</h1>
          </div>
          <div className="recipes-lobby">
            <ul>
              <div className="recipe-item">
                <div className="card-name">spaghetti bolognese</div>
                <div>
                  <img
                    className="image-recipe"
                    src="../../public/images/spaghetti.jepeg.webp"
                  ></img>
                </div>
              </div>
            </ul>
            <ul>
              <div className="recipe-item">
                <div className="card-name">spaghetti bolognese</div>
                <div>
                  <img
                    className="image-recipe"
                    src="../../public/images/spaghetti.jepeg.webp"
                  ></img>
                </div>
              </div>
            </ul>
            <ul>
              <div className="recipe-item">
                <div className="card-name">spaghetti bolognese</div>
                <div>
                  <img
                    className="image-recipe"
                    src="../../public/images/spaghetti.jepeg.webp"
                  ></img>
                </div>
              </div>
            </ul>
            <ul>
              <div className="recipe-item">
                <div className="card-name">spaghetti bolognese</div>
                <div>
                  <img
                    className="image-recipe"
                    src="../../public/images/spaghetti.jepeg.webp"
                  ></img>
                </div>
              </div>
            </ul>
          </div>
        </section>
      </div>
      <div className="category-food">
        <section>
          <div>
            <h1>medicinal foods</h1>
          </div>
          <div className="recipes-lobby">
            <ul>
              <div className="recipe-item">
                <div className="card-name">spaghetti bolognese</div>
                <div>
                  <img
                    className="image-recipe"
                    src="../../public/images/spaghetti.jepeg.webp"
                  ></img>
                </div>
              </div>
            </ul>
            <ul>
              <div className="recipe-item">
                <div className="card-name">spaghetti bolognese</div>
                <div>
                  <img
                    className="image-recipe"
                    src="../../public/images/spaghetti.jepeg.webp"
                  ></img>
                </div>
              </div>
            </ul>
            <ul>
              <div className="recipe-item">
                <div className="card-name">spaghetti bolognese</div>
                <div>
                  <img
                    className="image-recipe"
                    src="../../public/images/spaghetti.jepeg.webp"
                  ></img>
                </div>
              </div>
            </ul>
            <ul>
              <div className="recipe-item">
                <div className="card-name">spaghetti bolognese</div>
                <div>
                  <img
                    className="image-recipe"
                    src="../../public/images/spaghetti.jepeg.webp"
                  ></img>
                </div>
              </div>
            </ul>
          </div>
        </section>
      </div>
      <div className="category-food">
        <section>
          <div>
            <h1>medicinal foods</h1>
          </div>
          <div className="recipes-lobby">
            <ul>pizza</ul>
            <ul>cake</ul>
            <ul>soup</ul>
            <ul>lasagnia</ul>
          </div>
        </section>
      </div> */}
    </div>
  );
}
