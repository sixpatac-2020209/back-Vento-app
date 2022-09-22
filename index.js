'use strict'

const mongoConfig = require('./configs/mongoConfig');
const app = require('./configs/app');
const sqlConfig = require('./configs/sqlConfig');

app.initServer();
mongoConfig.init();
