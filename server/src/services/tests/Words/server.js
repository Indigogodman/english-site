const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const getter = require("./getterWords");
const checkAuth = require("./checkAuth");

const logger = require("../../../logger/tests/Words");

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const NAME = "ИГРА НА ЗАПОМИНАНИЕ СЛОВ";

const runner = async words => {
  const logic = require("./logic");
  wss.on("connection", ws => {
    ws.on("message", async response => {
      let message = JSON.parse(response);
      logger.info(`Полученно сообщение ${JSON.stringify(message)}`);
      if (Object.keys(words) && checkAuth(message)) {
        const resp = await logic(message, words, logger);
        if (resp) ws.send(resp);
      } else {
        logger.info("Пользователь не авторизован");
        ws.send(
          JSON.stringify({
            res: "jwt",
            type: "error"
          })
        );
        ws.close();
        return;
      }
    });
  });
  const PORT = process.env.PORT || 8999;
  try {
    await server.listen(PORT);
    logger.info(`Сервер "${NAME}" запущен на порту ${PORT}`);
  } catch (err) {
    logger.err(err.message);
  }
};

module.exports = async () => {
  const serverWords = await getter(logger);
  serverWords(runner);
};
