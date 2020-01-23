const classesStudents = require("express").Router({mergeParams: true});
const {enrollStudent} = require("./../../../queries/class/students/students");

classesStudents.post("/enroll/:grade", enrollStudent);


module.exports = classesStudents;