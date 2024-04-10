import React, { useState } from "react";

function App() {
  const [recipeData, setRecipeData] = useState([{}]);
  const [searchQuery, setSearchQuery] = useState("");
  const [randomIndex, setRandomIndex] = useState();

  function handleSearch() {
    // prevents default form submission behaviour
    console.log(searchQuery);
    fetch("/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: searchQuery }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRecipeData(data);
        console.log(data);
        {
          data.number > data.totalResults
            ? setRandomIndex(Math.floor(Math.random() * data.totalResults))
            : setRandomIndex(Math.floor(Math.random() * data.number));
        }
      });
  }

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSearch();
        }}
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => {
            event.preventDefault();
            setSearchQuery(event.target.value);
          }}
          placeholder="Enter the type of food you want a recipe for..."
        />
        <button type="submit">Search</button>
      </form>
      {typeof recipeData.number === "undefined" ? (
        <p>No recipe yet...</p>
      ) : (
        <div>
          <p>{recipeData.results[randomIndex].title}</p>
          <img src={recipeData.results[randomIndex].image} alt="Lovely food" />
        </div>
      )}
    </div>
  );
}

export default App;
