'use strict'

const express = require('express');
const sedesController = require('../../controllers/VENTOAPP/sedes.controller');
const api = express.Router();
const mdAuth = require('../../middlewares/authenticated');

api.get('/sedesTest', sedesController.sedesTest);
api.get('/getPlantas', mdAuth.ensureAuth, sedesController.getSedes);
api.get('/getSede/:id', mdAuth.ensureAuth, sedesController.getSede);

api.post('/createSede', mdAuth.ensureAuth, sedesController.createSede)


module.exports = api