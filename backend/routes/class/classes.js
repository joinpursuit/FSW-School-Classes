const classes = require("express").Router();
const {addClass, findStudents} = require("./../../queries/class/class.js");
const classesStudentsRouter = require("./student/students");

classes.use("/:className/:studentId/", classesStudentsRouter);

classes.post("/", addClass);

classes.get("/:className/students", findStudents);

module.exports = classes;