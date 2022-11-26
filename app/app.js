/* eslint-disable no-unused-vars */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { router } = require('./routes/router');

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// enrutador general de api
app.use('/api', router);

// manejo de erorr 404, no encontrado
app.use('*', (req, res) => {
    return res.status(404).json({
        error: 404,
        message: 'not found',
    });
});

// manejo de excepciones
app.use((err, req, res, _next) => {
    res.status(500).json({
        error: err,
        message: err.message,
    });
});

module.exports = app;
