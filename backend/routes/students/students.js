const students = require("express").Router();
const {addStudent, getStudents, updateStudent} = require("./../../queries/students/students");

students.post("/", addStudent);

students.get("/", getStudents);

students.patch("/:id", updateStudent);

module.exports = students;