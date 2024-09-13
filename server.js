const inquirer = require('inquirer');
const { Pool } = require('pg');

// PostgreSQL Pool Setup
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Javaciderstar@25',
    database: 'employee_db',
  port: 5432,
});

    // Connect to the database
    pool.connect((err) => {
    if (err) {
        console.error('Failed to connect to the database', err);
    } else {
        console.log('Connected to the database');
        startApp();
    }
    });

    // Inquirer prompts and app logic
    function startApp() {
    inquirer
        .prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add Department',
            'Add Role',
            'Add Employee',
            'Update Employee Role',
            'Exit',
        ],
        })
        .then((answer) => {
        switch (answer.action) {
            case 'View All Departments':
            viewAllDepartments();
            break;
            case 'View All Roles':
            viewAllRoles();
            break;
            case 'View All Employees':
            viewAllEmployees();
            break;
            case 'Add Department':
            addDepartment();
            break;
            case 'Add Role':
            addRole();
            break;
            case 'Add Employee':
            addEmployee();
            break;
            case 'Update Employee Role':
            updateEmployeeRole();
            break;
            case 'Exit':
            pool.end();
            process.exit();
        }
        });
    }

    // View all departments
    function viewAllDepartments() {
    const query = 'SELECT * FROM departments';
    pool.query(query, (err, res) => {
        if (err) throw err;
        console.table(res.rows);
        startApp();
    });
    }

    // View all roles
    function viewAllRoles() {
    const query = `
        SELECT roles.id, roles.title, roles.salary, departments.name AS department 
        FROM roles 
        JOIN departments ON roles.department_id = departments.id
    `;
    pool.query(query, (err, res) => {
        if (err) throw err;
        console.table(res.rows);
        startApp();
    });
    }

    // View all employees
    function viewAllEmployees() {
    const query = `
        SELECT employees.id, employees.first_name, employees.last_name, roles.title, 
            departments.name AS department, roles.salary, 
            CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employees 
        JOIN roles ON employees.role_id = roles.id
        JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees manager ON employees.manager_id = manager.id
    `;
    pool.query(query, (err, res) => {
        if (err) throw err;
        console.table(res.rows);
        startApp();
    });
    }

    // Add a department
    function addDepartment() {
    inquirer
        .prompt({
        name: 'name',
        type: 'input',
        message: 'Enter the name of the department:',
        })
        .then((answer) => {
        const query = 'INSERT INTO departments (name) VALUES ($1)';
        pool.query(query, [answer.name], (err, res) => {
            if (err) throw err;
            console.log('Department added successfully');
            startApp();
        });
        });
    }

    // Add a role
    function addRole() {
    pool.query('SELECT * FROM departments', (err, res) => {
        if (err) throw err;

        const departments = res.rows.map((row) => ({
        name: row.name,
        value: row.id,
        }));

        inquirer
        .prompt([
            {
            name: 'title',
            type: 'input',
            message: 'Enter the name of the role:',
            },
            {
            name: 'salary',
            type: 'input',
            message: 'Enter the salary for the role:',
            },
            {
            name: 'department_id',
            type: 'list',
            message: 'Select the department for this role:',
            choices: departments,
            },
        ])
        .then((answer) => {
            const query =
            'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3,)';
            pool.query(query, [answer.title, answer.salary, answer.department_id], (err, res) => {
            if (err) throw err;
            console.log('Role added successfully');
            startApp();
            });
        });
    });
    }

    // Add an employee
    function addEmployee() {
    pool.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;

        const roles = res.rows.map((row) => ({
        name: row.title,
        value: row.id,
        }));

        pool.query('SELECT * FROM employees', (err, res2) => {
        if (err) throw err;

        const managers = res2.rows.map((row) => ({
            name: `${row.first_name} ${row.last_name}`,
            value: row.id,
        }));

        inquirer
            .prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'Enter the employee\'s first name:',
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'Enter the employee\'s last name:',
            },
            {
                name: 'role_id',
                type: 'list',
                message: 'Select the role for this employee:',
                choices: roles,
            },
            {
                name: 'manager_id',
                type: 'list',
                message: 'Select the employee\'s manager:',
                choices: [...managers, { name: 'None', value: null }],
            },
            ])
            .then((answer) => {
            const query =
                'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';
            pool.query(
                query,
                [answer.first_name, answer.last_name, answer.role_id, answer.manager_id],
                (err, res) => {
                if (err) throw err;
                console.log('Employee added successfully');
                startApp();
                }
            );
            });
        });
    });
    }

    // Update an employee's role
    function updateEmployeeRole() {
    pool.query('SELECT * FROM employees', (err, res) => {
        if (err) throw err;

        const employees = res.rows.map((row) => ({
        name: `${row.first_name} ${row.last_name}`,
        value: row.id,
        }));

        pool.query('SELECT * FROM roles', (err, res2) => {
        if (err) throw err;

        const roles = res2.rows.map((row) => ({
            name: row.title,
            value: row.id,
        }));

        inquirer
            .prompt([
            {
                name: 'employee_id',
                type: 'list',
                message: 'Select the employee to update:',
                choices: employees,
            },
            {
                name: 'role_id',
                type: 'list',
                message: 'Select the new role for the employee:',
                choices: roles,
            },
            ])
            .then((answer) => {
            const query = 'UPDATE employees SET role_id = $1 WHERE id = $2';
            pool.query(query, [answer.role_id, answer.employee_id], (err, res) => {
                if (err) throw err;
                console.log('Employee role updated successfully');
                startApp();
            });
            });
        });
    });
    }
