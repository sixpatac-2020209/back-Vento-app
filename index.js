'use strict'

const mongoConfig = require('./configs/mongoConfig');
const app = require('./configs/app');
const sqlConfig = require('./configs/sqlConfig');
const sqlConfigVENTOAPP = require('./configs/sqlConfigVENTO-APP')

app.initServer();
mongoConfig.init();
