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

        let orden = await sqlConfig.VENTO.query(`
        SELECT * FROM TBL_ORDEN WHERE LTRIM(RTRIM(CVE_ORDEN)) = '${id}'
        `);

        let arrayOrden = orden.recordsets;
        let returnOrden = arrayOrden[0];

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
        let params = req.body
        let data = {
            CVE_PEDIDO: params.CVE_PEDIDO,
            ESTATUS: 'Apertura',
            CLIENTE: params.CLIENTE,
            FECHA_INGRESO: newDate.toLocaleDateString(),
            FECHA_TERMINA: ' ',
            VENDEDOR: params.VENDEDOR,
            ID_SEDE: params.ID_SEDE,
            SERIE: params.SERIE,
        }
        
        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let newOrden = await sqlConfig.VENTO.query(`
            INSERT INTO TBL_ORDEN 
            ,'${data.CVE_PEDIDO}', '${data.ESTATUS}', '${data.CLIENTE}', '${data.FECHA_INGRESO}',
            '${data.FECHA_TERMINA}', '${data.VENDEDOR}', '${data.ID_SEDE}', '${data.SERIE}')
        `);

        let arrayNewOrden = newOrden.recordsets;
        let returnNewOrden = arrayNewOrden[0];

        if (!newOrden) {
            return res.status(400).send({ message: 'Orden no encontrada' })
        } else {
            return res.send({ returnNewOrden });
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
            return res.send({ message: 'Orden eliminada correctamente', returnOrdenDeleted });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error al eliminar la Orden' });
    }
}