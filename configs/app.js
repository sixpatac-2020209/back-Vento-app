'use strict'

const {encrypt} = require('../src/MongoDB/utils/validate');

//Importación del Modelo de Usuario//
const User = require('../src/MongoDB/models/usuario.model');

const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

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
    const automaticUser = {
        username: 'SuperAdmin',
        email: 'admin@vento.com.gt',
        name: 'SuperAdmin',
        surname: 'SuperAdmin',
        phone: 'SuperAdmin',
        password: await encrypt('123'),
        role: 'ADMINISTRADOR'
    }

    const searchUserAdmin = await User.findOne({username: automaticUser.username})
    if(!searchUserAdmin) {
        let userAdmin = new User(automaticUser);
        await userAdmin.save();
        console.log('Administrador General creado correctamente.')
    }

    console.log(`API | Listening on port ${port}.`)
});