const Word = require("../../../models/word");
const mongoose = require("mongoose");

module.exports = async logger => {
  await mongoose.connect(`mongodb://localhost:27017/english-site`, {
    useNewUrlParser: true
  });
  return async run => {
    const words = await Word.find({})
      .lean()
      .exec();
    logger.info(`Количество полученных слов ${words.length}`);
    const res = {};
    words.forEach(x => {
      res[x.title] = x.translate;
    });
    run(res);
  };
};
