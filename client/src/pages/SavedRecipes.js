import React from "react";
import { useAppContext } from "../AppContext";
import Navbar from "../components/Navbar";
import SavedRecipesContainer from "../components/SavedRecipesContainer";

const SavedRecipes = () => {
  return (
    <div className="page-container">
      <Navbar />
      <SavedRecipesContainer />
    </div>
  );
};

export default SavedRecipes;
