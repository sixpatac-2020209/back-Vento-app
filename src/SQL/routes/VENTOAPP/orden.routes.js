'use strict'

const express = require('express');
const ordenController = require('../../controllers/VENTOAPP/orden.controller');
const api = express.Router();
const mdAuth = require('../../middlewares/authenticated');

api.get('/ordenTest', ordenController.ordenTest);
api.get('/getOrdenes', mdAuth.ensureAuth, ordenController.getOrdenes);
api.get('/getOrden/:id', mdAuth.ensureAuth, ordenController.getOrden);
api.get('/getDetalleOrden/:id', mdAuth.ensureAuth, ordenController.getDetalleOrden);
api.get('/getImporteOrden/:id', mdAuth.ensureAuth, ordenController.getImporteOrden);

api.get('/getOrders', mdAuth.ensureAuth, ordenController.getOrders);
api.post('/createOrden', mdAuth.ensureAuth, ordenController.createOrden);

module.exports = api    