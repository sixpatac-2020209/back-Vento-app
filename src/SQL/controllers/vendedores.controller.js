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

exports.addVendedor = async (req, res) => {
    try {
        const params = req.body;
        const data = {
            STATUS: params.STATUS,
            NOMBRE: params.NOMBRE,
            COMI: params.COMI,
            CLASIFIC: params.CLASIFIC,
            CORREOE: params.CORREOE,
        }

        const newVendedor = await dbConfig.dbconnection.query(`
        INSERT INTO VEND02 VALUES (
            '${data.STATUS}',
            '${data.NOMBRE}',
            '${data.COMI}', 
            '${data.CLASIFIC}', 
            '${data.CORREOE}'
            )`);
        
        let arrayNewVendedor = newVendedor.recordsets;
        let returnNewVendedor = arrayNewVendedor[0]; 

        if (!returnNewVendedor) {
            return res.status(400).send({ message: 'Vendedor no creado'})
        }
        else {
            return res.send({ message: 'Vendedor agregado satisfactoriamente', returnNewVendedor });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al agregar vendedor.', err });
    }
}

exports.updateVendedor = async (req, res) => {
    try {
        const vendedorId = req.params.id
        const params = req.body;
        const data = {
            STATUS: params.STATUS,
            NOMBRE: params.NOMBRE,
            COMI: params.COMI,
            CLASIFIC: params.CLASIFIC,
            CORREOE: params.CORREOE,
        }

        const updatedVendedor = await dbConfig.dbconnection.query( `UPDATE vendedores Set 
            STATUS = '${data.STATUS}', 
            NOMBRE = '${data.NOMBRE}', 
            COMI = '${data.COMI}', 
            CLASIFIC = '${data.CLASIFIC}', 
            CORREOE = '${data.CORREOE}' 
            WHERE RTRIM(LTRIM(CVE_VEND)) = ${vendedorId}`
        );
        let arrayVendedorUpsated = updatedVendedor.recordsets
        let returnVendedorUpdated = arrayVendedorUpsated[0]
        if (!updatedVendedor) {
            return res.status(400).send({ message: 'Vendedor no actualizado'})
        }
        else {
            return res.send({ message: 'Vendedor acatualizado satisfactoriamente', returnVendedorUpdated });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al actualizar vendedor.', err });
    }
}

exports.deleteVendedor = async (req, res) => {
    try {
        const vendedorId = parseInt(req.params.id)
        const vendedor = await dbConfig.dbconnection.query(`DELETE FROM VEND02 WHERE RTRIM(LTRIM(CVE_VEND)) = ${vendedorId}`);
        if (!vendedor) {
            return res.status(400).send({ message: 'Vendedor no eliminiado' })
        }
        else {
            return res.send({ message: 'Vendedor vendedor eliminado', vendedor });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error al eliminar el vendedor', err });
    }
}