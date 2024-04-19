import React, { createContext, useState, useContext, useEffect } from "react";

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [recipeData, setRecipeData] = useState([{}]);
  const [numOfRecipes, setNumOfRecipes] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [recipesToShow, setRecipesToShow] = useState(30);
  const [userEmail, setUserEmail] = useState(null);

  ///////////////////////////
  // HANDLING LOG IN STATE //
  ///////////////////////////
  const getInitialLoginState = () => {
    const loggedIn = sessionStorage.getItem("LOGGED_IN");
    return loggedIn === "true";
  };
  const [isLoggedIn, setIsLoggedIn] = useState(getInitialLoginState);

  useEffect(() => {
    sessionStorage.setItem("LOGGED_IN", JSON.stringify(isLoggedIn));
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  //////////////////////////////////
  // HANDLING CHOSEN RECIPE STATE //
  //////////////////////////////////
  const getInitialChosenRecipeState = () => {
    const chosenRecipe = sessionStorage.getItem("CHOSEN_RECIPE");
    return chosenRecipe ? JSON.parse(chosenRecipe) : null;
  };
  const [chosenRecipe, setChosenRecipe] = useState(getInitialChosenRecipeState);

  useEffect(() => {
    sessionStorage.setItem(
      "CHOSEN_RECIPE",
      JSON.stringify(chosenRecipe || null)
    );
  }, [chosenRecipe]);

  //////////////////////////////////////
  // RECIPE SEARCH QUERY POST REQUEST //
  //////////////////////////////////////

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
        chosenRecipe,
        setChosenRecipe,
        isLoggedIn,
        setIsLoggedIn,
        userEmail,
        setUserEmail,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
