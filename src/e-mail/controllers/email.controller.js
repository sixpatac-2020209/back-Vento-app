'use strict'
const nodemailer = require('nodemailer');
const sqlConfig = require('../../../configs/sqlConfig')

exports.createTransform = () => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 465, // port for secure SMTP
        tls: {
            ciphers: 'SSLv3'
        },
        auth: {
            user: 'impresoras.vento@gmail.com',
            pass: 'zlpjvwiyhqgbiuoa'
        }
    });
    return ({transporter})
};


exports.autorizarEmail = async (req, res) => {
    try {

        let id = req.params.id
        let params = req.body
        let data = {
            EMAIL: params.EMAIL
        }

        let SendEmail = await sqlConfig.SAE.query(`
            SELECT A.CVE_ORDEN, V.CORREOE FROM FACTP02 P
                INNER JOIN PAR_FACTP02 F ON P.CVE_DOC=F.CVE_DOC
                INNER JOIN VEND02 V ON P.CVE_VEND=V.CVE_VEND
                INNER JOIN VENTOAPP.dbo.TBL_ORDEN A ON P.CVE_DOC = A.CVE_PEDIDO
                WHERE A.CVE_ORDEN = ${id}
        `);
        let arrayEmail = SendEmail.recordsets;
        let secondArray = arrayEmail[0];
        let returnEmail = secondArray[0];

        // setup e-mail data, even with unicode symbols
        var mailOptions = {
            from: 'Sduard Sipaque' , // sender address (who sends)
            to: /* `${returnEmail.CORREOE}`*/ 'gdeleon@ventogt.com', // list of receivers (who receives)
            subject: "Información de Orden de Producción",
            html: `<b> Orden de producción #${id} autorizada </b>`,// html body
        };

        // send mail with defined transport object
        this.createTransform().transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            
        });
        return res.send({ message: 'Correo enviado satisfactoriamente' });
        
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al enviar el correo', err })
    }
}

exports.corregirEmail = async (req, res) => {
    try {

        let id = req.params.id
        let params = req.body
        let data = {
            EMAIL: params.EMAIL,
            razon: params.razon,
        }

        let SendEmail = await sqlConfig.SAE.query(`
            SELECT A.CVE_ORDEN, V.CORREOE FROM FACTP02 P
                INNER JOIN PAR_FACTP02 F ON P.CVE_DOC=F.CVE_DOC
                INNER JOIN VEND02 V ON P.CVE_VEND=V.CVE_VEND
                INNER JOIN VENTOAPP.dbo.TBL_ORDEN A ON P.CVE_DOC = A.CVE_PEDIDO
                WHERE A.CVE_ORDEN = ${id}
        `);
        let arrayEmail = SendEmail.recordsets;
        let secondArray = arrayEmail[0];
        let returnEmail = secondArray[0];

        // setup e-mail data, even with unicode symbols
        var mailOptions = {
            from: 'Sduard Sipaque' , // sender address (who sends)
            to: /* `${returnEmail.CORREOE}`*/ '', // list of receivers (who receives)
            subject: "Información de Orden de Producción",
            html: `<b> Orden de producción #${id} enviada a correcciones. Razones </b> <hr> ${data.razon}`,// html body
        };

        // send mail with defined transport object
        this.createTransform().transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            
        });
        return res.send({ message: 'Correo enviado satisfactoriamente' });
        
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al enviar el correo', err })
    }
}

exports.rechazarEmail = async (req, res) => {
    try {

        let id = req.params.id
        let params = req.body
        let data = {
            EMAIL: params.EMAIL,
            razon: params.razon
        }

        let SendEmail = await sqlConfig.SAE.query(`
            SELECT A.CVE_ORDEN, V.CORREOE FROM FACTP02 P
                INNER JOIN PAR_FACTP02 F ON P.CVE_DOC=F.CVE_DOC
                INNER JOIN VEND02 V ON P.CVE_VEND=V.CVE_VEND
                INNER JOIN VENTOAPP.dbo.TBL_ORDEN A ON P.CVE_DOC = A.CVE_PEDIDO
                WHERE A.CVE_ORDEN = ${id}
        `);
        let arrayEmail = SendEmail.recordsets;
        let secondArray = arrayEmail[0];
        let returnEmail = secondArray[0];

        // setup e-mail data, even with unicode symbols
        var mailOptions = {
            from: 'Sduard Sipaque' , // sender address (who sends)
            to: /* `${returnEmail.CORREOE}`*/ '', // list of receivers (who receives)
            subject: "Información de Orden de Producción",
            html: `<b> Orden de producción #${id} rechazada. Razón: </b> <hr> ${data.razon}`,// html body
        };

        // send mail with defined transport object
        this.createTransform().transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            
        });
        return res.send({ message: 'Correo enviado satisfactoriamente' });
        
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al enviar el correo', err })
    }
}