const constants = require("../constants");
const connection = require("../db").connection;
const Movie = require("../db").Movie;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//const Movie = require("../models/movie")(connection);

async function getMovies() {
  return await connection.sync().then(() => Movie.findAll());
}

async function getMovieById(id) {
  return await connection.sync().then(() => Movie.findById(id));
}

async function getMoviesBySubstring(substring) {
  return await connection.sync().then(() =>
    Movie.findAll({
      where: {
        title: {
          [Op.like]: "%" + substring + "%"
        }
      }
    })
  );
}

async function getPagination(offset, limit) {
  return await connection.sync().then(() =>
    Movie.findAll({
      offset: offset,
      limit: limit
    })
  );
  //movies.slice(offset, offset + limit);
}

async function sortMovies(field, direction) {
  if (
    direction !== constants.DIRECTION_SORT_ASC &&
    direction !== constants.DIRECTION_SORT_DESC
  ) {
    return [];
  } else {
    return await connection.sync().then(() =>
      Movie.findAll({
        order: [[field, direction]]
      })
    );
  }
}

module.exports = {
  getMovies,
  getMovieById,
  getMoviesBySubstring,
  getPagination,
  sortMovies
};
