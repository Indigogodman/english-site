const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const logger = require("../../logger/user");
const authController = require("./controllers/authController");
const statisticController = require("./controllers/statisticController");

const PORT = 4000;
const NAME = "Сервер пользователей";

app.use(cors());
app.use(bodyParser.json());
app.use("/api", require("./middlewares/auth.js"), statisticController);
app.use("/", authController);
app.get("*", (req, res) => res.status(404).send("Not Found"));

module.exports = {
  app,
  creater: async () => {
    await mongoose.connect(`mongodb://localhost:27017/english-site`, {
      useNewUrlParser: true
    });
    logger.info(`Сервер "${NAME}" запущен на порту ${PORT}`);
    app.listen(PORT);
  }
};
