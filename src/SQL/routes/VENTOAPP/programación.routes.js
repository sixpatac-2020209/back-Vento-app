'use strict'

const express = require('express');
const programaciónController = require('../../controllers/VENTOAPP/programación.controller');
const api = express.Router();

api.get('/programaciónTest', programaciónController.programaciónTest);

module.exports = api