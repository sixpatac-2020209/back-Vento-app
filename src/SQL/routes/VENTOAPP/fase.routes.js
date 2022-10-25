'use strict'

const express = require('express');
const faseController = require('../../controllers/VENTOAPP/fase.controller');
const api = express.Router();
const mdAuth = require('../../middlewares/authenticated');

api.get('/faseTest', faseController.faseTest);
api.get('/getFases', mdAuth.ensureAuth, faseController.getFases);
api.get('/getFase/:id', mdAuth.ensureAuth, faseController.getFase);

api.post('/createFase', mdAuth.ensureAuth, faseController.createFase);


module.exports = api