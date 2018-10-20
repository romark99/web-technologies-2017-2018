const movies = require('./data');

const express  = require('express');

const app = express();

app.get('/movies', function (req, res) {
    res.send(movies);
});

app.get('/movies/:id', function (req, res) {
    console.log(req.params);
    const movie = movies.find(function (movie) {
        return movie.id === Number(req.params.id);
    });
    res.send(movie);
});

app.get('/search/:substring', function (req, res) {
    console.log(req.params);
    const foundMovies = movies.filter(function (movie) {
        return movie.title.includes(req.params.substring);
    });
    res.send(foundMovies);
});

//  query args: limit and offset
app.get('/pagination', function (req, res) {
    console.log(req.query);
    const offset = Number(req.query.offset);
    const limit = Number(req.query.limit);
    const moviesOnPage = movies.slice(offset, offset + limit);
    res.send(moviesOnPage);
});

// query args: field and direction (asc, desc)
app.get('/sort', function (req, res) {
    console.log(req.query);
    const field = req.query.field;
    const direction = req.query.direction;
    const sortedMovies = movies.sort((a, b) => {
        if (a[field] > b[field]) return 1;
        if (a[field] < b[field]) return -1;
        return 0;
    });
    res.send(direction === 'asc' ? sortedMovies : (direction === 'desc' ? sortedMovies.reverse() : [] ));
});

app.get('/', function (req, res) {
    res.send('Hello API');
});

app.listen(3012, function () {
    console.log('API app started');
});