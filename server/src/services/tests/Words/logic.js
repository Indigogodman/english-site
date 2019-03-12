const { randomInt } = require("../../../utils/random");
const Statistics = require("../../../models/statistic");

const getNextWord = (words, logger) => {
  const keys = Object.keys(words);
  const number = [];
  while (number.length < 4) {
    const random = randomInt(1, keys.length) - 1;

    if (!number.includes(random)) {
      number.push(random);
    }
  }

  const needRandom = randomInt(1, 4) - 1;
  const res = {
    title: keys[number[needRandom]],
    valueMayBe: number.map(num => words[keys[num]])
  };
  logger.info(`Отправлен следующий вопрос ${JSON.stringify(res)}`);
  return JSON.stringify({
    res,
    type: "question"
  });
};

const getAnswer = (res, words, logger) => {
  if (res && res.value && res.title && words[res.title] === res.value) {
    logger.info(`Ответ верный ${words[res.title]} == ${res.value}`);
    return JSON.stringify({
      res: "ok",
      type: "res"
    });
  } else {
    logger.info(`Ответ неверный ${words[res.title]} !== ${res.value}`);
    return JSON.stringify({
      res: "not",
      type: "res"
    });
  }
};

const saveStatistic = async (res, logger) => {
  const { game, points, user, time } = res;
  const statistic = new Statistics({
    game,
    points,
    user,
    time,
    date: new Date()
  });

  try {
    await statistic.save();
  } catch (err) {
    logger.info(
      `Статистика не сохранена ${JSON.stringify({
        err: err.message
      })}`
    );
  }
};

module.exports = async ({ type, res }, words, logger) => {
  switch (type) {
    case "getNextWord":
      return getNextWord(words, logger);
    case "getAnswer":
      return getAnswer(res, words, logger);
    case "saveStatistic":
      return await saveStatistic(res, logger);
    default:
      break;
  }
};
