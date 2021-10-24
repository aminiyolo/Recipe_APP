const { User } = require("../model/user");

let auth = (req, res, next) => {
  // Bring a token from client
  // console.log(req.headers.cookie?.slice(5));
  console.log(req.headers);
  // let token = req.cookies.USER;
  console.log(req.headers.cookie);
  let token = req.headers.cookie?.slice(5);
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
