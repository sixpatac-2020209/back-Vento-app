'use strict'

const express = require('express');
const ordenFabriController = require('../../controllers/VENTOAPP/ordenesFabricacion.controller');
const api = express.Router();

api.get('/getOrdenesFabricacion', ordenFabriController.getOrdenesFabri);
api.get('/getOrdenFabricacion', ordenFabriController.getOrdenFabri);
api.get('/getDetalleOrdenF', ordenFabriController.getDetalleOrdenFabri);

module.exports = api    