'use strict'

const express = require('express');
const pedidosController = require('../../controllers/SAE80Empre02/pedidos.controller');
const api = express.Router();

api.get('/pedidosTest', pedidosController.pedidosTest);

// Admin
api.get('/getPedidos', pedidosController.getPedidos);
api.post('/getPedidosPorMes', pedidosController.getPedidosPorMes);

// Vendedor
api.post('/getPedidosPorCliente', pedidosController.getPedidosPorCliente);
    
api.post('/getDetallePedido',pedidosController.getDetallePedido);

api.get('/getPedido/:id', pedidosController.getPedido);
api.get('/getDetallePedido/:id', pedidosController.getDetallePedido);


module.exports = api