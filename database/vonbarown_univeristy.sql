-- DROP DATABASE IF EXISTS vonbarown_univeristy;

-- CREATE DATABASE vonbarown_univeristy;

-- \c vonbarown_univeristy;

CREATE TABLE class
(
    id SERIAL PRIMARY KEY,
    classname VARCHAR NOT NULL UNIQUE,
    teacher VARCHAR NOT NULL,
    timeStamp VARCHAR NOT NULL
);

CREATE TABLE students
(
    id SERIAL PRIMARY KEY,
    className VARCHAR NOT NULL REFERENCES class (classname) ON DELETE CASCADE ON UPDATE CASCADE,
    studentName VARCHAR NOT NULL,
    age INT NOT NULL,
    city VARCHAR NOT NULL,
    grade INT NOT NULL,
    timeStamp VARCHAR NOT NULL
);