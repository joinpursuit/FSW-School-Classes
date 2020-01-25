const student = require("express").Router();
const {addStudent};

student.post("/", addStudent);

module.exports = student;