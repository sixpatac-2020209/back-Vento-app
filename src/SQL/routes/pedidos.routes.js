'use strict'

const express = require('express');
const pedidosController = require('../controllers/pedidos.controller');
const api = express.Router();

api.get('/pedidosTest', pedidosController.pedidosTest);

// Admin
api.get('/getPedidos', pedidosController.getPedidos);
api.post('/getPedidoPorAnio', pedidosController.getPedidosPorAño);
api.post('/getPedidosPorMes', pedidosController.getPedidosPorMes);
api.post('/savePedido', pedidosController.savePedidos);
api.post('/updatePedido/:id', pedidosController.updatePedido);
api.delete('/deletePedido/:id', pedidosController.deletePedido );

// Vendedor
api.post('/getPedidosPorCliente', pedidosController.getPedidosPorCliente);
api.post('/guardarPedido', pedidosController.guardarPedido);
api.get('/editarPedido/:id', pedidosController.editarPedido);
api.post('/getDetallePedido',pedidosController.getDetallePedido);

api.get('/getPedido/:id', pedidosController.getPedido);


module.exports = api