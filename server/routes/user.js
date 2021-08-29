const express = require("express");
const router = express.Router();
const { User } = require("../model/user");
const { auth } = require("../middleware/auth");

router.post("/register", async (req, res) => {
  try {
    const data = await User.findOne({ email: req.body.email });
    // 이미 가입한 이메일인 경우
    if (data)
      return res
        .status(200)
        .json({ success: false, msg: " Already Exist Email" });

    const user = new User(req.body);
    await user.save();
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/login", (req, res) => {
  // Look for a requested ID in a database
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({ success: false, msg: "Doesn't Exist USER" });
    }
    // If there is a data that we look for, Check the password if corrected
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) {
        return res.json({ success: false, msg: err });
      }
      if (isMatch === false) {
        return res.json({ success: false, msg: "password is incorrect" });
      }
      // If the password is correct, Give a token
      user.giveToken((err, user) => {
        if (err) {
          return res.json({ success: false });
        }
        res
          .cookie("USER", user.token)
          .status(200)
          .json({ success: true, userId: user._id });
      });
    });
  });
});

router.get("/logout", auth, async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.user._id }, { token: "" });
    return res.status(200).json();
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/user", auth, (req, res) => {
  return res.json(req.user);
});

module.exports = router;
