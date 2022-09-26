'use strict';
const sqlConfig = require('../../../configs/sqlConfig');
const sql = require('mssql');

//FUNCIONES PÚBLICAS
exports.vendedoresTest = async (req, res) => {
    return res.send({ message: 'Modúlo de vendedores corriendo' })
}

exports.getVendedores = async (req, res) => {
    try {
        let vendedores = await sqlConfig.dbconnection.query(`SELECT * FROM VEND02 `);
        let arrayVendedores = vendedores.recordsets
        let returnVendedores = arrayVendedores[0];

        if (!returnVendedores) {
            return res.status(400).send({ message: 'Clientes no encontrados' })
        }
        else {
            return res.send({ returnVendedores });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener a los vendedores' });
    }
};

exports.getVendedor = async (req, res) => {
    try {
        let id = req.params.id;
        let vendedor = await sqlConfig.dbconnection.query(`SELECT * FROM VEND02 WHERE RTRIM(LTRIM(CVE_VEND)) = ${id}`);
        let arrayVendedor = vendedor.recordsets;
        let returnVendedor = arrayVendedor[0];
        if (!vendedor) {
            return res.status(400).send({ message: 'Vendedor no encontrados' })
        }
        else {
            if (returnVendedor.length === 0) {
                return res.status(400).send({ message: 'Cliente no encontrado' });
            } else {
                return res.send({ message: 'Vendedor encontrado', returnVendedor });
            }
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener al Vendedor' });
    }
};