const students = require("express").Router()
const {} = require("../routes/classes")

students.get("/")
students.get("/:id/classes")
students.post("/", newStudent)

module.exports = students;