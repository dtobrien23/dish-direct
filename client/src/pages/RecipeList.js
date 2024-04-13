import React from "react";
import { useAppContext } from "../AppContext";
import Navbar from "../components/Navbar";
import RecipeContainer from "../components/RecipeContainer";
import "../App.css";

const RecipeList = () => {
  const { recipeData } = useAppContext();
  return (
    <div>
      <Navbar />
      {typeof recipeData.totalResults === "undefined" ||
      recipeData.totalResults === 0 ? (
        <p>Sorry! No recipe found</p>
      ) : (
        <RecipeContainer />
      )}
    </div>
  );
};

export default RecipeList;
