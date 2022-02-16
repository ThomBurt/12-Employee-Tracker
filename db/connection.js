const mysql = require('mysql2');

// Connect to SQL database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your mySql username
        user: 'thom',
        // Your MySql password
        password: 'rootpw',
        database: 'employees'
    },
    console.log('Connected to the employees database')
);


  module.exports = db;