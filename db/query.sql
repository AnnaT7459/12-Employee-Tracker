-- view all departments
SELECT id, department_name
FROM departments;

-- view all roles
SELECT id, title, salary, department_id
FROM roles;

-- view all employees
SELECT id, first_name, last_name, role_id, manager_id
FROM employees;
