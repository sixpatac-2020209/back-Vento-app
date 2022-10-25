'use strict'

const express = require('express');
const autorizacionController = require('../../controllers/VENTOAPP/autorizacion.controller');
const api = express.Router();
const mdAuth = require('../../middlewares/authenticated');

api.get('/autorizacionesTest', mdAuth.ensureAuth, autorizacionController.autorizacionTest);
api.get('/getAutorizaciones', mdAuth.ensureAuth, autorizacionController.getAutorizaciones);

api.get('/getAutorizacion/:id', mdAuth.ensureAuth, autorizacionController.getAutorizacion);
api.get('/getDetalleAutorizacion/:id', mdAuth.ensureAuth, autorizacionController.getDetalleAutorizacion);
api.get('/getImporteAutorizacion/:id', mdAuth.ensureAuth, autorizacionController.getImporteAutorizacion);

api.put('/autorizar/:id', mdAuth.ensureAuth, autorizacionController.Autorizar);
api.delete('/rechazar/:id', mdAuth.ensureAuth, autorizacionController.Rechazar);

module.exports = api