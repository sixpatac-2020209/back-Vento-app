'use strict'

const express = require('express');
const vendedoresController = require('../../controllers/SAE80Empre02/vendedores.controller');
const api = express.Router();
const mdAuth = require('../../middlewares/authenticated');

api.get('/vendedoresTest', mdAuth.ensureAuth, vendedoresController.vendedoresTest);
api.get('/getVendedores', mdAuth.ensureAuth, vendedoresController.getVendedores);
api.get('/getVendedor/:id', mdAuth.ensureAuth, vendedoresController.getVendedor);

api.get('/getVendedorCorreoPedido/:id', mdAuth.ensureAuth, vendedoresController.getVendedorCorreoPedido);
api.get('/getVendedorPedido/:id', mdAuth.ensureAuth, vendedoresController.getVendedorPedido);


module.exports = api