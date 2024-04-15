import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useAppContext } from "../AppContext";
import "../App.css";

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
    "Italian",
    "Mexican",
    "Chinese",
    "Thai",
    "Vietnamese",
    "American",
  ];

  const ingredients = ["Pasta", "Rice", "Potatoes", "Chicken", "Beef"];

  const diets = [
    "Vegetarian",
    "Vegan",
    "Gluten Free",
    "Keto",
    "Paleo",
    "Low FODMAP",
    "Whole30",
  ];

  return (
    <div>
      <Navbar />
      <div
        id="homepage-container"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "80px 200px",
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
            <h1>Meal Types</h1>
            {mealTypes.map((type) => (
              <>
                <Link
                  to="/recipes"
                  onClick={() => {
                    setSearchQuery(type);
                    handleSearch(type, "type");
                  }}
                >
                  {type}
                </Link>
                <br />
              </>
            ))}
            <h1>Cuisines</h1>
            {cuisines.map((cuisine) => (
              <>
                <Link
                  to="/recipes"
                  onClick={() => {
                    setSearchQuery(cuisine);
                    handleSearch(cuisine, "cuisine");
                  }}
                >
                  {cuisine}
                </Link>
                <br />
              </>
            ))}
          </div>
          <div id="options-list-2">
            <h1>Ingredients</h1>
            {ingredients.map((ingredient) => (
              <>
                <Link
                  to="/recipes"
                  onClick={() => {
                    setSearchQuery(ingredient);
                    handleSearch([ingredient], "includeIngredients");
                  }}
                >
                  {ingredient}
                </Link>
                <br />
              </>
            ))}
            <h1>Diets</h1>
            {diets.map((diet) => (
              <>
                <Link
                  to="/recipes"
                  onClick={() => {
                    setSearchQuery(diet);
                    handleSearch([diet], "diet");
                  }}
                >
                  {diet}
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
