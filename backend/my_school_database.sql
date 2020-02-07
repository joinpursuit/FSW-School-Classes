DROP DATABASE IF EXISTS my_school_database;
CREATE DATABASE my_school_database;

\c my_school_database;

DROP TABLE IF EXISTS logins;
DROP TABLE IF EXISTS class_enrollments;
DROP TABLE IF EXISTS classes;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS teachers;
DROP TABLE IF EXISTS admins;

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  city TEXT,
  age INTEGER
);

CREATE TABLE teachers (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  class_name TEXT NOT NULL,
  teacher INT REFERENCES teachers(id) ON DELETE CASCADE
);

CREATE TABLE class_enrollments (
    id SERIAL PRIMARY KEY,
    class_id INT REFERENCES classes(id) ON DELETE CASCADE,
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    grade INT
);

CREATE TABLE logins (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    passes TEXT NOT NULL,
    admin_id INT REFERENCES admins(id) ON DELETE CASCADE,
    teacher_id INT REFERENCES teachers(id) ON DELETE CASCADE,
    student_id INT REFERENCES students(id) ON DELETE CASCADE
);

INSERT INTO admins (first_name, last_name)
VALUES ('Test', 'Admin');

INSERT INTO students (first_name, last_name, city, age) 
VALUES ('James', 'Eubanks', 'Kansas City', 20),
('Isaiah', 'Collazo', 'Brooklyn', 20),
('McKenzie', 'Ramos', 'Los Angeles', 22),
('Jordan', 'Kaplan', 'Raleigh', 21)
('Kahoelani', 'Taylor', 'Honolulu', 21);

INSERT INTO teachers (first_name, last_name)
VALUES ('Adam', 'Sloss'),
('Ian', 'Porter'),
('Dana', 'Porter'),
('Seth', 'Abner'),
('Karol', 'Gomez');

INSERT INTO classes (class_name, teacher_id)
VALUES ('Physics', 1),
('Calculus', 1),
('Metacognitive Approaches to Scientific Inquiry', 3),
('History', 2),
('Journalism', 4),
('Databases and Data Algorithms', 5);

INSERT INTO class_enrollments (class_id, student_id, grade)
VALUES (1, 2, 99),
(1, 4, 53),
(2, 1, 64),
(2, 2, 87),
(3, 3, 58),
(3, 5, 78),
(4, 3, 69),
(4, 5, 90),
(5, 1, 95),
(5, 4, 40)
