'use strict'
const nodemailer = require('nodemailer');
const sqlConfig = require('../../../configs/sqlConfig')

exports.createTransform = () => {
    const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
            ciphers: 'SSLv3'
        },
        auth: {
            user: 'sduard.sipaque@gmail.com',
            pass: 'alejandro33'
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

        let VendEmail = await sqlConfig.SAE.query(`
            SELECT A.CVE_ORDEN, V.CORREOE FROM FACTP02 P
                INNER JOIN PAR_FACTP02 F ON P.CVE_DOC=F.CVE_DOC
                INNER JOIN VEND02 V ON P.CVE_VEND=V.CVE_VEND
                INNER JOIN VENTOAPP.dbo.TBL_ORDEN A ON P.CVE_DOC = A.CVE_PEDIDO
                WHERE A.CVE_ORDEN = ${id}
        `);
        let arrayEmail = VendEmail.recordsets;
        let secondArray = arrayEmail[0];
        let returnEmail = secondArray[0];
        console.log(returnEmail);

        // setup e-mail data, even with unicode symbols
        var mailOptions = {
            from: `${data.EMAIL}`, // sender address (who sends)
            to: /* `${returnEmail.CORREOE}` */ 'sduard.sipaque@gmail.com', // list of receivers (who receives)
            subject: "Información de Orden de Producción",
            text: 'Hello world ', // plaintext body
            html: `<b> Orden de producción # autorizada </b>`,// html body
        };

        // send mail with defined transport object
        this.createTransform().transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
        return res.send({ message: 'Correo enviado satisfactoriamente' });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al enviar el correo', err })
    }
}

exports.corregirEmail = async (req, res) => {
    let id = req.params.id
    let email = localStorage.getItem('email');
    if (email != null && email != undefined) {
        let parseEmail = JSON.parse(email)
        console.log(parseEmail)
    }
    let correcciones = req.body.correcciones
    let VendEmail = sqlConfig.VENTO.query(`
    SELECT  V.CORREOE
	FROM FACTP02 P
    INNER JOIN PAR_FACTP02 F ON P.CVE_DOC=F.CVE_DOC
    INNER JOIN VEND02 V ON P.CVE_VEND=V.CVE_VEND
    INNER JOIN VENTOAPP.dbo.TBL_ORDEN A ON P.CVE_DOC = A.CVE_PEDIDO
    WHERE A.CVE_ORDEN = ${id}
     `);

    let arrayEmail = await VendEmail.recordsets;
    let secondArray = arrayEmail[0];
    let returnEmail = secondArray[0];
    let emailString = returnEmail.toString();
    console.log(emailString)

    const transporter = createTransform();
    const info = await transporter.sendMail({
        from: parseEmailparseEmail,
        to: /* emailString */'sduard.sipaque@gmail.com',
        subject: "Información de Orden de Producción",
        html: `<b> Corección para Orden de producción #${returnEmail.CVE_ORDEN}</b><br>
            <b>Correcciones: </b> ${correcciones}
        `,
    });
    console.log("Message sent: %S", info.messageId);
}

exports.rechazarEmail = async (req, res) => {
    let id = req.params.id
    let motivo = req.body.motivo
    let email = localStorage.getItem('email');
    if (email != null && email != undefined) {
        let parseEmail = JSON.parse(email)
        console.log(parseEmail)
    }
    let VendEmail = sqlConfig.VENTO.query(`
    SELECT  V.CORREOE
	FROM FACTP02 P
    INNER JOIN PAR_FACTP02 F ON P.CVE_DOC=F.CVE_DOC
    INNER JOIN VEND02 V ON P.CVE_VEND=V.CVE_VEND
    INNER JOIN VENTOAPP.dbo.TBL_ORDEN A ON P.CVE_DOC = A.CVE_PEDIDO
    WHERE A.CVE_ORDEN = ${id}
     `);
    console.log(emailString)

    let arrayEmail = await VendEmail.recordsets;
    let secondArray = arrayEmail[0];
    let returnEmail = secondArray[0];
    let emailString = returnEmail.toString();

    const transporter = createTransform();
    const info = await transporter.sendMail({
        from: parseEmail,
        to: /* emailString */ 'sduard.sipaque@gmail.com',
        subject: "Información de Orden de Producción",
        html: `<b> Orden de producción #${returnEmail.CVE_ORDEN}, Rechazada </b> <br>
        <b> Motivo: </b> ${motivo}
        `,
    });
    console.log("Message sent: %S", info.messageId);
}