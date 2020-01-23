const classes = require("express").Router();
const {addClass, enrollStudent, findStudents} = require("./../../queries/class/class.js");

classes.post("/", addClass);

classes.post("/:className/enroll", enrollStudent);

classes.get("/:className/students", findStudents);

module.exports = classes;