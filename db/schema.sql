\c employee_db

-- Create departments table
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- Create roles table
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT REFERENCES departments(id)
);

-- Create employees table
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role_id INT REFERENCES roles(id),
  manager_id INT REFERENCES employees(id)
);
