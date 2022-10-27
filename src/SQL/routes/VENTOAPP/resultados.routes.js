'use strict'

const express = require('express');
const resultadosController = require('../../controllers/VENTOAPP/resultados.controller');
const api = express.Router();

api.put('/createResultados/:id', resultadosController.createResultados);
api.get('/getResultado');

api.get('/updateDetalle/:id', resultadosController.getDetalleResultados);

api.get('/getFasesHome', resultadosController.getFasesHome);
api.get('/getDetalleResultados/:id', resultadosController.getDetalleResultados);

module.exports = api