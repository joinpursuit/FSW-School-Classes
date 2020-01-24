const classes = require("express").Router();
const {addClass, findStudents, getAllClasses} = require("./../../queries/class/class.js");
const classesStudentsRouter = require("./student/students");

classes.use("/:className/:studentId/", classesStudentsRouter);

classes.post("/", addClass);

classes.get("/:className/students", findStudents);

classes.get("/", getAllClasses);

module.exports = classes;