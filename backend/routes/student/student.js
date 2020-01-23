const student = require("express").Router();
const {addStudent, getStudentById, getStudentByName, updateStudent} = require("./../../queries/student/student.js");

student.post("/", addStudent);

student.get("/:id", getStudentById);

student.get("/:firstName/:lastName", getStudentByName);

student.patch("/:id", updateStudent);

module.exports = student;