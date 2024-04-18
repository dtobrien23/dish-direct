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
});

module.exports = mongoose.model("User", userSchema);
