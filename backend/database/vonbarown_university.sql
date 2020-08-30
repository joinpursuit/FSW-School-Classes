-- DROP DATABASE IF EXISTS vonbarown_univeristy;
-- CREATE DATABASE vonbarown_univeristy;
-- \c vonbarown_univeristy;
CREATE TABLE users (
  username VARCHAR PRIMARY KEY,
  firstname VARCHAR NOT NULL,
  lastname VARCHAR NOT NULL,
  dob DATE NOT NULL,
  user_password VARCHAR NOT NULL,
  signing_date DATE NOT NULL DEFAULT CURRENT_DATE
);
CREATE TABLE class (
  id SERIAL PRIMARY KEY,
  classname VARCHAR NOT NULL UNIQUE,
  teacher VARCHAR NOT NULL,
  timeStamp VARCHAR NOT NULL
);
CREATE TABLE students (
  id SERIAL,
  className VARCHAR REFERENCES class(classname),
  studentName VARCHAR PRIMARY KEY UNIQUE,
  age INT NOT NULL,
  city VARCHAR NOT NULL,
  grade INT NOT NULL,
  timeStamp VARCHAR NOT NULL
);

INSERT INTO class (classname,teacher,timeStamp)
VALUES('Chem','Phil','8/30/20');


INSERT INTO students(className,studentName,age,city,grade,timeStamp) 
        VALUES('Chem','Brad',26,'Brooklyn',89,'8/30/20');