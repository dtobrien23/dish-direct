import React, { createContext, useState, useContext } from "react";

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [recipeData, setRecipeData] = useState([{}]);
  const [numOfRecipes, setNumOfRecipes] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [recipesToShow, setRecipesToShow] = useState(30);

  // searchQuery as a parameter to bypass asynchronous state variable updates
  const handleSearch = (searchQuery, param = "query") => {
    fetch("/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ [param]: searchQuery }),
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
        setRecipesToShow(30); // to reset after each new search
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
        recipesToShow,
        setRecipesToShow,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
