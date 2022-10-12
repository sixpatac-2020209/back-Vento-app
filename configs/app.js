'use strict'

const {encrypt} = require('../src/MongoDB/utils/validate');

//Importación del Modelo de Usuario//
const User = require('../src/MongoDB/models/usuario.model');

const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const port = process.env.PORT || 3200 ;
////////////////////////////////////////////

/** MONGO DB */
const userRoutes = require('../src/MongoDB/routes/usuario.routes');

/** SQL Server SAE80Empre02 */
const clienteRoutes = require('../src/SQL/routes/SAE80Empre02/tbl_clientes.routes');
const pedidoRoutes = require('../src/SQL/routes/SAE80Empre02/pedidos.routes')
const vendedorRoutes = require('../src/SQL/routes/SAE80Empre02/vendedores.routes')

/** SQL Server VENTOAPP */
const autorizacionRoutes = require('../src/SQL/routes/VENTOAPP/autorización.routes');
const detalleProcesosRoures = require('../src/SQL/routes/VENTOAPP/detalleProcesos.routes');
const faseRoutes = require('../src/SQL/routes/VENTOAPP/fase.routes');
const ordenRoutes = require('../src/SQL/routes/VENTOAPP/orden.routes');
const procesosRoutes = require('../src/SQL/routes/VENTOAPP/procesos.routes');
const programaciónRoutes = require('../src/SQL/routes/VENTOAPP/programación.routes');
const sedesRoutes = require('../src/SQL/routes/VENTOAPP/sedes.routes');

////////////////////////////////////////////

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet({}));
app.use(cors());

////////////////////////////////////////////

/** MONGO */
app.use('/user', userRoutes);

/** SQL SAE80Empre02 */
app.use('/clientes', clienteRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/vendedores',vendedorRoutes);

/** VENTOAPP */
app.use('/autorizaciones', autorizacionRoutes);
app.use('/detalleProcesos', detalleProcesosRoures);
app.use('/fases', faseRoutes);
app.use('/ordenes', ordenRoutes);
app.use('/procesos', procesosRoutes);
app.use('/programaciones', programaciónRoutes);
app.use('/plantas', sedesRoutes);

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