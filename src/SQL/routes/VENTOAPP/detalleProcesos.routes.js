'use strict'

const express = require('express');
const detalleProcesosController = require('../../controllers/VENTOAPP/detalleProcesos.controller');
const api = express.Router();

api.get('/detalleProcesosTest', detalleProcesosController.detalleProcesosTest);
api.get('/getDetallesProcesos', detalleProcesosController.getDetallesProcesos);
api.get('/getDetalleProceso/:id', detalleProcesosController.getDetalleProceso);


module.exports = api