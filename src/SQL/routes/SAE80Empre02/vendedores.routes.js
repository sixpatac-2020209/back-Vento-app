'use strict'

const express = require('express');
const vendedoresController = require('../../controllers/SAE80Empre02/vendedores.controller');
const api = express.Router();

api.get('/vendedoresTest', vendedoresController.vendedoresTest);
api.get('/getVendedores', vendedoresController.getVendedores);
api.get('/getVendedor/:id', vendedoresController.getVendedor);
    
api.get('/getVendedorCorreoPedido/:id', vendedoresController.getVendedorCorreoPedido);
api.get('/getVendedorPedido/:id', vendedoresController.getVendedorPedido);


module.exports = api