import React, { useEffect } from "react";
import { useAppContext } from "../AppContext";
import Navbar from "../components/Navbar";
import SavedRecipesContainer from "../components/SavedRecipesContainer";
import { useLocation } from "react-router-dom";

const SavedRecipes = () => {
  const { setSearchQuery, isLoggedIn, savedRecipes } = useAppContext();

  const location = useLocation();

  useEffect(() => {
    setSearchQuery("");
  }, [location]);

  return (
    <div className="page-container">
      <Navbar />
      <div
        style={{
          height: "100%",
          margin: "40px 250px 80px 250px",
        }}
      >
        {isLoggedIn === false ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <p style={{ fontWeight: "bold", fontSize: "24px" }}>
              Log in to view saved recipes.
            </p>
          </div>
        ) : (
          <>
            {savedRecipes.length !== 0 ? (
              <SavedRecipesContainer />
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p style={{ fontWeight: "bold", fontSize: "24px" }}>
                  No recipes saved yet!
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SavedRecipes;
