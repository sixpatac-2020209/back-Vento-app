'use strict'

const sqlConfig = require('../../../../configs/sqlConfig');
const { validateData } = require('../../utils/validate');


/* Función de prueba de conectividad */
exports.sedesTest = async (req, res) => {
    await res.send({ message: 'Modúlo de sedes corriendo' })
}

exports.getSedes = async (req, res) => {
    try {
        let sedes = await sqlConfig.VENTO.query(`
        SELECT * FROM TBL_SEDES
        `);

        let arraySedes = sedes.recordsets;
        let returnSedes = arraySedes[0];

        if (!sedes) {
            return res.status(400).send({ message: 'Sedes no encontrados' })

        } else if (returnSedes.length === 0) {
            return res.status(400).send({ message: 'No hay fases que mostrar' });

        } else {
            return res.send({ returnSedes });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener las Sedes' });

    }
}

exports.getSede = async (req, res) => {
    try {
        let id = req.params.id

        let sede = await sqlConfig.VENTO.query(`
        SELECT * FROM TBL_SEDES where LTRIM(RTRIM(ID_SEDE )) = '${id}'
        `);

        let arraySede = sede.recordsets;
        let returnSede = arraySede[0];

        if (!sede || returnSede.length === 0) {
            return res.status(400).send({ message: 'Detalle de Proceso no encontrado' });
        }
        else {
            return res.send({ message: 'Detalle de Proceso encontrado', returnSede });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener la Sede' });
    }
}


exports.createSede = async (req, res) => {
    try {
        let params = req.body
        let data = {
            DESCRIPCION: params.DESCRIPCION
        }
        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let sedeExist = await sqlConfig.VENTO.query(` 
        SELECT * FROM TBL_SEDES WHERE DESCRIPCION =  ${data.DESCRIPCION}')
        `);
        let arraySedeExist = sedeExist.recordsets;
        let returnSedeExist = arraySedeExist[0];

        if (returnSedeExist) {
            return res.send({message: 'Sede creada anteriormente'});

        } else {
            let newSede = await sqlConfig.VENTO.query(`
            INSERT INTO TBL_SEDES VALUE('${data.DESCRIPCION}');
        `);

            let arrayNewSede = newSede.recordsets;
            let returnNewSede = arrayNewSede[0];

            if (!newsede) {
                return res.status(400).send({ message: 'Sede no encontrada' })
            } else {
                return res.send({ returnNewSede });
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al Crear la Sede' });
    }
}