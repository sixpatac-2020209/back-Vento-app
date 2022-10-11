'use strict'

const express = require('express');
const procesosController = require('../../controllers/VENTOAPP/procesos.controller');
const api = express.Router();

api.get('/procesosTest', procesosController.procesosTest);
api.get('/getProcesos', procesosController.getProcesos);
api.get('/getProceso/:id', procesosController.getProceso);

api.post('/createProceso', procesosController.createProceso);

module.exports = api