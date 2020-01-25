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