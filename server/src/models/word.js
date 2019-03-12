const mongoose = require("mongoose");

module.exports = mongoose.model(
  "word",
  new mongoose.Schema({ name: String, translate: String })
);
