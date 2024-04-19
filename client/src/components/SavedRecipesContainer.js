import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../AppContext";
import SaveButton from "./SaveButton";

const SavedRecipeContainer = () => {
  const { recipeData, setChosenRecipe, savedRecipes } = useAppContext();

  return (
    <>
      {savedRecipes.map((recipe, index) => (
        <div
          key={recipe.id}
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
                setChosenRecipe(recipe);
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

              <SaveButton
                id={recipe.id}
                title={recipe.title}
                imgUrl={recipe.image}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SavedRecipeContainer;
