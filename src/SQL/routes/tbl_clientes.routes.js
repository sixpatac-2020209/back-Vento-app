'use strict'

const express = require('express');
const clienteController = require('../controllers/clientes.controller');
const api = express.Router();

//Rutas Públicas//
api.get('/getClientes', clienteController.getClientes);
api.get('/getCliente', clienteController.getCliente);
module.exports = api;