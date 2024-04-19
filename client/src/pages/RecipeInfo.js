import React from "react";
import Navbar from "../components/Navbar";
import SaveButton from "../components/SaveButton";
import { useAppContext } from "../AppContext";

const RecipeInfo = () => {
  const { chosenRecipe } = useAppContext();

  return (
    <div className="page-container">
      <Navbar />
      <div>
        {chosenRecipe ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "40px 200px",
              }}
            >
              <img
                src={chosenRecipe.image}
                alt="Lovely food"
                style={{ width: "333px" }}
              />
              <div style={{ marginLeft: "30px" }}>
                <h1>{chosenRecipe.title}</h1>
                <p>
                  {chosenRecipe.aggregateLikes === 1 ? (
                    <span>{chosenRecipe.aggregateLikes} like</span>
                  ) : (
                    <span>{chosenRecipe.aggregateLikes} likes</span>
                  )}
                  <span>{chosenRecipe.readyInMinutes} minutes</span>
                  {chosenRecipe.vegan === true && <span>Vegan</span>}
                  {chosenRecipe.vegetarian === true && <span>Vegetarian</span>}
                  {chosenRecipe.glutenFree === true && <span>Gluten-Free</span>}
                </p>
                <SaveButton />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                padding: "30px 200px",
                backgroundColor: "white",
                borderTop: "1px solid black",
              }}
            >
              <div style={{ minWidth: "333px" }}>
                <h2>Ingredients</h2>
                {chosenRecipe.extendedIngredients.map((ingredient) => (
                  <p>{ingredient.original}</p>
                ))}
              </div>
              <div style={{ marginLeft: "30px" }}>
                <h2>Steps</h2>
                {chosenRecipe.analyzedInstructions.map((instruction) => (
                  <>
                    {instruction.name !== "" && <h3>{instruction.name}</h3>}
                    {instruction.steps.map((step) => (
                      <p>
                        {step.number}
                        {". "}
                        {step.step}
                      </p>
                    ))}
                  </>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p>You haven't chosen a recipe!</p>
        )}
      </div>
    </div>
  );
};

export default RecipeInfo;
