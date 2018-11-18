const Sequelize = require("sequelize");

const connection = new Sequelize('dbmovies', 'phpmyadmin', '12345', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;