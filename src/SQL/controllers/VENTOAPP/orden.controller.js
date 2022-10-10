'use strict'

let sqlConfig = require('../../../../configs/sqlConfigVENTO-APP')
const { validateData } = require('../../utils/validate');

/* Función de prueba de conectividad */
exports.ordenTest = async (req, res) => {
    await res.send({ message: 'Modúlo de orden corriendo' })
}

exports.getOrdenes = async (req, res) =>{
    try {
        let ordenes = await sqlConfig.dbconnection.query(`
        SELECT * FROM TBL_ORDEN
        `);

        let arrayOrdenes = ordenes.recordsets;
        let returnOrdenes = arrayOrdenes[0];

        if(!ordenes){
            return res.status(400).send({message: 'Ordenes no encontradas'});
        } else{
            return res.send({ returnOrdenes });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({message: 'Error al obtener las Ordenes'});
    }
}

exports.getOrden = async (req, res) =>{
    try {
        let id = req.params.id

        let orden = await sqlConfig.dbconnection.query(`
        SELECT * FROM TBL_ORDEN WHERE LTRIM(RTRIM(CVE_ORDEN)) = '${id}'
        `);

        let arrayOrden = orden.recordsets;
        let returnOrden = arrayOrden[0];

        if(!orden){
            return res.status(400).send({message: 'Orden no encontrada'})
        } else{
            return res.send({ returnOrden });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({message: 'Error al obtener la Orden'});

    }
}