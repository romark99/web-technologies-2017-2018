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

app.get('/', function (req, res) {
    res.send('Hello API');
});

app.listen(3012, function () {
    console.log('API app started');
});