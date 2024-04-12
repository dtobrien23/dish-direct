import React, { useState } from "react";
import { useAppContext } from "./AppContext";

const RecipeContainer = () => {
  const { recipeData, numOfRecipes, recipesToShow, setRecipesToShow } =
    useAppContext();

  const handleLoadMore = () => {
    setRecipesToShow(recipesToShow + 30);
  };

  return (
    <div style={{ margin: "40px 200px" }}>
      <p>
        Showing 1 to{" "}
        {recipesToShow < numOfRecipes ? recipesToShow : numOfRecipes} of{" "}
        {numOfRecipes} results
      </p>
      {recipeData.results.slice(0, recipesToShow).map((recipe) => (
        <div
          key={recipe.id}
          style={{
            border: "1px solid black",
            margin: "20px 0px",
            padding: "20px",
            backgroundColor: "white",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img
              src={recipe.image}
              alt="Lovely food"
              style={{ height: "120px" }}
            />
            <div style={{ margin: "10px 0px 0px 20px" }}>
              <h1 style={{ margin: 0 }}>{recipe.title}</h1>
              <p>
                {recipe.aggregateLikes === 1 ? (
                  <span>{recipe.aggregateLikes} like</span>
                ) : (
                  <span>{recipe.aggregateLikes} likes</span>
                )}
                <span>{recipe.readyInMinutes} minutes</span>
                {recipe.vegan === true && <span>Vegan</span>}
                {recipe.vegetarian === true && <span>Vegetarian</span>}
                {recipe.glutenFree === true && <span>Gluten-Free</span>}
              </p>
            </div>
          </div>
        </div>
      ))}
      {recipeData.results.length > recipesToShow && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
};

export default RecipeContainer;
