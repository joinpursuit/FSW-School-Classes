-- DROP DATABASE IF EXISTS vonbarown_univeristy;

-- CREATE DATABASE vonbarown_univeristy;

-- \c vonbarown_univeristy;
CREATE TABLE users
(
    username VARCHAR PRIMARY KEY,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    dob DATE NOT NULL,
    user_password VARCHAR NOT NULL,
    signing_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE class
(
    id SERIAL PRIMARY KEY,
    classname VARCHAR NOT NULL UNIQUE,
    teacher VARCHAR NOT NULL,
    timeStamp VARCHAR NOT NULL
);

CREATE TABLE students
(
    id SERIAL ,
    className VARCHAR NOT NULL REFERENCES class (classname) ON DELETE CASCADE ON UPDATE CASCADE,
    studentName VARCHAR PRIMARY KEY,
    age INT NOT NULL,
    city VARCHAR NOT NULL,
    grade INT NOT NULL,
    timeStamp VARCHAR NOT NULL
);
