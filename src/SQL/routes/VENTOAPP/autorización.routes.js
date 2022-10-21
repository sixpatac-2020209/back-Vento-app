'use strict'

const express = require('express');
const autorizacionController = require('../../controllers/VENTOAPP/autorizacion.controller');
const api = express.Router();

api.get('/autorizacionesTest', autorizacionController.autorizacionTest);
api.get('/getAutorizaciones', autorizacionController.getAutorizaciones);

api.get('/getAutorizacion/:id', autorizacionController.getAutorizacion);
api.get('/getDetalleAutorizacion/:id', autorizacionController.getDetalleAutorizacion);
api.get('/getImporteAutorizacion/:id', autorizacionController.getImporteAutorizacion);

api.put('/autorizar/:id', autorizacionController.Autorizar);


module.exports = api