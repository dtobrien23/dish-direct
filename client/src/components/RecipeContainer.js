import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../AppContext";

const RecipeContainer = () => {
  const {
    recipeData,
    numOfRecipes,
    recipesToShow,
    setRecipesToShow,
    setChosenRecipe,
  } = useAppContext();

  const handleLoadMore = () => {
    setRecipesToShow(recipesToShow + 30);
  };

  return (
    <div style={{ margin: "40px 200px 80px 200px" }}>
      <p>
        Showing 1 to{" "}
        {recipesToShow < numOfRecipes ? recipesToShow : numOfRecipes} of{" "}
        {numOfRecipes} results
      </p>
      {recipeData.results.slice(0, recipesToShow).map((recipe, index) => (
        <div
          key={recipe.id}
          style={{
            borderBottom:
              index !== recipeData.results.length - 1
                ? "1px solid black"
                : "none",
            padding: "20px",
            backgroundColor: "white",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Link
              to="/recipe-info"
              onClick={() => {
                setChosenRecipe(recipe);
              }}
              style={{ textDecoration: "none" }}
            >
              <img
                src={recipe.image}
                alt="Lovely food"
                style={{ height: "120px" }}
              />
            </Link>
            <div style={{ margin: "10px 0px 0px 20px" }}>
              <Link
                to="/recipe-info"
                onClick={() => {
                  setChosenRecipe(recipe);
                }}
                style={{ textDecoration: "none", color: "black" }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#940000";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "black";
                }}
              >
                <h1 style={{ margin: 0 }}>{recipe.title}</h1>
              </Link>
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
