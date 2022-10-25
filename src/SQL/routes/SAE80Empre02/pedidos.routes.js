'use strict'

const express = require('express');
const pedidosController = require('../../controllers/SAE80Empre02/pedidos.controller');
const api = express.Router();
const mdAuth = require('../../middlewares/authenticated');


api.get('/pedidosTest', pedidosController.pedidosTest);

// Admin
api.get('/getPedidos', mdAuth.ensureAuth, pedidosController.getPedidos);
api.post('/getPedidosPorMes', mdAuth.ensureAuth, pedidosController.getPedidosPorMes);

// Vendedor
api.post('/getPedidosPorCliente', mdAuth.ensureAuth, pedidosController.getPedidosPorCliente);

api.post('/getDetallePedido',  pedidosController.getDetallePedido);

api.get('/getPedido/:id',  pedidosController.getPedido);
api.get('/getDetallePedido/:id',  pedidosController.getDetallePedido);


module.exports = api