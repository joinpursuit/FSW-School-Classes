const teacher = require("express").Router();
const {addTeacher} = require("./../../queries/teacher/teacher.js");

teacher.post("/", addTeacher);

module.exports = teacher;