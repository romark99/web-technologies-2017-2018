const constants = require("../constants");
const connection = require("../db").connection;
const Movie = require("../db").Movie;
const Sequelize = require("sequelize");
const mongoose = require("mongoose");

const Op = Sequelize.Op;

const Movie2 = require('../models/movie2');

async function getMovies() {
    return await Movie2.find().exec();
    //return await connection.sync().then(() => Movie.findAll());
}

const postMovie = req => {
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
};

async function getMovieById(id) {
    return await Movie2.find({id}).exec();
  //return await connection.sync().then(() => Movie.findById(id));
}

async function getMoviesBySubstring(substring) {
    return await Movie2.find({title: {"$regex": substring, "$options": "i"}}).exec();
  // return await connection.sync().then(() =>
  //   Movie.findAll({
  //     where: {
  //       title: {
  //         [Op.like]: "%" + substring + "%"
  //       }
  //     }
  //   })
  // );
}

async function getPagination(offset, limit) {
    return await Movie2.paginate({}, {offset, limit}).then(pag => pag.docs);
  // return await connection.sync().then(() =>
  //   Movie.findAll({
  //     offset: offset,
  //     limit: limit
  //   })
  // );
  //movies.slice(offset, offset + limit);
}

async function sortMovies(field, direction) {
    if (
        direction !== constants.DIRECTION_SORT_ASC &&
        direction !== constants.DIRECTION_SORT_DESC
    ) {
        return [];
    } else {
        const direct = direction === constants.DIRECTION_SORT_ASC ? 1 : -1;
        let obj = {};
        obj[field] = direct;
        return await Movie2.find().sort(obj).exec();
    }
  // if (
  //   direction !== constants.DIRECTION_SORT_ASC &&
  //   direction !== constants.DIRECTION_SORT_DESC
  // ) {
  //   return [];
  // } else {
  //   return await connection.sync().then(() =>
  //     Movie.findAll({
  //       order: [[field, direction]]
  //     })
  //   );
  // }
}

module.exports = {
  getMovies,
  getMovieById,
  getMoviesBySubstring,
  getPagination,
  sortMovies,
    postMovie
};
