import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useAppContext } from "../AppContext";

const GoogleAuth = () => {
  const { setIsLoggedIn, setUserEmail, setSavedRecipes, toggleDropdown } =
    useAppContext();

  const clientId = process.env.REACT_APP_CLIENT_ID;

  const handleLoginSuccess = async (response) => {
    try {
      console.log(response.credential, clientId);
      // Send the authentication response to your backend
      const res = await fetch("/google-auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credential: response.credential,
          client_id: clientId,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("User authenticated:", data);
        setIsLoggedIn(true);
        console.log(data);
        setUserEmail(data.payload.email);
        setSavedRecipes(data.savedRecipes);
        toggleDropdown();
      } else {
        console.error("Authentication failed:", res.statusText);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Login failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        clientId={clientId}
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
        buttonText="Login with Google"
        cookiePolicy={"single_host_origin"}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
