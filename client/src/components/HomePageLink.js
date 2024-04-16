import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../AppContext";

const HomePageLink = (props) => {
  const { searchTerm, queryType } = props;
  const { setSearchQuery, handleSearch } = useAppContext();

  return (
    <Link
      to="/recipes"
      onClick={() => {
        setSearchQuery(searchTerm);
        handleSearch(searchTerm, queryType);
      }}
      className={"home-page-link"}
      onMouseEnter={(e) => {
        e.target.style.borderColor = "black";
      }}
      onMouseLeave={(e) => {
        e.target.style.borderColor = "transparent";
      }}
    >
      {searchTerm}
    </Link>
  );
};

export default HomePageLink;
