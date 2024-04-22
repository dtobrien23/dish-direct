import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../AppContext";
import UnsaveButton from "./UnsaveButton";

const SavedRecipeContainer = () => {
  const { setChosenRecipe, savedRecipes } = useAppContext();

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
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {savedRecipes.map((recipe) => (
        <div
          key={recipe.recipeId}
          style={{
            height: "300px",
            width: "250px",
            marginBottom: "30px",
            border: "1px solid black",
            padding: "20px",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
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
                style={{ width: "100%", marginBottom: "10px" }}
              />
            </Link>
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
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
                <h3 style={{ margin: 0 }}>{recipe.title}</h3>
              </Link>

              <UnsaveButton recipeId={recipe.recipeId} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedRecipeContainer;
