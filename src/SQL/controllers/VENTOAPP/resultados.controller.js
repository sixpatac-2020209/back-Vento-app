'use strict'

const sqlConfig = require('../../../../configs/sqlConfig');
const { validateData } = require('../../utils/validate');

exports.createResultados = async (req, res) => {
    try {
        let id = req.params.id

        let resultados = await sqlConfig.VENTO.query(`
            EXEC INST_RESULTADOS ${id}
        `)

        if (!resultados)
            return res.status(400).send({ message: 'Resultados no creados' });

        return res.send({ message: 'Resultados creados correctamente' });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al crear la tabla de resultados' })
    }
}

exports.getFasesHome = async (req, res) => {
    try {
        let fases = await sqlConfig.VENTO.query(`
            SELECT * FROM FASES
        `);
        if (!fases)
            return res.status(400).send({ message: 'Cantidad no ingresada' });

        let arrayUpdate = fases.recordsets
        let returnFases = arrayUpdate[0];

        return res.send({ returnFases });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener las fases' });
    }
}

exports.getDetalleResultados = async (req, res) => {
    try {
        let id = req.params.id

        let getResultados = await sqlConfig.VENTO.query(`
            SELECT * FROM TBL_RESULTADOS WHERE CVE_ORDEN = ${id}
        `);

        if (!getResultados)
            return res.status(400).send({ message: 'No hay resultados que mostrar' });

        let arrayUpdate = getResultados.recordsets
        let returnResultados = arrayUpdate[0];

        return res.send({ returnResultados });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener los resultados', err })
    }
}



exports.updateDetalles = async (req, res) => {
    try {
        let id = req.params.id

        let updateDetalle = sqlConfig.VENTO.query(`
            UPDATE TBL_DETALLEPROCESOS
            SET PORCENTAJE=(D.REALIZADO*P.CUMPLIMIENTO)/D.REALIZAR
            FROM TBL_DETALLEPROCESOS D
            INNER JOIN TBL_PROCESOS P ON D.ID_PROCESO = P.ID_PROCESO 
                WHERE CVE_ORDEN = ${id}
        `);
        

        if (!updateDetalle)
            return res.status(400).send({ message: 'update no ejecutado' });


    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error al crear los porcentajes' })
    }
}