const constants = require("../constants");
const connection = require("../db").connection;
const Movie = require("../db").Movie;
const movies = require("../data");

//const Movie = require("../models/movie")(connection);

async function getMovies() {
    let a = connection.sync().then(() => Movie.findAll());
    return a;
}

const getMovieById = id => {
  return movies.find(movie => movie.id === id);
};

const getMoviesBySubstring = substring => {
  return movies.filter(movie => movie.title.includes(substring));
};

const getPagination = (offset, limit) => movies.slice(offset, offset + limit);

const sortMovies = (field, direction) => {
  const sortedMovies = movies.sort((a, b) => {
    if (a[field] > b[field]) return 1;
    if (a[field] < b[field]) return -1;
    return 0;
  });
  return direction === constants.DIRECTION_SORT_ASC
    ? sortedMovies
    : direction === constants.DIRECTION_SORT_DESC
      ? sortedMovies.reverse()
      : [];
};

module.exports = {
    getMovies,
    getMovieById,
    getMoviesBySubstring,
    getPagination,
    sortMovies
};
