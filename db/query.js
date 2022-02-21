const db = require("./connection");
const cTable = require("console.table");

class Query {
  viewAllEmployees() {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT employees.id,
                employees.first_name, 
                employees.last_name, 
                roles.title AS role, 
                roles.salary, 
                departments.name AS department, 
                managers.first_name AS manager_first_name, 
                managers.last_name  AS manager_last_name 
                
                FROM employees 
                LEFT JOIN roles on employees.role_id = roles.id 
                LEFT JOIN departments on roles.department_id = departments.id 
                LEFT JOIN employees managers ON managers.id = employees.manager_id  
                ORDER BY employees.id`,
        (err, results) => {
          if (err) {
            reject(err);
          }

          resolve(results);
        }
      );
    });
  }

  getAllManagers() {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT 
            managers.id,
		    CONCAT(managers.first_name, ' ', managers.last_name)  AS manager              
		    
            FROM employees 
		    LEFT JOIN employees managers ON managers.id = employees.manager_id  
		    WHERE managers.id <> ''
		    GROUP BY managers.first_name, managers.last_name, managers.id`,
        (err, results) => {
          if (err) {
            reject(err);
          }

          resolve(results);
        }
      );
    });
  }

  viewEmployeeByManager(managerId) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM employees_db.employees AS employees WHERE employees.manager_id = ${managerId}`, (err, results) => {
        if (err) {
          reject(console.log("err ", err));
        }
        resolve(console.table(results));
      });
    });
  }
}

module.exports = new Query();
