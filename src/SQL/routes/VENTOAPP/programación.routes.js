'use strict'

const express = require('express');
const programaciónController = require('../../controllers/VENTOAPP/programación.controller');
const api = express.Router();
const mdAuth = require('../../middlewares/authenticated');

api.get('/programaciónTest', programaciónController.programaciónTest);
api.get('/getProgramaciones', mdAuth.ensureAuth, programaciónController.getProgramaciones);
api.get('/getProgramacion/:id', mdAuth.ensureAuth, programaciónController.getProgramacion);

api.put('/programar/id', mdAuth.ensureAuth, programaciónController.createProgramacion)


module.exports = api