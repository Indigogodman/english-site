const express = require("express");
const router = express.Router();
const Statistic = require("../../../models/statistic");
const logger = require("../../../logger/user");

router.post("/statistic", async (req, res) => {
  const { user, game } = req.body;
  try {
    const result = await Statistic.find(
      { user, game },
      ["points", "time", "date"],
      {
        sort: {
          date: -1
        }
      }
    );
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(200).json([]);
    }
  } catch (err) {
    logger.err(`Произошла неизвестная ошибка ${err.message}`);
    res.status(500).json({
      error: {
        message: err.message
      }
    });
  }
});

module.exports = router;
