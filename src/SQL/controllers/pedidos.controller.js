'use strict';
const sqlConfig = require('../../../configs/sqlConfig');

exports.getPedidos = async (req, res) => {
    try {
        let Pedidos = await sqlConfig.dbconnection.query(`
        SELECT F.CVE_DOC,P.CVE_ART,I.DESCR,F.CVE_CLPV,C.NOMBRE,V.NOMBRE  E FROM FACTP02 F 
        INNER JOIN PAR_FACTP02 P ON P.CVE_DOC = F.CVE_DOC 
        INNER JOIN INVE02 I ON P.CVE_ART=I.CVE_ART
        INNER JOIN VEND02 V ON F.CVE_VEND = V.CVE_VEND 
        INNER JOIN CLIE02 C ON C.CLAVE = F.CVE_CLPV
        WHERE YEAR(F.FECHA_DOC)='2022'`);
        let arrayPedidos = Pedidos.recordsets
        let returnPedidos = arrayPedidos[0];
        if (!Pedidos) {
            return res.status(400).send({ message: 'Clientes no encontrados' })
        }
        else {
            return res.send({returnPedidos});
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener los pedidos', err })
    }
};