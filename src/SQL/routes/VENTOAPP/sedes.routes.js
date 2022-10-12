'use strict'

const express = require('express');
const sedesController = require('../../controllers/VENTOAPP/sedes.controller');
const api = express.Router();

api.get('/sedesTest', sedesController.sedesTest);
api.get('/getPlantas', sedesController.getSedes);
api.get('/getSede/:id', sedesController.getSede);

api.post('/createSede', sedesController.createSede)


module.exports = api