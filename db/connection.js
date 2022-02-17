const mysql = require('mysql2');

// Connect to SQL database
const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'thom',
        password: 'rootpw',
        database: 'employees_db'
    },
    console.log('Connected to the employees database, employees_db')
);


  module.exports = connection;