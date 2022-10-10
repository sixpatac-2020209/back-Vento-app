'use strict'

let sqlConfig = require('../../../../configs/sqlConfigVENTO-APP')
const { validateData } = require('../../utils/validate');

/* Función de prueba de conectividad */
exports.programaciónTest = async (req, res) => {
    await res.send({ message: 'Modúlo de programación corriendo' })
}

exports.getProgramaciones = async (req, res) =>{
    try {
        let programaciones = await sqlConfig.dbconnection.query(`
        SELECT * FROM TBL_PROCESOS
        `);

        let arrayProgramaciones = programaciones.recordsets;
        let returnProgramaciones = arrayProgramaciones[0];

        if(!programacion){
            return res.status(400).send({message: 'Programaciones no encontradas'})
        } else{
            return res.send({ returnProgramaciones });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({message: 'Error al obtener la Programacion'});

    }
}

exports.getProgramacion = async (req, res) =>{
    try {
        let id = req.params.id

        let programacion = await sqlConfig.dbconnection.query(`
        SELECT * FROM TBL_PROGRAMACION WHERE LTRIM(RTRIM(ID_PROGRAMACION)) = '${id}'
        `);

        let arrayProgramacion = programacion.recordsets;
        let returnProgramacion = arrayProgramacion[0];

        if(!programacion){
            return res.status(400).send({message: 'Programacion no encontrada'})
        } else{
            return res.send({ returnProgramacion });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({message: 'Error al obtener la Programacion'});

    }
}