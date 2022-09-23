'use strict'

const express = require('express');
const userController = require('../controllers/usuario.controller');
const api = express.Router();

//Rutas Públicas//
api.get('/testUser', userController.userTest);
api.post('/login', userController.login)

module.exports = api;