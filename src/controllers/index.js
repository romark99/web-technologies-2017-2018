const Joi = require("joi");
const services = require("../services");
const constants = require("../constants");

const isError = (res, error) => {
    if (error && error.details) {
        res.status(400).json(error);
        return true;
    }
    return false;
};

async function getMovies(req, res) {
    const movies = await services.getMovies();
    res.send(movies);
}

async function getMovieById(req, res) {
    console.log(req.params);
    const schema = Joi.number()
        .min(0)
        .required();
    const { error } = Joi.validate(req.params.id, schema);
    if (!isError(res, error)) {
        const movie = await services.getMovieById(Number(req.params.id));
        res.send(movie);
    }
}

async function getMoviesBySubstring(req, res) {
    console.log(req.params);
    const schema = Joi.string();
    const { error } = Joi.validate(req.params.substring, schema);
    if (!isError(res, error)) {
        const movies = await services.getMoviesBySubstring(req.params.substring);
        res.send(movies);
    }
}

async function getPagination(req, res) {
    console.log(req.query);
    const schema = Joi.object().keys({
        offset: Joi.number()
            .integer()
            .min(0)
            .required(),
        limit: Joi.number()
            .integer()
            .min(1)
            .max(100)
            .required()
    });
    const { error } = Joi.validate(req.query, schema);
    if (!isError(res, error)) {
        const offset = Number(req.query.offset);
        const limit = Number(req.query.limit);
        const movies = await services.getPagination(offset, limit);
        res.send(movies);
    }
}

async function sortMovies(req, res) {
    console.log(req.query);
    const schema = Joi.object().keys({
        field: Joi.string().required(),
        direction: Joi.string()
            .valid(constants.DIRECTION_SORT_ASC, constants.DIRECTION_SORT_DESC)
            .required()
    });
    const { error } = Joi.validate(req.query, schema);
    if (!isError(res, error)) {
        const movies = await services.sortMovies(
            req.query.field,
            req.query.direction
        );
        res.send(movies);
    }
}

const postMovie = (req, res, next) => {
    console.log("req::" + JSON.stringify(req.body));
    const movie = services.postMovie(req);
    movie
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
    console.log("Movie: " + JSON.stringify(movie));
    res.send(movie);
};

const helloApi = (req, res) => res.send(constants.HELLO_API);

const sum = (a, b) => a + b;

module.exports = {
    getMovies,
    getMovieById,
    getMoviesBySubstring,
    getPagination,
    sortMovies,
    helloApi,
    sum,
    isError,
    postMovie
};
