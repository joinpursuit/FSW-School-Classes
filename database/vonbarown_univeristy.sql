DROP DATABASE IF EXISTS vonbarown_univeristy;

CREATE DATABASE vonbarown_univeristy;

\c vonbarown_univeristy;


CREATE TABLE students
(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR,
    lastname VARCHAR,
    age INT
);

CREATE TABLE class
(
    id SERIAL PRIMARY KEY,
    class_id INT REFERENCES students (id) ON DELETE CASCADE,
    classname VARCHAR,
    teacher VARCHAR,
);