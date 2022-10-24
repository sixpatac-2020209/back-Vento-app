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
        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let validateUser = await sqlConfig.VENTO.query(`
          SELECT * FROM TBL_USUARIOS WHERE CORREO = '${data.correo}'
        `);
        if (validateUser.recordset.length !== 0) {
            return res.status(400).send({ message: 'Usuario creado anteriormente' });
        }

        let newUserSAE = await sqlConfig.VENTO.query(`
            INSERT INTO TBL_USUARIOS ( NOMBRE, APELLIDO , CONTRASENIA, CORREO, ROL)
            VALUES ('${data.nombre}', '${data.apellido}', ${data.contraseña} ,'${data.correo}','${data.role}');
        `)

        let arrayUser = newUserSAE.recordsets;
        let returnUser = arrayUser[0];

        if (!newUserSAE) {
            return res.status(400).send({ message: 'Usuario no creado' })
        } else {
            return res.send({ message: 'Usuario creado satisfactoriamente', returnUser });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al crear el Usuario', err })
    }
}

exports.updateUserSQL = async (req, res) => {
    try {
        let id = req.params.id
        const params = req.body;
        const data = {
            nombre: params.name,
            apellido: params.surname,
            contraseña: params.password,
            usuario: params.username,
            role: params.role
        }
        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let updateUser = await sqlConfig.VENTO.query(`
            UPDATE TBL_USUARIOS SET 
            NOMBRE = '${data.nombre}', 
            APELLIDO = '${data.apellido}',
            CONTRASEÑA = '${data.contraseña}',
            USUARIO = '${data.usuario}',
            ROL = '${data.role}'
            WHERE ID_USER = '${id}'
        `)
        let arrayUser = updateUser.recordsets;
        let returnUserUpdated = arrayUser[0];

        if (!updateUser) {
            return res.status(400).send({ message: 'Usuario no actualizado' })
        } else {
            return res.send({ message: 'Usuario actualizado satisfactoriamente', returnUserUpdated });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al actualizar el Usuario', err })
    }
}

exports.deleteUserSQL = async (req, res) => {
    try {
        let id = req.params.id
        const params = req.body;
        const data = {
            nombre: params.name,
            apellido: params.surname,
            contraseña: params.password,
            usuario: params.username,
            role: params.role
        }
        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);
        let deleteUser = await sqlConfig.VENTO.query(`
            DELETE FROM TBL_USUARIOS WHERE ID_USUARIO = ${id}
        `);

        let arrayUser = deleteUser.recordsets;
        let returnUserDeleted = arrayUser[0];

        if (!deleteUser) {
            return res.status(400).send({ message: 'Usuario no eliminado' });
        } else {
            return res.send({ message: 'Usuario eliminado satisfactoriamente', returnUserDeleted });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al eliminar el Usuario', err })
    }
}