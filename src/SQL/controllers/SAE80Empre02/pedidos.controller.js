'use strict';
const sqlConfig = require('../../../../configs/sqlConfig');
const { validateData } = require('../../utils/validate');

//FUNCIONES PÚBLICAS
exports.pedidosTest = async (req, res) => {
    await res.send({ message: 'Modúlo de pedidos corriendo' })
}

//// ADMIN
exports.getPedidos = async (req, res) => {
    try {
        let Pedidos = await sqlConfig.SAE.query(`
        SELECT F.CVE_DOC,  CONCAT('$. ', CONVERT(VARCHAR(50), CAST(ROUND(F.IMPORTE/F.TIPCAMB, 2, 1) AS MONEY ),1)) IMPORTE ,
        F.CVE_CLPV, C.NOMBRE, F.CVE_VEND, V.NOMBRE, F.SERIE FROM FACTP02 F
        INNER JOIN VEND02 V ON F.CVE_VEND = V.CVE_VEND
        INNER JOIN CLIE02 C ON C.CLAVE = F.CVE_CLPV
		WHERE F.SERIE = 'EXP' and F.STATUS <> 'C'`);

        let arrayPedidos = Pedidos.recordsets;
        let returnPedidos = arrayPedidos[0];
        if (!returnPedidos) {
            return res.status(400).send({ message: 'Pedidos no encontrados' });
        } else {
            return res.send({ returnPedidos })
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener los pedidos', err })
    }
};

exports.getPedidosPorMes = async (req, res) => {
    try {
        let params = req.body
        let data = {
            DATED: params.DATED
        };

        console.log(data)
        let dateSplit = data.DATED.split('-');
        let yearP = dateSplit[0];
        let monthP = dateSplit[1]

        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let Pedidos = await sqlConfig.SAE.query(`
        SELECT F.CVE_DOC,  CONCAT('$. ', CONVERT(VARCHAR(50), CAST(ROUND(F.IMPORTE/F.TIPCAMB, 2, 1) AS MONEY ),1)) IMPORTE ,
        F.CVE_CLPV, C.NOMBRE, F.CVE_VEND, V.NOMBRE, F.SERIE
        FROM FACTP02 F
        INNER JOIN VEND02 V ON F.CVE_VEND = V.CVE_VEND
        INNER JOIN CLIE02 C ON C.CLAVE = F.CVE_CLPV
		WHERE F.SERIE = 'EXP' and F.STATUS <> 'C'
        AND YEAR(F.FECHA_DOC) = '${yearP}'
        AND MONTH(F.FECHA_DOC)= '${monthP}'`);

        let arrayPedidos = Pedidos.recordsets
        let returnPedidosPorMes = arrayPedidos[0];
        if (!Pedidos) {
            return res.status(400).send({ message: 'Pedidos no encontrados' })
        }
        else {
            return res.send({ returnPedidosPorMes });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener los pedidos', err })
    }
};

/// VENDEDOR
exports.getPedidosPorCliente = async (req, res) => {
    try {
        let params = req.body;
        let data = {
            cliente: params.cliente
        }

        let pedidosVendedor = await sqlConfig.SAE.query(`
        SELECT * FROM FACTP02 F INNER JOIN CLIE02 C ON F.CVE_CLPV = C.CLAVE
        WHERE RTRIM(LTRIM(CVE_CLPV)) = '${data.cliente}'
        AND TIP_DOC_SIG IS NULL AND F.STATUS<>'C'`);

        let arrayPedidosVendedor = pedidosVendedor.recordsets
        let returnPedidosVendedor = arrayPedidosVendedor[0];

        if (!pedidosVendedor) {
            return res.status(400).send({ message: 'Pedidos no encontrados' });
        }
        else {
            return res.send({ returnPedidosVendedor });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener los pedidos', err })
    }
};


///Global
exports.getPedido = async (req, res) => {
    try {
        let id = req.params.id;
        let Pedido = await sqlConfig.SAE.query(`
        SELECT F.CVE_DOC, P.CANT, P.CVE_ART, P.TOT_PARTIDA, F.FECHAELAB, F.CVE_VEND, V.NOMBRE, F.CVE_CLPV, C.NOMBRE, F.SERIE,
        CONCAT('$. ', CONVERT(VARCHAR(50), CAST(ROUND(F.IMPORTE/F.TIPCAMB, 2, 1) AS MONEY ),1)) IMPORTE
        FROM FACTP02 F
        INNER JOIN PAR_FACTP02 P ON P.CVE_DOC = F.CVE_DOC
        INNER JOIN INVE02 I ON P.CVE_ART=I.CVE_ART
        INNER JOIN VEND02 V ON F.CVE_VEND = V.CVE_VEND
        INNER JOIN CLIE02 C ON C.CLAVE = F.CVE_CLPV
        WHERE F.CVE_DOC = '${id}'`);
        let arrayPedido = Pedido.recordsets
        let secondArray = arrayPedido[0];
        let returnPedido = secondArray[0];

        let pedidoToOrden = await sqlConfig.SAE.query(`
        SELECT 
            LTRIM(RTRIM(C.CLAVE)) CLAVE,
            LTRIM(RTRIM(V.CVE_VEND)) CVE_VEND, 
            LTRIM(RTRIM(F.CVE_DOC)) CVE_DOC 

            FROM CLIE02 C  
            INNER JOIN FACTP02 F ON F.CVE_CLPV = C.CLAVE
            INNER JOIN VEND02 V ON F.CVE_VEND = V.CVE_VEND
	        WHERE C.STATUS = 'A' AND RTRIM(LTRIM(F.CVE_DOC)) = '${id}'
            `);
        let arrayPedidoToOrden = pedidoToOrden.recordsets
        let secondArrayToOrden = arrayPedidoToOrden[0];
        let returnPedidoToOrden = secondArrayToOrden[0];


        if (returnPedido.length === 0) {
            return res.status(400).send({ message: 'Pedido no encontrado' });
        } else if (returnPedidoToOrden.length === 0) {
            return res.status(400).send({ message: 'Pedido para la orden    no encontrado' });
        }
        else {
            return res.send({ message: 'Pedido encontrado', returnPedido, returnPedidoToOrden });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener el pedido', err })
    }
};

exports.getDetallePedido = async (req, res) => {
    try {
        let id = req.params.id;
        let Pedido = await sqlConfig.SAE.query(`
        SELECT P.CVE_DOC, I.DESCR, P.CANT, P.CVE_ART, F.CVE_OBS, F.STR_OBS ,
        CONCAT('$.', CONVERT(VARCHAR(50), CAST(ROUND(I.COSTO_PROM, 2, 1) AS MONEY ),1)) COSTO_PROM ,
		    CONCAT('$.', CONVERT(VARCHAR(50), CAST(ROUND((P.CANT*P.PREC)/T.TIPCAMB, 2, 1) AS MONEY ),1)) IMPORTE
        FROM PAR_FACTP02 P
        INNER JOIN OBS_DOCF02 F ON P.CVE_OBS = F.CVE_OBS
        INNER JOIN INVE02 I ON I.CVE_ART = P.CVE_ART
		    INNER JOIN FACTP02 T ON T.CVE_DOC = P.CVE_DOC
        WHERE LTRIM(RTRIM(P.CVE_DOC)) = '${id}'`);
        let arrayPedido = Pedido.recordsets
        let returnDetalle = arrayPedido[0];

        if (returnDetalle.length === 0) {
            return res.status(400).send({ message: 'Pedido no encontrado' });
        }
        else {
            return res.send({ message: 'Pedido encontrado', returnDetalle });
        }

    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error al obtener el Detalle de Pedido' })
    }
}
