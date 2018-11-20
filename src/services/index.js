require("../db");
const constants = require("../constants");
const mongoose = require("mongoose");

const Movie = require('../models/movie');

async function getMovies() {
    return await Movie.find().exec();
}

const postMovie = req => {
    const movie = new Movie({
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
    return await Movie.find({id}).exec();
}

async function getMoviesBySubstring(substring) {
    return await Movie.find({title: {"$regex": substring, "$options": "i"}}).exec();
}

async function getPagination(offset, limit) {
    return await Movie.paginate({}, {offset, limit}).then(pag => pag.docs);
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
        return await Movie.find().sort(obj).exec();
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
