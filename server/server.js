const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser"); // needed to parse JSON data
const app = express();

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

require("dotenv").config({ path: "../.env" });

const spoonURL = "https://api.spoonacular.com/recipes/complexSearch";
const spoonApiKey = process.env.SPOON_API_KEY;
const jsonParser = bodyParser.json();

app.post("/google-auth", async (req, res) => {
  const { credential, client_id } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: client_id,
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    res.status(200).json({ payload });
  } catch (err) {
    res.status(400).json({ err });
  }
});

app.post("/search", jsonParser, async (req, res) => {
  try {
    const [queryType, searchQuery] = Object.entries(req.body)[0];

    // Make a request to the Spoonacular API using Axios
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

    // Send the response back to the client
    res.json(data);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "An error occurred while fetching recipes" });
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
