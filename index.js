const app = require("./app");
const constants = require("./src/constants");
const mongoose = require("mongoose");

mongoose.connect("mongodb://romark:" + process.env.MONGO_ATLAS_PW + "@node-rest-movies-shard-00-00-kasbq.mongodb.net:27017,node-rest-movies-shard-00-01-kasbq.mongodb.net:27017,node-rest-movies-shard-00-02-kasbq.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-movies-shard-0&authSource=admin&retryWrites=true",
    {useNewUrlParser: true}
);

const server = app.listen(process.env.PORT || process.env.HTTP_PORT, function() {
  console.log(constants.API_APP_STARTED);
});

function gracefulShutdown() {
  console.info(constants.TERMINATION_SIGNAL_RECIEVED);
  console.log(constants.CLOSING_SERVER);
  server.close(() => {
    console.log(constants.SERVER_CLOSED);
    process.exit(0);
  });
}

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
