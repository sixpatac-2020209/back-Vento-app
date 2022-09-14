'use strict'
const sqlConfig = require('../../../configs/sqlConfig')

exports.vendedorExist = async (userId) => {
    try {
        let exist = await sqlConfig.dbconnection.query(`SELECT nombreVendedor, apellidoVendedor FROM vendedores WHERE idGroup = '${userId}'`);
        let vendedorExist = exist.recordsets;
        let returnVendedor = vendedorExist[0];
        return returnVendedor;
    } catch (err) {
        return err
    }
}

exports.clienteExist = async (userId) => {
    try {
        let exist = await sqlConfig.dbconnection.query(`SELECT nombreCliente, apellidoCliente FROM telegramClientes WHERE idGroup = '${userId}'`);
        let clienteExist = exist.recordsets;
        let returnCliente = clienteExist[0];
        return returnCliente;
    } catch (err) {
        return err
    }
}