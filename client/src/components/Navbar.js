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
  } = useAppContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState();
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
              {isLoggedIn ? "My Account" : "Log In"}
            </button>

            {isDropdownOpen && (
              <div className="dropdown-content">
                {isLoggedIn ? (
                  <>
                    <button onClick={handleLogout}>Log Out</button>
                    <button onClick={handleAccountDeletion}>
                      Delete Account
                    </button>
                  </>
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
