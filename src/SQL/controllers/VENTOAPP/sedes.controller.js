'use strict'

let sqlConfig = require('../../../../configs/sqlConfigVENTO-APP')
const { validateData } = require('../../utils/validate');


/* Función de prueba de conectividad */
exports.sedesTest = async (req, res) => {
    await res.send({ message: 'Modúlo de sedes corriendo' })
}

exports.getSedes = async (req, res) =>{
    try {
        let sedes = await sqlConfig.dbconnection.query(`
        SELECT * FROM TBL_SEDES
        `);

        let arraySedes = sedes.recordsets;
        let returnSedes = arraySedes[0];

        if(!sedes){
            return res.status(400).send({message: 'Sedes no encontrados'})
        } else{
            return res.send({ returnSedes });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({message: 'Error al obtener las Sedes'});

    }
}

exports.getSede = async (req, res) =>{
    try {
        let id = req.params.id

        let sede = await sqlConfig.dbconnection.query(`
        SELECT * FROM TBL_SEDES where LTRIM(RTRIM(ID_SEDE )) = '${id}'
        `);

        let arraySede = sede.recordsets;
        let returnSede = arraySede[0];

        if(!sedes){
            return res.status(400).send({message: 'Sede no encontrada'})
        } else{
            return res.send({ returnSede });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({message: 'Error al obtener la Sede'});

    }
}