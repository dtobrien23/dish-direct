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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>{recipeData.results[randomIndex].title}</h1>
          <img src={recipeData.results[randomIndex].image} alt="Lovely food" />
        </div>
      )}
    </div>
  );
};

export default App;
