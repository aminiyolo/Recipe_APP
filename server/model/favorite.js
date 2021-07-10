const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
  userFrom: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  mealId: {
    type: String,
  },
  mealTitle: {
    type: String,
  },
  mealImage: {
    type: String,
  },
});

const Favorite = mongoose.model("Favorite", favoriteSchema);
module.exports = { Favorite };
