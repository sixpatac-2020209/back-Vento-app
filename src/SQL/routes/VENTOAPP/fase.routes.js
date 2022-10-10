'use strict'

const express = require('express');
const faseController = require('../../controllers/VENTOAPP/fase.controller');
const api = express.Router();

api.get('/faseTest', faseController.faseTest);

module.exports = api