'use strict'

const sqlConfig = require('../../../../configs/sqlConfig');
const { validateData } = require('../../utils/validate');

/* Función de prueba de conectividad */
exports.detalleProcesosTest = async (req, res) => {
    await res.send({ message: 'Modúlo de detalleProcesos corriendo' })
}

exports.getDetallesProcesos = async (req, res) => {
    try {
        let detallesProcesos = await sqlConfig.VENTO.query(`
    SELECT * FROM TBL_DETALLEPROCESOS
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
        SELECT * FROM TBL_DETALLEPROCESOS WHERE LTRIM(RTRIM(ID_DETALLEPROCESO)) = ${id}
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