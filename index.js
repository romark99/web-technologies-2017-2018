const db = require('./src/db');
const app = require('./app');
const constants = require("./src/constants");
//const connection = require("./src/db");
//const Movie = require("./src/models/movie")(connection);


const server = app.listen(process.env.HTTP_PORT, function() {
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
