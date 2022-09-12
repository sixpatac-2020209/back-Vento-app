'use strict'

const mongoConfig = require('./configs/mongoConfig');
const app = require('./configs/app');
const sqlConfig = require('./configs/sqlConfig');
const telegramBot = require('./src/TelegramBot/bot')



app.initServer();
mongoConfig.init();
telegramBot.init();
