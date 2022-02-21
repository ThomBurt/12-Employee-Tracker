DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;


CREATE TABLE departments (
  id INTEGER AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INTEGER(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  title VARCHAR(30),
  salary DECIMAL(9,2),
  department_id INTEGER,
  CONSTRAINT `fk_departments_id`
  FOREIGN KEY (department_id)
  REFERENCES departments(id) ON UPDATE CASCADE ON DELETE RESTRICT
  );


CREATE TABLE employees (
  id INTEGER(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  
  role_id INTEGER NOT NULL,
  INDEX role_index (role_id),
  CONSTRAINT fk_role FOREIGN KEY (role_id)  REFERENCES roles(id) ON UPDATE CASCADE ON DELETE RESTRICT,
   
  manager_id INTEGER,
  INDEX manager_index (manager_id),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL 
  
  );
  

SELECT * FROM employees;
SELECT * FROM roles;
SELECT * FROM departments;



