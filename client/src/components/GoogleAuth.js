import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import dotenv from "dotenv";

dotenv.config();

const GoogleAuth = () => {
  const clientId = process.env.CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
