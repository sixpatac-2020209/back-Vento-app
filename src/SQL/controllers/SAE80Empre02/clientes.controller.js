'use strict';
const sqlConfig = require('../../../../configs/sqlConfig');
const sql = require('mssql');

//FUNCIONES PÚBLICAS
exports.clientesTest = async (req, res) => {
    await res.send({ message: 'Modúlo de clientes corriendo' })
}

///ADMIN
exports.getClientes = async (req, res) => {
    try {
        let clientes = await sqlConfig.SAE.query('SELECT * FROM CLIE02');
        let arrayClientes = clientes.recordsets
        let returnClientes = arrayClientes[0]
        if (!clientes) {
            return res.status(400).send({ message: 'Clientes no encontrados' })
        }
        else {
            return res.send({ returnClientes });
        }

    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error al obtener los clientes', err });
    }
}


////VENDEDOR
exports.getClientesVendedor = async (req, res) => {
    try {

        let clientes = await sqlConfig.SAE.query(`SELECT CLAVE, NOMBRE FROM CLIE02 WHERE STATUS = 'A'`);
        let arrayClientes = clientes.recordsets
        let returnClientes = arrayClientes[0];
        if (!clientes) {
            return res.status(400).send({ message: 'Clientes no encontrados' })
        }
        else {
            return res.send({ returnClientes });
        }

    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error al obtener los clientes', err });
    }
}

////GLOBAL
exports.getCliente = async (req, res) => {
    try {
        const dataCliente = req.params.id;
        const cliente = await sqlConfig.SAE.query(`SELECT * FROM CLIE02 WHERE CLAVE='${dataCliente}'`);
        let arrayCliente = cliente.recordsets
        let secondArray = arrayCliente[0]
        let clienteEncontrado = secondArray[0]

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

exports.getClientePipeId = async (req, res) => {
    try {
        let result = req.body.search
        this.ClientePipe = await sqlConfig.SAE.query(`
    SELECT F.CVE_DOC ,P.CANT, P.CVE_ART, P.TOT_PARTIDA, F.FECHAELAB, F.CVE_VEND, V.NOMBRE, F.CVE_CLPV, C.NOMBRE FROM FACTP02 F 
        INNER JOIN PAR_FACTP02 P ON P.CVE_DOC = F.CVE_DOC 
        INNER JOIN INVE02 I ON P.CVE_ART=I.CVE_ART
        INNER JOIN VEND02 V ON F.CVE_VEND = V.CVE_VEND 
        INNER JOIN CLIE02 C ON C.CLAVE = F.CVE_CLPV
        WHERE RTRIM(LTRIM(F.CVE_DOC))= '${result}';
    `);
        let arrayCliente = this.ClientePipe.recordsets
        let secondArray = arrayCliente[0]
        let clienteEncontrado = secondArray[0]

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

