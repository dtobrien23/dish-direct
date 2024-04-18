require("dotenv").config({ path: "../.env" });
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser"); // needed to parse JSON data
const User = require("./models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { OAuth2Client } = require("google-auth-library");

const app = express();

const client = new OAuth2Client();
const JWT_SECRET = process.env.JWT_SECRET;

const spoonURL = "https://api.spoonacular.com/recipes/complexSearch";
const spoonApiKey = process.env.SPOON_API_KEY;
const jsonParser = bodyParser.json();

///////////////////
// CONNECT TO DB //
///////////////////
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

///////////////////////////////
// AUTHENTICATE USER SIGN IN //
///////////////////////////////
app.post("/google-auth", jsonParser, async (req, res) => {
  const { credential, client_id } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: client_id,
    });
    const payload = ticket.getPayload();
    const { email, given_name, family_name } = payload;

    // check if user exists in database
    let user = await User.findOne({ email });
    if (!user) {
      // create user if they do not exist
      user = await User.create({
        email,
        name: `${given_name} ${family_name}`,
        authSource: "google",
      });
    }

    // generate JWT token
    const token = jwt.sign({ user }, JWT_SECRET);
    res.status(200).cookie("token", token, { http: true }).json({ payload });
  } catch (err) {
    res.status(400).json({ err });
  }
});

///////////////////////////////////////////////////
// CARRY OUT RECIPE SEARCH WITH SPOONTACULAR API //
///////////////////////////////////////////////////
app.post("/search", jsonParser, async (req, res) => {
  try {
    const [queryType, searchQuery] = Object.entries(req.body)[0];

    const response = await axios.get(spoonURL, {
      params: {
        apiKey: spoonApiKey,
        [queryType]: searchQuery,
        addRecipeInformation: true,
        addRecipeInstructions: true,
        addRecipeNutrition: true,
        fillIngredients: true,
        number: 100,
      },
    });
    const data = response.data;

    res.json(data);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "An error occurred while fetching recipes" });
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
