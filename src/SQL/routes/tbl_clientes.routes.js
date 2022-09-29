'use strict'

const express = require('express');
const clienteController = require('../controllers/clientes.controller');
const api = express.Router();

api.get('/clientesTest', clienteController.clientesTest);

//Rutas Públicas//
api.get('/getClientes', clienteController.getClientes);

api.get('/getClientesVendedor', clienteController.getClientesVendedor);

api.get('/getCliente/:id', clienteController.getCliente);

module.exports = api;