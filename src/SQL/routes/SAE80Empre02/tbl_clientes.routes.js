'use strict'

const express = require('express');
const clienteController = require('../../controllers/SAE80Empre02/clientes.controller');
const api = express.Router();
const mdAuth = require('../../middlewares/authenticated');


api.get('/clientesTest',  clienteController.clientesTest);

//Rutas Públicas//
api.get('/getClientes', clienteController.getClientes);
api.get('/getClientesVendedor', clienteController.getClientesVendedor);
api.get('/getClientePedido/:id',  clienteController.getClientePedido);
api.get('/getCliente/:id',  clienteController.getCliente);

module.exports = api;