import React from "react";
import { useAppContext } from "../AppContext";

const SaveButton = (props) => {
  const { id, title, imgUrl } = props;
  const { userEmail, setSavedRecipes } = useAppContext();

  const handleSaveRecipe = async (id, title, imgUrl) => {
    try {
      const res = await fetch("/save-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          recipeId: id,
          title: title,
          imgUrl: imgUrl,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setSavedRecipes((prevSavedRecipes) => {
          return [
            ...prevSavedRecipes,
            { recipeId: id, title: title, imgUrl, imgUrl },
          ];
        });
      } else {
        console.error("Recipe save failed:", res.statusText);
      }
    } catch (error) {
      console.error("Error during recipe save:", error);
    }
  };

  return (
    <button
      onClick={() => {
        handleSaveRecipe(id, title, imgUrl);
      }}
    >
      SAVE
    </button>
  );
};

export default SaveButton;
