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
        console.log(data.date)
        let dateSplit = data.date.split('-');       
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



exports.getDetallePedido = async (req, res) => {
    try {
        let idDetallePedido = req.body.idDetallePedido;

        let detallePedido = await sqlConfig.SAE.query(`
        SELECT P.CVE_DOC, P.CVE_ART, I.DESCR, P.CANT, P.PREC, F.IMPORTE FROM PAR_FACTP02 P 
		INNER JOIN INVE02 I ON P.CVE_ART = I.CVE_ART 
		INNER JOIN FACTP02 F ON F.CVE_DOC = P.CVE_DOC
		WHERE RTRIM(LTRIM(P.CVE_DOC)) = '${idDetallePedido}'`);

        let arrayDetalles = detallePedido.recordsets
        let returnDetalles = arrayDetalles[0];

        if (!detallePedido) {
            return res.status(400).send({ message: 'Pedidos no encontrados' });
        }
        else {
            return res.send({ returnDetalles });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener los pedidos', err });

    }
};


///Global
exports.getPedido = async (req, res) => {
    try {
        let id = req.params.id;
        let Pedido = await sqlConfig.SAE.query(`
        SELECT F.CVE_DOC, P.CANT, P.CVE_ART, P.TOT_PARTIDA, F.FECHAELAB, F.CVE_VEND, V.NOMBRE, F.CVE_CLPV, C.NOMBRE, F.SERIE FROM FACTP02 F 
        INNER JOIN PAR_FACTP02 P ON P.CVE_DOC = F.CVE_DOC 
        INNER JOIN INVE02 I ON P.CVE_ART=I.CVE_ART
        INNER JOIN VEND02 V ON F.CVE_VEND = V.CVE_VEND 
        INNER JOIN CLIE02 C ON C.CLAVE = F.CVE_CLPV
        WHERE F.CVE_DOC='${id}'`);
        let arrayPedido = Pedido.recordsets
        let secondArray = arrayPedido[0];
        let returnPedido = secondArray[0];

        if (returnPedido.length === 0) {
            return res.status(400).send({ message: 'Pedido no encontrado' });
        }
        else {
            return res.send({ message: 'Pedido encontrado', returnPedido });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener el pedido', err })
    }
};