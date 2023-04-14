'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./routes');

// const { errorHandler } = require('./handler/packetHandler');


// const usersRouter = require('./routes/users');
// const exchangeRouter = require('./routes/exchange');
// const orderRouter = require('./routes/order');
// const strategyRouter = require('./routes/strategy');
// const noticeRouter = require('./routes/notice');

const app = express();

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
// app.use('/', routes);
app.disable('etag');


app.use(function(req, res, next) {
    if(req.url === '/' || req.uri === '/') {
        res.send('OK');
        return;
    }
    console.log(req.url);
    next(createError(404));
});

// app.use(errorHandler);

module.exports = app;