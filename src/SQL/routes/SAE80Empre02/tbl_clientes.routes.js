'use strict'

const express = require('express');
const clienteController = require('../../controllers/SAE80Empre02/clientes.controller');
const api = express.Router();
const mdAuth = require('../../middlewares/authenticated');


api.get('/clientesTest', mdAuth.ensureAuth, clienteController.clientesTest);

//Rutas Públicas//
api.get('/getClientes', mdAuth.ensureAuth, clienteController.getClientes);
api.get('/getClientesVendedor', mdAuth.ensureAuth, clienteController.getClientesVendedor);
api.get('/getClientePedido/:id', mdAuth.ensureAuth, clienteController.getClientePedido);
api.get('/getCliente/:id', mdAuth.ensureAuth, clienteController.getCliente);

module.exports = api;