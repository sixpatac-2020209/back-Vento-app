'use strict'

const sqlConfig = require('../../../../configs/sqlConfig');
const { validateData } = require('../../utils/validate');

/* Función de prueba de conectividad */
exports.autorizacionTest = async (req, res) => {
    await res.send({ message: 'Modúlo de autorizaciones corriendo' })
}

exports.getAutorizaciones = async (req, res) => {
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

exports.getAutorizacion = async (req, res) => {
    try {
        let id = req.params.id

        let autorizacion = await sqlConfig.VENTO.query(`
            SELECT * FROM TBL_AUTORIZACION WHERE LTRIM(RTRIM(CVE_AUTORIZACION)) = ${id}
        `);

        let arrayAutorizacion = autorizacion.recordsets;
        let returnAutorizacion = arrayAutorizacion[0];

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

exports.Autorizar = async (req, res) => {
    try {
        const hoy = Date.now();
    const newDate = new Date(hoy)
    let dateString = newDate.toISOString()
    let newOnlyDate = dateString.split('T')

        let id = req.params.id
        let data = {
            FECHA: newOnlyDate[0],
            ID_USUARIO: localStorage
        }

        let autorizar = await sqlConfig.VENTO.query(`
            INSERT INTO TBL_AUTORIZACION (FECHA, ID_USUARIO) VAULES
            ('${data.FECHA}','${data.ID_USUARIO}')
        `);
        let actualizarOrden = await sqlConfig.VENTO.query(`
            UPDATE TBL_ORDEN SET ESTATUS = '1' , FECHA_TERMINA = '${data.FECHA}'
            WHERE LTRIM(RTRIM(CVE_ORDEN)) = '${id}'
        `);

        let arrayAuth = autorizar.recordsets;
        let returnAuth = arrayAuth[0];

        

        if (!autorizar || !actualizarOrden) {
            return res.status(400).send({ message: 'Orden no autorizada' })
        } else {
            return res.send({ message: 'Orden autorizada correctamente', returnAuth });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al autorizar la orden.' });

    }
}

exports.getOrdenesAutorizadas = async (req,res)=>{
    try {
        
    } catch (err) {
        console.log(err);
        return res.status(500).send('Error al obtener los pedidos Autorizados')
    }
}