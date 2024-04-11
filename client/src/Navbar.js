import React from "react";
import { useAppContext } from "./AppContext";

const Navbar = () => {
  const { searchQuery, setSearchQuery, handleSearch } = useAppContext();

  return (
    <div
      style={{
        height: "100px",
        backgroundColor: "#F5F5F5",
        borderBottom: "1px solid black",
      }}
    >
      <div
        style={{
          margin: "0px 200px 0px 200px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1
          style={{
            fontFamily: "Libre Bodoni",
            fontSize: "40px",
            color: "#940000",
          }}
        >
          dishDirect
        </h1>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSearch();
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
