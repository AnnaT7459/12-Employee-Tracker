const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express')

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: '',
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
        function viewAllDepartments() 
