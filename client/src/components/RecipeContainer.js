import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../AppContext";
import SaveButton from "./SaveButton";
import UnsaveButton from "./UnsaveButton";

const RecipeContainer = () => {
  const {
    recipeData,
    recipesToShow,
    setRecipesToShow,
    setChosenRecipe,
    savedRecipes,
  } = useAppContext();

  const handleLoadMore = () => {
    setRecipesToShow(recipesToShow + 30);
  };

  return (
    <div style={{ height: "100%" }}>
      {recipeData.results.slice(0, recipesToShow).map((recipe, index) => (
        <div
          key={recipe.id}
          style={{
            marginBottom: "20px",
            border: "1px solid black",
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
              {savedRecipes.find(
                (savedRecipe) => savedRecipe.recipeId === recipe.id
              ) ? (
                <UnsaveButton recipeId={recipe.id} />
              ) : (
                <SaveButton
                  id={recipe.id}
                  title={recipe.title}
                  imgUrl={recipe.image}
                />
              )}
            </div>
          </div>
        </div>
      ))}
      {recipeData.results.length > recipesToShow && (
        <button
          onClick={handleLoadMore}
          style={{
            marginTop: "30px",
            padding: "3px 5px",
            backgroundColor: "#F1B723",
            cursor: "pointer",
            border: "1px solid black",
            fontWeight: "bold",
          }}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default RecipeContainer;
