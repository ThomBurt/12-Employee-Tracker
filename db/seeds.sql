use employees_db;

INSERT INTO departments(name)
VALUES 
('Management'),
('Sales'),
('Warehouse'),
('Human Resources'),
('Office Management'),
('Accounting'),
('Engineering');

INSERT INTO roles(title, salary, department_id)
VALUES
('Manager', 100000, 1),
('Sales Rep', 67000, 2),
('HR Rep', 72000, 3),
('Warehouse Worker', 45000, 4),
('Receptionist', 47000, 5),
('Accountant', 89000, 6),
('Software Engineer', 100000, 7);

INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES
('Jake', 'Peralta', 1, NULL),
('Rosa', 'Diaz', 2, 1),
('Amy', 'Santiago', 3, 1),
('Ray', 'Holt', 4, NULL),
('Gina', 'Linetti', 4, 2),
('Charles', 'Boyle', 4, 2),
('Terry', 'Jeffords', 4, 3),
('Winston', 'Schmidt', 4, 3),
('Jessica', 'Day', 4, 3),
('Nick', 'Miller', 5, 4),
('Winston', 'Bishop', 5, NULL),
('Rachel', 'Green', 6, NULL),
('Monica', 'Geller', 7, 4),
('Phoebe', 'Buffay', 7, 4),
('Chandler', 'Bing', 7, 4),
('Ross', 'Geller', 7, 4),
('Joey', 'Tribbiani', 7, 4);

-- UPDATE `employees_db`.`employees` SET `manager_id` = '1' WHERE (`id` > '1');