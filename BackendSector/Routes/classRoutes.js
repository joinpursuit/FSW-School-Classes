const classRoutes = require("express").Router()
const {addClass, enrollStudent, studentFilter} = require("../databaseMiddleware")

classRoutes.post("/", addClass);

classRoutes.post("/enroll", enrollStudent);

classRoutes.get("/", studentFilter)

module.exports = classRoutes