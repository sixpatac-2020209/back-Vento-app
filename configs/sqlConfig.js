'use strict';
const sql = require('mssql');

var SAE80Empre02 = {
    user: 'sa',
    password: '.Admin123',
    server: 'IT01\\SQLEXPRESS',
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

let VENTOAPP = {
    user: 'sa',
    password: '.Admin123',
    server: 'IT01\\SQLEXPRESS',
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
    console.log("Sql database connection error ", err);
});

const conectionSae = new sql.ConnectionPool(SAE80Empre02, err =>{
    conectionSae.connect()
    if(err){
        let request = new sql.Request()
        console.log(err) ;
        return request;
        
    } else{
        console.log("SQLServer SAE80Empre02 | Connected to Database.");        
    }  
})


const conectionVENTO = new sql.ConnectionPool(VENTOAPP, err =>{
    conectionVENTO.connect()
    if(err){
        let request = new sql.Request()
        console.log(err) ;
        return request;
        
    } else{
        console.log("SQLServer VENTOAPP | Connected to Database.");        
    }  
})


/* exports.dbconnection = new sql.connect(config, err => { 
    if(err){
        let request = new sql.Request()
        console.log(err) ;
        return request;
        
    } else{
        console.log("SQLServer EMPRE02 | Connected to Database.");        
    }  
}); */

module.exports = {"SAE": conectionSae, "VENTO": conectionVENTO}
