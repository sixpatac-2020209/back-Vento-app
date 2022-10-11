'use strict'

const express = require('express');
const ordenController = require('../../controllers/VENTOAPP/orden.controller');
const api = express.Router();

api.get('/ordenTest', ordenController.ordenTest);
api.get('/getOrdenes', ordenController.getOrdenes);
api.get('/getOrden/:id', ordenController.getOrden)

api.post('/createOrden', ordenController.createOrden);
api.put('/updateOrden', ordenController.updateOrden);
api.delete('/deleteOrden', ordenController.deleteOrden);

module.exports = api