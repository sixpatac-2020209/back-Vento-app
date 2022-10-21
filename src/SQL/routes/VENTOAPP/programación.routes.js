'use strict'

const express = require('express');
const programaciónController = require('../../controllers/VENTOAPP/programación.controller');
const api = express.Router();

api.get('/programaciónTest', programaciónController.programaciónTest);
api.get('/getProgramaciones', programaciónController.getProgramaciones);
api.get('/getProgramacion/:id', programaciónController.getProgramacion);

api.put('/programar/id', programaciónController.createProgramacion)


module.exports = api