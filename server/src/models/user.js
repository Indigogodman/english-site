const mongoose = require("mongoose");

module.exports = mongoose.model(
  "user",
  new mongoose.Schema({ uniq: String, email: String, password: String })
);
