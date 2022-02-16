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

    initialQuestions();
};

function initialQuestions() {
        // start of inquirer
        inquirer
        .prompt({
          name: "action",
          type: "rawlist",
          message: "What would you like to do?",
          choices: [
            "Add a department",
            "Add an employee",
            "Add a role",
            "View a department",
            "View employees",
            "View a role",
            "Update employee roles",
            "Update employee managers",
            "View employees by manager",
            "Delete department",
            "Delete role",
            "Delete employee",
            "View the total utilized budget of a department",
            "Exit",
          ],
        })
        .then((answer) => {
          switch (answer.action) {
            case "Add a department":
              addDepartment();
              break;
    
            case "Add an employee":
              addEmployee();
              break;
    
            case "Add a role":
              addRole();
              break;
    
            case "View a department":
              viewDepartments();
              break;
    
            case "View employees":
              viewEmployees();
              break;
    
            case "View a role":
              viewRoles();
              break;
    
            case "View employees by manager":
              viewEmpByManager();
              break;
    
            case "Update employee roles":
              updateEmpRole();
              break;
    
            case "Update employee managers":
              updateEmpManagers();
              break;
    
            case "Delete department":
              deleteDepartment();
              break;
    
            case "Delete role":
              deleteRole();
              break;
    
            case "Delete employee":
              deleteEmployee();
              break;
    
            // Bonus
            case "View the total utilized budget of a department":
              companyBudget();
              break;
    
            default:
              console.log(`Invalid action: ${answer.action}`);
              break;
          }
        });
}