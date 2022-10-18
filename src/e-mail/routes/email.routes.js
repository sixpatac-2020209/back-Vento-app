'use strict'

const express = require('express');
const emailController = require('../controllers/email.controller')
const api = express.Router();

api.put('/confirmarOrden/:id', emailController.autorizarEmail);
api.put('/correccionOrden/:id', emailController.corregirEmail);
api.put('/rechazarOrden/:id', emailController.rechazarEmail);


module.exports = api