const movies = require('../data');

function getServices() {

    const getMovies = () => movies;

    const getMovieById = (id) => {
        return movies.find(movie => movie.id === id);
    };

    const getMoviesBySubstring = (substring) => {
        return movies.filter(movie => movie.title.includes(substring));
    };

    const getPagination = (offset, limit) => movies.slice(offset, offset + limit);

    const sortMovies = (field, direction) => {
        const sortedMovies = movies.sort((a, b) => {
            if (a[field] > b[field]) return 1;
            if (a[field] < b[field]) return -1;
            return 0;
        });
        return direction === 'asc' ? sortedMovies : (direction === 'desc' ? sortedMovies.reverse() : []);
    };

    return {getMovies, getMovieById, getMoviesBySubstring, getPagination, sortMovies};
}

module.exports = getServices;