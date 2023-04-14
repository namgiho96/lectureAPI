const express = require('express');
const v1 = express.Router();

const admin = require('./admin');

v1.use('/admin', admin);

module.exports = v1;
