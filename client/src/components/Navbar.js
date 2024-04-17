import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useAppContext } from "../AppContext";
import GoogleAuth from "./GoogleAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, handleSearch } = useAppContext();

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
          <GoogleAuth />
          <button
            style={{
              border: "none",
              backgroundColor: "#940000",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Sign In
          </button>
          |
          <button
            style={{
              border: "none",
              backgroundColor: "#940000",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Register
          </button>
        </div>
      </div>
      <div
        style={{
          height: "100px",
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
