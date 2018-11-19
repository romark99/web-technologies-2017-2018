const constants = require("../constants");
const connection = require("../db").connection;
const Movie = require("../db").Movie;
const Sequelize = require("sequelize");
const mongoose = require("mongoose");

const Op = Sequelize.Op;

const Movie2 = require('../models/movie2');

//const Movie = require("../models/movie")(connection);

async function getMovies() {

  return await connection.sync().then(() => Movie.findAll());
}

function postMovie(req) {
    const movie = new Movie2({
        _id: new mongoose.Types.ObjectId(),
        id: req.body.id,
        vote_count: req.body.vote_count,
        video: req.body.video,
        vote_average: req.body.vote_average,
        title: req.body.title,
        popularity: req.body.popularity,
        poster_path: req.body.poster_path,
        original_language: req.body.original_language,
        original_title: req.body.original_title,
        backdrop_path: req.body.backdrop_path,
        adult: req.body.adult,
        overview: req.body.overview,
        release_date: req.body.release_date
    });
    return movie;
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
  sortMovies,
    postMovie
};
