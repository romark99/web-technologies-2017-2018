const router = require('./src/routes')();

const express  = require('express');

const app = express();

app.use(router);

app.listen(3012, function () {
    console.log('API app started');
});