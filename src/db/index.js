const data = require("../data");
const mongoose = require("mongoose");

mongoose.connect("mongodb://romark:" + process.env.MONGO_ATLAS_PW + "@node-rest-movies-shard-00-00-kasbq.mongodb.net:27017,node-rest-movies-shard-00-01-kasbq.mongodb.net:27017,node-rest-movies-shard-00-02-kasbq.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-movies-shard-0&authSource=admin&retryWrites=true",
    {useNewUrlParser: true}
);

const Movie = require("../models/movie");

/**
 * Filling up Mongo database with data.
 */
Movie.count().then(length => {
  if (!(length > 0)) {
      data.forEach(elem => {
        Object.assign(elem, {_id: new mongoose.Types.ObjectId()});
        const movie = new Movie(elem);
          movie
              .save()
              .then(result => {
                  console.log(result);
              })
              .catch(err => console.log(err));
      });
  }
});
