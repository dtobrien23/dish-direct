import React, { useEffect, useState } from "react";

function App() {
  const [recipeData, setRecipeData] = useState([{}]);

  const randomIndex = Math.floor(Math.random() * 100);

  function handleClick() {
    fetch("/get-recipe")
      .then((response) => response.json())
      .then((data) => {
        setRecipeData(data);
        console.log(data);
      });
  }

  return (
    <div>
      <button onClick={handleClick}>Click me for a pasta recipe!</button>
      {typeof recipeData.number === "undefined" ? (
        <p>No recipe yet...</p>
      ) : (
        <div>
          <p>{recipeData.results[randomIndex].title}</p>
          <img
            src={recipeData.results[randomIndex].image}
            alt="Lovely fooooood"
          />
        </div>
      )}
    </div>
  );
}

export default App;
