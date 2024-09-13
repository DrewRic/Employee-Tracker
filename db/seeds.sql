-- Insert seed data for departments
INSERT INTO departments (name)
VALUES 
('Engineering'),
('Human Resources'),
('Marketing'),
('R&D');

-- Insert seed data for roles
INSERT INTO roles (title, salary, department_id)
VALUES 
('Project Engineer', 90000, 1),
('HR Manager', 80000, 2),
('Marketing Specialist', 75000, 3),
('R&D Engineer', 80000, 4);

-- Insert seed data for employees
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
('Tom', 'Ato', 1, NULL),  -- Software Engineer, no manager
('Peter', 'Griffin', 2, 1),   -- HR Manager, John Doe is the manager
('Stan', 'Smith', 3, 1), -- Marketing Specialist, John Doe is the manager
('Sally', 'Sallyson', 4, NULL); -- Sales Associate, no manager
