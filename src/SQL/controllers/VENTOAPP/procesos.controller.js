'use strict'

let sqlConfig = require('../../../../configs/sqlConfigVENTO-APP')
const { validateData } = require('../../utils/validate');

/* Función de prueba de conectividad */
exports.procesosTest = async (req, res) => {
    await res.send({ message: 'Modúlo de procesos corriendo' })
}