const classRoutes = require("express").Router()
const {addClass, enrollStudent, studentFilter} = require("../databaseMiddleware")

classRoutes.post("/", addClass);

classRoutes.post("/:class/enroll", enrollStudent);

classRoutes.get("/:class/students", studentFilter)

module.exports = classRoutes