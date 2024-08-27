const serverless = require("serverless-http");
const app = require("../index.js"); // Adjust the path if necessary

module.exports.handler = serverless(app);
