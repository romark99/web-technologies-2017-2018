const app = require('./app');
const constants = require("./src/constants");

const Sequelize = require("sequelize");
const connection = new Sequelize('dbmovies', 'phpmyadmin', '12345', {
    host: 'localhost',
    dialect: 'mysql'
});

const Movie = connection.define('movie', {
    vote_count: Sequelize.INTEGER,
    video: Sequelize.BOOLEAN,
    vote_average: Sequelize.FLOAT,
    title: Sequelize.STRING,
    popularity: Sequelize.FLOAT,
    poster_path: Sequelize.STRING,
    original_language: Sequelize.STRING,
    original_title: Sequelize.STRING,
    backdrop_path: Sequelize.STRING,
    adult: Sequelize.BOOLEAN,
    overview: Sequelize.TEXT,
    release_date: Sequelize.DATEONLY
});

connection.sync().then(() => {
    Movie.create({
        vote_count: 1311,
        id: 335983,
        video: false,
        vote_average: 6.6,
        title: "Venom",
        popularity: 473.089,
        poster_path: "/2uNW4WbgBXL25BAbXGLnLqX71Sw.jpg",
        original_language: "en",
        original_title: "Venom",
        backdrop_path: "/VuukZLgaCrho2Ar8Scl9HtV3yD.jpg",
        adult: false,
        overview: "When Eddie Brock acquires the powers of a symbiote, he will have to release his alter-ego “Venom” to save his life.",
        release_date: "2018-10-03"
    });
});

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
