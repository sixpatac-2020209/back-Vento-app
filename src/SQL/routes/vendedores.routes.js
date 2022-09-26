'use strict'

const express = require('express');
const vendedoresController = require('../controllers/vendedores.controller');
const api = express.Router();

api.get('/vendedoresTest', vendedoresController.vendedoresTest);
api.get('/getVendedores', vendedoresController.getVendedores);
api.get('/getVendedor/:id', vendedoresController.getVendedor);


module.exports = api