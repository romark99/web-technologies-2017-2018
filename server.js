require("./src/config")();
const constants = require("./src/constants");
const router = require("./src/routes")();

const express = require("express");

const app = express();

app.use(router);

app.listen(process.env.HTTP_PORT, function() {
  console.log(constants.API_APP_STARTED);
});
