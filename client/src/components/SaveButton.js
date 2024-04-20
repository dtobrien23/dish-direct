import React from "react";
import { useAppContext } from "../AppContext";

const SaveButton = (props) => {
  const { id, title, imgUrl } = props;
  const { isLoggedIn, userEmail, setSavedRecipes, toggleDropdown } =
    useAppContext();

  const handleSaveRecipe = async (id, title, imgUrl, e) => {
    e.stopPropagation();

    if (isLoggedIn) {
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
    } else {
      console.log("not logged in");
      toggleDropdown();
    }
  };

  return (
    <button
      onClick={(e) => {
        handleSaveRecipe(id, title, imgUrl, e);
      }}
      style={{
        padding: "3px 5px",
        backgroundColor: "#F1B723",
        cursor: "pointer",
        border: "1px solid black",
        fontWeight: "bold",
      }}
    >
      SAVE
    </button>
  );
};

export default SaveButton;
