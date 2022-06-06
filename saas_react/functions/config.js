const functions = require("firebase-functions");
const fs = require("fs");

let config = functions.config().env;

if (
  process.env.NODE_ENV !== "production" &&
  fs.existsSync("../functions.env.json")
) {
  const env = require("../functions.env.json");

  config = env;

  const sandboxServer = env.EMAIL.SANDBOX_POSTMARK_SERVER;
  if (sandboxServer && sandboxServer !== "") {
    config.EMAIL.POSTMARK_SERVER = sandboxServer;
  }
}

module.exports = config;
