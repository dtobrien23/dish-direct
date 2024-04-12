import React from "react";
import Navbar from "./Navbar";
import RecipeContainer from "./RecipeContainer";
import { useAppContext } from "./AppContext";
import "./App.css";

const App = () => {
  const { recipeData } = useAppContext();

  return (
    <div>
      <Navbar />
      {typeof recipeData.totalResults === "undefined" ||
      recipeData.totalResults === 0 ? (
        <p>No recipe yet...</p>
      ) : (
        <RecipeContainer />
      )}
    </div>
  );
};

export default App;
