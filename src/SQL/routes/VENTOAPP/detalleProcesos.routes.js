'use strict'

const express = require('express');
const detalleProcesosController = require('../../controllers/VENTOAPP/detalleProcesos.controller');
const api = express.Router();
const mdAuth = require('../../middlewares/authenticated');

api.get('/detalleProcesosTest', mdAuth.ensureAuth, detalleProcesosController.detalleProcesosTest);
api.get('/getDetallesProcesos', detalleProcesosController.getDetallesProcesos);
api.get('/getDetalleProceso/:id', detalleProcesosController.getDetalleProceso);

/** ---------- DETALLE DE PROCESOS ---------- **/
api.put('/corteVidrio/:id', detalleProcesosController.corteVidrio);// --1
api.put('/corteHoja/:id', detalleProcesosController.corteHoja);//--2
api.put('/corteMarco/:id', detalleProcesosController.corteMarco);//--3
api.put('/corteCedazo/:id', detalleProcesosController.corteCedazo);//--4

api.put('/fusionHoja/:id', detalleProcesosController.fusionHoja);//--5
api.put('/fusionCedazo/:id', detalleProcesosController.fusionMarco);//--6
api.put('/fusionMarco/:id', detalleProcesosController.fusionCedazo);//--7

api.put('/limpiezaHoja/:id', detalleProcesosController.limpiezaHoja);//--8
api.put('/limpiezaMarco/:id', detalleProcesosController.limpiezaMarco);//--9
api.put('/colocacionTela/:id', detalleProcesosController.colocacionTela);//--10

api.put('/corteBatiente/:id', detalleProcesosController.corteBatiente);//--11
api.put('/colocacionBatiente/:id', detalleProcesosController.colocacionBatiente);//--12
api.put('/tapajambas/:id', detalleProcesosController.tapajambas);//--13
api.put('/reticula/:id', detalleProcesosController.reticula);//--14

module.exports = api        