const connection = require('./db/connection');
const consoleTable = require('console.table');
const inquirer = require ('inquirer'); 
const figlet = require("figlet");



// Start server after DB connection
connection.connect(function(err) {
    if (err) throw err;
    openingArt(); 
  });



function openingArt(){
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

    start();
};

function start() {
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
              addDepartment(); //✔️
              break;
    
            case "Add an employee":
              addEmployee(); //✔️
              break;
    
            case "Add a role":
              addRole(); //✔️
              break;
    
            case "View a department":
              viewDepartments();   //✔️
              break;
    
            case "View employees":
              viewEmployees();   //✔️
              break;
    
            case "View a role":
              viewRoles();   //✔️
              break;
    
            case "View employees by manager":
              viewEmpByManager();
              break;
    
            case "Update employee roles":
              updateEmployeeRole();
              break;
    
            case "Update employee managers":
              updateEmployeeManagers();
              break;
    
            case "Delete department":
              deleteDepartment();  //✔️
              break;
    
            case "Delete role":
              deleteRole();
              break;
    
            case "Delete employee":
              deleteEmployee();   //✔️
              break;
    
            case "View the total utilized budget of a department":
              companyBudget();
              break;
    
            default:
              console.log(`Invalid action: ${answer.action}`);
              break;

            case "Exit":
              connection.end();    //✔️
              break; 
          }
        });
};


// DEPARTMENT FUNCTIONS


const addDepartment = () => {
  // show the current Departments in the database
  const connectionQuery = "SELECT * FROM departments";
  connection.query(connectionQuery, (err, results) => {
    if (err) throw err;

    console.log("List of current departments");

    console.table(results);

    // ask what the name is for the new dept
    inquirer
      .prompt([
        {
          name: "newDept",
          type: "input",
          message: "What department would you like to add?",
        },
      ])
      .then((answer) => {
        connection.query(
          `INSERT INTO departments(name) VALUES(?)`,
          [answer.newDept],
          (err, results) => {
            start();
          }
        );
      });
  });
};

function viewDepartments(){
  connection.query ("SELECT * FROM departments", function(err, res){
    console.table(res);
    start();
  })
};

function deleteDepartment(){
  let departmentList = [];
  connection.query(
    "SELECT departments.name FROM departments", (err,res) => {
      for (let i = 0; i < res.length; i++){
        departmentList.push(res[i].name);
      }
  inquirer 
  .prompt ([ 
    {
      type: "list", 
      message: "Which department would you like to delete?",
      name: "department",
      choices: departmentList

    },
  ])
  .then (function(res){
    const query = connection.query(
      `DELETE FROM departments WHERE(name) = '${res.department}'`,
        function(err, res) {
        if (err) throw err;
        console.log( "Department deleted!\n");
     start();
    });
    });
    }
  );
};
  




// EMPLOYEE FUNCTIONS

function addEmployee() {
  console.log("Adding a new employee");
  managerChoices = connection.query("SELECT managers.first_name, managers.last_name AS \"manager\" FROM employees LEFT JOIN roles ON employees.manager_id = roles.id LEFT JOIN employees managers ON employees.manager_id = managers.id GROUP BY employees.id")
    inquirer 
      .prompt ([ 
        {
          type: "input", 
          message: "What is the employee's first name?",
          name: "first_name",
        },
        {
          type: "input", 
          message: "What is the employee's last name?",
          name: "last_name"
        },
        {
          type: "list",
          message: "What is the employee's role?",
          name: "role_id", 
          choices: [1,2,3]
        },
        {
          type: "input", 
          message: "Who is their direct manager?",
          name: "manager_id",
          choices: managerChoices
          // he loaded it with some kind of .map to scan through 
        }
      ])
      .then (function(res){
        const query = connection.query(
          "INSERT INTO employees SET ?", 
         res,
          function(err, res) {
            if (err) throw err;
            console.log( "Employee added!");
    
            start(); 
          }
       );    
  })
};

    // function to view all employees
function viewEmployees() {
      connection.query("SELECT employees.first_name, employees.last_name, roles.title AS \"role\", managers.first_name AS \"manager\" FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN employees managers ON employees.manager_id = managers.id GROUP BY employees.id",  
      function(err, res) {
        if (err) throw err;
        // Logging all of the results of the SELECT statement within a CONSOLE TABLE
        console.table(res);
        start();
      });
}

    // REMOVE EMPLOYEE FUNCTION
function deleteEmployee(){
      let employeeList = [];
      connection.query(
        "SELECT employees.first_name, employees.last_name FROM employees", (err,res) => {
          for (let i = 0; i < res.length; i++){
            employeeList.push(res[i].first_name + " " + res[i].last_name);
          }
      inquirer 
      .prompt ([ 
        {
          type: "list", 
          message: "Which employee would you like to delete?",
          name: "employee",
          choices: employeeList
    
        },
      ])
      .then (function(res){
        const query = connection.query(
          `DELETE FROM employees WHERE concat(first_name, ' ' ,last_name) = '${res.employee}'`,
            function(err, res) {
            if (err) throw err;
            console.log( "Employee deleted!\n");
         start();
        });
        });
        }
      );
};

function updateEmployeeRole(){
  connection.query("SELECT first_name, last_name, id FROM employees",
  function(err,res){
    for (let i=0; i <res.length; i++){
      employees.push(res[i].first_name + " " + res[i].last_name);
    }
    let employees = res.map(employee => ({name: employee.first_name + " " + employee.last_name, value: employee.id}))
    inquirer
    .prompt([
      {
        type: "list",
        name: "employeeName",
        message: "Which employee's role would you like to update?",
        choices: employees
      },
      {
        type: "input",
        name: "role",
        message: "What is your new role?"
      }
    ])
    .then(function(res) {
      connection.query(`UPDATE employees SET role_id = ${res.role} WHERE id = ${res.employeeName}`,
      function(err, res) {
        console.log(res);
        start()
        }
        );
      })
  }
  )
};



// ROLE FUNCTIONS


function addRole() {
          let departments= []; 
          connection.query("SELECT * FROM departments",
          function(err,res){
            if(err) throw err;
            for (let i=0; i <res.length; i++){
              res[i].first_name + " " + res[i].last_name
              departments.push({name: res[i].name, value: res[i].id});
            }
          inquirer
          .prompt([
            {
              type: "input", 
              name: "title",
              message: "What role would you like to add?"
            },
            {
              type: "input",
              name: "salary",
              message: "What is the salary for the role?"
            },
            {
              type: "list",
              name: "department",
              message: "what department?",
              choices: departments
            }
          ])
          .then (function(res){
            console.log(res); 
            const query = connection.query(
              "INSERT INTO roles SET ?",
              {
                title: res.title,
                salary: res.salary,
                department_id: res.department
              }, 
              function (err, res){
                if (err) throw err;
                start(); 
              }
            )
          })
       })
};
          
function viewRoles(){
            connection.query("SELECT roles.*, departments.name FROM roles LEFT JOIN departments ON departments.id = roles.department_id", function (err,res){
              if (err) throw err;
              console.table(res);
              start();
            }
            )
};
          





          