require("./src/config");
const router = require("./src/routes");

const express = require("express");

const app = express();

app.use(router);

module.exports = app;
