const classStudents = require("express").Router({mergeParams: true});
let {updateStudent, enrollStudent, getStudents} = require("./../../../queries/classes/students/students");

classStudents.get("/", getStudents);

classStudents.patch("/:studentId", updateStudent);

classStudents.post("/:studentId", enrollStudent);

module.exports = classStudents;