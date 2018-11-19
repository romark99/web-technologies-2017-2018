const controllers = require("../controllers");
const constants = require("../constants");
const express = require("express");

const router = express.Router();

router.get(constants.PATH_MOVIES, controllers.getMovies);

router.get(constants.PATH_MOVIES_BY_ID, controllers.getMovieById);

router.get(
  constants.PATH_SEARCH_BY_SUBSTRING,
  controllers.getMoviesBySubstring
);

router.get(constants.PATH_PAGINATION, controllers.getPagination);

router.get(constants.PATH_SORT, controllers.sortMovies);

router.get(constants.PATH_ROOT, controllers.helloApi);

router.post(constants.PATH_ROOT, controllers.postMovie);

module.exports = router;
