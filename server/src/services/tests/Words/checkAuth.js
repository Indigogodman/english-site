const jwttoken = require("jsonwebtoken");

module.exports = ({ jwt }) => {
  try {
    jwttoken.verify(jwt, "hello");
    return true;
  } catch (err) {
    return false;
  }
};
