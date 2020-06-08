const classRoutes = require("express").Router()
const {addClass, enrollStudent, studentFilter} = require("../databaseMiddleware")

classRoutes.post("/", addClass);

classRoutes.post("/:className/enroll", enrollStudent);

classRoutes.get("/:className/students", studentFilter)

module.exports = classRoutes