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
('Jake', 'Peralta', 2, 4),
('Rosa', 'Diaz', 2, 4),
('Amy', 'Santiago', 2, 4),
('Ray', 'Holt', 1, NULL),
('Gina', 'Linetti', 6, 4),
('Charles', 'Boyle', 4, 4),
('Terry', 'Jeffords', 5, 4),
('Winston', 'Schmidt', 2, 4),
('Jessica', 'Day', 2, 4),
('Nick', 'Miller', 2, 4),
('Winston', 'Bishop', 4, 4),
('Rachel', 'Green', 2, 4),
('Monica', 'Geller', 3, 4),
('Phoebe', 'Buffay', 4, 4),
('Chandler', 'Bing', 5, 4),
('Ross', 'Geller', 6, 4),
('Joey', 'Tribbiani', 7, 4);

-- UPDATE `employees_db`.`employees` SET `manager_id` = '1' WHERE (`id` > '1');