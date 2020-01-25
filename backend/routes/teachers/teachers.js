const teachers = require("express").Router();
const teachersClassRouter = require("./classes/classes");
const {addTeacher, getTeachers} = require("./../../queries/teachers/teachers");

teachers.use("/:teacherId/classes", teachersClassRouter);

teachers.post("/", addTeacher);

teachers.get("/", getTeachers);

module.exports = teachers;