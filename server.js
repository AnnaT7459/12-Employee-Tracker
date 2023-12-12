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
                viewAllRoles()
            });
        })
    })
}


// function viewAllRoles()
// function viewAllEmployees


