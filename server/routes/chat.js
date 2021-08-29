const express = require("express");
const router = express.Router();
const { Chat } = require("../model/chat");

router.post("/saveChat", async (req, res) => {
  try {
    const chat = new Chat(req.body);
    const chatData = await chat.save();
    return res.json(chatData);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/getChat", async (req, res) => {
  try {
    const chatData = await Chat.find().populate("writer");
    return res.status(200).json(chatData);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
