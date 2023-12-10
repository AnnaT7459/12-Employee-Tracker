DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

USE business_db;

-- Department table
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) 
);

-- Role table
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT NOT NULL, 
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- Employee table
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL, 
    FOREIGN KEY (role_id) 
    REFERENCES roles(id),
    manager_id INT,
    FOREIGN KEY (manager_id) 
    REFERENCES employees(id)
);