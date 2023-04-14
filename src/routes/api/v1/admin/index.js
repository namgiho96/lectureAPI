const express = require('express');

const admin = express.Router();
const { login } = require('./auth.ctrl');

admin.post('/login', login);

module.exports = admin;
