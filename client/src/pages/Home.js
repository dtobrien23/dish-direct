import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import HomePageLink from "../components/HomePageLink";
import { useAppContext } from "../AppContext";

const Home = () => {
  const { setChosenRecipe } = useAppContext();

  const location = useLocation();

  // reset states when going back to Home page
  useEffect(() => {
    setChosenRecipe("");
  }, [location]);

  // lists of options on Home page
  const mealTypes = [
    "Breakfast",
    "Appetiser",
    "Main Course",
    "Side Dish",
    "Dessert",
    "Snack",
    "Drink",
  ];

  const cuisines = [
    "African",
    "Asian",
    "American",
    "British",
    "Cajun",
    "Caribbean",
    "Chinese",
    "Eastern European",
    "European",
    "French",
    "German",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Jewish",
    "Korean",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "Southern",
    "Spanish",
    "Thai",
    "Vietnamese",
  ];

  const diets = [
    "Vegetarian",
    "Vegan",
    "Gluten Free",
    "Keto",
    "Paleo",
    "Low FODMAP",
    "Whole30",
  ];

  const ingredients = [
    "Pasta",
    "Rice",
    "Potatoes",
    "Eggs",
    "Fish",
    "Chicken",
    "Beef",
  ];

  return (
    <div className="page-container">
      <Navbar />
      <div id="homepage-content-container">
        <div id="options-list-container">
          <div id="options-list-1" style={{ marginRight: "125px" }}>
            <h2>Meal Types</h2>
            {mealTypes.map((type) => (
              <>
                <HomePageLink searchTerm={type} queryType="type" />
                <br />
              </>
            ))}
            <h2>Diets</h2>
            {diets.map((diet) => (
              <>
                <HomePageLink searchTerm={diet} queryType="diet" />
                <br />
              </>
            ))}
            <h2>Includes</h2>
            {ingredients.map((ingredient) => (
              <>
                <HomePageLink
                  searchTerm={ingredient} // unsure if ingredient needs to be in an array or not, seems to be working without array
                  queryType="includeIngredients"
                />
                <br />
              </>
            ))}
          </div>
          <div id="options-list-2">
            <h2>Cuisines</h2>
            {cuisines.map((cuisine) => (
              <>
                <HomePageLink searchTerm={cuisine} queryType="cuisine" />
                <br />
              </>
            ))}
          </div>
        </div>
        <img
          src="../../images/bun-cha.jpeg"
          alt="Bun Cha"
          style={{ height: "500px" }}
        />
      </div>
    </div>
  );
};

export default Home;
