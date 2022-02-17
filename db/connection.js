const mysql = require('mysql2');

// Connect to SQL database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'thom',
        password: 'rootpw',
        database: 'employees'
    },
    console.log('Connected to the employees database')
);


  module.exports = db;