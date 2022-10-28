'use strict'

const sqlConfig = require('../../../../configs/sqlConfig');
const { validateData } = require('../../utils/validate');

/* Función de prueba de conectividad */
exports.detalleProcesosTest = async (req, res) => {
    await res.send({ message: 'Modúlo de detalleProcesos corriendo' })
}

exports.getDetallesProcesos = async (req, res) => {
    try {
        let id = req.params.id
        let detallesProcesos = await sqlConfig.VENTO.query(`
            SELECT * FROM TBL_DETALLEPROCESOS
                WHERE CVE_ORDEN = ${id}
    `);

        let arrayDetalles = detallesProcesos.recordsets
        let returnDetalles = arrayDetalles[0];

        if (!detallesProcesos) {
            return res.status(400).send({ message: 'Detalles de Procesos no encontrados' });

        } else if (returnDetalles.length === 0) {
            return res.status(400).send({ message: 'No hay fases que mostrar' });

        } else {
            return res.send({ returnDetalles })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener los Detalles de Procesos' });
    }
}

exports.getDetalleProceso = async (req, res) => {
    try {
        let id = req.params.id

        let detalleProceso = await sqlConfig.VENTO.query(`
        SELECT D.CVE_ORDEN, D.CVE_ART, D.REALIZAR, D.REALIZADO, P.DESCRIPCION , D.ID_PROCESO FROM TBL_DETALLEPROCESOS D
        INNER JOIN TBL_PROCESOS P ON D.ID_PROCESO = P.ID_PROCESO
        WHERE D.CVE_ART = '${id}'
        `);

        let arrayDetalleProceso = detalleProceso.recordsets;
        let returnDetalleProceso = arrayDetalleProceso[0];

        if (!detalleProceso || returnDetalleProceso.length === 0) {
            return res.status(400).send({ message: 'Detalle de Proceso no encontrado' });
        }
        else {
            return res.send({ message: 'Detalle de Proceso encontrado', returnDetalleProceso });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener la DetalleProceso' });

    }
}



/** ---------------------- CORTE ---------------------- **/

exports.corteVidrio = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.body
        let data = {
            corte: params.corteV
        }
        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let dataCorteVidrio = await sqlConfig.VENTO.query(`
            SELECT REALIZAR, REALIZADO FROM TBL_DETALLEPROCESOS
		    WHERE ID_PROCESO = 1 AND CVE_ART = '${id}'
        `);
        let arrayDetalle = dataCorteVidrio.recordsets
        let secondArray = arrayDetalle[0]
        let returnDetalle = secondArray[0];

        if (!dataCorteVidrio)
            return res.status(400).send({ message: 'Corte de vidrio no encontrado' });

        if (parseInt(data.corte) > parseInt(returnDetalle.REALIZAR))
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' });

        if (returnDetalle.REALIZADO == returnDetalle.REALIZAR)
            return res.status(400).send({ message: 'No puedes ingresar más datos' })

        let result = parseInt(data.corte) + parseInt(returnDetalle.REALIZADO);

        if (parseInt(result) > parseInt(returnDetalle.REALIZAR))
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' })

        let corteVidrio = await sqlConfig.VENTO.query(`
            UPDATE TBL_DETALLEPROCESOS SET REALIZADO = ${result}
            WHERE ID_PROCESO = 1 AND CVE_ART = '${id}'
        `);
        if (!corteVidrio)
            return res.status(400).send({ message: 'Cantidad no ingresada' });

        let arrayUpdate = corteVidrio.recordsets
        let returnDetalleUpdate = arrayUpdate[0];

        return res.send({ message: 'Proceso guardado correctamente', returnDetalleUpdate });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ingresar ingresar los valores' })
    }
}

exports.corteHoja = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.body
        let data = {
            corteH: params.corteH
        }

        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let dataCorteHoja = await sqlConfig.VENTO.query(`
            SELECT REALIZAR, REALIZADO FROM TBL_DETALLEPROCESOS
		    WHERE ID_PROCESO = 2 AND CVE_ART = '${id}'
        `);
        let arrayDetalle = dataCorteHoja.recordsets
        let secondArray = arrayDetalle[0]
        let returnDetalle = secondArray[0];

        console.log(returnDetalle.REALIZAR);

        if (!dataCorteHoja)
            return res.status(400).send({ message: 'Corte de vidrio no encontrado' });

        if (parseInt(data.corteH) > parseInt(returnDetalle.REALIZAR))
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' });

        if (returnDetalle.REALIZADO == returnDetalle.REALIZAR)
            return res.status(400).send({ message: 'No puedes ingresar más datos' })

        let result = parseInt(data.corteH) + parseInt(returnDetalle.REALIZADO);

        if (parseInt(result) > parseInt(returnDetalle.REALIZAR))
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' })

        let corteHoja = await sqlConfig.VENTO.query(`
            UPDATE TBL_DETALLEPROCESOS SET 
            REALIZADO = ${result}
            WHERE ID_PROCESO = 2 AND CVE_ART = '${id}'
        `);
        let arrayUpdate = corteHoja.recordsets
        let returnDetalleUpdate = arrayUpdate[0];

        if (!corteHoja)
            return res.status(400).send({ message: 'Cantidad no ingresada' });

        return res.send({ message: 'Proceso guardado correctamente' });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ingresar ingresar los valores' })
    }
}

exports.corteMarco = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.body
        let data = {
            corteM: params.corteM
        }
        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let dataCorteMarco = await sqlConfig.VENTO.query(`
            SELECT REALIZAR, REALIZADO FROM TBL_DETALLEPROCESOS
		    WHERE ID_PROCESO = 3 AND CVE_ART = '${id}'
        `);
        let arrayDetalle = dataCorteMarco.recordsets
        let secondArray = arrayDetalle[0]
        let returnDetalle = secondArray[0];

        if (!dataCorteMarco)
            return res.status(400).send({ message: 'Corte de vidrio no encontrado' });

        if (parseInt(data.corteM) > parseInt(returnDetalle.REALIZAR))
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' });

        if (returnDetalle.REALIZADO == returnDetalle.REALIZAR)
            return res.status(400).send({ message: 'No puedes ingresar más datos' })

        let result = parseInt(data.corteM) + parseInt(returnDetalle.REALIZADO);

        if (parseInt(result) > parseInt(returnDetalle.REALIZAR))
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' })

        let corteMarco = await sqlConfig.VENTO.query(`
            UPDATE TBL_DETALLEPROCESOS SET REALIZADO=${result}
            WHERE ID_PROCESO = 3 AND CVE_ART = '${id}'
        `);
        if (!corteMarco)
            return res.status(400).send({ message: 'Cantidad no ingresada' });

        return res.send({ message: 'Proceso guardado correctamente' });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ingresar ingresar los valores' })
    }
}

exports.corteCedazo = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.body
        let data = {
            corteC: params.corteC
        }
        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let dataCorteCedazo = await sqlConfig.VENTO.query(`
            SELECT REALIZAR, REALIZADO FROM TBL_DETALLEPROCESOS
		    WHERE ID_PROCESO = 4 AND CVE_ART = '${id}'
        `);
        let arrayDetalle = dataCorteCedazo.recordsets
        let secondArray = arrayDetalle[0]
        let returnDetalle = secondArray[0];

        if (!dataCorteCedazo)
            return res.status(400).send({ message: 'Corte de vidrio no encontrado' });

        if (parseInt(data.corteC) > parseInt(returnDetalle.REALIZAR))
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' });

        if (returnDetalle.REALIZADO == returnDetalle.REALIZAR)
            return res.status(400).send({ message: 'No puedes ingresar más datos' })

        let result = parseInt(data.corteC) + parseInt(returnDetalle.REALIZADO);

        if (parseInt(result) > parseInt(returnDetalle.REALIZAR))
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' })

        let corteCedazo = await sqlConfig.VENTO.query(`
            UPDATE TBL_DETALLEPROCESOS SET REALIZADO=${result}
            WHERE ID_PROCESO = 4 AND CVE_ART = '${id}'
        `);
        if (!corteCedazo)
            return res.status(400).send({ message: 'Cantidad no ingresada' });

        return res.send({ message: 'Proceso guardado correctamente' });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ingresar ingresar los valores' })
    }
}





/** ---------------------- FUSION ---------------------- **/
exports.fusionHoja = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.body
        let data = {
            fusionF: params.fusionH
        }
        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let dataFusionHoja = await sqlConfig.VENTO.query(`
            SELECT REALIZAR, REALIZADO FROM TBL_DETALLEPROCESOS
		    WHERE ID_PROCESO = 5 AND CVE_ART = '${id}'
        `);
        let arrayDetalle = dataFusionHoja.recordsets
        let secondArray = arrayDetalle[0]
        let returnDetalle = secondArray[0];

        if (!dataFusionHoja)
            return res.status(400).send({ message: 'Corte de vidrio no encontrado' });

        if (parseInt(data.fusionF) > parseInt(returnDetalle.REALIZAR))
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' });

        if (returnDetalle.REALIZADO == returnDetalle.REALIZAR)
            return res.status(400).send({ message: 'No puedes ingresar más datos' })

        let result = parseInt(data.fusionF) + parseInt(returnDetalle.REALIZADO);

        if (parseInt(result) > parseInt(returnDetalle.REALIZAR))
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' })
        let fusionHoja = await sqlConfig.VENTO.query(`
            UPDATE TBL_DETALLEPROCESOS SET REALIZADO=${result}
            WHERE ID_PROCESO = 5 AND CVE_ART = '${id}'
        `);
        if (!fusionHoja)
            return res.status(400).send({ message: 'Cantidad no ingresada' });

        return res.send({ message: 'Proceso guardado correctamente' });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ingresar ingresar los valores' })
    }
}

exports.fusionMarco = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.body
        let data = {
            fusionM: params.fusionM
        }

        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let dataCorteMarco = await sqlConfig.VENTO.query(`
            SELECT REALIZAR, REALIZADO FROM TBL_DETALLEPROCESOS
		    WHERE ID_PROCESO = 6 AND CVE_ART = '${id}'
        `);
        let arrayDetalle = dataCorteMarco.recordsets
        let secondArray = arrayDetalle[0]
        let returnDetalle = secondArray[0];

        if (!dataCorteMarco)
            return res.status(400).send({ message: 'Corte de vidrio no encontrado' });

        if (parseInt(data.fusionM) > parseInt(returnDetalle.REALIZAR))
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' });

        if (returnDetalle.REALIZADO == returnDetalle.REALIZAR)
            return res.status(400).send({ message: 'No puedes ingresar más datos' })

        let result = parseInt(data.fusionM) + parseInt(returnDetalle.REALIZADO);

        if (parseInt(result) > parseInt(returnDetalle.REALIZAR))
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' })

        let fusionMarco = await sqlConfig.VENTO.query(`
            UPDATE TBL_DETALLEPROCESOS SET REALIZADO=${result}
            WHERE ID_PROCESO = 6 AND CVE_ART = '${id}'
        `);
        if (!fusionMarco)
            return res.status(400).send({ message: 'Cantidad no ingresada' });

        return res.send({ message: 'Proceso guardado correctamente' });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ingresar ingresar los valores' })
    }
}

exports.fusionCedazo = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.body
        let data = {
            fusionC: params.fusionC
        }
        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let dataCorteCedazo = await sqlConfig.VENTO.query(`
            SELECT REALIZAR, REALIZADO FROM TBL_DETALLEPROCESOS
		    WHERE ID_PROCESO = 7 AND CVE_ART = '${id}'
        `);
        let arrayDetalle = dataCorteCedazo.recordsets
        let secondArray = arrayDetalle[0]
        let returnDetalle = secondArray[0];

        if (!dataCorteCedazo)
            return res.status(400).send({ message: 'Corte de vidrio no encontrado' });

        if (parseInt(data.fusionC) > parseInt(returnDetalle.REALIZAR))
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' });

        if (returnDetalle.REALIZADO == returnDetalle.REALIZAR)
            return res.status(400).send({ message: 'No puedes ingresar más datos' })

        let result = parseInt(data.fusionC) + parseInt(returnDetalle.REALIZADO);

        if (parseInt(result) > parseInt(returnDetalle.REALIZAR))
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' })

        let fusionCedazo = await sqlConfig.VENTO.query(`
            UPDATE TBL_DETALLEPROCESOS SET REALIZADO=${result}
            WHERE ID_PROCESO = 7 AND CVE_ART = '${id}'
        `);
        if (!fusionCedazo)
            return res.status(400).send({ message: 'Cantidad no ingresada' });

        return res.send({ message: 'Proceso guardado correctamente' });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ingresar ingresar los valores' })
    }
}





/** ---------------------- LIMPIEZA ---------------------- **/
exports.limpiezaHoja = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.body
        let data = {
            limpiezaH: params.limpiezaH
        }
        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let dataCorteHoja = await sqlConfig.VENTO.query(`
            SELECT REALIZAR, REALIZADO FROM TBL_DETALLEPROCESOS
		    WHERE ID_PROCESO = 8 AND CVE_ART = '${id}'
        `);
        let arrayDetalle = dataCorteHoja.recordsets
        let secondArray = arrayDetalle[0]
        let returnDetalle = secondArray[0];

        if (!dataCorteHoja)
            return res.status(400).send({ message: 'Corte de vidrio no encontrado' });

        if (parseInt(data.limpiezaH) > parseInt(returnDetalle.REALIZAR))
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' });

        if (returnDetalle.REALIZADO == returnDetalle.REALIZAR)
            return res.status(400).send({ message: 'No puedes ingresar más datos' })

        let result = parseInt(data.limpiezaH) + parseInt(returnDetalle.REALIZADO);

        if (parseInt(result) > parseInt(returnDetalle.REALIZAR))
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' })

        let limpiezaHoja = await sqlConfig.VENTO.query(`
            UPDATE TBL_DETALLEPROCESOS SET REALIZADO=${result}
            WHERE ID_PROCESO = 8 AND CVE_ART = '${id}'
        `);
        if (!limpiezaHoja)
            return res.status(400).send({ message: 'Cantidad no ingresada' });

        return res.send({ message: 'Proceso guardado correctamente' });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ingresar ingresar los valores' })
    }
}

exports.limpiezaMarco = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.body
        let data = {
            limpiezaM: params.limpiezaM
        }
        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let dataCorteMarco = await sqlConfig.VENTO.query(`
            SELECT REALIZAR, REALIZADO FROM TBL_DETALLEPROCESOS
		    WHERE ID_PROCESO = 9 AND CVE_ART = '${id}'
        `);
        let arrayDetalle = dataCorteMarco.recordsets
        let secondArray = arrayDetalle[0]
        let returnDetalle = secondArray[0];

        if (!dataCorteMarco)
            return res.status(400).send({ message: 'Corte de vidrio no encontrado' });

        if (parseInt(data.limpiezaM) > parseInt(returnDetalle.REALIZAR))
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' });

        if (returnDetalle.REALIZADO == returnDetalle.REALIZAR)
            return res.status(400).send({ message: 'No puedes ingresar más datos' })

        let result = parseInt(data.limpiezaM) + parseInt(returnDetalle.REALIZADO);

        if (parseInt(result) > parseInt(returnDetalle.REALIZAR))
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' })

        let limpiezaMarco = await sqlConfig.VENTO.query(`
            UPDATE TBL_DETALLEPROCESOS SET REALIZADO=${result}
            WHERE ID_PROCESO = 9 AND CVE_ART = '${id}'
        `);
        if (!limpiezaMarco)
            return res.status(400).send({ message: 'Cantidad no ingresada' });

        return res.send({ message: 'Proceso guardado correctamente' });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ingresar ingresar los valores' })
    }
}

exports.colocacionTela = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.body
        let data = {
            colocacionTela: params.colocacionTela
        }
        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let dataColocacionTela = await sqlConfig.VENTO.query(`
            SELECT REALIZAR, REALIZADO FROM TBL_DETALLEPROCESOS
		    WHERE ID_PROCESO = 10 AND CVE_ART = '${id}'
        `);
        let arrayDetalle = dataColocacionTela.recordsets
        let secondArray = arrayDetalle[0]
        let returnDetalle = secondArray[0];

        if (!dataColocacionTela)
            return res.status(400).send({ message: 'Corte de vidrio no encontrado' });

        if (parseInt(data.colocacionTela) > parseInt(returnDetalle.REALIZAR))
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' });

        if (returnDetalle.REALIZADO == returnDetalle.REALIZAR)
            return res.status(400).send({ message: 'No puedes ingresar más datos' })

        let result = parseInt(data.colocacionTela) + parseInt(returnDetalle.REALIZADO);

        if (parseInt(result) > parseInt(returnDetalle.REALIZAR))
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' })
        let colocacionTela = await sqlConfig.VENTO.query(`
            UPDATE TBL_DETALLEPROCESOS SET REALIZADO=${result}
            WHERE ID_PROCESO = 10 AND CVE_ART = '${id}'
        `);
        if (!colocacionTela)
            return res.status(400).send({ message: 'Cantidad no ingresada' });

        return res.send({ message: 'Proceso guardado correctamente' });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ingresar ingresar los valores' })
    }
}




/** ---------------------- ACCESORIOS ---------------------- **/
exports.corteBatiente = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.body
        let data = {
            corteBatiente: params.corteBatiente
        }
        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let dataCorteBatiente = await sqlConfig.VENTO.query(`
            SELECT REALIZAR, REALIZADO FROM TBL_DETALLEPROCESOS
		    WHERE ID_PROCESO = 11 AND CVE_ART = '${id}'
        `);
        let arrayDetalle = dataCorteBatiente.recordsets
        let secondArray = arrayDetalle[0]
        let returnDetalle = secondArray[0];

        if (!dataCorteBatiente)
            return res.status(400).send({ message: 'Corte de vidrio no encontrado' });

        if (parseInt(data.corteBatiente) > parseInt(returnDetalle.REALIZAR))
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' });

        if (returnDetalle.REALIZADO == returnDetalle.REALIZAR)
            return res.status(400).send({ message: 'No puedes ingresar más datos' })

        let result = parseInt(data.corteBatiente) + parseInt(returnDetalle.REALIZADO);

        if (parseInt(result) > parseInt(returnDetalle.REALIZAR))
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' })

        let corteBatiente = await sqlConfig.VENTO.query(`
            UPDATE TBL_DETALLEPROCESOS SET REALIZADO=${result}
            WHERE ID_PROCESO = 11 AND CVE_ART = '${id}'
        `);
        if (!corteBatiente)
            return res.status(400).send({ message: 'Cantidad no ingresada' });

        return res.send({ message: 'Proceso guardado correctamente' });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ingresar ingresar los valores' })
    }
}

exports.colocacionBatiente = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.body
        let data = {
            colocacionBatiente: params.colocacionBatiente
        }
        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let dataColocacionBatiente = await sqlConfig.VENTO.query(`
            SELECT REALIZAR, REALIZADO FROM TBL_DETALLEPROCESOS
		    WHERE ID_PROCESO = 12 AND CVE_ART = '${id}'
        `);
        let arrayDetalle = dataColocacionBatiente.recordsets
        let secondArray = arrayDetalle[0]
        let returnDetalle = secondArray[0];

        if (!dataColocacionBatiente)
            return res.status(400).send({ message: 'Colocacion de vidrio no encontrado' });

        if (parseInt(data.colocacionBatiente) > parseInt(returnDetalle.REALIZAR))
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' });

        if (returnDetalle.REALIZADO == returnDetalle.REALIZAR)
            return res.status(400).send({ message: 'No puedes ingresar más datos' })

        let result = parseInt(data.colocacionBatiente) + parseInt(returnDetalle.REALIZADO);

        if (parseInt(result) > parseInt(returnDetalle.REALIZAR))
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' })

        let colocacionBatiente = await sqlConfig.VENTO.query(`
            UPDATE TBL_DETALLEPROCESOS SET REALIZADO=${result}
            WHERE ID_PROCESO = 12 AND CVE_ART = '${id}'
        `);
        if (!colocacionBatiente)
            return res.status(400).send({ message: 'Cantidad no ingresada' });

        return res.send({ message: 'Proceso guardado correctamente' });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ingresar ingresar los valores' })
    }
}

exports.tapajambas = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.body
        let data = {
            tapajambas: params.tapajambas
        }
        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let dataTapajambas = await sqlConfig.VENTO.query(`
            SELECT REALIZAR, REALIZADO FROM TBL_DETALLEPROCESOS
		    WHERE ID_PROCESO = 13 AND CVE_ART = '${id}'
        `);
        let arrayDetalle = dataTapajambas.recordsets
        let secondArray = arrayDetalle[0]
        let returnDetalle = secondArray[0];

        if (!dataTapajambas)
            return res.status(400).send({ message: 'Colocacion de vidrio no encontrado' });

        if (parseInt(data.tapajambas) > parseInt(returnDetalle.REALIZAR))
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' });

        if (returnDetalle.REALIZADO == returnDetalle.REALIZAR)
            return res.status(400).send({ message: 'No puedes ingresar más datos' })

        let result = parseInt(data.tapajambas) + parseInt(returnDetalle.REALIZADO);

        if (parseInt(result) > parseInt(returnDetalle.REALIZAR))
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' })

        let tapajambas = await sqlConfig.VENTO.query(`
            UPDATE TBL_DETALLEPROCESOS SET REALIZADO=${result}
            WHERE ID_PROCESO = 13 AND CVE_ART = '${id}'
        `);
        if (!tapajambas)
            return res.status(400).send({ message: 'Cantidad no ingresada' });

        return res.send({ message: 'Proceso guardado correctamente' });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ingresar ingresar los valores' })
    }
}

exports.reticula = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.body
        let data = {
            reticula: params.reticula
        }
        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let dataReticula = await sqlConfig.VENTO.query(`
            SELECT REALIZAR, REALIZADO FROM TBL_DETALLEPROCESOS
		    WHERE ID_PROCESO = 14 AND CVE_ART = '${id}'
        `);
        let arrayDetalle = dataReticula.recordsets
        let secondArray = arrayDetalle[0]
        let returnDetalle = secondArray[0];

        if (!dataReticula)
            return res.status(400).send({ message: 'Colocacion de vidrio no encontrado' });

        if (parseInt(data.reticula) > parseInt(returnDetalle.REALIZAR))
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' });

        if (returnDetalle.REALIZADO == returnDetalle.REALIZAR)
            return res.status(400).send({ message: 'No puedes ingresar más datos' })

        let result = parseInt(data.reticula) + parseInt(returnDetalle.REALIZADO);

        if (parseInt(result) > parseInt(returnDetalle.REALIZAR))
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' })

        let reticula = await sqlConfig.VENTO.query(`
            UPDATE TBL_DETALLEPROCESOS SET REALIZADO=${result}
            WHERE ID_PROCESO = 14 AND CVE_ART = '${id}'
        `);
        if (!reticula)
            return res.status(400).send({ message: 'Cantidad no ingresada' });

        return res.send({ message: 'Proceso guardado correctamente' });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ingresar ingresar los valores' })
    }
}