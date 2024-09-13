# SQL-Employee-Tracker

# Description

This is a command-line application developed to manage a company's employee database using Node.js, Inquirer, and PostgreSQL. The application provides a simple interface to view, add, and update departments, roles, and employees within the company, allowing for seamless management of the company’s employee structure.

This project was developed as part of a SQL Challenge assignment, utilizing PostgreSQL as the database system for storing and managing employee data, departments, and roles.

# Table of Contents
Installation
Usage
Application Features
Database Schema
Technologies Used
License

- [Installation](#installation)
- [Usage](#usage)
- [Application Features](#ApplicationFeatures)
- [Database Schema](#DatabaseSchema)
- [Technologies Used](#TechnologiesUsed)
- [License](#license)

# Installation
1. Clone the repository: https://github.com/DrewRic/SQL-Employee-Tracker.git
2. Install dependencies
    -npm install (pd and inquirer@8.2.4)
3. Set up PostgreSQL database
4. Seed the database
5. Configure the database connection
6. Run the application

# Usage

After launching the application, you will be presented with several options to manage the employee database:

1. View all departments: Displays a table with department names and IDs.
2. View all roles: Displays job titles, role IDs, department names, and salaries.
3. View all employees: Displays employee data including IDs, names, job titles, departments, salaries, and managers.
4. Add a department: Prompts you to enter a department name and adds it to the database.
5. Add a role: Prompts you to enter a role name, salary, and department, and adds it to the database.
6. Add an employee: Prompts you to enter the employee’s first name, last name, role, and manager, and adds the employee to the database.
7. Update an employee role: Prompts you to select an employee and update their role.

# Application Features

View Data: The application allows users to view departments, roles, and employees in a formatted table view.
Add Data: Users can add new departments, roles, and employees to the database.
Update Data: Users can update employee roles by selecting the employee and assigning them a new role.

# Database Schema
The database includes three tables:

1. Departments: Stores department information.

id: The primary key for the department.
name: The name of the department.

2. Roles: Stores job roles within the company.

id: The primary key for the role.
title: The name of the role.
salary: The salary for the role.
department_id: A foreign key linking the role to a department.

3. Employees: Stores employee information.

id: The primary key for the employee.
first_name: The employee's first name.
last_name: The employee's last name.
role_id: A foreign key linking the employee to a role.
manager_id: A foreign key linking the employee to their manager (another employee).

# Technologies Used
Node.js: A JavaScript runtime used to run the application.
Inquirer: A package for interactive command-line prompts.
PostgreSQL: The database management system used for storing company data.
Pg: A PostgreSQL client for Node.js to interact with the database.

# License
This project is licensed under the MIT License.