import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useAppContext } from "../AppContext";

const Home = () => {
  const { setSearchQuery, handleSearch } = useAppContext();

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
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <div
        id="homepage-container"
        style={{
          flex: "1", // to fill up remaining vertical space beneath navbar
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0px 200px",
        }}
      >
        <div
          id="options-list-container"
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div id="options-list-1" style={{ marginRight: "125px" }}>
            <h2>Meal Types</h2>
            {mealTypes.map((type) => (
              <>
                <Link
                  to="/recipes"
                  onClick={() => {
                    setSearchQuery(type);
                    handleSearch(type, "type");
                  }}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {type}
                </Link>
                <br />
              </>
            ))}
            <h2>Diets</h2>
            {diets.map((diet) => (
              <>
                <Link
                  to="/recipes"
                  onClick={() => {
                    setSearchQuery(diet);
                    handleSearch([diet], "diet");
                  }}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {diet}
                </Link>
                <br />
              </>
            ))}
            <h2>Includes</h2>
            {ingredients.map((ingredient) => (
              <>
                <Link
                  to="/recipes"
                  onClick={() => {
                    setSearchQuery(ingredient);
                    handleSearch([ingredient], "includeIngredients");
                  }}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {ingredient}
                </Link>
                <br />
              </>
            ))}
          </div>
          <div id="options-list-2">
            <h2>Cuisines</h2>
            {cuisines.map((cuisine) => (
              <>
                <Link
                  to="/recipes"
                  onClick={() => {
                    setSearchQuery(cuisine);
                    handleSearch(cuisine, "cuisine");
                  }}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {cuisine}
                </Link>
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
