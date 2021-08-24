const express = require("express");
const router = express.Router();
const { Chat } = require("../model/chat");

router.post("/saveChat", (req, res) => {
  const chat = new Chat(req.body);
  chat.save((err, info) => {
    if (err) return res.json({ success: false, err });
    return res.json({ success: true, info });
  });
});

router.get("/getChat", (req, res) => {
  Chat.find()
    .populate("writer")
    .exec((err, info) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.json({ success: true, info });
    });
});

module.exports = router;
