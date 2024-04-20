import React, { useEffect } from "react";
import { useAppContext } from "../AppContext";
import Navbar from "../components/Navbar";
import SavedRecipesContainer from "../components/SavedRecipesContainer";
import { useLocation } from "react-router-dom";

const SavedRecipes = () => {
  const { setSearchQuery } = useAppContext();

  const location = useLocation();

  useEffect(() => {
    setSearchQuery("");
  }, [location]);

  return (
    <div className="page-container">
      <Navbar />
      <SavedRecipesContainer />
    </div>
  );
};

export default SavedRecipes;
