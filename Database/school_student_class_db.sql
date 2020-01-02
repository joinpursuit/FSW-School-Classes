/* CREATE DATABASE */
DROP DATABASE IF EXISTS school_student_class_db;
CREATE DATABASE school_student_class_db;
\c school_student_class_db;

/* CREATE TABLES */
CREATE TABLE instructor
(
    instructor_id SERIAL PRIMARY KEY,
    instructor_name VARCHAR(100) UNIQUE
);

CREATE TABLE class
(
    class_id SERIAL PRIMARY KEY,
    class_name VARCHAR(100) UNIQUE,
    instructor_id INT REFERENCES instructor(instructor_id) ON DELETE CASCADE
);

CREATE TABLE student
(
    student_id SERIAL PRIMARY KEY,
    student_name VARCHAR(100) UNIQUE,
    city VARCHAR(100),
    age INT
);

CREATE TABLE classroom
(
    classroom_id SERIAL PRIMARY KEY,
    class_id INT REFERENCES class(class_id) ON DELETE CASCADE,
    student_id INT REFERENCES student(student_id) ON DELETE CASCADE,
    grade INT
);

/* SEED DATA */

INSERT INTO instructor
(instructor_name) 
VALUES
('Bugs Bunny'),
('Daffy Duck'),
('Porky Pig'),
('Pepe LePew'),
('Foghorn Leghorn');

INSERT INTO class
(class_name, instructor_id) 
VALUES
('Advanced Wordplay 103', 1),
('Intro To Being Hit To The Head 101', 2),
('Public Speaking 101', 3),
('Sex And Sexuality 104', 4),
('Chickenhawk Awareness 102', 5);

INSERT INTO student
(student_name, city, age) 
VALUES
('Plucky Duck', 'Cityville', 16),
('Hampton Pig', 'Cityville', 16),   
('Buster Bunny', 'Townsville', 17), 
('Babs Bunny', 'Townsville', 17),  
('Dizzy Devil', 'Outback Stakehousetown', 15),
('Elmyra', 'Downtownstown', 15), 
('Montana Max', 'New Richberg', 17)      
;

INSERT INTO classroom
(class_id, student_id, grade) 
VALUES
(1, 1, 75),
(1, 2, 100),
(1, 3, 96),
(1, 4, 97),
(1, 5, 23),
(1, 6, 45),
(1, 7, 82),
(2, 1, 92),
(2, 2, 100),
(2, 3, 40),
(2, 4, 70),
(2, 5, 86),
(2, 6, 97),
(2, 7, 99),
(3, 1, 73),
(3, 2, 100),
(3, 3, 98),
(3, 4, 99),
(3, 5, 21),
(3, 6, 67),
(3, 7, 81),
(4, 1, 42),
(4, 2, 100),
(4, 3, 78),
(4, 4, 79),
(4, 5, 92),
(4, 6, 69),
(4, 7, 85),
(5, 1, 98),
(5, 2, 38),
(5, 3, 88),
(5, 4, 89),
(5, 5, 76),
(5, 6, 77),
(5, 7, 83)
;

/* TESTING */

SELECT *
FROM instructor;

SELECT *
FROM class;

SELECT *
FROM student;

SELECT *
FROM classroom;
