'USE STRICT'
const { Telegraf } = require('telegraf');
const { Dotenv } = require('dotenv').config();
const axios = require('axios');
const sqlConfig = require('../../configs/sqlConfig');
const sql = require('mssql');

const { TOKEN, SERVER_URL } = process.env
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
const WEBHOOK_URL = SERVER_URL + URI;

const bot = new Telegraf(TOKEN, { polling: true });
const { validateFile } = require('./utils/validate');

//////////////////// - VARIABLES DE COMANDOS - ////////////////////

const confirm = 'confirm';
const confirmCliente = 'confirmCliente';
const initBot = 'initBot'

//_______________________________________________________________//

// ----------------- CLIENTE ---------------------------------------------------------------------------------------------------------------------- //
bot.start((ctx) => {
    let name = ctx.from.first_name;
    let surname = ctx.from.last_name
    ctx.reply(`¡Hola ${name} ${surname} es un gusto saludarte!` + '\n'
        + 'Envia o presiona /help para más información'
    );
});

bot.help((ctx) => {
    ctx.reply('Este es un bot de prueba para VENTO.' + '\n'
        + '\n'
        + 'Como principal función es agilizar y facilitar el manejo de pedidos por medio de esta plataforma.' + '\n'
        + '\n'
        + 'Para comenzar, envia tu archivo de pedido el cual quieras hacerle a VENTO SA y debe ser en formato PDF. y adjuntar en el comentario que deja adjuntar Telegram, el nombre de la empresa la cual está realizando el pedido' + '\n'
        + '\n'
        + 'Posteriormente sigue los pasos y espera la confirmación de nuestro encargado para que verifique la solicitud.' + '\n'
        + 'Para iniciar envie o presione /initBot'
    );
});


bot.command('register', async (ctx) => {
    try {
            let idGroup= ctx.chat.id;
            let nombreCliente= ctx.from.first_name;
            let apellidoCliente= ctx.from.last_name;

        let validateCliente = await sqlConfig.dbconnection.query(`SELECT nombreCliente FROM telegramClientes WHERE idGroup = ${idGroup}`);
        let arrayCliente= validateCliente.recordsets;
        let returnCliente = arrayCliente[0];
        if(returnCliente == "" || returnCliente==undefined){
            let newCliente = await sqlConfig.dbconnection.query(`INSERT INTO telegramClientes VALUES ('${idGroup}', '${nombreCliente}', '${apellidoCliente}')`);
            let arrayNewCliente = newCliente.recordsets;
            let returnNewCliente = arrayNewCliente[0];

            if (!newCliente) {
                ctx.reply('Cliente no guardado');

            } else {
                ctx.reply('Cliente registrado satisfactoriamente', returnNewCliente);
            }

        } else {
            ctx.reply('Cliente registrado Anteriormente'); 
        }
    } catch (err) {
        console.log(err);
        ctx.reply('Error al guardar el cliente')
    }
});

bot.on('photo', async (ctx) => {
    ctx.reply('Has enviado una foto u imagen');
    ctx.reply('Solo se aceptan documentos .pdf');
});


bot.command(initBot, async (ctx) => {
    let userId = ctx.chat.id;
    let cliente = await sqlConfig.dbconnection.query(`SELECT nombreCliente, apellidoCliente FROM telegramClientes WHERE idGroup = '${userId}'`);
    let arrayCliente= cliente.recordsets;
    let returnCliente = arrayCliente[0];


    if(!returnCliente){
        ctx.reply('Comnando no autorizado')
    } else {
        ctx.reply('Envie su pedido');
            bot.on('document', async (ctx) => {
                let fileURL = await bot.telegram.getFileLink(ctx.update.message.document.file_id);
                let fileExtention = fileURL.pathname.split('.');
                const verificExtention = await validateFile(fileExtention[1]);

                if (verificExtention === true) {

                    let fileId = ctx.message.document.file_id
                    let documentPath = fileURL.pathname;
                    let documentName = ctx.message.document.file_name;
                    let documentCap = ctx.message.caption;
                    ctx.reply('Envia el nombre del vendedor');

                    ctx.on('text', async (ctx) => {
                        let Vendedor = ctx.message.text;
                        let splicVendedor = Vendedor.split(' ');
                        let nombreVendedor = await validateFile(splicVendedor[0]);
                        let apellidoVendedor = await validateFile(splicVendedor[1]);

                        let chatVendedor = await sqlConfig.dbconnection.query(`SELECT idGroup FROM vendedores WHERE nombreVendedor = '${nombreVendedor}' and apellidoVendedor = '${apellidoVendedor}'`);
                        let arrayChatVendedor = chatVendedor.recordsets;
                        let returnChatVendedor = arrayChatVendedor[0];

                        if (returnChatVendedor) {
                            ctx.reply('Envia o presiona el comando /confirm para continuar');
                            bot.command(confirm, (ctx) => {

                                if (!returnCliente) {
                                    ctx.reply('Comando no autorizado.')
                                } else {
                                    let groupId = returnChatVendedor;
                                    bot.telegram.sendDocument(groupId, fileId, documentPath);
                                    bot.telegram.sendMessage(groupId, `Documento: ${documentName}.\nEmpresa: ${documentCap}\nEnviado por ${ctx.from.first_name} ${ctx.from.last_name} id a enviar con /confirmCliente :`);
                                    let message_IDClient = `${ctx.from.id}`;
                                    bot.telegram.sendMessage(groupId, message_IDClient);

                                    ctx.reply('Se ha confirmado tu pedido' + '\n'
                                        + 'Por favor espera la confirmación de nuestro encargado.'
                                    );
                                }
                            });
                        }
                    })

                } else {
                    ctx.reply('El archivo enviado no es valido');
                }
            });
        }
});

// ----------------- TERMINA CLIENTE ---------------------------------------------------------------------------------------------------------------------- //


////////////////// ----------+ GENERALES VENDEDOR +---------- //////////////////

bot.command('idVendedor', async (ctx) => {
    try {
            let idGroup= ctx.chat.id;
            let nombreVendedor= ctx.from.first_name;
            let apellidoVendedor= ctx.from.last_name;

        let validateVendedor = await sqlConfig.dbconnection.query(`SELECT nombreVendedor FROM vendedores WHERE idGroup = ${idGroup}`);
        let arrayVendedor= validateVendedor.recordsets;
        let returnVendedor = arrayVendedor[0];
        if(returnVendedor == "" || returnVendedor==undefined){
            let newVendedor = await sqlConfig.dbconnection.query(`INSERT INTO vendedores VALUES ('${idGroup}', '${nombreVendedor}', '${apellidoVendedor}')`);
            let arrayNewVendedor = newVendedor.recordsets;
            let returnNewVendedor = arrayNewVendedor[0];

            if (!newVendedor) {
                ctx.reply('Vendedor no guardado');

            } else {
                ctx.reply('Vendedor registrado satisfactoriamente', returnNewVendedor);
            }

        } else {
            ctx.reply('Vendedor registrado Anteriormente'); 
        }
    } catch (err) {
        console.log(err);
        ctx.reply('Error al guardar el Vendedor')
    }
});


bot.command(confirmCliente, async (ctx) => {
    let nombreVendedor = ctx.from.first_name;
    let apellidoVendedor = ctx.from.last_name;

    const Vendedor = await sqlConfig.dbconnection.query(`SELECT idGroup FROM vendedores WHERE nombreVendedor = '${nombreVendedor}' AND apellidoVendedor = '${apellidoVendedor}'`);
    let arrayVendedor = Vendedor.recordsets;
    let returnVendedor = arrayVendedor[0];
    console.log(returnVendedor);

    if(!returnVendedor || returnVendedor === undefined || returnVendedor == [] || returnVendedor===''){
        ctx.reply('Comando no autorizado');
    } else{
        bot.on('text', (ctx) => {
            let toUser = ctx.message.text
            let groupId = toUser;
            let message_Cont = `Pedido confirmado por ${ctx.from.first_name} ${ctx.from.last_name}. Se ha confirmado tu pedido por parte de VENTO SA, tu pedido fue puesto en cola de producción`
            bot.telegram.sendMessage(groupId, message_Cont);
            ctx.reply('Mensaje enviado al cliente');
        });
    }
});

bot.command('enviarSAE', async (ctx) => {
    let userId = ctx.chat.id
    let userIdString = userId.toString();

    let validateUser = await sqlConfig.dbconnection.query(`SELECT * FROM vendedores WHERE chatId = '${userIdString}'`);

    if (validateUser) {

        bot.on('document', async (ctx) => {
            let fileURL = await bot.telegram.getFileLink(ctx.update.message.document.file_id);
            let fileExtention = fileURL.pathname.split('.');
            const verificExtention = await validateFile(fileExtention[1]);

            let fileId = ctx.message.document.file_id
            let documentPath = fileURL.pathname;


            if (verificExtention === true) {
                let groupId = '-1001733373558';
                bot.telegram.sendDocument(groupId, fileId, documentPath);
            } else {
                ctx.reply('El archivo enviado no es valido');
            }

        });
    }
})

////////////////// ----------+ TERMINA GENERALES VENDEDOR +---------- //////////////////


// ----------------- JEFE ---------------------------------------------------------------------------------------------------------------------- //

bot.command('sendDB', (ctx) => {
    let chatIdConf = ctx.chat.id;
    let chatIdString = chatIdConf.toString()
    if (chatIdConf === -1001733373558 || chatIdString === '-1001733373558') {
        ctx.reply('Por favor enviar el documento pdf con el nonbre de la empresa como comentario');

        if (chatIdConf === /*cambiar por el id del jefe de produccion o tienda*/ -1001733373558 || chatIdString === /*cambiar por el id del jefe de produccion o tienda*/ '-1001733373558') {

            bot.on('document', async (ctx) => {
                let fileURL = await bot.telegram.getFileLink(ctx.update.message.document.file_id);
                let fileExtention = fileURL.pathname.split('.');
                const verificExtention = await validateFile(fileExtention[1]);
                let fileId = ctx.message.document.file_id
                let documentPath = fileURL.pathname;
                let documentName = ctx.message.document.file_name;
                let documentCap = ctx.message.caption;

                if (verificExtention === true) {
                    try {
                        let data = {
                            urlDocumento: fileURL.href,
                            nombreDocumento: ctx.message.document.file_name,
                            empresa: ctx.message.caption
                        };
                        const newDocument = await sqlConfig.dbconnection.query(`INSERT INTO documentos 
                            VALUES ('${data.urlDocumento}', '${data.nombreDocumento}', '${data.empresa}')`);

                        let arrayNewDocumento = newDocument.recordsets;
                        let returnNewDocumento = arrayNewDocumento[0];

                        if (!newDocument) {
                            ctx.reply('documento no guardado')
                        }
                        else {
                            ctx.reply('Documento guardado satisfactoriamente', returnNewDocumento);
                            // ENVIO DE CONFIRMACIÓN AL GRUPO
                            let groupId = '-1001733373558';
                            bot.telegram.sendDocument(groupId, fileId, documentPath);
                            bot.telegram.sendMessage(groupId, `Documento: ${documentName}.\nEmpresa: ${documentCap},\nConfirmado y puesto en produccion`);
                        }
                    } catch (err) {
                        console.log(err);
                        ctx.reply('Error al guardar el documento')
                    }

                } else {
                    ctx.reply('El archivo enviado no es valido');
                }

            });
        }
    } else {
        ctx.reply('Comando no autorizado');
    }
});
// ----------------- TERMINA JEFE ---------------------------------------------------------------------------------------------------------------------- // 

bot.launch();

exports.init = async () => {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
    console.log('TelegramBot | In function.');
}