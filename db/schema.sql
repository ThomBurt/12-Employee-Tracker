DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

-- CREATE TABLE employees (
--   id INTEGER AUTO_INCREMENT PRIMARY KEY,
--   first_name VARCHAR(30),
--   last_name VARCHAR (30),
--   role_id INTEGER (10),
--   manager_id INTEGER (10) NULL
-- );
CREATE TABLE employees (
  id INTEGER(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER,
  manager_id INTEGER,
  INDEX`idx_role`(role_id),
  CONSTRAINT `fk_role_id`
  FOREIGN KEY (role_id) 
  REFERENCES roles(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  INDEX `idx_manager`(manager_id), 
  CONSTRAINT `fk_manager_id`
  FOREIGN KEY (manager_id)
  REFERENCES roles(id) ON UPDATE CASCADE ON DELETE RESTRICT
  );

-- CREATE TABLE roles (
--   id INTEGER AUTO_INCREMENT PRIMARY KEY,
--   title VARCHAR(30),
--   salary DECIMAL (30.2),
--   department_id INTEGER (10)
-- );
CREATE TABLE roles (
  id INTEGER(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  title VARCHAR(30),
  salary DECIMAL(9,2),
  department_id INTEGER,
  INDEX `idx_department_id`(department_id),
  CONSTRAINT `fk_department_id`
  FOREIGN KEY (department_id)
  REFERENCES department(did) ON UPDATE CASCADE ON DELETE RESTRICT
  );

CREATE TABLE departments (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
);

SELECT * FROM employees;
SELECT * FROM roles;
SELECT * FROM departments;



