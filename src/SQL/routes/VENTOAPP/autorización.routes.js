'use strict'

const express = require('express');
const autorizaciónController = require('../../controllers/VENTOAPP/autorizacion.controller');
const api = express.Router();

api.get('/autorizacionesTest', autorizaciónController.autorizacionTest);
api.get('/getAutorizaciones', autorizaciónController.getAutorizaciones)
api.get('/getAutorizacion/:id', autorizaciónController.getAutorizacion);


module.exports = api