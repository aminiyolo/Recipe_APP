const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const { User } = require("../model/user");
const { auth } = require("../middleware/auth");

router.post("/register", async (req, res) => {
  try {
    const data = await User.findOne({ email: req.body.email });
    // If email has been ever used for registering
    if (data) {
      return res
        .status(200)
        .json({ success: false, msg: " Already Exist Email" });
    }

    // If not, continue
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      ID: req.body.ID,
      image: req.body.image,
    });

    // const user = new User(req.body);
    await user.save();
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    // Look for a requested ID in a database
    const user = await User.findOne({ ID: req.body.ID });
    if (!user) {
      return res.json({ success: false, msg: "Doesn't Exist USER" });
    }
    // If there is a data that we look for, Check the password if corrected
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    !validPassword && res.json({ msg: "password is incorrect" });
    // If the password is correct, Give a token
    await user.giveToken((err, user) => {
      res
        .cookie("USER", user.token)
        .status(200)
        .json({ success: true, userId: user._id });
    });
  } catch (err) {
    res.status(400).json(err);
  }
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
