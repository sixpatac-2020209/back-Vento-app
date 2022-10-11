'use strict'

const express = require('express');
const faseController = require('../../controllers/VENTOAPP/fase.controller');
const api = express.Router();

api.get('/faseTest', faseController.faseTest);
api.get('/getFases', faseController.getFases);
api.get('/getFase/:id', faseController.getFase);

api.post('/createFase', faseController.createFase);


module.exports = api