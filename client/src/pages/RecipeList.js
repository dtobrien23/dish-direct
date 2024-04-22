import React from "react";
import { useAppContext } from "../AppContext";
import Navbar from "../components/Navbar";
import RecipeContainer from "../components/RecipeContainer";
import "../App.css";

const RecipeList = () => {
  const {
    searchQuery,
    areRecipesLoading,
    recipeData,
    recipesToShow,
    numOfRecipes,
  } = useAppContext();
  return (
    <div className="page-container">
      <Navbar />
      {typeof recipeData.totalResults === "undefined" ||
      recipeData.totalResults === 0 ? (
        <div
          style={{
            margin: "40px 250px 80px 250px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <p style={{ fontWeight: "bold", fontSize: "24px" }}>
            {areRecipesLoading === true
              ? "Fetching recipes..."
              : `Sorry! No results found. Please update your search term.`}
          </p>
        </div>
      ) : (
        <div style={{ margin: "40px 250px 80px 250px" }}>
          <p>
            Showing 1 to{" "}
            {recipesToShow < numOfRecipes ? recipesToShow : numOfRecipes} of{" "}
            {numOfRecipes} results
          </p>
          <RecipeContainer />
        </div>
      )}
    </div>
  );
};

export default RecipeList;
