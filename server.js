const db = require('./db/connection');
const consoleTable = require('console.table');
const inquirer = require ('inquirer'); 
const figlet = require("figlet");



// Start server after DB connection
db.connect(function(err) {
    if (err) throw err;
    start(); 
  });



function start(){
    // Figlet opening message
    console.log('=======================================================================================')
    console.log(figlet.textSync('Employee Tracker!', {
        font: 'standard',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 150,
        whitespaceBreak: true
    }));
    console.log('=======================================================================================')
    console.log('')


    // start of inquirer
    inquirer
    .prompt ([
      {
        type: "list", 
        message: "What would you like to do?",
        name: "start",
        choices: [
        "Add Employee", 
        "View all Employees", 
        "Remove Employee",
        "Add Department", 
        "View all Departments",
        "Add Roles", 
        "View all Roles", 
        "Update Employee Role", 
      ]
      }
    ])
    .then (function(res){
      switch (res.start){
  
        case "Add Employee":
        addEmployee();
        break;
       
        case "View all Employees":
        viewAllEmployees();
        break; 
  
        case "Remove Employee": 
        removeEmployee(); 
        break;
      
        case "Add Department": 
        addDept(); 
        break;
  
        case "View all Departments":
        viewAllDept();
        break;
  
        case "Add Roles": 
        addRole(); 
        break;
  
        case "View all Roles": 
        viewAllRoles(); 
        break;
      
        case "Update Employee Role":
        updateEmployeeRole(); 
        break;
  
        case "Exit":
        connection.end(); 
        break; 
      }
    })
  }