import React, { createContext, useState, useContext } from "react";

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [recipeData, setRecipeData] = useState([{}]);
  const [searchQuery, setSearchQuery] = useState("");
  const [randomIndex, setRandomIndex] = useState();

  const handleSearch = () => {
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
  };

  return (
    <AppContext.Provider
      value={{
        recipeData,
        setRecipeData,
        searchQuery,
        setSearchQuery,
        randomIndex,
        setRandomIndex,
        handleSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
