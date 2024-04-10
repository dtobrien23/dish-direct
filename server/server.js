const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser"); // needed to parse JSON data
const app = express();

require("dotenv").config({ path: "../.env" });

const spoonURL = "https://api.spoonacular.com/recipes/complexSearch";
const spoonApiKey = process.env.SPOON_API_KEY;
const jsonParser = bodyParser.json();

app.post("/search", jsonParser, async (req, res) => {
  try {
    const searchQuery = req.body.query;
    console.log("hellooooo", searchQuery);
    // Make a request to the Spoonacular API using Axios
    const response = await axios.get(spoonURL, {
      params: {
        apiKey: spoonApiKey,
        query: searchQuery,
        maxFat: 25,
        number: 100,
      },
    });
    const data = response.data;

    // Send the response back to the client
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "An error occurred while fetching recipes" });
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
