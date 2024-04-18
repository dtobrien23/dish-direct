import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext";
import GoogleAuth from "./GoogleAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const {
    searchQuery,
    setSearchQuery,
    handleSearch,
    isLoggedIn,
    setIsLoggedIn,
  } = useAppContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
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

  return (
    <>
      <div style={{ height: "30px", backgroundColor: "#940000" }}>
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "row",
            margin: "0px 200px",
            alignItems: "center",
            justifyContent: "flex-end",
            color: "white",
          }}
        >
          <div className="dropdown" ref={dropdownRef}>
            {isLoggedIn ? (
              <button className="dropbtn">Account</button>
            ) : (
              <button className="dropbtn" onClick={toggleDropdown}>
                Log In
              </button>
            )}

            {isDropdownOpen && (
              <div className="dropdown-content">
                {isLoggedIn ? (
                  <button onClick={handleLogout}>Log Out</button>
                ) : (
                  <GoogleAuth />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          minHeight: "100px",
          width: "100%",
          backgroundColor: "white",
          borderBottom: "1px solid black",
        }}
      >
        <div
          style={{
            height: "100%",
            margin: "0px 200px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Link to="/" style={{ textDecoration: "none" }}>
              <img
                src="../../images/dish-direct.png"
                alt="Logo"
                style={{ height: "45px" }}
              />
            </Link>
          </div>
          <div>
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
      </div>
    </>
  );
};

export default Navbar;
