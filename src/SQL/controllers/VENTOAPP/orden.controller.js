'use strict'

const sqlConfig = require('../../../../configs/sqlConfig');
const { validateData } = require('../../utils/validate');

/* Función de prueba de conectividad */
exports.ordenTest = async (req, res) => {
  await res.send({ message: 'Modúlo de orden corriendo' })
}

exports.getOrdenes = async (req, res) => {
  try {
    let ordenes = await sqlConfig.VENTO.query(`
        SELECT * FROM TBL_ORDEN
        `);

    let arrayOrdenes = ordenes.recordsets;
    let returnOrdenes = arrayOrdenes[0];

    if (!ordenes) {
      return res.status(400).send({ message: 'Ordenes no encontradas' });

    } else if (returnOrdenes.length === 0) {
      return res.status(400).send({ message: 'No hay fases que mostrar' });

    } else {
      return res.send({ returnOrdenes });
    }

  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Error al obtener las Ordenes' });
  }
}

exports.getOrden = async (req, res) => {
  try {
    let id = req.params.id

    let orden = await sqlConfig.SAE.query(`
        SELECT  A.CVE_ORDEN, C.CLAVE, C.CLASIFIC, C.CON_CREDITO, C.NOMBRE CLIENTE, C.LOCALIDAD, C.CURP, P.FECHA_DOC, V.NOMBRE VENDEDOR

        FROM FACTP02 P
        INNER JOIN PAR_FACTP02 F ON P.CVE_DOC=F.CVE_DOC
        INNER JOIN CLIE02 C ON P.CVE_CLPV=C.CLAVE
        INNER JOIN VEND02 V ON P.CVE_VEND=V.CVE_VEND
        INNER JOIN VENTOAPP.dbo.TBL_ORDEN A ON P.CVE_DOC=A.CVE_PEDIDO
        WHERE A.CVE_ORDEN = ${id}

        `);

    let arrayOrden = orden.recordsets;
    let secondArray = arrayOrden[0];
    let returnOrden = secondArray[0];

    if (!orden || returnOrden.length === 0) {
      return res.status(400).send({ message: 'Orden no encontrada' });
    }
    else {
      return res.send({ message: 'Orden encontrada', returnOrden });
    }


  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Error al obtener la Orden' });

  }
}


exports.createOrden = async (req, res) => {
  try {
    const hoy = Date.now();
    const newDate = new Date(hoy)
    let dateString = newDate.toLocaleDateString()

    let params = req.body
    let data = {
      CVE_DOC: params.CVE_DOC,

      CLAVE: params.CLAVE,
      CVE_VEND: params.CVE_VEND,

      ESTATUS: 1,
      FECHA_INGRESO: dateString,
      FECHA_TERMINA: dateString,
      ID_SEDE: params.ID_SEDE,
      SERIE: 'EXP',
    }

    let msg = validateData(data);
    if (msg) return res.status(400).send(msg);

    let newOrden = await sqlConfig.VENTO.query(`
            INSERT INTO TBL_ORDEN
            VALUES( '${data.CVE_DOC}', '${data.ESTATUS}', '${data.CLAVE}', '${data.FECHA_INGRESO}',
            '${data.FECHA_TERMINA}', '${data.CVE_VEND}', '${data.ID_SEDE}', '${data.SERIE}')
        `);

    let arrayNewOrden = newOrden.recordsets;
    let returnNewOrden = arrayNewOrden[0];

    if (!newOrden) {
      return res.status(400).send({ message: 'Orden no encontrada' })
    } else {
      return res.send({ message: 'Orden creada Satisfactoriamente', returnNewOrden });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Error al crear la Orden' });
  }
}


exports.updateOrden = async (req, res) => {
  try {
    let id = req.params.id;

    let params = req.body
    let data = {
      ESTATUS: params.ESTATUS
    }

    let ordenUpdated = await sqlConfig.VENTO.query(`
            UPDATE TBL_ORDEN SET ESTATUS = '${data.ESTATUS}'
            WHERE LTRIM(RTRIM(CVE_ORDEN)) = '${id}'
        `);

    if (!ordenUpdated) {
      return res.status(400).send({ message: 'Orden no actualizada' })
    } else {
      return res.send({ returnOrdenUpdated });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: 'Error al actualizar la Orden' });
  }
}

exports.deleteOrden = async (req, res) => {
  try {
    let id = req.params.id
    let ordenDeleted = await sqlConfig.VENTO.query(`
        DELETE FROM TBL_ORDEN WHERE LTRIM(RTRIM(CVE_ORDEN)) = '${id}'
        `);

    let arrayOrdenDeleted = ordenDeleted.recordsets;
    let returnOrdenDeleted = arrayOrdenDeleted[0];

    if (!ordenDeleted) {
      return res.status(400).send({ message: 'Orden no encontrada' })
    } else {
      return res.send({ message: 'Orden eliminada correctamente' });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: 'Error al eliminar la Orden' });
  }
}

exports.getDetalleOrden = async (req, res) => {
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


exports.getImporteOrden = async (req, res) => {
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
        console.log(returnImporte);

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