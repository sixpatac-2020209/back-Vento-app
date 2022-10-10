'use strict'

const express = require('express');
const detalleProcesosController = require('../../controllers/VENTOAPP/detalleProcesos.controller');
const api = express.Router();

api.get('/detalleProcesosTest', detalleProcesosController.detalleProcesosTest);

module.exports = api