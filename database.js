const mysql = require('mysql');


var connection = mysql.createConnection({
         host:"localhost",
         user:"root",
         password:"root123",
         database:"mydb"

});

module.exports = connection;