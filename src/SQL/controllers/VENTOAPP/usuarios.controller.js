'use strict'
const sqlConfig = require('../../../../configs/sqlConfig');
const { validateData } = require('../../utils/validate');

/* Función de prueba de conectividad */
exports.autorizacionTest = async (req, res) => {
    await res.send({ message: 'Modúlo de autorizaciones corriendo' })
}

exports.addUserSQL = async (req, res) => {
    try {
        const params = req.body;
        const data = {
            nombre: params.name,
            apellido: params.surname,
            contraseña: params.password,
            correo: params.correo,
            role: params.role
        }
        
        let validateUser = await sqlConfig.VENTO.query(`
          SELECT * FROM TBL_USUARIOS WHERE CORREO = '${data.correo}'
        `);

        if (validateUser.recordset.length !== 0) {
            return res.status(400).send({ message: 'Orden creada anteriormente' });
        }

        let newUserSAE = sqlConfig.VENTO.query(`
            INSERT INTO TBL_USUARIOS ( NOMBRE, APELLIDO , CONTRASEÑA, CORREO, ROL)
            VALUES ('${data.nombre}', '${data.apellido}', ${data.contraseña} ,'${data.correo}','${data.role}');
        `)

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al crear el Usuario', err })
    }
}

exports.updateUserSQL = async (req, res) => {
    try {
        const params = req.body;
        const data = {
            nombre: params.name,
            apellido: params.surname,
            contraseña: params.password,
            usuario: params.username,
            role: params.role
        }


    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al actualizar el Usuario', err })
    }
}

exports.deleteUserSQL = async (req, res) => {
    try {
        const params = req.body;
        const data = {
            nombre: params.name,
            apellido: params.surname,
            contraseña: params.password,
            usuario: params.username,
            role: params.role
        }


    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al eliminar el Usuario', err })
    }
}