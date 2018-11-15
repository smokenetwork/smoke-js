const api = require("./api");
const auth = require("./auth");
const broadcast = require("./broadcast");
const config = require("./config");
const formatter = require("./formatter")(api);
const utils = require("./utils");

const smoke = {
  api,
  auth,
  broadcast,
  config,
  formatter,
  utils
};

if (typeof window !== "undefined") {
  window.smoke = smoke;
}

if (typeof global !== "undefined") {
  global.smoke = smoke;
}

exports = module.exports = smoke;
