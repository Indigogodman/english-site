const User = require("../models/user");

module.exports = async () => await User.deleteOne({ email: "test@test.ru" });
