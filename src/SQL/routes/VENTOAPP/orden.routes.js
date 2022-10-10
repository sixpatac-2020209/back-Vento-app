'use strict'

const express = require('express');
const ordenController = require('../../controllers/VENTOAPP/orden.controller');
const api = express.Router();

api.get('/ordenTest', ordenController.ordenTest);

module.exports = api