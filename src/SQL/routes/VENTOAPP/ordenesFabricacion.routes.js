'use strict'

const express = require('express');
const ordenFabriController = require('../../controllers/VENTOAPP/ordenesFabricacion.controller');
const api = express.Router();
const mdAuth = require('../../middlewares/authenticated');

api.get('/getOrdenesFabricacion', ordenFabriController.getOrdenesFabri);
api.get('/getOrdenFabricacion', mdAuth.ensureAuth, ordenFabriController.getOrdenFabri);
api.get('/getDetalleOrdenF', mdAuth.ensureAuth, ordenFabriController.getDetalleOrdenFabri);

module.exports = api    