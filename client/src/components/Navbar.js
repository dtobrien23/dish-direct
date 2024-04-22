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
    userEmail,
    setUserEmail,
    setSavedRecipes,
    toggleDropdown,
    dropdownRef,
    isDropdownOpen,
  } = useAppContext();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail(null);
    setSavedRecipes([]);
  };

  const handleAccountDeletion = async () => {
    try {
      const res = await fetch("/delete-user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Account deleted:", data);
        handleLogout();
      } else {
        console.error("Account deletion failed:", res.statusText);
      }
    } catch (error) {
      console.error("Error during account deletion:", error);
    }
  };

  return (
    <>
      <div
        style={{
          minHeight: "30px",
          backgroundColor: "#940000",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <div
          style={{
            minHeight: "100%",
            display: "flex",
            flexDirection: "row",
            margin: "0px 250px",
            color: "white",
          }}
        >
          {isLoggedIn && (
            <>
              <Link to="/saved-recipes" style={{ textDecoration: "none" }}>
                <button className="navbar-btn">Saved Recipes</button>
              </Link>
              <div style={{ margin: "0px 5px" }}>|</div>
            </>
          )}
          <div className="dropdown" ref={dropdownRef}>
            <button className="navbar-btn" onClick={toggleDropdown}>
              {isLoggedIn ? "My Account" : "Sign In"}
            </button>

            {isDropdownOpen && (
              <div className="dropdown-content">
                {isLoggedIn ? (
                  <>
                    <button
                      onClick={handleLogout}
                      style={{
                        fontSize: "16px",
                        color: "black",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Log Out
                    </button>
                    <button
                      onClick={handleAccountDeletion}
                      style={{
                        marginTop: "5px",
                        fontSize: "16px",
                        color: "red",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Delete Account
                    </button>
                  </>
                ) : (
                  <>
                    <p
                      style={{
                        width: "208px", // to prevent resizing after sign in with Google finds linked account
                        color: "black",
                        margin: "0px 0px 10px 0px",
                      }}
                    >
                      Sign in with Google to save recipes for later!
                    </p>
                    <GoogleAuth />
                  </>
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
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            margin: "0px 250px",
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
                style={{ height: "45px", marginRight: "48px" }}
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
                  fontWeight: "bold",
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
