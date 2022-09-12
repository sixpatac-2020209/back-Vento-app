'use strict';
const sqlConfig = require('../../../configs/sqlConfig');
const sql = require('mssql');

exports.getClientes = async (req, res) => {
    try {

        let clientes = await sqlConfig.dbconnection.query('SELECT * FROM CLIE02');
        let arrayClientes = clientes.recordsets
        let returnClientes = arrayClientes[0]
        if (!clientes) {
            return res.status(400).send({ message: 'Clientes no encontrados' })
        }
        else {
            return res.send({returnClientes});
        }

    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error al obtener los clientes', err });
    }
}

exports.getCliente = async (req, res) => {
    try {
        const dataCliente = req.body.clave;
        const cliente = await sqlConfig.dbconnection.query(`SELECT * FROM CLIE02 WHERE RTRIM(LTRIM(CLAVE))='${dataCliente}'`);
        let clienteEncontrado = cliente.recordsets[0]
        if (clienteEncontrado.length === 0) {
            return res.status(400).send({ message: 'Cliente no encontrado' });
        }
        else {
            return res.send({ message: 'Cliente encontrado', clienteEncontrado });
        }

    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error al obtener el cliente', err });
    }
}