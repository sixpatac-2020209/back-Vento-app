'use strict'

const express = require('express');
const ordenController = require('../../controllers/VENTOAPP/orden.controller');
const api = express.Router();
const mdAuth = require('../../middlewares/authenticated');

api.get('/ordenTest', ordenController.ordenTest);
api.get('/getOrdenes',mdAuth.ensureAuth, ordenController.getOrdenes);
api.get('/getOrden/:id', ordenController.getOrden);
api.get('/getDetalleOrden/:id', ordenController.getDetalleOrden);
api.get('/getImporteOrden/:id',  ordenController.getImporteOrden);

api.get('/getOrders', ordenController.getOrders);
api.post('/createOrden', mdAuth.ensureAuth, ordenController.createOrden);

module.exports = api    