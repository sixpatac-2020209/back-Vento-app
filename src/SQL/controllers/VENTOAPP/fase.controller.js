'use strict'

const sqlConfig = require('../../../../configs/sqlConfig');
const { validateData } = require('../../utils/validate');

/* Función de prueba de conectividad */
exports.faseTest = async (req, res) => {
    await res.send({ message: 'Modúlo de fase corriendo' })
}

exports.getFases = async (req, res) => {
    try {
        let fases = await sqlConfig.VENTO.query(`
        SELECT * FROM TBL_FASE
        `);
        let arrayFases = fases.recordsets
        let returnFases = arrayFases[0];


        if (!fases) {
            return res.status(400).send({ message: 'Fases no encontradas' });

        } else if (fases.length === 0) {
            return res.status(400).send({ message: 'No hay fases que mostrar' });

        } else {
            return res.send({ returnFases });
        }


    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener las fases' });
    }
}

exports.getFase = async (req, res) => {
    try {
        let id = req.params.id

        let fase = await sqlConfig.VENTO.query(`
        SELECT * FROM TBL_FASE WHERE LTRIM(RTRIM(ID_FASE)) = '${id}'
        `);

        let arrayFase = fase.recordsets;
        let returnFase = arrayFase[0];

        if (!fase || returnFase.length === 0) {
            return res.status(400).send({ message: 'Fase no encontrada' });
        }
        else {
            return res.send({ message: 'Fase encontrada', returnFase });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener la Fase' });

    }
}


exports.createFase = async (req, res) => {
    try {
        let params = req.body
        let data = {
            DESCRIPCION: params.DESCRIPCION
        }
        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let faseExist = await sqlConfig.VENTO.query(`SELECT * FROM TBL_FASE WHERE DESCRIPCION = '${data.DESCRIPCION}'   `);
        let arrayFaseExist = faseExist.recordsets;
        let returnFaseExist = arrayFaseExist[0];

        if (returnFaseExist) {
            return res.send({ message: 'Fase creada anteriormente' });

        } else {
            let newFase = await sqlConfig.VENTO.query(` INSER INTO TBL_FASE VALUES ('${data.DESCRIPCION}') `);
            let arrayNewFase = newFase.recordsets;
            let returnNewFase = arrayNewFase[0];

            if (!newFase) {
                return res.status(400).send({ message: 'Fase no creada' })
            } else {
                return res.send({ message: 'Fase creada satisfactoriamente', returnNewFase });
            }
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al crear Fase' });
    }
}