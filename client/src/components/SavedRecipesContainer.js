import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../AppContext";
import UnsaveButton from "./UnsaveButton";

const SavedRecipeContainer = () => {
  const { recipeData, setChosenRecipe, savedRecipes } = useAppContext();

  const handleSavedRecipeSelection = (id) => {
    console.log(id);
    fetch("/search-by-id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setChosenRecipe(data);
        console.log(data);
      });
  };

  return (
    <>
      {savedRecipes.map((recipe, index) => (
        <div
          key={recipe.recipeId}
          style={{
            borderBottom:
              index !== savedRecipes.length - 1 ? "1px solid black" : "none",
            padding: "20px",
            backgroundColor: "white",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Link
              to="/recipe-info"
              onClick={() => {
                handleSavedRecipeSelection(recipe.recipeId); // leads to error - need to make a new Spoonacular API call with recipe ID
              }}
              style={{ textDecoration: "none" }}
            >
              <img
                src={recipe.imgUrl}
                alt="Lovely food"
                style={{ height: "120px" }}
              />
            </Link>
            <div style={{ margin: "10px 0px 0px 20px" }}>
              <Link
                to="/recipe-info"
                onClick={() => {
                  handleSavedRecipeSelection(recipe.recipeId); // leads to error - need to make a new Spoonacular API call with recipe ID
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

              <UnsaveButton recipeId={recipe.recipeId} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SavedRecipeContainer;
