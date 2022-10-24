'use strict'

const sqlConfig = require('../../../../configs/sqlConfig');
const { validateData } = require('../../utils/validate');

/* Función de prueba de conectividad */
exports.autorizacionTest = async (req, res) => {
    await res.send({ message: 'Modúlo de autorizaciones corriendo' })
}

exports.getOrdenesFabri = async (req, res) => {
    try {
        let autorizaciones = await sqlConfig.VENTO.query(`
        SELECT O.CVE_ORDEN, CVE_PEDIDO, A.ESTATUS, C.NOMBRE CLIENTE, V.NOMBRE VENDEDOR, S.DESCRIPCION ID_SEDE 
		FROM TBL_ORDEN O
        INNER JOIN TBL_SEDES S ON S.ID_SEDE = O.ID_SEDE
		INNER JOIN TBL_AUTORIZACION A ON O.CVE_ORDEN = A.CVE_ORDEN
        INNER JOIN SAE80Empre02.dbo.CLIE02 C ON LTRIM(RTRIM(C.CLAVE)) = O.CLIENTE
        INNER JOIN SAE80Empre02.dbo.VEND02 V ON LTRIM(RTRIM(V.CVE_VEND)) = O.VENDEDOR
            WHERE A.ESTATUS = '1'
        `);

        let arrayAuth = autorizaciones.recordsets;
        let returnAuth = arrayAuth[0];

        if (!autorizaciones) {
            return res.status(400).send({ message: 'Orden de Fabricación no encontradas' });

        } else if (returnAuth.length === 0) {
            return res.status(400).send({ message: 'No hay ordenes de fabricación que mostrar' });

        } else {
            return res.send({ returnAuth });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error al obtener las ordenes de fabricación', err });
    }
}

exports.getOrdenFabri = async (req, res) => {
    try {
        let id = req.params.id

        let ordenFabri = await sqlConfig.SAE.query(`
            SELECT  A.CVE_ORDEN, C.CLAVE, C.CLASIFIC, C.CON_CREDITO, C.NOMBRE CLIENTE, C.LOCALIDAD, C.CURP, P.FECHA_DOC, V.NOMBRE VENDEDOR, S.ID_SEDE, U.ESTATUS
	            FROM FACTP02 P
                INNER JOIN PAR_FACTP02 F ON P.CVE_DOC=F.CVE_DOC
                INNER JOIN CLIE02 C ON P.CVE_CLPV=C.CLAVE
                INNER JOIN VEND02 V ON P.CVE_VEND=V.CVE_VEND
                INNER JOIN VENTOAPP.dbo.TBL_ORDEN A ON P.CVE_DOC=A.CVE_PEDIDO
	            INNER JOIN VENTOAPP.dbo.TBL_SEDES S ON A.ID_SEDE = S.ID_SEDE
	            INNER JOIN VENTOAPP.dbo.TBL_AUTORIZACION U ON A.CVE_ORDEN = U.CVE_ORDEN
		    WHERE A.CVE_ORDEN = ${id}
        `);

        let arrayAutorizacion = ordenFabri.recordsets;
        let secondArray = arrayAutorizacion[0]
        let returnAutorizacion = secondArray[0];

        if (!ordenFabri || returnAutorizacion.length === 0) {
            return res.status(400).send({ message: 'Autorización no encontrada' })
        } else {
            return res.send({ returnAutorizacion });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener la Autorización' });

    }
}

exports.getDetalleOrdenFabri = async (req,res)=>{
    try {
    let id = req.params.id;
    let OrdenFabri = await sqlConfig.SAE.query(`
          SELECT F.CVE_ART,I.DESCR, O.STR_OBS,F.CANT,
            CONCAT('$.', CONVERT(VARCHAR(50), CAST(ROUND(F.PREC/P.TIPCAMB, 2, 1) AS MONEY ),1)) PRECIO ,
            CONCAT('$.', CONVERT(VARCHAR(50), CAST(ROUND((F.CANT*F.PREC)/P.TIPCAMB, 2, 1) AS MONEY ),1)) SUBTOTAL,
            CONCAT('$.', CONVERT(VARCHAR(50), CAST(ROUND(P.IMPORTE/P.TIPCAMB, 2, 1) AS MONEY ),1)) IMPORTE

          FROM FACTP02 P
            INNER JOIN PAR_FACTP02 F ON P.CVE_DOC=F.CVE_DOC
            INNER JOIN OBS_DOCF02 O ON P.CVE_OBS=O.CVE_OBS
            INNER JOIN INVE02 I ON F.CVE_ART=I.CVE_ART
            INNER JOIN VENTOAPP.dbo.TBL_ORDEN A ON P.CVE_DOC=A.CVE_PEDIDO
            WHERE A.CVE_ORDEN = '${id}'`);

    let arrayOrden = OrdenFabri.recordsets;
    let returnDetalle = arrayOrden[0];

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