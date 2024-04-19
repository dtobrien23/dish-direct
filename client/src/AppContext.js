import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [recipeData, setRecipeData] = useState([{}]);
  const [numOfRecipes, setNumOfRecipes] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [recipesToShow, setRecipesToShow] = useState(30);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Effect to add event listener when component mounts
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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

  ///////////////////////////////
  // HANDLING USER EMAIL STATE //
  ///////////////////////////////
  const getInitialUserEmailState = () => {
    const userEmail = sessionStorage.getItem("USER_EMAIL");
    return userEmail ? JSON.parse(userEmail) : null;
  };

  const [userEmail, setUserEmail] = useState(getInitialUserEmailState);

  useEffect(() => {
    sessionStorage.setItem("USER_EMAIL", JSON.stringify(userEmail || null));
  }, [userEmail]);

  //////////////////////////////////
  // HANDLING SAVED RECIPES STATE //
  //////////////////////////////////
  const getInitialSavedRecipesState = () => {
    const savedRecipes = sessionStorage.getItem("SAVED_RECIPES");
    return savedRecipes ? JSON.parse(savedRecipes) : [];
  };

  const [savedRecipes, setSavedRecipes] = useState(getInitialSavedRecipesState);

  useEffect(() => {
    sessionStorage.setItem("SAVED_RECIPES", JSON.stringify(savedRecipes || []));
  }, [savedRecipes]);

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
        savedRecipes,
        setSavedRecipes,
        toggleDropdown,
        dropdownRef,
        isDropdownOpen,
        setIsDropdownOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
