'use strict';
const sqlConfig = require('../../../configs/sqlConfig');

//FUNCIONES PÚBLICAS
exports.pedidosTest = async (req, res) => {
    await res.send({ message: 'Modúlo de pedidos corriendo' })
}

//// ADMIN
exports.getPedidos = async (req, res) => {
    try {
        let Pedidos = await sqlConfig.dbconnection.query(`
        SELECT F.CVE_DOC,P.CVE_ART,I.DESCR,F.CVE_CLPV, C.NOMBRE, F.CVE_VEND, V.NOMBRE FROM FACTP02 F 
        INNER JOIN PAR_FACTP02 P ON P.CVE_DOC = F.CVE_DOC 
        INNER JOIN INVE02 I ON P.CVE_ART=I.CVE_ART
        INNER JOIN VEND02 V ON F.CVE_VEND = V.CVE_VEND 
        INNER JOIN CLIE02 C ON C.CLAVE = F.CVE_CLPV`);

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

exports.getPedidosPorAño = async (req, res) => {
    try {
        let data = req.body.year;
        let Pedidos = await sqlConfig.dbconnection.query(`
        SELECT F.CVE_DOC,P.CVE_ART,I.DESCR,F.CVE_CLPV,C.NOMBRE,V.NOMBRE FROM FACTP02 F 
        INNER JOIN PAR_FACTP02 P ON P.CVE_DOC = F.CVE_DOC 
        INNER JOIN INVE02 I ON P.CVE_ART=I.CVE_ART
        INNER JOIN VEND02 V ON F.CVE_VEND = V.CVE_VEND 
        INNER JOIN CLIE02 C ON C.CLAVE = F.CVE_CLPV
        WHERE YEAR(F.FECHA_DOC)= '${data}'`);

        let arrayPedidos = Pedidos.recordsets
        let returnPedidos = arrayPedidos[0];

        if (!Pedidos) {
            return res.status(400).send({ message: 'Clientes no encontrados' })
        }
        else {
            return res.send({ returnPedidos });
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
            year: params.year,
            month: params.month
        };

        let Pedidos = await sqlConfig.dbconnection.query(`
        SELECT F.CVE_DOC,P.CVE_ART,I.DESCR,F.CVE_CLPV,C.NOMBRE,V.NOMBRE FROM FACTP02 F 
        INNER JOIN PAR_FACTP02 P ON P.CVE_DOC = F.CVE_DOC 
        INNER JOIN INVE02 I ON P.CVE_ART=I.CVE_ART
        INNER JOIN VEND02 V ON F.CVE_VEND = V.CVE_VEND 
        INNER JOIN CLIE02 C ON C.CLAVE = F.CVE_CLPV
        WHERE YEAR(F.FECHA_DOC) = '${data.year}' AND MONTH(F.FECHA_DOC)= '${data.month}'`);

        let arrayPedidos = Pedidos.recordsets
        let returnPedidos = arrayPedidos[0];
        if (!Pedidos) {
            return res.status(400).send({ message: 'Clientes no encontrados' })
        }
        else {
            return res.send({ returnPedidos });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener los pedidos', err })
    }
};


exports.savePedidos = async (req, res) => {

};
exports.updatePedido = async (req, res) => {

};
exports.deletePedido = async (req, res) => {

}


/// VENDEDOR
exports.getPedidosPorCliente = async (req, res) => {
    try {
        let params = req.body;
        let data = {
            cliente: params.cliente
        }

        let pedidosVendedor = await sqlConfig.dbconnection.query(`
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

        let detallePedido = await sqlConfig.dbconnection.query(`
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


exports.guardarPedido = async (req, res) => {

};

exports.editarPedido = async (req, res) => {

};


///Global
exports.getPedido = async (req, res) => {
    try {
        let id = req.params.id;
        let Pedido = await sqlConfig.dbconnection.query(`
        SELECT F.CVE_DOC, P.CANT, P.CVE_ART, P.TOT_PARTIDA, F.FECHAELAB, F.CVE_VEND, V.NOMBRE, F.CVE_CLPV, C.NOMBRE FROM FACTP02 F 
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