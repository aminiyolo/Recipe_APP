const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const PRIVATE_TOKEN = "nana";

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

userSchema.methods.giveToken = function (cb) {
  var user = this;
  // Using jsonwebtoken, create token
  let token = jwt.sign(user._id.toHexString(), PRIVATE_TOKEN);
  user.token = token;
  user.save((err, doc) => {
    if (err) {
      return cb(err);
    }
    cb(null, doc);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;
  // Decode a token
  jwt.verify(token, PRIVATE_TOKEN, function (err, decoded) {
    // Find a user using a id of user
    // Compare a token that is from client side with a token that is from database
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
