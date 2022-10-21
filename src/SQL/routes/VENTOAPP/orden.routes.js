'use strict'

const express = require('express');
const ordenController = require('../../controllers/VENTOAPP/orden.controller');
const api = express.Router();

api.get('/ordenTest', ordenController.ordenTest);
api.get('/getOrdenes', ordenController.getOrdenes);
api.get('/getOrden/:id', ordenController.getOrden);
api.get('/getDetalleOrden/:id', ordenController.getDetalleOrden);
api.get('/getImporteOrden/:id', ordenController.getImporteOrden);


api.post('/createOrden', ordenController.createOrden);

module.exports = api    