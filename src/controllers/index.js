const services = require('../services')();

function getControllers() {

    const getMovies = (req, res) => res.send(
        services.getMovies()
    );

    const getMovieById = (req, res) => {
        console.log(req.params);
        res.send(
            services.getMovieById(Number(req.params.id))
        );
    };

    const getMoviesBySubstring = (req, res) => {
        console.log(req.params);
        res.send(
            services.getMoviesBySubstring(req.params.substring)
        );
    };

    const getPagination = (req, res) => {
        console.log(req.query);
        const offset = Number(req.query.offset);
        const limit = Number(req.query.limit);
        res.send(
            services.getPagination(offset, limit)
        );
    };

    const sortMovies = (req, res) => {
        console.log(req.query);
        res.send(
            services.sortMovies(req.query.field, req.query.direction)
        );
    };

    const helloApi = (req, res) => res.send('Hello API');

    return {getMovies, getMovieById, getMoviesBySubstring, getPagination, sortMovies, helloApi};
}

module.exports = getControllers;