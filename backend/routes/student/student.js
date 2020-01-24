const student = require("express").Router();
const {addStudent, getStudentById, getStudentByName, updateStudent, getAllStudents} = require("./../../queries/student/student.js");

student.post("/", addStudent);

student.get("/:id", getStudentById);

student.get("/:firstName/:lastName", getStudentByName);

student.patch("/:id", updateStudent);

student.get("/", getAllStudents);

module.exports = student;