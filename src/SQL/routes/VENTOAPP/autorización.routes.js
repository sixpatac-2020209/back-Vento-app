'use strict'

const express = require('express');
const autorizaciónController = require('../../controllers/VENTOAPP/autorizacion.controller');
const api = express.Router();

api.get('/autorizaciónTest', autorizaciónController.autorizaciónTest);

module.exports = api