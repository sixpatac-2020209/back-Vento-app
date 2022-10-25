'use strict'

const express = require('express');
const procesosController = require('../../controllers/VENTOAPP/procesos.controller');
const api = express.Router();
const mdAuth = require('../../middlewares/authenticated');

api.get('/procesosTest', procesosController.procesosTest);
api.get('/getProcesos', mdAuth.ensureAuth, procesosController.getProcesos);
api.get('/getProceso/:id', mdAuth.ensureAuth, procesosController.getProceso);

api.post('/createProceso', mdAuth.ensureAuth, procesosController.createProceso);

module.exports = api