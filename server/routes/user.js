const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const { User } = require("../model/user");
const { auth } = require("../middleware/auth");

router.post("/register", async (req, res) => {
  try {
    const data = await User.findOne({ email: req.body.email });

    // If email has been ever used for registering
    if (data) {
      return res.status(200).json({
        success: false,
        msg: " Already Used Email, please use another Email",
      });
    }

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString(),
      ID: req.body.ID,
      image: req.body.image,
    });

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
      return res.status(400).json("Doesn't Exist USER");
    }

    // If there is a data that we look for, Check the password if corrected
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    );

    const decryptedPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (decryptedPassword !== req.body.password) {
      return res.status(400).json("Wrong Password");
    }

    // If the password is correct, Give a token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.PRIVATE_TOKEN,
      { expiresIn: "1h" }
    );

    await User.findOneAndUpdate({ _id: user._id }, { token });

    const { password, ID, email, ...others } = user._doc;
    res.status(200).json({ ...others, token });
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

module.exports = router;
