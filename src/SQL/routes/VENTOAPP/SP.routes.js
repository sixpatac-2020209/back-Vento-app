'use strict'

const express = require('express');
const spController = require('../../controllers/VENTOAPP/SP.controller');
const api = express.Router();
const mdAuth = require('../../middlewares/authenticated');

api.put('/SP1', spController.SP_RESULTADOS1);
api.put('/SP2', spController.SP_RESULTADOS2);
api.put('/SP3', spController.SP_RESULTADOS3);
api.put('/SP4', spController.SP_RESULTADOS4);

api.put('/SP5', spController.SP_RESULTADOS5);
api.put('/SP6', spController.SP_RESULTADOS6);
api.put('/SP7', spController.SP_RESULTADOS7);

api.put('/SP8', spController.SP_RESULTADOS8);
api.put('/SP9', spController.SP_RESULTADOS9);
api.put('/SP10', spController.SP_RESULTADOS10);

api.put('/SP11', spController.SP_RESULTADOS11);
api.put('/SP12', spController.SP_RESULTADOS12);
api.put('/SP13', spController.SP_RESULTADOS13);
api.put('/SP14', spController.SP_RESULTADOS14);

module.exports = api