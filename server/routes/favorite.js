const express = require("express");
const router = express.Router();
const { Favorite } = require("../model/favorite");

router.post("/favorited", (req, res) => {
  // Recipe를 favorite 리스트에 넣었는지 정보를 DB에서 가져오기

  Favorite.find({
    mealId: req.body.mealId,
    userFrom: req.body.userFrom,
  }).exec((err, info) => {
    if (err) return res.status(400).send(err);

    let result = false;
    if (info.length !== 0) {
      result = true;
    }

    res.status(200).json({ success: true, favorited: result });
  });
  // 프론트에 다시 정보 보내기
});

router.post("/removeFromFavorite", (req, res) => {
  Favorite.findOneAndDelete({
    mealId: req.body.mealId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true });
  });
});

router.post("/addToFavorite", (req, res) => {
  const favorite = new Favorite(req.body);
  favorite.save((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

router.post("/FavoritedMeal", (req, res) => {
  Favorite.find({ userFrom: req.body.userFrom }).exec((err, mealList) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, list: mealList });
  });
});

module.exports = router;
