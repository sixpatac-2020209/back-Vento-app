'use strict'

let sqlConfig = require('../../../../configs/sqlConfigVENTO-APP')
const { validateData } = require('../../utils/validate');

/* Función de prueba de conectividad */
exports.faseTest = async (req, res) => {
    await res.send({ message: 'Modúlo de fase corriendo' })
}

exports.getFases = async (req, res) =>{
    try {
        let fases = await sqlConfig.dbconnection.query(`
        SELECT * FROM TBL_FASE
        `);
        let arrayFases = fases.recordsets
        let returnFases = arrayFases[0];


        if(!fases){
            return res.status(400).send({message: 'Fases no encontradas'});
        } else{
            return res.send({ returnFases });        
        }
        
    } catch (err) {
        console.log(err);
        return res.status(500).send({message: 'Error al obtener las fases'});
    }
}

exports.getFase = async (req, res) =>{
    try {
        let id = req.params.id

        let fase = await sqlConfig.dbconnection.query(`
        SELECT * FROM TBL_FASE WHERE LTRIM(RTRIM(ID_FASE)) = '${id}'
        `);

        let arrayFase = fase.recordsets;
        let returnFase = arrayFase[0];

        if(!fase){
            return res.status(400).send({message: 'Fase no encontrada'})
        } else{
            return res.send({ returnFase });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({message: 'Error al obtener la Fase'});

    }
}