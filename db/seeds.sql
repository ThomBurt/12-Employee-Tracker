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
('Jake', 'Peralta', 2, 1),
('Rosa', 'Diaz', 2, 1),
('Amy', 'Santiago', 2, 1),
('Ray', 'Holt', 1, 1),
('Gina', 'Linetti', 6, 1),
('Charles', 'Boyle', 4, 1),
('Terry', 'Jeffords', 5, 1),
('Winston', 'Schmidt', 2, 1),
('Jessica', 'Day', 2, 1),
('Nick', 'Miller', 2, 1),
('Winston', 'Bishop', 1, 1),
('Rachel', 'Green', 2, 1),
('Monica', 'Geller', 3, 1),
('Phoebe', 'Buffay', 4, 1),
('Chandler', 'Bing', 5, 1),
('Ross', 'Geller', 6, 1),
('Joey', 'Tribbiani', 7, 1);

UPDATE `employees_db`.`employees` SET `manager_id` = '1' WHERE (`id` > '1');