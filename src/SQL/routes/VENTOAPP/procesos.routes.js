'use strict'

const express = require('express');
const procesosController = require('../../controllers/VENTOAPP/procesos.controller');
const api = express.Router();

api.get('/procesosTest', procesosController.procesosTest);

module.exports = api