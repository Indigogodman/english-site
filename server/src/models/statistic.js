const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Statistic",
  new mongoose.Schema({
    game: Number,
    points: Number,
    user: String,
    time: String,
    date: Date
  })
);
