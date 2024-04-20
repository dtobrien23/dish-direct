import React from "react";
import { useAppContext } from "../AppContext";
import Navbar from "../components/Navbar";
import RecipeContainer from "../components/RecipeContainer";
import "../App.css";

const RecipeList = () => {
  const { recipeData, recipesToShow, numOfRecipes } = useAppContext();
  return (
    <div className="page-container">
      <Navbar />
      {typeof recipeData.totalResults === "undefined" ||
      recipeData.totalResults === 0 ? (
        <p>Sorry! No recipes found</p>
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
