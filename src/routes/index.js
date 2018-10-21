const controllers = require('../controllers')();
const express  = require('express');

function getRouter() {
    const router = express.Router();

    router.get('/movies', controllers.getMovies);

    router.get('/movies/:id', controllers.getMovieById);

    router.get('/search/:substring', controllers.getMoviesBySubstring);

    router.get('/pagination', controllers.getPagination);

    router.get('/sort', controllers.sortMovies);

    router.get('/', controllers.helloApi);

    return router;
}

module.exports = getRouter;