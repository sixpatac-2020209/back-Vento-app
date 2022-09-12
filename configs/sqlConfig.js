'use strict';
const sql = require('mssql');

var config = {
    user: 'sa',
    password: '.Admin123',
    server: 'localhost',
    database: 'SAE80Empre02',
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
        let request = new sql.request()
        return req.send({request});
        console.log(err) ;
    } else{
        console.log("SQLServer | Connected to Database.");        
    }  
});