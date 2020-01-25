const students = require("express").Router();
const {addStudent, getStudents, updateStudent, getClasses} = require("./../../queries/students/students");

students.post("/", addStudent);

students.get("/", getStudents);

students.patch("/:id", updateStudent);

students.get("/:id/classes", getClasses);

module.exports = students;