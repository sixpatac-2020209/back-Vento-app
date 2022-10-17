'use strict'

const express = require('express');
const emailController = require('../controllers/email.controller')
const api = express.Router();

api.post('/confirmarOrden/:id', emailController.autorizarEmail);
api.post('/correccionOrden/:id', emailController.corregirEmail);
api.post('/rechazarOrden/:id', emailController.rechazarEmail);


module.exports = api