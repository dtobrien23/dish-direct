import React from "react";
import Navbar from "../components/Navbar";
import { useAppContext } from "../AppContext";

const RecipeInfo = () => {
  const { chosenRecipe } = useAppContext();

  return (
    <>
      <Navbar />
      <h1>{chosenRecipe.title}</h1>
    </>
  );
};

export default RecipeInfo;
