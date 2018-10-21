const movies = require('../data');

function getControllers() {

    const getMovies = (req, res) => res.send(movies);

    const getMovieById = (req, res) => {
        console.log(req.params);
        const movie = movies.find(function (movie) {
            return movie.id === Number(req.params.id);
        });
        res.send(movie);
    };

    const getMoviesBySubstring = (req, res) => {
        console.log(req.params);
        const foundMovies = movies.filter(function (movie) {
            return movie.title.includes(req.params.substring);
        });
        res.send(foundMovies);
    };

    //  query args: limit and offset
    const getPagination = (req, res) => {
        console.log(req.query);
        const offset = Number(req.query.offset);
        const limit = Number(req.query.limit);
        const moviesOnPage = movies.slice(offset, offset + limit);
        res.send(moviesOnPage);
    };

    // query args: field and direction (asc, desc)
    const sortMovies = (req, res) => {
        console.log(req.query);
        const field = req.query.field;
        const direction = req.query.direction;
        const sortedMovies = movies.sort((a, b) => {
            if (a[field] > b[field]) return 1;
            if (a[field] < b[field]) return -1;
            return 0;
        });
        res.send(direction === 'asc' ? sortedMovies : (direction === 'desc' ? sortedMovies.reverse() : []));
    };

    const helloApi = (req, res) => res.send('Hello API');

    return {getMovies, getMovieById, getMoviesBySubstring, getPagination, sortMovies, helloApi};
}

module.exports = getControllers;