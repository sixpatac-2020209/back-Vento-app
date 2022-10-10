'use strict'

let sqlConfig = require('../../../../configs/sqlConfigVENTO-APP')
const { validateData } = require('../../utils/validate');

/* Función de prueba de conectividad */
exports.detalleProcesosTest = async (req, res) => {
    await res.send({ message: 'Modúlo de detalleProcesos corriendo' })
}

exports.getDetallesProcesos = async (req, res) => {
    try {
        let detallesProcesos = await sqlConfig.dbconnection.query(`
    SELECT * FROM TBL_DETALLEPROCESOS
    `);

        let arrayDetalles = detallesProcesos.recordsets
        let returnDetalles = arrayDetalles[0];

        if (!detallesProcesos) {
            return res.status(400).send({ message: 'Detalles de Procesos no encontrados' });

        } else {
            return res.send({ returnDetalles })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener los Detalles de Procesos' });
    }
}

exports.getProgramacion = async (req, res) =>{
    try {
        let id = req.params.id

        let detalleProceso = await sqlConfig.dbconnection.query(`
        SELECT * FROM TBL_DETALLEPROCESOS WHERE LTRIM(RTRIM(ID_DETALLEPROCESO)) = ${id}
        `);

        let arrayProgramacion = detalleProceso.recordsets;
        let returnProgramacion = arrayProgramacion[0];

        if(!detalleProceso){
            return res.status(400).send({message: 'DetalleProceso no encontrada'})
        } else{
            return res.send({ returnProgramacion });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({message: 'Error al obtener la DetalleProceso'});

    }
}