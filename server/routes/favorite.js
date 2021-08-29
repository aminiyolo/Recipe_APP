const express = require("express");
const router = express.Router();
const { Favorite } = require("../model/favorite");

router.post("/favorited", async (req, res) => {
  try {
    const info = await Favorite.find({
      // Recipe를 favorite 리스트에 넣었는지 정보를 DB에서 가져오기
      mealId: req.body.mealId,
      userFrom: req.body.userFrom,
    });

    let result = false;
    if (info.length !== 0) {
      result = true;
    }

    return res.status(200).json(result); // 프론트에 다시 정보 보내기
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/removeFromFavorite", async (req, res) => {
  try {
    await Favorite.findOneAndDelete({
      mealId: req.body.mealId,
      userFrom: req.body.userFrom,
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/addToFavorite", async (req, res) => {
  try {
    const favorite = new Favorite(req.body);
    await favorite.save();
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/FavoritedMeal", async (req, res) => {
  try {
    const list = await Favorite.find({ userFrom: req.body.userFrom });
    return res.status(200).json(list);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
