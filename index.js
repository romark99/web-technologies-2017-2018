const app = require('./app');
const constants = require("./src/constants");

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