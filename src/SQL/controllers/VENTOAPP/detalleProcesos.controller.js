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
        SELECT D.REALIZAR, D.REALIZADO, P.DESCRIPCION , D.ID_PROCESO FROM TBL_DETALLEPROCESOS D
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
        let params = req.params.id
        let data = {
            corte: params.corte
        }

        let dataCorteVidrio = await sqlConfig.VENTO.query(`
            SELECT REALIZAR, REALIZADO FROM TBL_DETALLEPROCESOS
		    WHERE ID_PROCESO = 1 AND CVE_ART = '${id}'
        `);
        let arrayDetalle = dataCorteVidrio.recordsets
        let secondArray = arrayDetalle[0]
        let returnDetalle = secondArray[0];

        if (!dataCorteVidrio)
            return res.status(400).send({ message: 'Corte de vidrio no encontrado' });

        if (data.corte > returnDetalle.REALIZAR)
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' });

        let realizarInt = parseInt(returnDetalle.REALIZADO)

        let result = data.corte + realizarInt;
        let corteVidrio = await sqlConfig.VENTO.query(`
            UPDATE TBL_DETALLEPROCESOS SET REALIZADO=${result}
            WHERE WHERE ID_PROCESO = 1 AND CVE_ART = '${id}'
        `);
        if (!corteVidrio)
            return res.status(400).send({ message: 'Cantidad no ingresada' });

        let arrayUpdate = corteVidrio.recordsets
        let secondArrayUpdate = arrayUpdate[0]
        let returnDetalleUpdate = secondArrayUpdate[0];
        return res.send({ message: 'Proseso guardado correctamente', returnDetalleUpdate });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ingresar ingresar los valores' })
    }
}

exports.corteHoja = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.params.id
        let data = {
            corte: params.corte
        }

        let dataCorteHoja = await sqlConfig.VENTO.query(`
            SELECT REALIZAR, REALIZADO FROM TBL_DETALLEPROCESOS
		    WHERE ID_PROCESO = 2 AND CVE_ART = '${id}'
        `);
        let arrayDetalle = dataCorteHoja.recordsets
        let secondArray = arrayDetalle[0]
        let returnDetalle = secondArray[0];

        if (!dataCorteHoja)
            return res.status(400).send({ message: 'Corte de vidrio no encontrado' });

        if (data.corte > returnDetalle.REALIZAR)
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' });

        let realizarInt = parseInt(returnDetalle.REALIZADO)

        let result = data.corte + realizarInt;
        let corteHoja = await sqlConfig.VENTO.query(`
            UPDATE TBL_DETALLEPROCESOS SET REALIZADO=${result}
            WHERE WHERE ID_PROCESO = 2 AND CVE_ART = '${id}'
        `);
        if (!corteHoja)
            return res.status(400).send({ message: 'Cantidad no ingresada' });

        let arrayUpdate = corteHoja.recordsets
        let secondArrayUpdate = arrayUpdate[0]
        let returnDetalleUpdate = secondArrayUpdate[0];
        return res.send({ message: 'Proseso guardado correctamente', returnDetalleUpdate });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ingresar ingresar los valores' })
    }
}

exports.corteMarco = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.params.id
        let data = {
            corte: params.corte
        }

        let dataCorteMarco = await sqlConfig.VENTO.query(`
            SELECT REALIZAR, REALIZADO FROM TBL_DETALLEPROCESOS
		    WHERE ID_PROCESO = 3 AND CVE_ART = '${id}'
        `);
        let arrayDetalle = dataCorteMarco.recordsets
        let secondArray = arrayDetalle[0]
        let returnDetalle = secondArray[0];

        if (!dataCorteMarco)
            return res.status(400).send({ message: 'Corte de vidrio no encontrado' });

        if (data.corte > returnDetalle.REALIZAR)
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' });

        let realizarInt = parseInt(returnDetalle.REALIZADO)

        let result = data.corte + realizarInt;
        let corteMarco = await sqlConfig.VENTO.query(`
            UPDATE TBL_DETALLEPROCESOS SET REALIZADO=${result}
            WHERE WHERE ID_PROCESO = 3 AND CVE_ART = '${id}'
        `);
        if (!corteMarco)
            return res.status(400).send({ message: 'Cantidad no ingresada' });

        let arrayUpdate = corteMarco.recordsets
        let secondArrayUpdate = arrayUpdate[0]
        let returnDetalleUpdate = secondArrayUpdate[0];
        return res.send({ message: 'Proseso guardado correctamente', returnDetalleUpdate });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ingresar ingresar los valores' })
    }
}

exports.corteCedazo = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.params.id
        let data = {
            corte: params.corte
        }

        let dataCorteCedazo = await sqlConfig.VENTO.query(`
            SELECT REALIZAR, REALIZADO FROM TBL_DETALLEPROCESOS
		    WHERE ID_PROCESO = 4 AND CVE_ART = '${id}'
        `);
        let arrayDetalle = dataCorteCedazo.recordsets
        let secondArray = arrayDetalle[0]
        let returnDetalle = secondArray[0];

        if (!dataCorteCedazo)
            return res.status(400).send({ message: 'Corte de vidrio no encontrado' });

        if (data.corte > returnDetalle.REALIZAR)
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' });

        let realizarInt = parseInt(returnDetalle.REALIZADO)

        let result = data.corte + realizarInt;
        let corteCedazo = await sqlConfig.VENTO.query(`
            UPDATE TBL_DETALLEPROCESOS SET REALIZADO=${result}
            WHERE WHERE ID_PROCESO = 4 AND CVE_ART = '${id}'
        `);
        if (!corteCedazo)
            return res.status(400).send({ message: 'Cantidad no ingresada' });

        let arrayUpdate = corteCedazo.recordsets
        let secondArrayUpdate = arrayUpdate[0]
        let returnDetalleUpdate = secondArrayUpdate[0];
        return res.send({ message: 'Proseso guardado correctamente', returnDetalleUpdate });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ingresar ingresar los valores' })
    }
}





/** ---------------------- FUSION ---------------------- **/
exports.fusionHoja = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.params.id
        let data = {
            fusion: params.fusion
        }

        let dataFusionHoja = await sqlConfig.VENTO.query(`
            SELECT REALIZAR, REALIZADO FROM TBL_DETALLEPROCESOS
		    WHERE ID_PROCESO = 5 AND CVE_ART = '${id}'
        `);
        let arrayDetalle = dataFusionHoja.recordsets
        let secondArray = arrayDetalle[0]
        let returnDetalle = secondArray[0];

        if (!dataFusionHoja)
            return res.status(400).send({ message: 'Corte de vidrio no encontrado' });

        if (data.fusion > returnDetalle.REALIZAR)
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' });

        let realizarInt = parseInt(returnDetalle.REALIZADO)

        let result = data.fusion + realizarInt;
        let fusionHoja = await sqlConfig.VENTO.query(`
            UPDATE TBL_DETALLEPROCESOS SET REALIZADO=${result}
            WHERE WHERE ID_PROCESO = 5 AND CVE_ART = '${id}'
        `);
        if (!fusionHoja)
            return res.status(400).send({ message: 'Cantidad no ingresada' });

        let arrayUpdate = fusionHoja.recordsets
        let secondArrayUpdate = arrayUpdate[0]
        let returnDetalleUpdate = secondArrayUpdate[0];
        return res.send({ message: 'Proseso guardado correctamente', returnDetalleUpdate });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ingresar ingresar los valores' })
    }
}

exports.fusionMarco = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.params.id
        let data = {
            fusion: params.fusion
        }

        let dataCorteMarco = await sqlConfig.VENTO.query(`
            SELECT REALIZAR, REALIZADO FROM TBL_DETALLEPROCESOS
		    WHERE ID_PROCESO = 6 AND CVE_ART = '${id}'
        `);
        let arrayDetalle = dataCorteMarco.recordsets
        let secondArray = arrayDetalle[0]
        let returnDetalle = secondArray[0];

        if (!dataCorteMarco)
            return res.status(400).send({ message: 'Corte de vidrio no encontrado' });

        if (data.fusion > returnDetalle.REALIZAR)
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' });

        let realizarInt = parseInt(returnDetalle.REALIZADO)

        let result = data.fusion + realizarInt;
        let fusionMarco = await sqlConfig.VENTO.query(`
            UPDATE TBL_DETALLEPROCESOS SET REALIZADO=${result}
            WHERE WHERE ID_PROCESO = 6 AND CVE_ART = '${id}'
        `);
        if (!fusionMarco)
            return res.status(400).send({ message: 'Cantidad no ingresada' });

        let arrayUpdate = fusionMarco.recordsets
        let secondArrayUpdate = arrayUpdate[0]
        let returnDetalleUpdate = secondArrayUpdate[0];
        return res.send({ message: 'Proseso guardado correctamente', returnDetalleUpdate });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ingresar ingresar los valores' })
    }
}

exports.fusionCedazo = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.params.id
        let data = {
            fusion: params.fusion
        }

        let dataCorteCedazo = await sqlConfig.VENTO.query(`
            SELECT REALIZAR, REALIZADO FROM TBL_DETALLEPROCESOS
		    WHERE ID_PROCESO = 7 AND CVE_ART = '${id}'
        `);
        let arrayDetalle = dataCorteCedazo.recordsets
        let secondArray = arrayDetalle[0]
        let returnDetalle = secondArray[0];

        if (!dataCorteCedazo)
            return res.status(400).send({ message: 'Corte de vidrio no encontrado' });

        if (data.fusion > returnDetalle.REALIZAR)
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' });

        let realizarInt = parseInt(returnDetalle.REALIZADO)

        let result = data.fusion + realizarInt;
        let fusionCedazo = await sqlConfig.VENTO.query(`
            UPDATE TBL_DETALLEPROCESOS SET REALIZADO=${result}
            WHERE WHERE ID_PROCESO = 7 AND CVE_ART = '${id}'
        `);
        if (!fusionCedazo)
            return res.status(400).send({ message: 'Cantidad no ingresada' });

        let arrayUpdate = fusionCedazo.recordsets
        let secondArrayUpdate = arrayUpdate[0]
        let returnDetalleUpdate = secondArrayUpdate[0];
        return res.send({ message: 'Proseso guardado correctamente', returnDetalleUpdate });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ingresar ingresar los valores' })
    }
}





/** ---------------------- LIMPIEZA ---------------------- **/
exports.limpiezaHoja = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.params.id
        let data = {
            limpieza: params.limpieza
        }

        let dataCorteHoja = await sqlConfig.VENTO.query(`
            SELECT REALIZAR, REALIZADO FROM TBL_DETALLEPROCESOS
		    WHERE ID_PROCESO = 8 AND CVE_ART = '${id}'
        `);
        let arrayDetalle = dataCorteHoja.recordsets
        let secondArray = arrayDetalle[0]
        let returnDetalle = secondArray[0];

        if (!dataCorteHoja)
            return res.status(400).send({ message: 'Corte de vidrio no encontrado' });

        if (data.limpieza > returnDetalle.REALIZAR)
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' });

        let realizarInt = parseInt(returnDetalle.REALIZADO)

        let result = data.limpieza + realizarInt;
        let limpiezaHoja = await sqlConfig.VENTO.query(`
            UPDATE TBL_DETALLEPROCESOS SET REALIZADO=${result}
            WHERE WHERE ID_PROCESO = 8 AND CVE_ART = '${id}'
        `);
        if (!limpiezaHoja)
            return res.status(400).send({ message: 'Cantidad no ingresada' });

        let arrayUpdate = limpiezaHoja.recordsets
        let secondArrayUpdate = arrayUpdate[0]
        let returnDetalleUpdate = secondArrayUpdate[0];
        return res.send({ message: 'Proseso guardado correctamente', returnDetalleUpdate });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ingresar ingresar los valores' })
    }
}

exports.limpiezaMarco = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.params.id
        let data = {
            limpieza: params.limpieza
        }

        let dataCorteMarco = await sqlConfig.VENTO.query(`
            SELECT REALIZAR, REALIZADO FROM TBL_DETALLEPROCESOS
		    WHERE ID_PROCESO = 9 AND CVE_ART = '${id}'
        `);
        let arrayDetalle = dataCorteMarco.recordsets
        let secondArray = arrayDetalle[0]
        let returnDetalle = secondArray[0];

        if (!dataCorteMarco)
            return res.status(400).send({ message: 'Corte de vidrio no encontrado' });

        if (data.limpieza > returnDetalle.REALIZAR)
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' });

        let realizarInt = parseInt(returnDetalle.REALIZADO)

        let result = data.limpieza + realizarInt;
        let limpiezaMarco = await sqlConfig.VENTO.query(`
            UPDATE TBL_DETALLEPROCESOS SET REALIZADO=${result}
            WHERE WHERE ID_PROCESO = 9 AND CVE_ART = '${id}'
        `);
        if (!limpiezaMarco)
            return res.status(400).send({ message: 'Cantidad no ingresada' });

        let arrayUpdate = limpiezaMarco.recordsets
        let secondArrayUpdate = arrayUpdate[0]
        let returnDetalleUpdate = secondArrayUpdate[0];
        return res.send({ message: 'Proseso guardado correctamente', returnDetalleUpdate });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ingresar ingresar los valores' })
    }
}

exports.colocacionTela = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.params.id
        let data = {
            colocacionTela: params.colocacionTela
        }

        let dataColocacionTela = await sqlConfig.VENTO.query(`
            SELECT REALIZAR, REALIZADO FROM TBL_DETALLEPROCESOS
		    WHERE ID_PROCESO = 10 AND CVE_ART = '${id}'
        `);
        let arrayDetalle = dataColocacionTela.recordsets
        let secondArray = arrayDetalle[0]
        let returnDetalle = secondArray[0];

        if (!dataColocacionTela)
            return res.status(400).send({ message: 'Corte de vidrio no encontrado' });

        if (data.colocacionTela > returnDetalle.REALIZAR)
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' });

        let realizarInt = parseInt(returnDetalle.REALIZADO)

        let result = data.colocacionTela + realizarInt;
        let colocacionTela = await sqlConfig.VENTO.query(`
            UPDATE TBL_DETALLEPROCESOS SET REALIZADO=${result}
            WHERE WHERE ID_PROCESO = 10 AND CVE_ART = '${id}'
        `);
        if (!colocacionTela)
            return res.status(400).send({ message: 'Cantidad no ingresada' });

        let arrayUpdate = colocacionTela.recordsets
        let secondArrayUpdate = arrayUpdate[0]
        let returnDetalleUpdate = secondArrayUpdate[0];
        return res.send({ message: 'Proseso guardado correctamente', returnDetalleUpdate });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ingresar ingresar los valores' })
    }
}




/** ---------------------- ACCESORIOS ---------------------- **/
exports.corteBatiente = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.params.id
        let data = {
            corteBatiente: params.corteBatiente
        }

        let dataCorteBatiente = await sqlConfig.VENTO.query(`
            SELECT REALIZAR, REALIZADO FROM TBL_DETALLEPROCESOS
		    WHERE ID_PROCESO = 11 AND CVE_ART = '${id}'
        `);
        let arrayDetalle = dataCorteBatiente.recordsets
        let secondArray = arrayDetalle[0]
        let returnDetalle = secondArray[0];

        if (!dataCorteBatiente)
            return res.status(400).send({ message: 'Corte de vidrio no encontrado' });

        if (data.corteBatiente > returnDetalle.REALIZAR)
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' });

        let realizarInt = parseInt(returnDetalle.REALIZADO)

        let result = data.corteBatiente + realizarInt;
        let corteBatiente = await sqlConfig.VENTO.query(`
            UPDATE TBL_DETALLEPROCESOS SET REALIZADO=${result}
            WHERE WHERE ID_PROCESO = 11 AND CVE_ART = '${id}'
        `);
        if (!corteBatiente)
            return res.status(400).send({ message: 'Cantidad no ingresada' });

        let arrayUpdate = corteBatiente.recordsets
        let secondArrayUpdate = arrayUpdate[0]
        let returnDetalleUpdate = secondArrayUpdate[0];
        return res.send({ message: 'Proseso guardado correctamente', returnDetalleUpdate });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ingresar ingresar los valores' })
    }
}

exports.colocacionBatiente = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.params.id
        let data = {
            colocacionBatiente: params.colocacionBatiente
        }

        let dataColocacionBatiente = await sqlConfig.VENTO.query(`
            SELECT REALIZAR, REALIZADO FROM TBL_DETALLEPROCESOS
		    WHERE ID_PROCESO = 12 AND CVE_ART = '${id}'
        `);
        let arrayDetalle = dataColocacionBatiente.recordsets
        let secondArray = arrayDetalle[0]
        let returnDetalle = secondArray[0];

        if (!dataColocacionBatiente)
            return res.status(400).send({ message: 'Colocacion de vidrio no encontrado' });

        if (data.colocacionBatiente > returnDetalle.REALIZAR)
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' });

        let realizarInt = parseInt(returnDetalle.REALIZADO)

        let result = data.colocacionBatiente + realizarInt;
        let colocacionBatiente = await sqlConfig.VENTO.query(`
            UPDATE TBL_DETALLEPROCESOS SET REALIZADO=${result}
            WHERE WHERE ID_PROCESO = 12 AND CVE_ART = '${id}'
        `);
        if (!colocacionBatiente)
            return res.status(400).send({ message: 'Cantidad no ingresada' });

        let arrayUpdate = colocacionBatiente.recordsets
        let secondArrayUpdate = arrayUpdate[0]
        let returnDetalleUpdate = secondArrayUpdate[0];
        return res.send({ message: 'Proseso guardado correctamente', returnDetalleUpdate });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ingresar ingresar los valores' })
    }
}

exports.tapajambas = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.params.id
        let data = {
            tapajambas: params.tapajambas
        }

        let dataTapajambas = await sqlConfig.VENTO.query(`
            SELECT REALIZAR, REALIZADO FROM TBL_DETALLEPROCESOS
		    WHERE ID_PROCESO = 13 AND CVE_ART = '${id}'
        `);
        let arrayDetalle = dataTapajambas.recordsets
        let secondArray = arrayDetalle[0]
        let returnDetalle = secondArray[0];

        if (!dataTapajambas)
            return res.status(400).send({ message: 'Colocacion de vidrio no encontrado' });

        if (data.tapajambas > returnDetalle.REALIZAR)
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' });

        let realizarInt = parseInt(returnDetalle.REALIZADO)

        let result = data.tapajambas + realizarInt;
        let tapajambas = await sqlConfig.VENTO.query(`
            UPDATE TBL_DETALLEPROCESOS SET REALIZADO=${result}
            WHERE WHERE ID_PROCESO = 13 AND CVE_ART = '${id}'
        `);
        if (!tapajambas)
            return res.status(400).send({ message: 'Cantidad no ingresada' });

        let arrayUpdate = tapajambas.recordsets
        let secondArrayUpdate = arrayUpdate[0]
        let returnDetalleUpdate = secondArrayUpdate[0];
        return res.send({ message: 'Proseso guardado correctamente', returnDetalleUpdate });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ingresar ingresar los valores' })
    }
}

exports.reticula = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.params.id
        let data = {
            reticula: params.reticula
        }

        let dataReticula = await sqlConfig.VENTO.query(`
            SELECT REALIZAR, REALIZADO FROM TBL_DETALLEPROCESOS
		    WHERE ID_PROCESO = 14 AND CVE_ART = '${id}'
        `);
        let arrayDetalle = dataReticula.recordsets
        let secondArray = arrayDetalle[0]
        let returnDetalle = secondArray[0];

        if (!dataReticula)
            return res.status(400).send({ message: 'Colocacion de vidrio no encontrado' });

        if (data.reticula > returnDetalle.REALIZAR)
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' });

        let realizarInt = parseInt(returnDetalle.REALIZADO)

        let result = data.reticula + realizarInt;
        let reticula = await sqlConfig.VENTO.query(`
            UPDATE TBL_DETALLEPROCESOS SET REALIZADO=${result}
            WHERE WHERE ID_PROCESO = 14 AND CVE_ART = '${id}'
        `);
        if (!reticula)
            return res.status(400).send({ message: 'Cantidad no ingresada' });

        let arrayUpdate = reticula.recordsets
        let secondArrayUpdate = arrayUpdate[0]
        let returnDetalleUpdate = secondArrayUpdate[0];
        return res.send({ message: 'Proseso guardado correctamente', returnDetalleUpdate });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ingresar ingresar los valores' })
    }
}

exports.armado = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.params.id
        let data = {
            armado: params.armado
        }

        let dataArmado = await sqlConfig.VENTO.query(`
            SELECT REALIZAR, REALIZADO FROM TBL_DETALLEPROCESOS
		    WHERE ID_PROCESO = 15 AND CVE_ART = '${id}'
        `);
        let arrayDetalle = dataArmado.recordsets
        let secondArray = arrayDetalle[0]
        let returnDetalle = secondArray[0];

        if (!dataArmado)
            return res.status(400).send({ message: 'Colocacion de vidrio no encontrado' });

        if (data.armado > returnDetalle.REALIZAR)
            return res.status(400).send({ message: 'La cantidad ingresada supera lo que se debe realizar' });

        let realizarInt = parseInt(returnDetalle.REALIZADO)

        let result = data.armado + realizarInt;
        let armado = await sqlConfig.VENTO.query(`
            UPDATE TBL_DETALLEPROCESOS SET REALIZADO=${result}
            WHERE WHERE ID_PROCESO = 15 AND CVE_ART = '${id}'
        `);
        if (!armado)
            return res.status(400).send({ message: 'Cantidad no ingresada' });

        let arrayUpdate = armado.recordsets
        let secondArrayUpdate = arrayUpdate[0]
        let returnDetalleUpdate = secondArrayUpdate[0];
        return res.send({ message: 'Proseso guardado correctamente', returnDetalleUpdate });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ingresar ingresar los valores' })
    }
}