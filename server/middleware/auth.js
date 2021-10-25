const { User } = require("../model/user");

const auth = (req, res, next) => {
  // Bring a token from client
  const token = req.headers?.Authorization;

  // After decryption, find a user
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, err });

    // If there is a user, then Authenticate
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
