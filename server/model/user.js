const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  ID: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 5,
  },
  image: String,
  token: {
    type: String,
  },
  isAuth: Boolean,
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
