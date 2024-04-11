import React from "react";
import { useAppContext } from "./AppContext";

const Navbar = () => {
  const { searchQuery, setSearchQuery, handleSearch } = useAppContext();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSearch();
      }}
    >
      <input
        type="text"
        value={searchQuery}
        onChange={(event) => {
          event.preventDefault();
          setSearchQuery(event.target.value);
        }}
        placeholder="Enter the type of food you want a recipe for..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Navbar;
