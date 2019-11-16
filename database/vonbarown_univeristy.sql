DROP DATABASE IF EXISTS vonbarown_univeristy;

CREATE DATABASE vonbarown_univeristy;

\c vonbarown_univeristy;


CREATE TABLE students
(
    id SERIAL PRIMARY KEY,
    studentName VARCHAR NOT NULL,
    city VARCHAR NOT NULL,
    age INT NOT NULL,
    grade INT NOT NULL
);

CREATE TABLE class
(
    id SERIAL PRIMARY KEY,
    -- class_id INT REFERENCES students (id) ON DELETE CASCADE ON UPDATE CASCADE,
    student_name VARCHAR REFERENCES students (studentName) ON DELETE CASCADE ON UPDATE CASCADE,
    classname VARCHAR NOT NULL UNIQUE,
    teacher VARCHAR NOT NULL,
    class_date DATE NOT NULL DEFAULT CURRENT_DATE
);