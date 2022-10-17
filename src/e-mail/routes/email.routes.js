'use strict'

const express = require('express');
const emailController = require('../controllers/email.controller')
const api = express.Router();

api.post('/emailConfirmado/:id', emailController.autorizarEmail);
api.post('/correccionEmail/:id', emailController.corregirEmail);
api.post('/sendEmaillRevision/:id', emailController.rechazarEmail);


module.exports = api