import React, { createContext, useState, useContext } from "react";

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [recipeData, setRecipeData] = useState([{}]);
  const [numOfRecipes, setNumOfRecipes] = useState();
  const [searchQuery, setSearchQuery] = useState("");

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
            ? setNumOfRecipes(data.totalResults)
            : setNumOfRecipes(data.number);
        }
      });
  };

  return (
    <AppContext.Provider
      value={{
        recipeData,
        setRecipeData,
        numOfRecipes,
        searchQuery,
        setSearchQuery,
        handleSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
