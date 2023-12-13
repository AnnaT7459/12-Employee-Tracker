const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express')
const fs = require('fs');
// added printTable with P. Loy tutoring
const { printTable } = require('console-table-printer')

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: 'ravenclaw92',
        database: 'business_db'
    },
    console.log(`Connected to the business_db database.`)
);

function init() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'tasks',
                message: 'What would you like to do?',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
            }
        ])
        .then((data) => {
            console.log(data)
            if (data.tasks === "View all departments") {
                viewAllDepartments()
            } else if (data.tasks === "View all roles") {
                viewAllRoles()
            } else if (data.tasks === 'View all employees') {
                viewAllEmployees()
            } else if (data.tasks === "Add a department") {
                addDepartment()
            } else if (data.tasks === 'Add a role') {
                addRole()
            } else if (data.tasks === 'Add an employee') {
                addEmployee()
            } else if (data.tasks === 'Update an employee role') {
                updateEmployeeRole()
            }
        })
}
init()

function viewAllDepartments() {
    let query = "SELECT * FROM department";
    db.query(query, function (err, res) {
        if (err) throw err;
        printTable(res);
        init();
    });
}

function viewAllRoles() {
    let query = 'SELECT * FROM role';
    db.query(query, function (err, res) {
        if (err) throw err;
        printTable(res);
        init();
    });
}
function viewAllEmployees() {
    let query = 'SELECT * FROM employee';
    db.query(query, function (err, res) {
        if (err) throw err;
        printTable(res);
        init();
    });
}

function addDepartment() {
    inquirer.prompt([{
        type: 'input',
        name: 'departmentTask',
        message: 'What is the name of the department?'
    }
    ])
        .then(data => {
            let query = 'INSERT INTO department (name) VALUES(?)';
            db.query(query, [data.departmentTask], function (err, res) {
                if (err) throw err;
                console.log(`Added ${data.departmentTask} to database`);
                viewAllDepartments()
            });
        })
}

function addRole() {
    db.query('SELECT NAME name, id value FROM department', (err, departmentData) => {
        inquirer.prompt([{
            type: 'input',
            name: 'roleNameTask',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'roleSalaryTask',
            message: 'What is the salary of the role?'
        },
        {
            type: 'list',
            name: 'roleDepartmentTask',
            choices: departmentData,
            message: 'Which department does the role belong to?'
        }
        ])
            .then(data => {
                let query = 'INSERT INTO role (title, salary, department_id) VALUES(?, ?, ?)';
                db.query(query, [data.roleNameTask, data.roleSalaryTask, data.roleDepartmentTask], function (err, res) {
                    if (err) throw err;
                    console.log(`Added ${data.roleNameTask} to database`);
                    viewAllRoles()
                });
            })
    })
}

function addEmployee() {
    db.query('SELECT title, id FROM role', (err, roleData) => {
        if (err) throw err;
        // reference: https://www.w3schools.com/Sql/func_mysql_concat.asp
        db.query('SELECT CONCAT(first_name, " ", last_name) AS manager, id FROM employee', (err, employeeData) => {
            if (err) throw err;
            // adds an option if the new employee does not have a manager
            // map reference: https://www.w3schools.com/jsref/jsref_map.asp
            const managerChoices = [{ name: 'None', value: null }, ...employeeData.map(manager => ({ name: manager.manager, value: manager.id }))];

            inquirer.prompt([
                {
                    type: 'input',
                    name: 'employeeFnameTask',
                    message: "What is the employee's first name?"
                },
                {
                    type: 'input',
                    name: 'employeeLnameTask',
                    message: "What is the employee's last name?"
                },
                {
                    type: 'list',
                    name: 'employeeRoleTask',
                    choices: roleData.map(role => ({ name: role.title, value: role.id })),
                    message: "What is the employee's role?"
                },
                {
                    type: 'list',
                    name: 'employeeManagerTask',
                    choices: managerChoices,
                    message: "Who is the employee's manager?"
                }
            ])
                .then(data => {
                    let query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
                    db.query(query, [data.employeeFnameTask, data.employeeLnameTask, data.employeeRoleTask, data.employeeManagerTask], function (err, res) {
                        if (err) throw err;
                        console.log(`Added ${data.employeeFnameTask} ${data.employeeLnameTask} to database`);
                        viewAllEmployees();
                    });
                });
        });
    });
}





