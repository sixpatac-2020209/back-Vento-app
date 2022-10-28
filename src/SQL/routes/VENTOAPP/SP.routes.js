'use strict'

const express = require('express');
const spController = require('../../controllers/VENTOAPP/SP.controller');
const api = express.Router();
const mdAuth = require('../../middlewares/authenticated');

api.put('/SP1/:id', spController.SP_RESULTADOS1);
api.put('/SP2/:id', spController.SP_RESULTADOS2);
api.put('/SP3/:id', spController.SP_RESULTADOS3);
api.put('/SP4/:id', spController.SP_RESULTADOS4);

api.put('/SP5/:id', spController.SP_RESULTADOS5);
api.put('/SP6/:id', spController.SP_RESULTADOS6);
api.put('/SP7/:id', spController.SP_RESULTADOS7);

api.put('/SP8/:id', spController.SP_RESULTADOS8);
api.put('/SP9/:id', spController.SP_RESULTADOS9);
api.put('/SP10/:id', spController.SP_RESULTADOS10);

api.put('/SP11/:id', spController.SP_RESULTADOS11);
api.put('/SP12/:id', spController.SP_RESULTADOS12);
api.put('/SP13/:id', spController.SP_RESULTADOS13);
api.put('/SP14/:id', spController.SP_RESULTADOS14);

module.exports = api