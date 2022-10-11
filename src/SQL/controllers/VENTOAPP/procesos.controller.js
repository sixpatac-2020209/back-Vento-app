'use strict'

const sqlConfig = require('../../../../configs/sqlConfig');
const { validateData } = require('../../utils/validate');

/* Función de prueba de conectividad */
exports.procesosTest = async (req, res) => {
    await res.send({ message: 'Modúlo de procesos corriendo' })
}

exports.getProcesos = async (req, res) => {
    try {
        let procesos = await sqlConfig.VENTO.query(`
        SELECT * FROM TBL_PROCESOS
        `);

        let arrayProcesos = procesos.recordsets;
        let returnProcesos = arrayProcesos[0];

        if (!procesos) {
            return res.status(400).send({ message: 'Procesos no encontrados' });

        } else if (returnProcesos.length === 0) {
            return res.status(400).send({ message: 'No hay fases que mostrar' });

        } else {
            return res.send({ returnProcesos });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener los Procesos' });

    }
}

exports.getProceso = async (req, res) => {
    try {
        let id = req.params.id

        let proceso = await sqlConfig.VENTO.query(`
        SELECT * FROM TBL_PROCESOS WHERE LTRIM(RTRIM( ID_PROCESO )) = '${id}'
        `);

        let arrayProceso = proceso.recordsets;
        let returnProceso = arrayProceso[0];

        if (!proceso || returnProceso.length === 0) {
            return res.status(400).send({ message: 'Proceso no encontrado' });
        }
        else {
            return res.send({ message: 'Proceso encontrado', returnProceso });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener el Proceso' });

    }
}


exports.createProceso = async (req, res) => {
    try {
        let params = req.body
        let data = {
            DESCRIPCION: params.DESCRIPCION,
            CUMPLIMIENTO: 100,
        }
        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let existProceso = await sqlConfig.VENTO.query(` 
            SELECT * FROM TBL_PROCESOS WHERE DESCRIPCION =  '${data.DESCRIPCION}'
        )`);
        let arrayProcesoExist = existProceso.recordsets;
        let returnExistProceso = arrayProcesoExist[0];

        if (returnExistProceso) {
            return res.status(400).send({ message: 'Proceso creado anteriormente' });

        } else {
            let newProceso = await sqlConfig.VENTO.query(` 
                INSERT INTO TBL_PROCESOS 
                VALUES('${data.DESCRIPCION}','${data.CUMPLIMIENTO}');
            `);

            let arrayNewProceso = newProceso.recordsets;
            let returnNewProceso = arrayNewProceso[0];

            if (!newProceso) {
                return res.status(400).send({ message: 'Proceso no encontrado' })
            } else {
                return res.send({ returnNewProceso });
            }
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al crear el Proceso' });

    }
}