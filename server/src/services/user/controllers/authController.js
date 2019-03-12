const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../../models/user");
const logger = require("../../../logger/user");

const signUp = async (email, password, res) => {
  const user = new User({
    uniq: bcrypt.hashSync(email, 10),
    email,
    password: bcrypt.hashSync(password, 10)
  });
  logger.info(`Регистрация нового юзера ${email}`);
  try {
    await user.save();
    return signIn(email, password, user, res);
  } catch (err) {
    logger.err(
      `Произошла неизвестная ошибка при создании юзера ${err.message}`
    );
    res.status(500).json({
      error: {
        message: err.message
      }
    });
  }
};

const signIn = async (email, password, result, res) => {
  logger.info(`Юзер с email ${email} вошел в систему`);
  res.json({
    uniq: result.uniq,
    username: email,
    jwt: jwt.sign(
      {
        id: result.uniq
      },
      "hello",
      { expiresIn: 60 * 60 }
    )
  });
};

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await User.findOne({ email });
    if (result) {
      await signIn(email, password, result, res);
    } else {
      await signUp(email, password, res);
    }
    return;
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
