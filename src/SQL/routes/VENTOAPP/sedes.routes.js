'use strict'

const express = require('express');
const sedesController = require('../../controllers/VENTOAPP/sedes.controller');
const api = express.Router();

api.get('/sedesTest', sedesController.sedesTest);

module.exports = api