'use strict'
const nodemailer = require('nodemailer');
const sqlConfig = require ('../../../configs/sqlConfig')

let createTransform = ()=>{
    const transport = nodemailer.createTransport({
        host:'smtp-mail.outlook.com',
        port: 587 || 25,
        auth:{
            user:'ventoapp@outlook.com',
            pass:'Vento-App2022',
        },
    });
    return transport
}

exports.autorizarEmail = async (req, res)=>{
    let id = req.params.id
    let VendEmail = sqlConfig.VENTO.query(`
     = ${id}
     `);

    let arrayEmail = await VendEmail.recordsets;
    let secondArray = arrayEmail[0];
    let returnEmail = secondArray[0];

    const transporter = createTransform();
    const info = await transporter.sendMail({
        from: localStorage.email,
        to: returnEmail.CORREOE,
        subject: "Información de Orden de Producción",
        html: `<b> Orden de producción #${returnEmail.CVE_ORDEN} autorizada </b>`,
    });
}

exports.corregirEmail = async (req, res)=>{
    let id = req.params.id
    let correcciones  = req.body.correcciones
    let VendEmail = sqlConfig.VENTO.query(`
     = ${id}
     `);

    let arrayEmail = await VendEmail.recordsets;
    let secondArray = arrayEmail[0];
    let returnEmail = secondArray[0];

    const transporter = createTransform();
    const info = await transporter.sendMail({
        from: localStorage.email,
        to: returnEmail.CORREOE,
        subject: "Información de Orden de Producción",
        html: `<b> Corección para Orden de producción #${returnEmail.CVE_ORDEN}</b><br>
            <b>Correcciones: </b> ${correcciones}
        `,
    });
    console.log("Message sent: %S", info.messageId);
}

exports.rechazarEmail = async (req, res)=>{
    let id = req.params.id
    let motivo = req.body.motivo
    let VendEmail = sqlConfig.VENTO.query(`
     = ${id}
     `);

    let arrayEmail = await VendEmail.recordsets;
    let secondArray = arrayEmail[0];
    let returnEmail = secondArray[0];

    const transporter = createTransform();
    const info = await transporter.sendMail({
        from: localStorage.email,
        to: returnEmail.CORREOE,
        subject: "Información de Orden de Producción",
        html: `<b> Orden de producción #${returnEmail.CVE_ORDEN}, Rechazada </b> <br>
        <b> Motivo: </b> ${motivo}
        `,
    });
    console.log("Message sent: %S", info.messageId);
}