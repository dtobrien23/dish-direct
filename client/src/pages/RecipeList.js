import React from "react";
import { useAppContext } from "../AppContext";
import Navbar from "../components/Navbar";
import RecipeContainer from "../components/RecipeContainer";
import "../App.css";

const RecipeList = () => {
  const { recipeData } = useAppContext();
  return (
    <div className="page-container">
      <Navbar />
      {typeof recipeData.totalResults === "undefined" ||
      recipeData.totalResults === 0 ? (
        <p>Sorry! No recipes found</p>
      ) : (
        <RecipeContainer />
      )}
    </div>
  );
};

export default RecipeList;
