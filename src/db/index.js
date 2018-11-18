const data = require("../data");
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



/**
 * Filling up db with data.
 */
connection.sync({
    force: true
}).then(() => {
    data.forEach((elem) => Movie.create(elem));
}).catch(error => console.log(error));



module.exports = {connection, Movie};