'use strict'

const express = require('express');
const pedidosController = require('../controllers/pedidos.controller');
const api = express.Router();

api.get('/getPedidos', pedidosController.getPedidos);

module.exports = api