const connection = require('./db/connection');
const db = require("./db/query");
const consoleTable = require('console.table');
const inquirer = require ('inquirer'); 
const figlet = require("figlet");
const validate = require('./js/validate');


// Start server after DB connection
connection.connect(function(err) {
    if (err) throw err;
    openingArt(); 
  });

// -------------------------------------------------------------------------------------------------------------------------

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
    console.log('-------------------------------------------------------------------------by Thom Burt')
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
            "View employees by department",
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
              viewEmployees();   // ✔️
              break;
    
            case "View a role":
              viewRoles();   //✔️
              break;
    
            case "View employees by manager":
              viewEmpByManager();  // TODO emp by manager
              break;

            case "View employees by department":
              viewEmployeesByDepartment(); //✔️
              break;
    
            case "Update employee roles":
              updateEmployeeRole();   //✔️ 
              break;
    
            case "Update employee managers":
              updateEmployeeManager();  //✔️
              break;
    
            case "Delete department":
              deleteDepartment();  //✔️
              break;
    
            case "Delete role":
              deleteRole();       //✔️
              break;
    
            case "Delete employee":
              deleteEmployee();   //✔️
              break;
    
            case "View the total utilized budget of a department":  //✔️
              companyBudget();
              break;
    
            default:
              console.log(`Action not accepted: ${answer.action}`);   //✔️
              break;

            case "Exit":
              connection.end();    //✔️
              break; 
          }
        });
};

// -------------------------------------------------------------------------------------------------------------------------

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
  

// -------------------------------------------------------------------------------------------------------------------------


// EMPLOYEE FUNCTIONS

function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: "What is the employee's first name?",
      validate: addFirstName => {
        if (addFirstName) {
            return true;
        } else {
            console.log('Please enter a first name');
            return false;
        }
      }
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What is the employee's last name?",
      validate: addLastName => {
        if (addLastName) {
            return true;
        } else {
            console.log('Please enter a last name');
            return false;
        }
      }
    }
  ])
    .then(answer => {
    const employeeData = [answer.firstName, answer.lastName]
    const roleSql = `SELECT roles.id, roles.title FROM roles`;
    connection.query(roleSql, (error, data) => {
      if (error) throw error; 
      const roles = data.map(({ id, title }) => ({ name: title, value: id }));
      inquirer.prompt([
            {
              type: 'list',
              name: 'role',
              message: "What is the employee's role?",
              choices: roles
            }
          ])
            .then(roleChoice => {
              const role = roleChoice.role;
              employeeData.push(role);
              const managerSql =  `SELECT * FROM employees`;
              connection.query(managerSql, (error, data) => {
                if (error) throw error;
                const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));
                inquirer.prompt([
                  {
                    type: 'list',
                    name: 'manager',
                    message: "Who is the employee's manager?",
                    choices: managers
                  }
                ])
                  .then(managerChoice => {
                    const manager = managerChoice.manager;
                    employeeData.push(manager);
                    const sql =   `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                                  VALUES (?, ?, ?, ?)`;
                    connection.query(sql, employeeData, (error) => {
                    if (error) throw error;
                    console.log("Employee has been added!")
                    start();
              });
            });
          });
        });
     });
  });
};

    // function to view all employees
function viewEmployees() {
      db.viewAllEmployees().then((result) => {
        console.table(result);
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
    let employees = res.map(employee => ({name: employee.first_name + " " + employee.last_name, value: employee.id}))
    for (let i=0; i <res.length; i++){
      employees.push(res[i].first_name + " " + res[i].last_name);
    }
    connection.query("SELECT ")
    inquirer
    .prompt([
      {
        type: "list",
        name: "employeeName",
        message: "Which employee's role would you like to update?",
        choices: employees
      },
      {
        type: "list",
        name: "role",
        message: "What is your new role?",
        choices: ""
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

function viewEmpByManager() {
  db.getAllManagers().then((rows) => {
    let managers = rows;
    console.log(managers);
    const managerChoices = managers.map(({ id, manager }) => ({
      name: manager,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "managerId",
          message: "which employees do you want to see based on managers?",
          choices: managerChoices,
        },
      ])
      .then((res) => {
        console.log(res);
        //TODO: Find employees based on managerid
      });
  });
};


//============= View All Employees By Departments ==========================//
function viewEmployeesByDepartment() {
  connection.query("SELECT employees.first_name, employees.last_name, departments.name AS Department FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id ORDER BY departments.name;", 
  function(err, res) {
    if (err) throw err
    console.table(res)
    start()
  })
}


// -------------------------------------------------------------------------------------------------------------------------

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
          
function deleteRole(){
  let roleList = [];
  connection.query(
    "SELECT roles.title FROM roles", (err,res) => {
      for (let i = 0; i < res.length; i++){
        roleList.push(res[i].title);
      }
  inquirer 
  .prompt ([ 
    {
      type: "list", 
      message: "Which role would you like to delete?",
      name: "role",
      choices: roleList

    },
  ])
  .then (function(res){
    const query = connection.query(
      `DELETE FROM roles WHERE concat(title) = '${res.role}'`,
        function(err, res) {
        if (err) throw err;
        console.log( "Role deleted!\n");
     start();
    });
    });
    }
  );
};



const companyBudget = () => {
  const sql =     `SELECT department_id AS id, 
                  departments.name AS department,
                  SUM(salary) AS budget
                  FROM  roles  
                  INNER JOIN departments ON roles.department_id = departments.id GROUP BY  roles.department_id`;
  connection.query(sql, (error, response) => {
    if (error) throw error;
      console.table(response);
      start();
  });
};
          