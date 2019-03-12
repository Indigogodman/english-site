const services = [
  require("./src/services/user/server").creater,
  require("./src/services/tests/Words/server")
];
/**
 * Запускает все сервисы
 */
services.map(async service => service());
