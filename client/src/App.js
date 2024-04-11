import React from "react";
import Navbar from "./Navbar";
import { useAppContext } from "./AppContext";

const App = () => {
  const { recipeData, randomIndex } = useAppContext();

  return (
    <div>
      <Navbar />
      {typeof recipeData.totalResults === "undefined" ||
      recipeData.totalResults === 0 ? (
        <p>No recipe yet...</p>
      ) : (
        <div>
          <p>{recipeData.results[randomIndex].title}</p>
          <img src={recipeData.results[randomIndex].image} alt="Lovely food" />
        </div>
      )}
    </div>
  );
};

export default App;
