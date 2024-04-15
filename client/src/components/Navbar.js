import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, handleSearch } = useAppContext();

  return (
    <div
      style={{
        height: "100px",
        backgroundColor: "white",
        borderBottom: "1px solid black",
      }}
    >
      <div
        style={{
          margin: "0px 200px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1
            style={{
              fontFamily: "Libre Bodoni",
              fontSize: "40px",
              color: "#940000",
              cursor: "pointer",
            }}
          >
            dishDirect
          </h1>
        </Link>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSearch(searchQuery);
            navigate("/recipes");
          }}
          style={{
            display: "flex",
            flexDirection: "row",
            height: "40px",
            border: "1px solid black",
          }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => {
              event.preventDefault();
              setSearchQuery(event.target.value);
            }}
            placeholder="Ingredient, dish, keyword..."
            style={{
              height: "100%",
              width: "300px",
              outline: "none",
              padding: "0 10px 0 10px",
              border: "none",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />
          <button
            type="submit"
            style={{
              height: "100%",
              backgroundColor: "#F1B723",
              border: "none",
              boxSizing: "border-box",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
