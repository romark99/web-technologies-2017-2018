const data = require("../data");
const Sequelize = require("sequelize");


const mongoose = require("mongoose");

mongoose.connect("mongodb://romark:" + process.env.MONGO_ATLAS_PW + "@node-rest-movies-shard-00-00-kasbq.mongodb.net:27017,node-rest-movies-shard-00-01-kasbq.mongodb.net:27017,node-rest-movies-shard-00-02-kasbq.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-movies-shard-0&authSource=admin&retryWrites=true",
    {useNewUrlParser: true}
);

const Movie2 = require("../models/movie2");

/**
 * Filling up Mongo database with data.
 */
Movie2.count().then(length => {
  if (!(length > 0)) {
      data.forEach(elem => {
        Object.assign(elem, {_id: new mongoose.Types.ObjectId()});
        const movie = new Movie2(elem);
          movie
              .save()
              .then(result => {
                  console.log(result);
              })
              .catch(err => console.log(err));
      });
  }
});


const connection = new Sequelize("dbmovies", "phpmyadmin", "12345", {
  host: "localhost",
  dialect: "mysql"
});

const Movie = connection.define("movie", {
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
connection.sync().then(() => {
  Movie.findAll()
    .then(movies => movies.length)
    .then(length => {
      if (!(length > 0)) {
        data.forEach(elem => Movie.create(elem));
      }
    })
    .catch(error => console.log(error));
});

module.exports = { connection, Movie };
