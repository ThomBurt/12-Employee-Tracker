const db = require('./db/connection');
const consoleTable = require('console.table');
const inquirer = require ('inquirer'); 
const figlet = require("figlet");



// Start server after DB connection
db.connect((err) => {

    figlet(' WELCOME TO EMPLOYEE TRACKER', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
    });

      //STARTS MAIN FUNCTION
 // questions();
});

