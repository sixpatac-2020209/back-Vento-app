'use strict'

let sqlConfig = require('../../../../configs/sqlConfigVENTO-APP')
const { validateData } = require('../../utils/validate');

/* Función de prueba de conectividad */
exports.procesosTest = async (req, res) => {
    await res.send({ message: 'Modúlo de procesos corriendo' })
}

exports.getProcesos = async (req, res) =>{
    try {
        let procesos = await sqlConfig.dbconnection.query(`
        SELECT * FROM TBL_PROCESOS
        `);

        let arrayProcesos = procesos.recordsets;
        let returnProcesos = arrayProcesos[0];

        if(!procesos){
            return res.status(400).send({message: 'Procesos no encontrados'})
        } else{
            return res.send({ returnProcesos });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({message: 'Error al obtener los Procesos'});

    }
}

exports.getProceso = async (req, res) =>{
    try {
        let id = req.params.id

        let proceso = await sqlConfig.dbconnection.query(`
        SELECT * FROM TBL_PROCESOS WHERE LTRIM(RTRIM( ID_PROCESO )) = '${id}'
        `);

        let arrayProceso = proceso.recordsets;
        let returnProceso = arrayProceso[0];

        if(!proceso){
            return res.status(400).send({message: 'Proceso no encontrada'})
        } else{
            return res.send({ returnProceso });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({message: 'Error al obtener la Proceso'});

    }
}