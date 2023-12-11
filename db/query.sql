-- JOIN reference https://www.w3schools.com/sql/sql_join.asp
-- view all departments
SELECT id, name 
FROM department

-- view all roles
SELECT role.id, title, name AS department, salary 
FROM role 
JOIN department ON role.department_id = department.id
    
-- view all employees
SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, manager.first_name + ' ' + manager.last_name AS manager
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id
LEFT JOIN employee manager ON employee.manager_id = manager.id;

-- add a department
-- ? placeholder
INSERT INTO
    department (department_name)
VALUES
    (?);

-- add a role
INSERT INTO
    roles (title, salary, department_id)
VALUES
    (?, ?, ?);

-- add an employee
INSERT INTO
    employees (first_name, last_name, role_id, manager_id)
VALUES
    (?, ?, ?, ?);