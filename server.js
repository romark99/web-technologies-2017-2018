require('./src/config')();

const router = require('./src/routes')();

const express  = require('express');

const app = express();

app.use(router);

app.listen(process.env.HTTP_PORT, function () {
    console.log('API app started');
});