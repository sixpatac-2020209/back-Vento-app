'use strict';
const sql = require('mssql');

var config = {
    user: 'sa',
    password: '.Admin123',
    server: 'localhost',
    database: 'VENTOAPP',
    options: {
        encrypt: true,
        enableArithAbort: true,
        enablerithPort: false,
        trustedConnection: false,
        trustServerCertificate: true,
    },
    port: 1433
}

sql.on('error', err => {
    console.log("Sql database connection error " ,err);
});

exports.dbconnection = new sql.connect(config, err => { 
    if(err){
        let request = new sql.Request()
        console.log(err) ;
        return request;
        
    } else{
        console.log("SQLServer VENTO APP | Connected to Database.");        
    }  
});