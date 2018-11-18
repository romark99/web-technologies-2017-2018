const Sequelize = require("sequelize");

const getModel = connection => {
  return connection.define("movie", {
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
};

module.exports = getModel;
