const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    required: true,
    unique: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  password: {
    required: false,
    type: String,
  },
  authSource: {
    enum: ["self", "google"],
    default: "self",
    type: String,
  },
  savedRecipes: {
    type: [
      {
        recipeId: {
          type: Number,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        imgUrl: {
          type: String,
          required: true,
        },
      },
    ],
    default: [], // Initialize savedRecipes as an empty array
  },
});

module.exports = mongoose.model("User", userSchema);
