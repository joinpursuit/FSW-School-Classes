const teacher = require("express").Router();
const {addTeacher, getTeachers} = require("./../../queries/teacher/teacher.js");

teacher.post("/", addTeacher);

teacher.get("/", getTeachers);

module.exports = teacher;