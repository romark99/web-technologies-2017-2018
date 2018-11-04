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

const getMovies = (req, res) => res.send(services.getMovies());

const getMovieById = (req, res) => {
  console.log(req.params);
  const schema = Joi.number()
    .min(0)
    .required();
  const { error } = Joi.validate(req.params.id, schema);
  if (!isError(res, error)) {
    res.send(services.getMovieById(Number(req.params.id)));
  }
};

const getMoviesBySubstring = (req, res) => {
  console.log(req.params);
  const schema = Joi.string();
  const { error } = Joi.validate(req.params.substring, schema);
  if (!isError(res, error)) {
    res.send(services.getMoviesBySubstring(req.params.substring));
  }
};

const getPagination = (req, res) => {
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
    res.send(services.getPagination(offset, limit));
  }
};

const sortMovies = (req, res) => {
  console.log(req.query);
  const schema = Joi.object().keys({
    field: Joi.string().required(),
    direction: Joi.string()
      .valid(constants.DIRECTION_SORT_ASC, constants.DIRECTION_SORT_DESC)
      .required()
  });
  const { error } = Joi.validate(req.query, schema);
  if (!isError(res, error)) {
    res.send(services.sortMovies(req.query.field, req.query.direction));
  }
};

const helloApi = (req, res) => res.send(constants.HELLO_API);

const sum = (a, b) => a + b;

module.exports = {
    getMovies,
    getMovieById,
    getMoviesBySubstring,
    getPagination,
    sortMovies,
    helloApi, sum, isError
};
