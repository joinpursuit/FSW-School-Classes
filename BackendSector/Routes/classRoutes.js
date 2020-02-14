const classes = require("express").Router()
const School = require("../School.js")
let nRES = new School()

app.post("/", nRES.addClass);

app.post("/:className/enroll", nRES.enrollStudent);

app.get("/:className/students", nRES.getStudentsByClassWithFilter)

module.exports = classes