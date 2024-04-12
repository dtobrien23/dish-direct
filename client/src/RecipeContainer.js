import React from "react";
import { useAppContext } from "./AppContext";

const RecipeContainer = () => {
  const { recipeData } = useAppContext();

  return (
    <div>
      {recipeData.results.map((recipe) => (
        <div
          key={recipe.id}
          style={{
            border: "1px solid black",
            margin: "40px 200px",
            backgroundColor: "white",
          }}
        >
          <h1>{recipe.title}</h1>
          <img src={recipe.image} alt="Lovely food" />
        </div>
      ))}
    </div>
  );
};

export default RecipeContainer;
