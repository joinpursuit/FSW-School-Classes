const classStudents = require("express").Router({mergeParams: true});
let {updateStudent, enrollStudent} = require("./../../../queries/classes/students/students");

classStudents.patch("/", updateStudent);

classStudents.post("/", enrollStudent);

module.exports = classStudents;