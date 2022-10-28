'use strict'

const sqlConfig = require('../../../../configs/sqlConfig');
const { validateData } = require('../../utils/validate');

exports.SP_RESULTADOS1 = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.body
        let data = {
            articulo: params.articulo
        }

        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let procedimiento = await sqlConfig.VENTO.query(`
            EXEC UPD_RESULTADOSP1 ${id},1,'${data.articulo}'
        `);

        if (!procedimiento)
            return res.status(400).send({ message: 'Procedimiento no ejecutado' });

        let arrayProcedimiento = procedimiento.recordsets
        let returnProcedimiento = arrayProcedimiento[0];

        return res.send({ returnProcedimiento });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ejecutar el Procedimiento Almacenado', err });
    }
}

exports.SP_RESULTADOS2 = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.body
        let data = {
            articulo: params.articulo
        }

        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let procedimiento = await sqlConfig.VENTO.query(`
            EXEC UPD_RESULTADOSP2 ${id},2,'${data.articulo}'
        `);

        if (!procedimiento)
            return res.status(400).send({ message: 'Procedimiento no ejecutado' });

        let arrayProcedimiento = procedimiento.recordsets
        let returnProcedimiento = arrayProcedimiento[0];

        return res.send({ returnProcedimiento });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ejecutar el Procedimiento Almacenado', err });
    }
}

exports.SP_RESULTADOS3 = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.body
        let data = {
            articulo: params.articulo
        }

        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let procedimiento = await sqlConfig.VENTO.query(`
            EXEC UPD_RESULTADOSP3 ${id},3,'${data.articulo}'
        `);

        if (!procedimiento)
            return res.status(400).send({ message: 'Procedimiento no ejecutado' });

        let arrayProcedimiento = procedimiento.recordsets
        let returnProcedimiento = arrayProcedimiento[0];

        return res.send({ returnProcedimiento });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ejecutar el Procedimiento Almacenado', err });
    }
}

exports.SP_RESULTADOS4 = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.body
        let data = {
            articulo: params.articulo
        }

        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let procedimiento = await sqlConfig.VENTO.query(`
            EXEC UPD_RESULTADOSP4 ${id},4,'${data.articulo}'
        `);

        if (!procedimiento)
            return res.status(400).send({ message: 'Procedimiento no ejecutado' });

        let arrayProcedimiento = procedimiento.recordsets
        let returnProcedimiento = arrayProcedimiento[0];

        return res.send({ returnProcedimiento });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ejecutar el Procedimiento Almacenado', err });
    }
}

exports.SP_RESULTADOS5 = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.body
        let data = {
            articulo: params.articulo
        }

        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let procedimiento = await sqlConfig.VENTO.query(`
            EXEC UPD_RESULTADOSP5 ${id},5,'${data.articulo}'
        `);

        if (!procedimiento)
            return res.status(400).send({ message: 'Procedimiento no ejecutado' });

        let arrayProcedimiento = procedimiento.recordsets
        let returnProcedimiento = arrayProcedimiento[0];

        return res.send({ returnProcedimiento });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ejecutar el Procedimiento Almacenado', err });
    }
}

exports.SP_RESULTADOS6 = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.body
        let data = {
            articulo: params.articulo
        }

        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let procedimiento = await sqlConfig.VENTO.query(`
            EXEC UPD_RESULTADOSP6 ${id},6,'${data.articulo}'
        `);

        if (!procedimiento)
            return res.status(400).send({ message: 'Procedimiento no ejecutado' });

        let arrayProcedimiento = procedimiento.recordsets
        let returnProcedimiento = arrayProcedimiento[0];

        return res.send({ returnProcedimiento });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ejecutar el Procedimiento Almacenado', err });
    }
}

exports.SP_RESULTADOS7 = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.body
        let data = {
            articulo: params.articulo
        }

        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let procedimiento = await sqlConfig.VENTO.query(`
            EXEC UPD_RESULTADOSP7 ${id},7,'${data.articulo}'
        `);

        if (!procedimiento)
            return res.status(400).send({ message: 'Procedimiento no ejecutado' });

        let arrayProcedimiento = procedimiento.recordsets
        let returnProcedimiento = arrayProcedimiento[0];

        return res.send({ returnProcedimiento });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ejecutar el Procedimiento Almacenado', err });
    }
}

exports.SP_RESULTADOS8 = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.body
        let data = {
            articulo: params.articulo
        }

        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let procedimiento = await sqlConfig.VENTO.query(`
            EXEC UPD_RESULTADOSP8 ${id},8,'${data.articulo}'
        `);

        if (!procedimiento)
            return res.status(400).send({ message: 'Procedimiento no ejecutado' });

        let arrayProcedimiento = procedimiento.recordsets
        let returnProcedimiento = arrayProcedimiento[0];

        return res.send({ returnProcedimiento });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ejecutar el Procedimiento Almacenado', err });
    }
}

exports.SP_RESULTADOS9 = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.body
        let data = {
            articulo: params.articulo
        }

        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let procedimiento = await sqlConfig.VENTO.query(`
            EXEC UPD_RESULTADOSP9 ${id},9,'${data.articulo}'
        `);

        if (!procedimiento)
            return res.status(400).send({ message: 'Procedimiento no ejecutado' });

        let arrayProcedimiento = procedimiento.recordsets
        let returnProcedimiento = arrayProcedimiento[0];

        return res.send({ returnProcedimiento });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ejecutar el Procedimiento Almacenado', err });
    }
}

exports.SP_RESULTADOS10 = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.body
        let data = {
            articulo: params.articulo
        }

        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let procedimiento = await sqlConfig.VENTO.query(`
            EXEC UPD_RESULTADOSP10 ${id},10,'${data.articulo}'
        `);

        if (!procedimiento)
            return res.status(400).send({ message: 'Procedimiento no ejecutado' });

        let arrayProcedimiento = procedimiento.recordsets
        let returnProcedimiento = arrayProcedimiento[0];

        return res.send({ returnProcedimiento });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ejecutar el Procedimiento Almacenado', err });
    }
}

exports.SP_RESULTADOS11 = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.body
        let data = {
            articulo: params.articulo
        }

        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let procedimiento = await sqlConfig.VENTO.query(`
            EXEC UPD_RESULTADOSP11 ${id},11,'${data.articulo}'
        `);

        if (!procedimiento)
            return res.status(400).send({ message: 'Procedimiento no ejecutado' });

        let arrayProcedimiento = procedimiento.recordsets
        let returnProcedimiento = arrayProcedimiento[0];

        return res.send({ returnProcedimiento });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ejecutar el Procedimiento Almacenado', err });
    }
}

exports.SP_RESULTADOS12 = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.body
        let data = {
            articulo: params.articulo
        }

        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let procedimiento = await sqlConfig.VENTO.query(`
            EXEC UPD_RESULTADOSP12 ${id},12,'${data.articulo}'
        `);

        if (!procedimiento)
            return res.status(400).send({ message: 'Procedimiento no ejecutado' });

        let arrayProcedimiento = procedimiento.recordsets
        let returnProcedimiento = arrayProcedimiento[0];

        return res.send({ returnProcedimiento });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ejecutar el Procedimiento Almacenado', err });
    }
}

exports.SP_RESULTADOS13 = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.body
        let data = {
            articulo: params.articulo
        }

        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let procedimiento = await sqlConfig.VENTO.query(`
            EXEC UPD_RESULTADOSP13 ${id},13,'${data.articulo}'
        `);

        if (!procedimiento)
            return res.status(400).send({ message: 'Procedimiento no ejecutado' });

        let arrayProcedimiento = procedimiento.recordsets
        let returnProcedimiento = arrayProcedimiento[0];

        return res.send({ returnProcedimiento });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ejecutar el Procedimiento Almacenado', err });
    }
}

exports.SP_RESULTADOS14 = async (req, res) => {
    try {
        let id = req.params.id
        let params = req.body
        let data = {
            articulo: params.articulo
        }

        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        let procedimiento = await sqlConfig.VENTO.query(`
            EXEC UPD_RESULTADOSP14 ${id},14,'${data.articulo}'
        `);

        if (!procedimiento)
            return res.status(400).send({ message: 'Procedimiento no ejecutado' });

        let arrayProcedimiento = procedimiento.recordsets
        let returnProcedimiento = arrayProcedimiento[0];

        return res.send({ returnProcedimiento });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al ejecutar el Procedimiento Almacenado', err });
    }
}