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
  const cursor = req.query.cursor || "";
  try {
    const chatData = await Chat.find().populate("writer");
    const fromIndex =
      chatData.reverse().findIndex((chat) => chat.id === cursor) + 1;
    return res.status(200).json(chatData.slice(fromIndex, fromIndex + 6));
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/removeChat", async (req, res) => {
  try {
    await Chat.findByIdAndDelete({ _id: req.body.id });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
