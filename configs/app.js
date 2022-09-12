'use strict'

const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const telegramBot = require('../src/TelegramBot/bot')

const port = 3200 || process.env.PORT;
////////////////////////////////////////////

const userRoutes = require('../src/MongoDB/routes/usuario.routes');
const clienteRoutes = require('../src/SQL/routes/tbl_clientes.routes');

////////////////////////////////////////////

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet({}));
app.use(cors());

////////////////////////////////////////////

app.use('/user', userRoutes);
app.use('/clientes', clienteRoutes);

////////////////////////////////////////////
exports.initServer = () => app.listen(port, async () => {
    console.log(`API | Listening on port ${port}.`)
});