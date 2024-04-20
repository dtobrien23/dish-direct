import React from "react";
import { useAppContext } from "../AppContext";

const UnsaveButton = (props) => {
  const { recipeId } = props;
  const { userEmail, setSavedRecipes } = useAppContext();

  const handleUnsaveRecipe = async (recipeId) => {
    try {
      const res = await fetch("/unsave-recipe", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          recipeId: recipeId,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setSavedRecipes((prevSavedRecipes) =>
          prevSavedRecipes.filter((recipe) => recipe.recipeId !== recipeId)
        );
      } else {
        console.error("Recipe unsave failed:", res.statusText);
      }
    } catch (error) {
      console.error("Error during recipe unsave:", error);
    }
  };

  return (
    <button
      onClick={() => {
        handleUnsaveRecipe(recipeId);
      }}
      style={{
        padding: "3px 5px",
        color: "white",
        backgroundColor: "#940000",
        cursor: "pointer",
        border: "1px solid black",
        fontWeight: "bold",
      }}
    >
      UNSAVE
    </button>
  );
};

export default UnsaveButton;
