import React from "react";

export default function FatsCarbs() {
  return (
    <div>hello</div>
    // <div id="carbs">
    //   {" "}
    //   {displayedIngredients.length > 0 ? (
    //     displayedIngredients.map((ingredient) => (
    //       <img
    //         key={ingredient._id}
    //         src={ingredient.imageURL}
    //         id="ingredient-image"
    //       />
    //     ))
    //   ) : (
    //     <p>pending...</p>
    //   )}
    //   <div id="pagination">
    //     <button
    //       onClick={() =>
    //         setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
    //       }
    //       disabled={currentPage === 1}
    //     >
    //       prev
    //     </button>
    //     <span>{currentPage}</span>
    //     <button
    //       onClick={() =>
    //         setCurrentPage((prevPage) =>
    //           Math.min(prevPage + 1, Math.ceil(ingredients.length / pageSize))
    //         )
    //       }
    //       disabled={currentPage === Math.ceil(ingredients.length / pageSize)}
    //     >
    //       next
    //     </button>
    //   </div>
    // </div>
  );
}
