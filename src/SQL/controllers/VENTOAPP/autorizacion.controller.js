'use strict'

const sqlConfig = require('../../../../configs/sqlConfig');
const { validateData } = require('../../utils/validate');

/* Función de prueba de conectividad */
exports.autorizacionTest = async (req, res) => {
    await res.send({ message: 'Modúlo de autorizaciones corriendo' })
}

exports.getAutorizaciones = async (req, res) => {
    try {
        let autorizaciones = await sqlConfig.VENTO.query(`
        SELECT 
        CVE_ORDEN, CVE_PEDIDO, ESTATUS, C.NOMBRE CLIENTE, 
        FECHA_INGRESO, FECHA_TERMINA,  V.NOMBRE VENDEDOR, 
        S.DESCRIPCION ID_SEDE, AUTORIZACIÓN FROM TBL_ORDEN O
        INNER JOIN TBL_SEDES S ON S.ID_SEDE = O.ID_SEDE
        INNER JOIN SAE80Empre02.dbo.CLIE02 C ON LTRIM(RTRIM(C.CLAVE)) = O.CLIENTE
        INNER JOIN SAE80Empre02.dbo.VEND02 V ON LTRIM(RTRIM(V.CVE_VEND)) = O.VENDEDOR
        
        `);

        let arrayAuth = autorizaciones.recordsets;
        let returnAuth = arrayAuth[0];

        if (!autorizaciones) {
            return res.status(400).send({ message: 'Autorizaciones no encontradas' });

        } else if (returnAuth.length === 0) {
            return res.status(400).send({ message: 'No hay fases que mostrar' });

        } else {
            return res.send({ returnAuth });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error al obtener las autorizaciones', err });
    }
}

exports.getAutorizacion = async (req, res) => {
    try {
        let id = req.params.id

        let autorizacion = await sqlConfig.SAE.query(`
            SELECT  A.CVE_ORDEN, C.CLAVE, C.CLASIFIC, C.CON_CREDITO, C.NOMBRE CLIENTE, C.LOCALIDAD, C.CURP, P.FECHA_DOC, V.NOMBRE VENDEDOR, A.AUTORIZACIÓN, S.ID_SEDE

            FROM FACTP02 P
            INNER JOIN PAR_FACTP02 F ON P.CVE_DOC=F.CVE_DOC
            INNER JOIN CLIE02 C ON P.CVE_CLPV=C.CLAVE
            INNER JOIN VEND02 V ON P.CVE_VEND=V.CVE_VEND
            INNER JOIN VENTOAPP.dbo.TBL_ORDEN A ON P.CVE_DOC=A.CVE_PEDIDO
			INNER JOIN VENTOAPP.dbo.TBL_SEDES S ON A.ID_SEDE = S.ID_SEDE
            WHERE A.CVE_ORDEN =${id}
        `);
        
        let arrayAutorizacion = autorizacion.recordsets;
        let secondArray = arrayAutorizacion[0]
        let returnAutorizacion = secondArray[0];

        if (!autorizacion || returnAutorizacion.length === 0) {
            return res.status(400).send({ message: 'Autorización no encontrada' })
        } else {
            return res.send({ returnAutorizacion });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener la Autorización' });

    }
}

exports.getDetalleAutorizacion = async (req, res) => {
  try {
    let id = req.params.id;
    let Orden = await sqlConfig.SAE.query(`
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

    let arrayOrden = Orden.recordsets;
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

exports.getImporteAutorizacion = async (req, res) => {
  try {
    let id = req.params.id;
    let Orden = await sqlConfig.SAE.query(`
          SELECT 
            CONCAT('$.', CONVERT(VARCHAR(50), CAST(ROUND(P.IMPORTE/P.TIPCAMB, 2, 1) AS MONEY ),1)) IMPORTE

          FROM FACTP02 P
            INNER JOIN PAR_FACTP02 F ON P.CVE_DOC=F.CVE_DOC
            INNER JOIN OBS_DOCF02 O ON P.CVE_OBS=O.CVE_OBS
            INNER JOIN INVE02 I ON F.CVE_ART=I.CVE_ART
            INNER JOIN VENTOAPP.dbo.TBL_ORDEN A ON P.CVE_DOC=A.CVE_PEDIDO
            WHERE A.CVE_ORDEN = '${id}'`);

    let arrayOrden = Orden.recordsets;
    let secondArray = arrayOrden[0]
    let returnImporte = secondArray[0];

    if (returnImporte.length === 0) {
      return res.status(400).send({ message: 'Pedido no encontrado' });
    }
    else {
      return res.send({ message: 'Pedido encontrado', returnImporte });
    }

  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: 'Error al obtener el Detalle de Pedido' })
  }
}

exports.Autorizar = async (req, res) => {
    try {
        const hoy = Date.now();
        const newDate = new Date(hoy)
        let dateString = newDate.toLocaleDateString()

        let id = req.params.id
        let params = req.body.ID_USUARIO
        let data = {
            FECHA: dateString,
            ID_USUARIO: params.ID_USUARIO,
            ESTATUS: 0
        }

        let autorizar = await sqlConfig.VENTO.query(`
            INSERT INTO TBL_AUTORIZACION (CVE_ORDEN, ESTATUS, FECHA , ID_USUARIO)
            VALUES ('${id}', '${data.ESTATUS}', ${data.FECHA} ,'${data.ID_USUARIO}');

            UPDATE TBL_ORDEN SET ESTATUS = '1' , FECHA_TERMINA = '${data.FECHA}'
            WHERE LTRIM(RTRIM(CVE_ORDEN)) = '${id}'
        `);
        let arrayAuth = autorizar.recordsets;
        let returnAuth = arrayAuth[0];

        if (!autorizar) {
            return res.status(400).send({ message: 'Orden no autorizada' });
        } else {
            return res.send({ message: 'Orden autorizada correctamente', returnAuth });
        }   

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al autorizar la orden.', err});

    }
}

//Rechazar

exports.getOrdenesAutorizadas = async (req, res) => {
    try {
        let autorizaciones = await sqlConfig.VENTO.query(`SELECT * FROM TBL_AUTORIZACION WHERE STATUS = '1'`);

        let arrayAuth = autorizaciones.recordsets;
        let returnAuth = arrayAuth[0];

        if (!autorizaciones) {
            return res.status(400).send({ message: 'Autorizaciones no encontradas' });

        } else if (returnAuth.length === 0) {
            return res.status(400).send({ message: 'No hay fases que mostrar' });

        } else {
            return res.send({ returnAuth });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error al obtener las autorizaciones', err });
    }
}