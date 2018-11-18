const constants = require("../constants");
const connection = require("../db").connection;
const Movie = require("../db").Movie;
const movies = require("../data");
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
    return await connection.sync().then(() => Movie.findAll({
        where: {
            title: {
                [Op.like]: '%'+substring+'%'
            }
        }
    }))
}

async function getPagination(offset, limit) {
    return await connection.sync()
        .then(() => Movie.findAll({
        offset: offset,
        limit: limit
    }
    ));
    //movies.slice(offset, offset + limit);
}


async function sortMovies(field, direction) {
    if (direction !== constants.DIRECTION_SORT_ASC && direction !== constants.DIRECTION_SORT_DESC) {
        return [];
    }
    else {
        return await connection.sync()
            .then(() => Movie.findAll({
                    order: [
                        [field, direction]
                    ]
                }
            ));
    }
  // const sortedMovies = movies.sort((a, b) => {
  //   if (a[field] > b[field]) return 1;
  //   if (a[field] < b[field]) return -1;
  //   return 0;
  // });
  // return direction === constants.DIRECTION_SORT_ASC
  //   ? sortedMovies
  //   : direction === constants.DIRECTION_SORT_DESC
  //     ? sortedMovies.reverse()
  //     : [];
}

module.exports = {
    getMovies,
    getMovieById,
    getMoviesBySubstring,
    getPagination,
    sortMovies
};
