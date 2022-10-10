'use strict'

let sqlConfig = require('../../../../configs/sqlConfigVENTO-APP')
const { validateData } = require('../../utils/validate');

/* Función de prueba de conectividad */
exports.autorizaciónTest = async (req, res) => {
    await res.send({ message: 'Modúlo de autorizaciones corriendo' })
}

exports.getAutorizaciones = async (req, res) =>{
    try {
        let autorizaciones = await sqlConfig.dbconnection.query(`
        SELECT * FROM TBL_AUTORIZACION
        `);

        let arrayAuth = autorizaciones.recordsets;
        let returnAuth = arrayAuth[0];

        if(!autorizaciones){
            return res.status(400).send({ message: 'Autorizaciones no encontradas' });
        } else {
            return res.send({ returnAuth});
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'Error al obtener las autorizaciones', err});
    }
}

exports.getAutorizacion = async (req, res) =>{
    try {
        let id = req.params.id

        let autorizacion = await sqlConfig.dbconnection.query(`
        SELECT * FROM TBL_PROGRAMACION WHERE LTRIM(RTRIM(ID_PROGRAMACION)) = ${id}
        `);

        let arrayAutorizacion = autorizacion.recordsets;
        let returnAutorizacion = arrayAutorizacion[0];

        if(!autorizacion){
            return res.status(400).send({message: 'Autorizacion no encontrada'})
        } else{
            return res.send({ returnAutorizacion });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({message: 'Error al obtener la Autorizacion'});

    }
}