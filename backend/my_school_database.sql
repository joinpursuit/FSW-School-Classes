DROP DATABASE IF EXISTS my_school_database;
CREATE DATABASE my_school_database;

\c my_school_database;

DROP TABLE IF EXISTS class_enrollments;
DROP TABLE IF EXISTS classes;
DROP TABLE IF EXISTS students;


CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  class_name TEXT NOT NULL,
  teacher TEXT NOT NULL
);

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  city TEXT,
  age INTEGER
);

CREATE TABLE class_enrollments (
    id SERIAL PRIMARY KEY,
    class_id INT REFERENCES classes(id) ON DELETE CASCADE,
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    grade INT
);