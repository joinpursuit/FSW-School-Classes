# School Database

Educational fullstack web app for a school’s database, with differing pages depending on the users role within the school.

## Details

The school database, despite it's name, is not only a database but also a web app for that database. The web app has different pages per school role, and each page has it's own functionality. Administrators can create teachers/classes and enroll students into the school, and view all teachers, classes, and students a part of the database. Teachers can view the students in their classes, their grades, and filter those students by grade and city they are from. Students can enroll in a class and update their information.

## Features

* Built, and seeded a SQL database and linked to the frontend using an Express server.

### How to run

To start run ```node app.js``` in the backend folder. Then open the index.html. The database is pre-built with different teachers, students, and 1 admin. The signup requires user info. The info seeded into the database: 

| ID  | ROLE    | FIRST NAME | LAST NAME |
|-----|---------|------------|-----------|
|  1  | Admin   | Test       | Admin     |
|  1  | Teacher | Adam       | Sloss     |
|  2  | Teacher | Ian        | Porter    |
|  3  | Teacher | Dana       | Porter    |
|  4  | Teacher | Seth       | Abner     |
|  5  | Teacher | Karol      | Gomez     |
|  1  | Student | James      | Eubanks   |
|  2  | Student | Isaiah     | Collazo   |
|  3  | Student | McKenzie   | Ramos     |
|  4  | Student | Jordan     | Kaplan    |
|  5  | Student | Kahoelani  | Taylor    |
