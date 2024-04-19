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

    const savedRecipes = user.savedRecipes;

    // generate JWT token
    const token = jwt.sign({ user, savedRecipes }, JWT_SECRET);
    res
      .status(200)
      .cookie("token", token, { http: true })
      .json({ payload, savedRecipes });
  } catch (err) {
    res.status(400).json({ err });
  }
});

////////////////////////////////
// FOR USER TO DELETE ACCOUNT //
////////////////////////////////
app.delete("/delete-user", jsonParser, async (req, res) => {
  const email = req.body.email;

  try {
    // Delete the user from the database using the user ID
    await User.findOneAndDelete({ email });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//////////////////////////////
// FOR USER TO SAVE RECIPES //
//////////////////////////////
app.post("/save-recipe", jsonParser, async (req, res) => {
  try {
    const { email, recipeId, title, imgUrl } = req.body;
    const user = await User.findOne({ email });
    user.savedRecipes.push({ recipeId, title, imgUrl });
    await user.save();
    res.status(200).json({ message: "Recipe saved successfully" });
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.status(500).json({ error: "Internal server error" });
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

////////////////////////////////////
// SEARCH BY ID VIA SAVED RECIPES //
////////////////////////////////////
app.post("/search-by-id", jsonParser, async (req, res) => {
  try {
    const id = req.body.id;
    console.log(id);
    const spoonIdURL = `https://api.spoonacular.com/recipes/${id}/information`;
    const response = await axios.get(spoonIdURL, {
      params: {
        apiKey: spoonApiKey,
        includeNutrition: true,
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
