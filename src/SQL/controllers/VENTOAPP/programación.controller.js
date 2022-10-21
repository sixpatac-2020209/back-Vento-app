'use strict'

const sqlConfig = require('../../../../configs/sqlConfig');
const { validateData } = require('../../utils/validate');

/* Función de prueba de conectividad */
exports.programaciónTest = async (req, res) => {
    await res.send({ message: 'Modúlo de programación corriendo' })
}

exports.getProgramaciones = async (req, res) => {
    try {
        let programaciones = await sqlConfig.VENTO.query(`
        SELECT * FROM TBL_PROCESOS
        `);

        let arrayProgramaciones = programaciones.recordsets;
        let returnProgramaciones = arrayProgramaciones[0];

        if (!programacion) {
            return res.status(400).send({ message: 'Programaciones no encontradas' });

        } else if (returnProgramaciones.length === 0) {
            return res.status(400).send({ message: 'No hay fases que mostrar' });

        } else {
            return res.send({ returnProgramaciones });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener la Programacion' });

    }
}

exports.getProgramacion = async (req, res) => {
    try {
        let id = req.params.id

        let programacion = await sqlConfig.VENTO.query(`
        SELECT * FROM TBL_PROGRAMACION WHERE LTRIM(RTRIM(ID_PROGRAMACION)) = '${id}'
        `);

        let arrayProgramacion = programacion.recordsets;
        let returnProgramacion = arrayProgramacion[0];

        if (!programacion || returnProgramacion.length === 0) {
            return res.status(400).send({ message: 'Programacion no encontrada' })
        } else {
            return res.send({ returnProgramacion });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener la Programacion' });

    }
}


exports.createProgramacion = async (req, res) => {
    try {

        let id = req.params.id
        let params = req.body
        let data = {
            FECHA_INGRESO: params.FECHA_INGRESO,
            FECHA_TERMINA: params.FECHA_TERMINA,
            ID_SEDE: params.ID_SEDE,
        }
        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let newProgramacion = await sqlConfig.VENTO.query(`
            INSERT INTO TBL_PROGRAMACION 
            VALUE('${id}','${data.FECHA_INGRESO}','${data.FECHA_TERMINA}','${data.ID_SEDE}');
        `);

        let arraynewProgramacion = newProgramacion.recordsets;
        let returnNewProgramacion = arraynewProgramacion[0];

        if (!newProgramacion) {
            return res.status(400).send({ message: 'Programación no creada' })
        } else {
            return res.send({ returnNewProgramacion });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al crear la Programación' });
    }
}